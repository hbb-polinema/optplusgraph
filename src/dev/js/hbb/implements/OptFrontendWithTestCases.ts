require('../../lib/jquery-3.0.0.min.js');
require('../../lib/jquery.qtip.js');
require('../../../css/jquery.qtip.css');

import { OptFrontendSharedSessions } from './OptFrontendSharedSessions';
import { OptTestCases } from './OptTestCases';
import { HTMLspecialChars, SyntaxErrorSurveyBubble } from '../utilities/functions';
import { redSadFace, yellowHappyFace, eureka_survey, eureka_prompt, eureka_survey_version } from '../view/html';

export class OptFrontendWithTestCases extends OptFrontendSharedSessions implements IOptFrontendWithTestCases {
    optTests: OptTestCases;
    activateSyntaxErrorSurvey: boolean = true;
    activateRuntimeErrorSurvey: boolean = true;
    prevExecutionExceptionObjLst = []; // previous consecutive executions with "compile"-time exceptions
    prevExecutionRuntimeErrorMsg: string = null; // did the previous execution have a run-time error? if so, what was the error message?
    prevExecutionRuntimeErrorLine: number = null; // line number of previous run-time error (if any)
    prevExecutionRuntimeErrorCode: string = null; // full code involved in previous run-time error (if any)

    constructor(params = {}) {
        super(params);
        this.optTests = new OptTestCases(this);

        var queryStrOptions = this.getQueryStringOptions();
        if (queryStrOptions.testCasesLst) {
            this.optTests.loadTestCases(queryStrOptions.testCasesLst);
        }
        // TRICKY: call superclass's parseQueryString ONLY AFTER initializing optTests
        super.parseQueryString();
    }

    parseQueryString(): void {
        /*  TRICKY: if optTests isn't initialized yet, this means we're calling this
            from the constructor, so do a NOP and then manually parse the query
            string at the end of the constructor ONLY AFTER initializing optTests.
            otherwise delegate to super.parseQueryString() */
        if (this.optTests) {
            super.parseQueryString();
        }
    }

    appStateAugmenter(appState: any): void {
        this.optTests.appStateAugmenter(appState);
    }

    runTestCase(id: any, codeToExec: any, firstTestLine: any): void {
        let backendOptionsObj = this.getBaseBackendOptionsObj();
        let frontendOptionsObj = this.getBaseFrontendOptionsObj();

        (backendOptionsObj as any).run_test_case = true; // just so we can see this in server logs

        let runTestCaseCallback = (dat) => {
            let trace = dat.trace;

            if (trace.length == 1 && trace[0].event === 'uncaught_exception') {
                // e.g., syntax errors / compile errors
                let errorLineNo = trace[0].line;
                if (errorLineNo) {
                    // highlight the faulting line in the test case pane itself
                    if (errorLineNo !== undefined &&
                        errorLineNo != NaN &&
                        errorLineNo >= firstTestLine) {
                        let adjustedErrorLineNo = errorLineNo - firstTestLine;

                        let te = ace.edit('testCaseEditor_' + id);
                        let s = te.getSession();

                        s.setAnnotations([{
                            row: adjustedErrorLineNo,
                            column: null, // for TS typechecking
                            type: 'error',
                            text: trace[0].exception_msg
                        }]);
                        te.gotoLine(adjustedErrorLineNo + 1); // one-indexed
                    }
                }

                let msg = trace[0].exception_msg;
                let trimmedMsg = msg.split(':')[0];
                $('#outputTd_' + id).html(HTMLspecialChars(trimmedMsg));
            } else {
                /*  scan through the trace to find any exception events. report
                    the first one if found, otherwise assume test is 'passed' */
                let exceptionMsg = null;
                trace.forEach((e) => {
                    if (exceptionMsg) {
                        return;
                    }

                    if (e.event === 'exception') {
                        exceptionMsg = e.exception_msg;
                    }
                });

                if (exceptionMsg) {
                    $('#outputTd_' + id).html('<img src="' + redSadFace + '"></img>');
                } else {
                    $('#outputTd_' + id).html('<img src="' + yellowHappyFace + '"></img>');
                }
            }

            this.optTests.doneRunningTest();
        };

        this.executeCodeAndRunCallback(codeToExec, $('#pythonVersionSelector').val(), backendOptionsObj, frontendOptionsObj, runTestCaseCallback.bind(this));
    }

    /*  TODO: properly handle and display errors when there's a syntax error
        right now it displays as a syntax error in the main pane, which can be confusing */
    vizTestCase(id: any, codeToExec: any, firstTestLine: any): void {
        let backendOptionsObj = this.getBaseBackendOptionsObj();
        let frontendOptionsObj = this.getBaseFrontendOptionsObj();

        (backendOptionsObj as any).viz_test_case = true; // just so we can see this in server logs
        this.activateSyntaxErrorSurvey = false; // to avoid confusion with failed tests
        this.activateRuntimeErrorSurvey = false; // to avoid confusion with failed tests
        (frontendOptionsObj as any).jumpToEnd = true;

        this.executeCodeAndCreateViz(codeToExec, $('#pythonVersionSelector').val(), backendOptionsObj, frontendOptionsObj, 'pyOutputPane');
        this.optTests.doneRunningTest(); // this will run before the callback in executeCodeAndCreateViz
    }

    handleUncaughtException(trace: any): void {
        super.handleUncaughtException(trace); // do this first

        let killerException = null;
        if (trace.length == 1) {
            killerException = trace[0];
        } else if (trace.length > 0 && trace[trace.length - 1].exception_msg) {
            killerException = trace[trace.length - 1];
        }

        if (killerException) { // "compile"-time error
            let excObj = { killerException: killerException, myAppState: this.getAppState() };
            this.prevExecutionExceptionObjLst.push(excObj);
            this.prevExecutionRuntimeErrorMsg = null; // no run-time error since we had a compile-time error
            this.prevExecutionRuntimeErrorLine = null;
            this.prevExecutionRuntimeErrorCode = null;
        }
    }

    finishSuccessfulExecution(): void {
        super.finishSuccessfulExecution(); // do this first
        
        if (this.activateSyntaxErrorSurvey) {
            this.experimentalPopUpSyntaxErrorSurvey();
        }
        this.prevExecutionExceptionObjLst = []; // reset this since there was no compile-time error

        if (this.activateRuntimeErrorSurvey) {
            this.popUpRuntimeErrorSurvey();
        }
        this.prevExecutionRuntimeErrorMsg = null; // clear this now and populate it in updateOutputCallbackFunc
        this.prevExecutionRuntimeErrorLine = null;
        this.prevExecutionRuntimeErrorCode = null;

        // put eureka_survey below #codAndNav so that it's highly visible: ### @habibieeddien: disable for custom my thesis
       /* this.myVisualizer.domRoot.find('#codAndNav').append(eureka_survey);
        this.myVisualizer.domRoot.find('#codAndNav #eureka_survey').css('margin-top', '30px'); // leave some extra space
        let that = this;
        $('.surveyBtnBig').click(function (e) {
            let myArgs = that.getAppState();
            let buttonPrompt = $(this).html();
            let res = prompt(eureka_prompt);
            /*  don't do ajax call when Cancel button is pressed (note that if OK button is pressed with no response,
                then an empty string will still be sent to the server) */
          /*  if (res !== null) {
                (myArgs as any).surveyVersion = eureka_survey_version;
                (myArgs as any).surveyQuestion = buttonPrompt;
                (myArgs as any).surveyResponse = res;
                (myArgs as any).opt_uuid = that.userUUID;
                (myArgs as any).session_uuid = that.sessionUUID;
                $.get('eureka_survey.py', myArgs, function (dat) { });
            }
        });*/
    }

    /*  called whenever myVisualizer.updateOutput() is called to update the visualization;
        set prevExecutionRuntimeErrorMsg / line / code if the user has stepped to a trace
        entry that contains an error message. the rationale for doing this is that we want 
        to display only errors that the user has stepped to and seen with their own eyes so 
        that they can hopefully know what the error message is referring to ... */
    updateOutputCallbackFunc(): void {
        super.updateOutputCallbackFunc();
        
        if (this.myVisualizer) {
            let curEntry = this.myVisualizer.curTrace[this.myVisualizer.curInstr];
            if (curEntry.event === "exception") {
                this.prevExecutionRuntimeErrorMsg = curEntry.exception_msg;
                this.prevExecutionRuntimeErrorLine = curEntry.line;
                this.prevExecutionRuntimeErrorCode = this.myVisualizer.curInputCode;
            }
        }
    }

    experimentalPopUpSyntaxErrorSurvey(): void {
        if (this.prevExecutionExceptionObjLst.length > 0) {
            // work with the most recent entry
            let prevExecutionExceptionObj = this.prevExecutionExceptionObjLst[this.prevExecutionExceptionObjLst.length - 1];
            let offendingLine = prevExecutionExceptionObj.killerException.line;

            if (offendingLine === undefined) {
                return; // get out early!
            }

            /*  if we've switched languages between the previous error and this run, then DON'T pop up a survey since
                the point is moot anyhow; there's no point in asking the question when the language has changed */
            let curState = this.getAppState();
            if (prevExecutionExceptionObj.myAppState.py != curState.py) {
                return;
            }

            let bub = new SyntaxErrorSurveyBubble(this.myVisualizer, 'pyCodeOutputDiv');

            // destroy then create a new tip:
            bub.destroyQTip();
            $(bub.hashID).qtip({
                show: {
                    ready: true, // show on document.ready instead of on mouseenter
                    delay: 0,
                    event: null,
                    effect: function () { $(this).show(); }, // don't do any fancy fading because it screws up with scrolling
                },
                hide: {
                    fixed: true,
                    event: null,
                    effect: function () { $(this).hide(); }, // don't do any fancy fading because it screws up with scrolling
                },

                content: ' ', // can't be empty!
                id: bub.domID,
                position: {
                    my: bub.my,
                    at: bub.at,
                    adjust: {x: 10},
                },
                style: {
                    classes: 'qtip-light',
                }
            });
            let version = 'v5'; // deployed on 2017-05-20
            /*  directly ask about what they thought caused the error instead of having them (indirectly)
                suggest a better error message. this now matches the wording of runtime_err_survey v2. */
            let surveyBubbleHTML = `<div id="syntaxErrBubbleContents">
                                <div id="syntaxErrHeader">You just fixed the following error:</div>
                                <div id="syntaxErrCodeDisplay"></div>
                                <div id="syntaxErrMsg"></div>
                                <div id="syntaxErrQuestion">
                                  Please help us improve this tool with your feedback.<br/>
                                  What misunderstanding do you think caused this error?<br/>
                                   <input type="text" id="syntaxErrTxtInput" size=58 maxlength=150/><br/>
                                   <button id="syntaxErrSubmitBtn" type="button">Submit</button>
                                   <button id="syntaxErrCloseBtn" type="button">Close</button>
                                   <a href="#" id="syntaxErrHideAllLink">Hide all of these pop-ups</a>
                                </div>
                              </div>`;

            $(bub.qTipContentID()).html(surveyBubbleHTML);

            $(bub.qTipContentID() + ' #syntaxErrSubmitBtn').click(() => {
                let res = $(bub.qTipContentID() + ' #syntaxErrTxtInput').val();
                let resObj = {
                    appState: this.getAppState(),
                    exc: prevExecutionExceptionObj,
                    opt_uuid: this.userUUID,
                    session_uuid: this.sessionUUID,
                    reply: res,
                    type: 'submit',
                    v: version
                };
                $.get('syntax_err_survey.py', { arg: JSON.stringify(resObj) }, function (dat) { });
                bub.destroyQTip();
            });

            $(bub.qTipContentID() + ' #syntaxErrCloseBtn').click(() => {
                // grab the value anyways in case the learner wrote something decent ...
                let res = $(bub.qTipContentID() + ' #syntaxErrTxtInput').val();
                let resObj = {
                    appState: this.getAppState(),
                    exc: prevExecutionExceptionObj,
                    opt_uuid: this.userUUID,
                    session_uuid: this.sessionUUID,
                    reply: res,
                    type: 'close',
                    v: version
                };
                $.get('syntax_err_survey.py', { arg: JSON.stringify(resObj) }, function (dat) { });
                bub.destroyQTip();
            });

            $(bub.qTipContentID() + ' #syntaxErrHideAllLink').click(() => {
                // grab the value anyways in case the learner wrote something decent ...
                let res = $(bub.qTipContentID() + ' #syntaxErrTxtInput').val();
                let resObj = {
                    appState: this.getAppState(),
                    exc: prevExecutionExceptionObj,
                    opt_uuid: this.userUUID,
                    session_uuid: this.sessionUUID,
                    reply: res,
                    type: 'killall',
                    v: version
                };
                $.get('syntax_err_survey.py', { arg: JSON.stringify(resObj) }, function (dat) { });
                this.activateSyntaxErrorSurvey = false;
                bub.destroyQTip();
                return false; // otherwise the 'a href' will trigger a page reload
            });

            let bubbleAceEditor = ace.edit('syntaxErrCodeDisplay');
            bubbleAceEditor.$blockScrolling = Infinity; // kludgy to shut up weird warnings
            bubbleAceEditor.setOptions({ minLines: 1, maxLines: 5 }); // keep this SMALL
            bubbleAceEditor.setValue(prevExecutionExceptionObj.myAppState.code.trim(), -1);

            let s = bubbleAceEditor.getSession();
            s.setTabSize(4); // tab -> 4 spaces
            s.setUseSoftTabs(true);
            // disable extraneous indicators:
            s.setFoldStyle('manual'); // no code folding indicators
            s.getDocument().setNewLineMode('unix'); // canonicalize all newlines to unix format
            bubbleAceEditor.setHighlightActiveLine(false);
            bubbleAceEditor.setShowPrintMargin(false);
            bubbleAceEditor.setBehavioursEnabled(false);
            bubbleAceEditor.setFontSize('10px');
            $('#syntaxErrCodeDisplay').css('width', '350px');
            $('#syntaxErrCodeDisplay').css('height', '90px'); // VERY IMPORTANT so that it works on I.E.

            // don't do real-time syntax checks: https://github.com/ajaxorg/ace/wiki/Syntax-validation
            s.setOption("useWorker", false);

            let lang = prevExecutionExceptionObj.myAppState.py;
            let mod = 'python';
            if (lang === 'java') {
                mod = 'java';
            } else if (lang === 'js') {
                mod = 'javascript';
            } else if (lang === 'ts') {
                mod = 'typescript';
            } else if (lang === 'ruby') {
                mod = 'ruby';
            } else if (lang === 'c' || lang === 'cpp') {
                mod = 'c_cpp';
            }
            s.setMode("ace/mode/" + mod);
            bubbleAceEditor.setReadOnly(true);
            s.setAnnotations([{
                row: offendingLine - 1,
                column: null,
                type: 'error',
                text: prevExecutionExceptionObj.killerException.exception_msg
            }]);

            bub.redrawCodelineBubble(); // do an initial redraw to align everything
            (bubbleAceEditor as any).scrollToLine(offendingLine - 1, true);

            // don't forget HTMLspecialChars
            $("#syntaxErrMsg").html(HTMLspecialChars(prevExecutionExceptionObj.killerException.exception_msg));

            // unbind scroll handler first, then bind new one
            this.myVisualizer.domRoot.find('#pyCodeOutputDiv')
                .unbind('scroll')
                .scroll(function () {
                    bub.redrawCodelineBubble();
                });

            /* log an event whenever this bubble is show (i.e., an 'impression') NB: it might actually be hidden
                if it appears on a line that isn't initially visible to the user, but whatevers ... */
            let impressionObj = {
                appState: this.getAppState(),
                exceptionLst: this.prevExecutionExceptionObjLst,
                opt_uuid: this.userUUID,
                session_uuid: this.sessionUUID,
                type: 'show',
                v: version
            };
            $.get('syntax_err_survey.py', { arg: JSON.stringify(impressionObj) }, function (dat) { });
        }
    }

    popUpRuntimeErrorSurvey(): void {
        let noErrorsInCurTrace = true;
        /*  scan through the entire trace to make sure there are no errors; if there are any errors,
            then we haven't really definitively "fixed" all of the run-time errors yet, so don't display a pop-up message */
        for (let i = 0; i < this.myVisualizer.curTrace.length; i++) {
            if (this.myVisualizer.curTrace[i].event === "exception") {
                noErrorsInCurTrace = false;
                break;
            }
        }

        if (this.prevExecutionRuntimeErrorMsg && noErrorsInCurTrace) {
            let savedPrevExecutionRuntimeErrorMsg = this.prevExecutionRuntimeErrorMsg; // save it now!
            let savedPrevExecutionRuntimeErrorLine = this.prevExecutionRuntimeErrorLine;
            let savedPrevExecutionRuntimeErrorCode = this.prevExecutionRuntimeErrorCode;

            let bub = new SyntaxErrorSurveyBubble(this.myVisualizer, 'pyCodeOutputDiv');

            // destroy then create a new tip:
            bub.destroyQTip();
            $(bub.hashID).qtip({
                show: {
                    ready: true, // show on document.ready instead of on mouseenter
                    delay: 0,
                    event: null,
                    effect: function () { $(this).show(); }, // don't do any fancy fading because it screws up with scrolling
                },
                hide: {
                    fixed: true,
                    event: null,
                    effect: function () { $(this).hide(); }, // don't do any fancy fading because it screws up with scrolling
                },

                content: ' ', // can't be empty!
                id: bub.domID,
                position: {
                    my: bub.my,
                    at: bub.at,
                    adjust: { x: 10 }
                },
                style: {
                    classes: 'qtip-light',
                }
            });

            let version = 'v2'; // deployed on 2017-05-20
            // v2 wording: "Please help us improve this tool with your feedback.\nWhat misunderstanding do you think caused this error?"

            let surveyBubbleHTML = `<div id="syntaxErrBubbleContents">
                                <div id="syntaxErrHeader">You just fixed this error from the last time your code ran:</div>
                                <div id="syntaxErrCodeDisplay"></div>
                                <div id="syntaxErrMsg"></div>
                                <div id="syntaxErrQuestion">
                                  Please help us improve this tool with your feedback.<br/>
                                  What misunderstanding do you think caused this error?<br/>
                                   <input type="text" id="syntaxErrTxtInput" size=58 maxlength=150/><br/>
                                   <button id="syntaxErrSubmitBtn" type="button">Submit</button>
                                   <button id="syntaxErrCloseBtn" type="button">Close</button>
                                   <a href="#" id="syntaxErrHideAllLink">Hide all of these pop-ups</a>
                                </div>
                              </div>`;

            $(bub.qTipContentID()).html(surveyBubbleHTML);

            $(bub.qTipContentID() + ' #syntaxErrSubmitBtn').click(() => {
                let res = $(bub.qTipContentID() + ' #syntaxErrTxtInput').val();
                let resObj = {
                    appState: this.getAppState(),
                    err_msg: savedPrevExecutionRuntimeErrorMsg,
                    err_line: savedPrevExecutionRuntimeErrorLine,
                    err_code: savedPrevExecutionRuntimeErrorCode,
                    opt_uuid: this.userUUID,
                    session_uuid: this.sessionUUID,
                    reply: res,
                    type: 'submit',
                    v: version
                };
                $.get('runtime_err_survey.py', { arg: JSON.stringify(resObj) }, function (dat) { });
                bub.destroyQTip();
            });

            $(bub.qTipContentID() + ' #syntaxErrCloseBtn').click(() => {
                // grab the value anyways in case the learner wrote something decent ...
                let res = $(bub.qTipContentID() + ' #syntaxErrTxtInput').val();
                let resObj = {
                    appState: this.getAppState(),
                    err_msg: savedPrevExecutionRuntimeErrorMsg,
                    err_line: savedPrevExecutionRuntimeErrorLine,
                    err_code: savedPrevExecutionRuntimeErrorCode,
                    opt_uuid: this.userUUID,
                    session_uuid: this.sessionUUID,
                    reply: res,
                    type: 'close',
                    v: version
                };
                $.get('runtime_err_survey.py', { arg: JSON.stringify(resObj) }, function (dat) { });

                bub.destroyQTip();
            });

            $(bub.qTipContentID() + ' #syntaxErrHideAllLink').click(() => {
                // grab the value anyways in case the learner wrote something decent ...
                let res = $(bub.qTipContentID() + ' #syntaxErrTxtInput').val();
                let resObj = {
                    appState: this.getAppState(),
                    err_msg: savedPrevExecutionRuntimeErrorMsg,
                    err_line: savedPrevExecutionRuntimeErrorLine,
                    err_code: savedPrevExecutionRuntimeErrorCode,
                    opt_uuid: this.userUUID,
                    session_uuid: this.sessionUUID,
                    reply: res,
                    type: 'killall',
                    v: version
                };
                $.get('runtime_err_survey.py', { arg: JSON.stringify(resObj) }, function (dat) { });
                this.activateRuntimeErrorSurvey = false;
                bub.destroyQTip();
                return false; // otherwise the 'a href' will trigger a page reload
            });

            let bubbleAceEditor = ace.edit('syntaxErrCodeDisplay');
            bubbleAceEditor.$blockScrolling = Infinity; // kludgy to shut up weird warnings
            bubbleAceEditor.setOptions({ minLines: 1, maxLines: 5 }); // keep this SMALL
            bubbleAceEditor.setValue(savedPrevExecutionRuntimeErrorCode, -1);

            let s = bubbleAceEditor.getSession();
            s.setTabSize(4); // tab -> 4 spaces
            s.setUseSoftTabs(true);
            // disable extraneous indicators:
            s.setFoldStyle('manual'); // no code folding indicators
            s.getDocument().setNewLineMode('unix'); // canonicalize all newlines to unix format
            bubbleAceEditor.setHighlightActiveLine(false);
            bubbleAceEditor.setShowPrintMargin(false);
            bubbleAceEditor.setBehavioursEnabled(false);
            bubbleAceEditor.setFontSize('10px');
            $('#syntaxErrCodeDisplay').css('width', '350px');
            $('#syntaxErrCodeDisplay').css('height', '90px'); // VERY IMPORTANT so that it works on I.E.

            // don't do real-time syntax checks: https://github.com/ajaxorg/ace/wiki/Syntax-validation
            s.setOption("useWorker", false);
            bubbleAceEditor.setReadOnly(true);
            s.setAnnotations([{
                row: savedPrevExecutionRuntimeErrorLine - 1,
                column: null,
                type: 'error',
                text: savedPrevExecutionRuntimeErrorMsg
            }]);
            bub.redrawCodelineBubble(); // do an initial redraw to align everything
            (bubbleAceEditor as any).scrollToLine(savedPrevExecutionRuntimeErrorLine - 1, true);
            $("#syntaxErrMsg").html(HTMLspecialChars(savedPrevExecutionRuntimeErrorMsg)); // don't forget HTMLspecialChars

            // unbind scroll handler first, then bind new one
            this.myVisualizer.domRoot.find('#pyCodeOutputDiv')
                .unbind('scroll')
                .scroll(function () {
                    bub.redrawCodelineBubble();
                });

            /*  log an event whenever this bubble is show (i.e., an 'impression') NB: it might actually be hidden
                if it appears on a line that isn't initially visible to the user, but whatevers ... */
            let impressionObj = {
                appState: this.getAppState(),
                err_msg: savedPrevExecutionRuntimeErrorMsg,
                err_line: savedPrevExecutionRuntimeErrorLine,
                err_code: savedPrevExecutionRuntimeErrorCode,
                opt_uuid: this.userUUID,
                session_uuid: this.sessionUUID,
                type: 'show',
                v: version
            };
            $.get('runtime_err_survey.py', { arg: JSON.stringify(impressionObj) }, function (dat) { });
        }
    }
}