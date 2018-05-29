import { testCasesPaneHTML } from '../view/html';

export class OptTestCases implements IOptTestCases {
    parent: any; // type: OptFrontendWithTestcases
    curTestcaseId: number = 1;

    constructor(parent) {
        this.parent = parent;
        $("#testCasesParent")
            .empty() // just to be paranoid, empty this out (and its event handlers, too, supposedly)
            .html('<p style="margin-top: 25px;"><a href="#" id="createTestsLink">Create test cases</a></p><div id="testCasesPane"></div>');

        $("#testCasesParent #createTestsLink").click(() => {
            this.initTestcasesPane();
            $("#testCasesParent #createTestsLink").hide();
            return false;
        });
    }

    initTestcasesPane(): any {
        let _me = this;
        $("#testCasesParent #testCasesPane")
            .empty() // just to be paranoid, empty this out (and its event handlers, too, supposedly)
            .html(testCasesPaneHTML);

        $("#addNewTestCase").click(function () {
            _me.addTestcase(null);
            return false; // to prevent link from being followed
        });

        $("#runAllTestsButton").click(function () {
            $(".runTestCase").click();
        });
    }

    loadTestCases(list: string[]): void {
        this.initTestcasesPane();
        $("#testCasesParent #createTestsLink").hide();
        list.forEach((e) => {
            this.addTestcase(e);
        });
    }

    addTestcase(initialCod: any): void {
        let _me = this;
        let id = this.curTestcaseId;
        this.curTestcaseId++;
        let newTr = $('<tr/>').attr('id', 'testCaseRow_' + id);
        $("#testCasesParent #testCasesTable tbody").append(newTr);
        let editorTd = $('<td/>');
        let runBtnTd = $('<td/>');
        let outputTd = $('<td/>');
        let visualizeTd = $('<td/>');
        let deleteTd = $('<td/>');

        editorTd.append('<div id="testCaseEditor_' + id + '" class="testCaseEditor">');
        runBtnTd.append('<button id="runTestCase_' + id + '" class="runTestCase" type="button">Run</button>');
        outputTd.attr('id', 'outputTd_' + id);
        outputTd.attr('class', 'outputTd');
        visualizeTd.append('<button id="vizTestCase_' + id + '" class="vizTestCase" type="button">Visualize</button>');
        deleteTd.append('<a id="delTestCase_' + id + '" href="javascript:void(0);">Delete test</a></td>');

        newTr.append(editorTd);
        newTr.append(runBtnTd);
        newTr.append(outputTd);
        newTr.append(visualizeTd);
        newTr.append(deleteTd);

        // initialize testCaseEditor with Ace:
        let te = ace.edit('testCaseEditor_' + id);
        // set the size and value ASAP to get alignment working well ...
        te.setOptions({ minLines: 2, maxLines: 4 }); // keep this SMALL
        te.setHighlightActiveLine(false);
        te.setShowPrintMargin(false);
        te.setBehavioursEnabled(false);
        te.setFontSize('11px');
        te.$blockScrolling = Infinity; // kludgy to shut up weird warnings

        let s = te.getSession();
        s.setTabSize(2);
        s.setUseSoftTabs(true);
        // disable extraneous indicators:
        s.setFoldStyle('manual'); // no code folding indicators
        // don't do real-time syntax checks: https://github.com/ajaxorg/ace/wiki/Syntax-validation
        s.setOption("useWorker", false);
        s.on("change", (e) => {
            $('#outputTd_' + id).empty(); // remove all test output indicators
        });

        // TODO: change syntax highlighting mode if the user changes languages:
        let lang = $('#pythonVersionSelector').val();
        let mod = 'python';
        let defaultVal = '\n# assert <test condition>';
        if (lang === 'java') {
            mod = 'java';
            defaultVal = '// sorry, Java tests not yet supported';
        } else if (lang === 'c' || lang === 'cpp') {
            mod = 'c_cpp';
            defaultVal = '// sorry, C/C++ tests not yet supported';
        } else if (lang === 'js') {
            mod = 'javascript';
            defaultVal = '\n// console.assert(<test condition>);';
        } else if (lang === 'ts') {
            mod = 'typescript';
            defaultVal = '\n// console.assert(<test condition>);';
        } else if (lang === 'ruby') {
            mod = 'ruby';
            defaultVal = "\n# raise 'fail' unless <test condition>";
        }

        s.setMode("ace/mode/" + mod);
        te.setValue(initialCod ? initialCod.rtrim() : defaultVal, -1 /* do NOT select after setting text */);
        te.focus();

        function runOrVizTestCase(isViz /* true for visualize, false for run */) {
            $("#runAllTestsButton,.runTestCase,.vizTestCase").attr('disabled', true);
            let e = ace.edit('testCaseEditor_' + id);
            e.getSession().clearAnnotations();
            $('#outputTd_' + id).html('');

            let dat = _me.getCombinedCode(id);
            let cod = dat.cod;

            if (isViz) {
                $('#vizTestCase_' + id).html("Visualizing ...");
                _me.parent.vizTestCase(id, cod, dat.firstTestLine);
            } else {
                $('#runTestCase_' + id).html("Running ...");
                _me.parent.runTestCase(id, cod, dat.firstTestLine);
            }
        }

        $('#runTestCase_' + id).click(runOrVizTestCase.bind(this, false));
        $('#vizTestCase_' + id).click(runOrVizTestCase.bind(this, true));
        $('#delTestCase_' + id).click(function () {
            $('#testCaseRow_' + id).remove();
            return false; // to prevent link from being followed
        });
    }

    doneRunningTest(): void {
        $("#runAllTestsButton,.runTestCase,.vizTestCase").attr('disabled', false);
        $(".runTestCase").html('Run');
        $(".vizTestCase").html('Visualize');
    }

    getCombinedCode(id: number): any {
        let userCod = this.parent.pyInputGetValue();
        let testCod = ace.edit('testCaseEditor_' + id).getValue();
        // for reporting syntax errors separately for user and test code
        let userCodNumLines = userCod.split('\n').length;

        let lang = $('#pythonVersionSelector').val();
        let bufferCod;
        if (lang === 'ts' || lang === 'js' || lang === 'java' || lang === 'c' || lang === 'cpp') {
            bufferCod = '\n\n// Test code //\n';
        } else {
            bufferCod = '\n\n## Test code ##\n';
        }

        let bufferCodNumLines = bufferCod.split('\n').length;
        let combinedCod = userCod + bufferCod + testCod;

        return {
            cod: combinedCod,
            firstTestLine: userCodNumLines + bufferCodNumLines - 1
        };
    }

    appStateAugmenter(appState: any) {
        // returns a list of strings, each of which is a test case
        function getAllTestcases() {
            return $.map($("#testCasesParent #testCasesTable .testCaseEditor"),
                (e) => {
                    let editor = ace.edit($(e).attr('id'));
                    return editor.getValue();
                });
        }

        let tc = getAllTestcases();
        if (tc.length > 0) {
            appState['testCasesJSON'] = JSON.stringify(tc);
        }
    }
}