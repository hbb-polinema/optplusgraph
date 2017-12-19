import { Assert } from './utilities/debugger';
import { OptFrontendWithTestCases } from './implements/OptFrontendWithTestCases';
import { TogetherJS } from './implements/OptFrontendSharedSessions';
import {
    exampleHeaderHtml, javaExamplesHtml,
    jsExamplesHtml, tsExamplesHtml,
    rubyExamplesHtml, cExamplesHtml,
    cppExamplesHtml, pythonExamplesHtml,
    JS_EXAMPLES, TS_EXAMPLES, JAVA_EXAMPLES, RUBY_EXAMPLES,
    C_EXAMPLES, CPP_EXAMPLES, PY2_EXAMPLES, PY3_EXAMPLES
} from '../example-links';
import { myFooterHTML } from '../footer-html';

$(document).ready(function () {
    // initialize all HTML elements before creating optFrontend object
    //$("#exampleSnippets").append(exampleHeaderHtml);

    let params = {};
    let optOverride = (window as any).optOverride;
    // super hacky!
    if (optOverride) {
        (params as any).disableLocalStorageToggles = true;

        if (optOverride.frontendLang === 'java') {
            $("#exampleSnippets").append(javaExamplesHtml);
        } else if (optOverride.frontendLang === 'js') {
            $("#exampleSnippets").append(jsExamplesHtml);
        } else if (optOverride.frontendLang === 'ts') {
            $("#exampleSnippets").append(tsExamplesHtml);
        } else if (optOverride.frontendLang === 'ruby') {
            $("#exampleSnippets").append(rubyExamplesHtml);
        } else if (optOverride.frontendLang === 'c') {
            $("#exampleSnippets").append(cExamplesHtml);
        } else if (optOverride.frontendLang === 'cpp') {
            $("#exampleSnippets").append(cppExamplesHtml);
        } else if (optOverride.frontendLang === 'c-cpp') { // add by habibieeddien for support c and cpp
            $("#exampleSnippets").append(cExamplesHtml);
            $("#exampleSnippets").append(cppExamplesHtml);
        }
    } else {
        $("#exampleSnippets")
            .append(pythonExamplesHtml)
            .append(javaExamplesHtml)
            .append(jsExamplesHtml)
            .append(tsExamplesHtml)
            .append(rubyExamplesHtml)
            .append(cExamplesHtml)
            .append(cppExamplesHtml);
    }

    $("#footer").append(myFooterHTML);

    let optFrontend = new OptFrontendWithTestCases(params); // MAIN EVENT from here!
    optFrontend.setSurveyHTML();
    (window as any).optFrontend = optFrontend; // purposely leak to globals to ease debugging!!!

    // canned examples
    $(".exampleLink").click(function () {
        let myId = $(this).attr('id');
        let exFile;
        let lang;
        if (JS_EXAMPLES[myId] !== undefined) {
            exFile = JS_EXAMPLES[myId];
            lang = 'js';
        } else if (TS_EXAMPLES[myId] !== undefined) {
            exFile = TS_EXAMPLES[myId];
            lang = 'ts';
        } else if (JAVA_EXAMPLES[myId] !== undefined) {
            exFile = JAVA_EXAMPLES[myId];
            lang = 'java';
        } else if (RUBY_EXAMPLES[myId] !== undefined) {
            exFile = RUBY_EXAMPLES[myId];
            lang = 'ruby';
        } else if (C_EXAMPLES[myId] !== undefined) {
            exFile = C_EXAMPLES[myId];
            lang = 'c';
        } else if (CPP_EXAMPLES[myId] !== undefined) {
            exFile = CPP_EXAMPLES[myId];
            lang = 'cpp';
        } else if (PY2_EXAMPLES[myId] !== undefined) {
            exFile = PY2_EXAMPLES[myId];
            if ($('#pythonVersionSelector').val() === '3') {
                lang = '3';
            } else {
                lang = '2';
            }
        } else {
            exFile = PY3_EXAMPLES[myId];
            Assert(exFile !== undefined);
            lang = '3';
        }
        Assert(lang);
        $('#pythonVersionSelector').val(lang);

        if (lang === '2' || lang === '3') {
            exFile = 'example-code/python/' + exFile;
        } else {
            exFile = 'example-code/' + lang + '/' + exFile;
        }

        $.get(exFile, function (dat) {
            optFrontend.pyInputSetValue(dat);
            optFrontend.setAceMode();

            /*  very subtle! for TogetherJS to sync #pythonVersionSelector
                properly, we must manually send a sync request event: */
            if (TogetherJS && TogetherJS.running) {
                let myVisualizer = optFrontend.myVisualizer;
                TogetherJS.send({
                    type: "syncAppState",
                    myAppState: optFrontend.getAppState(),
                    codeInputScrollTop: optFrontend.pyInputGetScrollTop(),
                    pyCodeOutputDivScrollTop: myVisualizer ?
                        myVisualizer.domRoot.find('#pyCodeOutputDiv').scrollTop() :
                        undefined
                });
            }
        }, 'text' /* data type - set to text or else jQuery tries to EXECUTE the JS example code */);
        return false; // prevent an HTML 'a' element click from going to a link
    });
    $('#pythonVersionSelector').change(optFrontend.setAceMode.bind(optFrontend));
    optFrontend.setAceMode();

    /* if (typeof initCodeopticon !== "undefined") {
        initCodeopticon(); // defined in codeopticon-learner.js
    } */

    //$("#liveModeBtn").click(optFrontend.openLiveModeUrl.bind(optFrontend)); --> useless for c/c++ (habibieeddien)
    
    // by habibieeddien
    $("#genUrlBtn").click(function () {
        $("#genLink").slideToggle(750);
    });
    $("#btnInfo").click(function () {
        $("#info").slideToggle(750);
    });
});