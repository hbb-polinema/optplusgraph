import { ExecutionVisualizer } from './ExecutionVisualizer';
import {
    ERROR_COLOR,
    LIGHT_ARROW_COLOR,
    BRIGHTRED,
    DARK_ARROW_COLOR,
    BREAKPOINT_COLOR
} from '../view/colors';
import { SVG_ARROW_POLYGON } from '../view/polygons';
import { SVG_ARROW_HEIGHT } from '../view/sizes';
import { HTMLspecialChars } from '../utilities/functions';
import { Assert } from '../utilities/debugger';
import { KEY } from './GraphVisualizer';

export class CodeDisplay implements ICodeDisplay {
    owner: ExecutionVisualizer;
    domRoot: any;
    domRootD3: any;

    codToDisplay: string;
    lineCode: any;

    leftGutterSvgInitialized: boolean = false;
    arrowOffsetY: number;
    codeRowHeight: number;

    constructor(owner, domRoot, domRootD3, codToDisplay: string, lang: string, editCodeBaseURL: string) {
        this.owner = owner;
        this.domRoot = domRoot;
        this.domRootD3 = domRootD3;
        this.codToDisplay = codToDisplay;

        let codeDisplayHTML =
            `<div id="codeDisplayDiv">
                <div id="langDisplayDiv"></div>
                <div id="pyCodeOutputDiv"/>
                <div id="editCodeLinkDiv">
                    <button id="editBtn" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-edit"></span> Edit code</button>
                    <span id="liveModeSpan" style="display: none;">| <a id="editLiveModeBtn" href="#">Live programming</a></a>
                </div>
                <!--div id="legendDiv"/-->
                <!--div id="codeFooterDocs">Click a line of code to set a breakpoint; use the Backward and Forward buttons to jump there.</div-->
            </div>`;

        this.domRoot.append(codeDisplayHTML);

        if (this.owner.params.embeddedMode) {
            this.domRoot.find('#editCodeLinkDiv').css('font-size', '10pt');
        }

        /*this.domRoot.find('#legendDiv')
            .append('<svg id="prevLegendArrowSVG"/> <span style="background-color:#F0F0EA;"> line that has just executed  </span>')
            .append('<p style="margin-top: 4px"><svg id="curLegendArrowSVG"/> <span style="background-color:#FFFF66;"> next line to execute </span></p>');*/
        this.domRootD3.select('svg#prevLegendArrowSVG')
            .append('polygon')
            .attr('points', SVG_ARROW_POLYGON)
            .attr('fill', LIGHT_ARROW_COLOR);
        this.domRootD3.select('svg#curLegendArrowSVG')
            .append('polygon')
            .attr('points', SVG_ARROW_POLYGON)
            .attr('fill', DARK_ARROW_COLOR);

        if (editCodeBaseURL) {
            // kinda kludgy
            let pyVer = '2'; // default
            if (lang === 'js') {
                pyVer = 'js';
            } else if (lang === 'ts') {
                pyVer = 'ts';
            } else if (lang === 'java') {
                pyVer = 'java';
            } else if (lang === 'py3') {
                pyVer = '3';
            } else if (lang === 'c') {
                pyVer = 'c';
            } else if (lang === 'cpp') {
                pyVer = 'cpp';
            }

            let urlStr = $.param.fragment(editCodeBaseURL, { code: this.codToDisplay, py: pyVer }, 2);
            this.domRoot.find('#editBtn').attr('href', urlStr);

        } else {

            this.domRoot.find('#editCodeLinkDiv').hide(); // just hide for simplicity!
            this.domRoot.find('#editBtn').attr('href', "#");
            this.domRoot.find('#editBtn').click(function () { return false; }); // DISABLE the link!

        }

        if (lang !== undefined) {
            if (lang === 'js') {
                this.domRoot.find('#langDisplayDiv').html('JavaScript');
            } else if (lang === 'ts') {
                this.domRoot.find('#langDisplayDiv').html('TypeScript');
            } else if (lang === 'ruby') {
                this.domRoot.find('#langDisplayDiv').html('Ruby');
            } else if (lang === 'java') {
                this.domRoot.find('#langDisplayDiv').html('Java');
            } else if (lang === 'py2') {
                this.domRoot.find('#langDisplayDiv').html('Python 2.7');
            } else if (lang === 'py3') {
                this.domRoot.find('#langDisplayDiv').html('Python 3.6');
            } else if (lang === 'c') {
                if (this.owner.params.embeddedMode) {
                    this.domRoot.find('#langDisplayDiv').html('C (gcc 4.8, C11)');
                } else {
                    this.domRoot.find('#langDisplayDiv').html('C (gcc 4.8, C11) <font color="#e93f34">EXPERIMENTAL!</font>');//<br/>see <a href="https://github.com/pgbovine/opt-cpp-backend/issues" target="_blank">known bugs</a> and report to philip@pgbovine.net');
                }
            } else if (lang === 'cpp') {
                if (this.owner.params.embeddedMode) {
                    this.domRoot.find('#langDisplayDiv').html('C++ (gcc 4.8, C++11)');
                } else {
                    this.domRoot.find('#langDisplayDiv').html('C++ (gcc 4.8, C++11) <font color="#e93f34">EXPERIMENTAL!</font>');//<br/>see <a href="https://github.com/pgbovine/opt-cpp-backend/issues" target="_blank">known bugs</a> and report to philip@pgbovine.net');
                }
            } else {
                this.domRoot.find('#langDisplayDiv').hide();
            }
        }
    }

    renderPyCodeOutput(): void {
        let myCodOutput = this; // capture
        this.domRoot.find('#pyCodeOutputDiv').empty();

        // maps codeOutputLines down both table columns
        // TODO: get rid of pesky owner dependency
        let code = [], line = [];
        let codeOutputD3 = this.domRootD3.select('#pyCodeOutputDiv')
            .append('table')
            .attr('id', 'pyCodeOutput')
            .selectAll('tr')
            .data(this.owner.codeOutputLines)
            .enter().append('tr')
            .selectAll('td')
            .data(function (d, i) { return [d, d] /* map full data item down both columns */; })
            .enter().append('td')
            .attr('class', function (d, i) {
                // add the togetherjsCloneClick class on here so that we can
                // sync clicks via TogetherJS for setting breakpoints in shared
                // sessions (kinda leaky abstraction since pytutor.ts shouldn't
                // need to know about TogetherJS, but oh wells)
                if (i == 0) {
                    return 'lineNo togetherjsCloneClick';
                } else {
                    return 'cod togetherjsCloneClick';
                }
            })
            .attr('id', (d, i) => {
                if (i == 0) {
                    return 'lineNo' + d.lineNumber;
                } else {
                    return this.owner.generateID('cod' + d.lineNumber); // make globally unique (within the page)
                }
            })
            .html(function (d, i) {
                if (i == 0) {
                    line.push(d.lineNumber);
                    return d.lineNumber;
                } else {
                    line.push(d.text.trim());
                    code.push({ line });
                    line = [];
                    return HTMLspecialChars(d.text);
                }
            });
        //console.log("text-code: " + JSON.stringify(code));
        this.lineCode = code;
        // create a left-most gutter td that spans ALL rows ...
        // (NB: valign="top" is CRUCIAL for this to work in IE)
        this.domRoot.find('#pyCodeOutput tr:first')
            .prepend('<td id="gutterTD" valign="top" rowspan="' + this.owner.codeOutputLines.length + '"><svg id="leftCodeGutterSVG"/></td>');

        // create prevLineArrow and curLineArrow
        this.domRootD3.select('svg#leftCodeGutterSVG')
            .append('polygon')
            .attr('id', 'prevLineArrow')
            .attr('points', SVG_ARROW_POLYGON)
            .attr('fill', LIGHT_ARROW_COLOR);

        this.domRootD3.select('svg#leftCodeGutterSVG')
            .append('polygon')
            .attr('id', 'curLineArrow')
            .attr('data-intro', 'This is next execute')
            .attr('points', SVG_ARROW_POLYGON)
            .attr('fill', DARK_ARROW_COLOR);


        // 2012-09-05: Disable breakpoints for now to simplify UX
        // 2016-05-01: Revive breakpoint functionality
        codeOutputD3
            .style('cursor', function (d, i) {
                // don't do anything if exePts empty (i.e., this line was never executed)
                let exePts = d.executionPoints;
                if (!exePts || exePts.length == 0) {
                    return;
                } else {
                    return 'pointer'
                }
            })
            .on('click', function (d, i) {
                // don't do anything if exePts empty (i.e., this line was never executed)
                let exePts = d.executionPoints;
                if (!exePts || exePts.length == 0) {
                    return;
                }

                d.breakpointHere = !d.breakpointHere; // toggle
                if (d.breakpointHere) {
                    myCodOutput.owner.setBreakpoint(d);
                    d3.select(this.parentNode).select('td.lineNo').style('color', BREAKPOINT_COLOR);
                    d3.select(this.parentNode).select('td.lineNo').style('font-weight', 'bold');
                    d3.select(this.parentNode).select('td.cod').style('color', BREAKPOINT_COLOR);
                } else {
                    myCodOutput.owner.unsetBreakpoint(d);
                    d3.select(this.parentNode).select('td.lineNo').style('color', '');
                    d3.select(this.parentNode).select('td.lineNo').style('font-weight', '');
                    d3.select(this.parentNode).select('td.cod').style('color', '');
                }
            });
    }

    updateCodOutput(smoothTransition = false): void {
        let gutterSVG = this.domRoot.find('svg#leftCodeGutterSVG');

        // one-time initialization of the left gutter
        // (we often can't do this earlier since the entire pane
        //  might be invisible and hence returns a height of zero or NaN
        //  -- the exact format depends on browser)
        if (!this.leftGutterSvgInitialized) {
            // set the gutter's height to match that of its parent
            gutterSVG.height(gutterSVG.parent().height());

            let firstRowOffsetY = this.domRoot.find('table#pyCodeOutput tr:first').offset().top;

            // first take care of edge case when there's only one line ...
            this.codeRowHeight = this.domRoot.find('table#pyCodeOutput td.cod:first').height();

            // ... then handle the (much more common) multi-line case ...
            // this weird contortion is necessary to get the accurate row height on Internet Explorer
            // (simpler methods work on all other major browsers, erghhhhhh!!!)
            if (this.owner.codeOutputLines.length > 1) {
                let secondRowOffsetY = this.domRoot.find('table#pyCodeOutput tr:nth-child(2)').offset().top;
                this.codeRowHeight = secondRowOffsetY - firstRowOffsetY;
            }

            Assert(this.codeRowHeight > 0);

            let gutterOffsetY = gutterSVG.offset().top;
            let teenyAdjustment = gutterOffsetY - firstRowOffsetY;

            // super-picky detail to adjust the vertical alignment of arrows so that they line up
            // well with the pointed-to code text ...
            // (if you want to manually adjust tableTop, then ~5 is a reasonable number)
            this.arrowOffsetY = Math.floor((this.codeRowHeight / 2) - (SVG_ARROW_HEIGHT / 2)) - teenyAdjustment;

            this.leftGutterSvgInitialized = true;
        }

        Assert(this.arrowOffsetY !== undefined);
        Assert(this.codeRowHeight !== undefined);
        Assert(0 <= this.arrowOffsetY && this.arrowOffsetY <= this.codeRowHeight);

        // assumes that this.owner.updateLineAndExceptionInfo has already
        // been run, so line number info is up-to-date!

        // TODO: get rid of this pesky 'owner' dependency
        let myViz = this.owner;
        let isLastInstr = (myViz.curInstr === (myViz.curTrace.length - 1));
        let curEntry = myViz.curTrace[myViz.curInstr];
        let hasError = (curEntry.event === 'exception' || curEntry.event === 'uncaught_exception');
        let isTerminated = (!myViz.instrLimitReached && isLastInstr);
        let pcod = this.domRoot.find('#pyCodeOutputDiv');

        let prevVerticalNudge = myViz.prevLineIsReturn ? Math.floor(this.codeRowHeight / 3) : 0;
        let curVerticalNudge = myViz.curLineIsReturn ? Math.floor(this.codeRowHeight / 3) : 0;

        // ugly edge case for the final instruction :0
        if (isTerminated && !hasError) {
            if (myViz.prevLineNumber !== myViz.curLineNumber) {
                curVerticalNudge = curVerticalNudge - 2;
            }
        }

        // Before highlight line, back to original background-color @habibieeddien
        this.domRootD3.selectAll('#pyCodeOutputDiv td.cod').style('background-color', 'transparent');

        if (myViz.prevLineNumber) {
            this.animateGraphBasedOnLineCode(this.lineCode[myViz.prevLineNumber - 1].line[1]); // @habibieeddien
            let pla = this.domRootD3.select('#prevLineArrow');
            let translatePrevCmd = 'translate(0, ' + (((myViz.prevLineNumber - 1) * this.codeRowHeight) + this.arrowOffsetY + prevVerticalNudge) + ')';

            if (smoothTransition) {
                pla.transition()
                    .duration(200)
                    .attr('fill', 'white')
                    .each('end', function () {
                        pla.attr('transform', translatePrevCmd)
                            .attr('fill', LIGHT_ARROW_COLOR);
                        gutterSVG.find('#prevLineArrow').show(); // show at the end to avoid flickering
                    });
            } else {
                pla.attr('transform', translatePrevCmd)
                gutterSVG.find('#prevLineArrow').show();
            }

            // gray-highlight line for preveous executed @habibieeddien
            this.domRootD3.select('#v1__cod' + myViz.prevLineNumber).style('background-color', '#F0F0EA');

        } else {
            gutterSVG.find('#prevLineArrow').hide();
        }

        if (myViz.curLineNumber) {
            let cla = this.domRootD3.select('#curLineArrow');
            let translateCurCmd = 'translate(0, ' + (((myViz.curLineNumber - 1) * this.codeRowHeight) + this.arrowOffsetY + curVerticalNudge) + ')';

            if (smoothTransition) {
                cla.transition()
                    .delay(200)
                    .duration(250)
                    .attr('transform', translateCurCmd);
            } else {
                cla.attr('transform', translateCurCmd);
            }
            gutterSVG.find('#curLineArrow').show();
            //introJs().start();

            // yellow-highlight line for next execute @habibieeddien
            this.domRootD3.select('#v1__cod' + myViz.curLineNumber).style('background-color', '#FFFF66');

        } else {
            gutterSVG.find('#curLineArrow').hide();
        }

        this.domRootD3.selectAll('#pyCodeOutputDiv td.cod')
            .style('border-top', function (d) {
                if (hasError && (d.lineNumber == curEntry.line)) {
                    return '1px solid ' + ERROR_COLOR;
                } else {
                    return '';
                }
            })
            .style('border-bottom', function (d) {
                // COPY AND PASTE ALERT!
                if (hasError && (d.lineNumber == curEntry.line)) {
                    return '1px solid ' + ERROR_COLOR;
                } else {
                    return '';
                }
            });

        // returns True if lineNo is visible in pyCodeOutputDiv
        let isOutputLineVisible = (lineNo) => {
            let lineNoTd = this.domRoot.find('#lineNo' + lineNo);
            // if we can't even find this lineNo div, then punt!
            if (!lineNoTd || lineNoTd.length /* jQuery selector returns a list */ === 0) {
                return false;
            }

            let LO = lineNoTd.offset().top;
            let PO = pcod.offset().top;
            let ST = pcod.scrollTop();
            let H = pcod.height();

            // add a few pixels of fudge factor on the bottom end due to bottom scrollbar
            return (PO <= LO) && (LO < (PO + H - 30));
        }

        // smoothly scroll pyCodeOutputDiv so that the given line is at the center
        let scrollCodeOutputToLine = (lineNo) => {
            let lineNoTd = this.domRoot.find('#lineNo' + lineNo);
            // if we can't even find this lineNo div, then punt!
            if (!lineNoTd || lineNoTd.length /* jQuery selector returns a list */ === 0) {
                return false;
            }

            let LO = lineNoTd.offset().top;
            let PO = pcod.offset().top;
            let ST = pcod.scrollTop();
            let H = pcod.height();

            pcod.stop(); // first stop all previously-queued animations
            pcod.animate({ scrollTop: (ST + (LO - PO - (Math.round(H / 2)))) }, 300);
        }

        // smoothly scroll code display
        if (!isOutputLineVisible(curEntry.line)) {
            scrollCodeOutputToLine(curEntry.line);
        }
    }

    animateGraphBasedOnLineCode(code: string): void {
        /**
         * Eksperimen operasi animasi antar node & edge (start: Jumat, 12Jan18)
         * 1. cek var matrix dlu
         * 2. kemudian pointer & relasinya
         */
        let regex = new RegExp(KEY.keyname, "g");
        let searchKey = code.match(regex);
        let searchPrintf = code.match(/printf/g); // TODO: think again, why not visualize if jump to line code with 'printf' ?

        if (searchKey !== null && searchPrintf === null) {
            if (searchKey.length === 1) { // make sure only one key access
                let term = KEY.keyname + '[';
                let row = code.indexOf(term);
                let x = code[row + term.length]; // get varname for 1 char length after 'matrix['. TODO: how if var more than 1 char
                //console.log('row: ', x, '\nTERM: ', term, '\nterm.length: ', term.length);

                if (x.match(/[0-9]/g) === null) { // be sure var is not number
                    KEY.source_var = x;
                }

                term = term + x + ']['; console.log('term: ', term); // TODO: how if character in variable more than one like [node] ? not always like [i] or [j]
                let col = code.indexOf(term);
                let y = code[col + term.length];
                //console.log('col: ', y, '\nTERM: ', term, '\nterm.length: ', term.length);

                if (y.match(/[0-9]/g) === null) { // be sure var not number
                    KEY.target_var = y;
                }
            }
        }
    }

}

/**
 * ========pseudocode to animate node=========
 * key = get varname matrix (key) --ok
 * if key is exist in line_code && key only one: --ok
 *      if "printf" is NOT found in line_code: --ok
 *          search source(row) & target(col) varname; --ok
 *          search value source & target; --ok
 *          if value (source !== target): --ok
 *              if hasRender (source & target): --ok
 *                  select node source & animate; --ok
 *                  select edge & animate; --> ?? // TODO: bgmn tau line yg sdg dipilih antr node src & trg ?
 *                  select node target & animate; --ok
 * 
 * ---TODO: if var have more one char---
 * search key
 * regex = search regex 'key'+'['
 * res = search char after regex
 * while (r !== ']'):
 *      r = search char ']'
 *      res = res + r;
 *  
 * return ['varname']
 */