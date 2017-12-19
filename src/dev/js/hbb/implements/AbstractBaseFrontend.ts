/// <reference path="../../_references.ts" />

import { Assert } from '../utilities/debugger';
import { ExecutionVisualizer } from './ExecutionVisualizer';
import { generateUUID, supports_HTML5_storage, HTMLspecialChars } from '../utilities/functions';

require('../../lib/diff_match_patch.js');
require('../../lib/jquery.ba-dotimeout.min.js');

declare var diff_match_patch: any;

export abstract class AbstractBaseFrontend implements IAbstractBaseFrontend {
    sessionUUID: string = generateUUID(); // remains constant throughout one page load ("session")
    userUUID: string; // remains constant for a particular "user" throughout multiple page loads (stored in localStorage on a particular browser)

    myVisualizer: ExecutionVisualizer;
    originFrontendJsFile: string; // "abstract" -- must override in subclass

    // 'edit' or 'display'. also support 'visualize' for backward
    // compatibility (same as 'display')
    appMode: string = 'edit';

    // inputted by user for raw_input / mouse_input events
    rawInputLst: string[] = [];

    isExecutingCode: boolean = false;

    // optional: not all frontends keep track of deltas
    dmp = new diff_match_patch();
    curCode = ''; // for dmp snapshots, kinda kludgy
    deltaObj: { start: string, deltas: any[], v: number, startTime: number, executeTime?: number } = undefined;

    num414Tries = 0;

    // note that we use '2' and '3' instead of 'py2' and 'py3' due to legacy reasons
    langSettingToBackendScript = {
        /*  backend scripts to execute (Python 2 and 3 variants, if available)
            make two copies of ../web_exec.py and give them the following names,
            then change the first line (starting with #!) to the proper version
            of the Python interpreter (i.e., Python 2 or Python 3).
            Note that your hosting provider might have stringent rules for what
            kind of scripts are allowed to execute. For instance, my provider
            (Webfaction) seems to let scripts execute only if permissions are
            something like:
            -rwxr-xr-x 1 pgbovine pgbovine 2.5K Jul  5 22:46 web_exec_py2.py*
            (most notably, only the owner of the file should have write
            permissions) */
        '2': 'web_exec_py2.py',
        '3': 'web_exec_py3.py',
        // empty dummy scripts just to do logging on Apache server
        'js': 'web_exec_js.py',
        'ts': 'web_exec_ts.py',
        'java': 'web_exec_java.py',
        'ruby': 'web_exec_ruby.py',
        'c': 'web_exec_c.py',
        'cpp': 'web_exec_cpp.py',
    };

    /*  these settings are all customized for my own server setup,
        so you will need to customize for your server: */
    serverRoot = (window.location.protocol === 'https:') ?
        'https://codeviz.tk:5001/' : // my certificate for https is registered via cokapi.com, so use it for now
        'http://codeviz.tk:5001/'; // try cokapi.com so that hopefully it works through firewalls better than directly using IP addr

    // see ../../v4-cokapi/cokapi.js for details
    langSettingToJsonpEndpoint = {
        '2': null,
        '3': null,
        'js': this.serverRoot + 'exec_js_jsonp',
        'ts': this.serverRoot + 'exec_ts_jsonp',
        'java': this.serverRoot + 'exec_java_jsonp',
        'ruby': this.serverRoot + 'exec_ruby_jsonp',
        'c': this.serverRoot + 'exec_c_jsonp',
        'cpp': this.serverRoot + 'exec_cpp_jsonp',
    };

    constructor(params: any = {}) {
        /*  http://stackoverflow.com/questions/21159301/quotaexceedederror-dom-exception-22-an-attempt-was-made-to-add-something-to-st
            Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
            throw QuotaExceededError. We're going to detect this and just silently drop any calls to setItem
            to avoid the entire page breaking, without having to do a check at each usage of Storage. */
        if (typeof localStorage === 'object') {
            try {
                localStorage.setItem('localStorage', '1');
                localStorage.removeItem('localStorage');
            } catch (e) {
                (Storage as any).prototype._setItem = Storage.prototype.setItem;
                Storage.prototype.setItem = function () { }; // make it a NOP
                alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some features may not work properly for you.');
            }
        }

        if (supports_HTML5_storage()) {
            /*  generate a unique UUID per "user" (as indicated by a single browser
                instance on a user's machine, which can be more precise than IP
                addresses due to sharing of IP addresses within, say, a school
                computer lab)
                added on 2015-01-27 for more precise user identification */
            if (!localStorage.getItem('opt_uuid')) {
                localStorage.setItem('opt_uuid', generateUUID());
            }

            this.userUUID = localStorage.getItem('opt_uuid');
            Assert(this.userUUID);
        } else {
            this.userUUID = undefined;
        }

        // register a generic AJAX error handler
        $(document).ajaxError((evt, jqxhr, settings, exception) => {
            if (this.ignoreAjaxError(settings)) {
                return; // early return!
            }

            /*  On my server
                This jqxhr.responseText might mean the URL is too long, since the error
                message returned by the server is something like this in nginx:
            
               <html>
               <head><title>414 Request-URI Too Large</title></head>
               <body bgcolor="white">
               <center><h1>414 Request-URI Too Large</h1></center>
               <hr><center>nginx</center>
               </body>
               </html>
            
                Note that you'll probably need to customize this check for your server. */
            if (jqxhr && jqxhr.responseText && jqxhr.responseText.indexOf('414') >= 0) {
                /*  this is an UBER UBER hack. If this happens just once, then
                    force click the "Visualize Execution" button again and re-try.
                    why? what's the difference the second time around? the diffs_json
                    parameter (derived from deltaObj) will be *empty* the second time
                    around since it gets reset on every execution. if diffs_json is
                    HUGE, then that might force the URL to be too big without your
                    code necessarily being too big, so give it a second shot with an
                    empty diffs_json. if it STILL fails, then display the error
                    message and give up. */
                if (this.num414Tries === 0) {
                    this.num414Tries++;
                    $("#executeBtn").click();
                } else {
                    this.num414Tries = 0;
                    this.setFrontendError(["Server error! Your code might be too long for this tool. Shorten your code and re-try."]);
                }
            } else {
                this.setFrontendError(
                    ["Server error! Your code might be taking too much time/memory. Or the server CRASHED",
                        "due to too many people using it. Or you are behind a FIREWALL that blocks access.",
                        "Try again later, or report a bug to 23515043@std.stei.itb.ac.id by clicking the 'Generate",
                        "permanent link' button at the bottom of this page and including a URL in your email."]);
            }
            this.doneExecutingCode();
        });

        this.clearFrontendError();
        $("#embedLinkDiv").hide();
        $("#executeBtn").attr('disabled', false).click(this.executeCodeFromScratch.bind(this));
    }

    abstract executeCode(forceStartingInstr?: number, forceRawInputLst?: string[]): any;
    abstract finishSuccessfulExecution(): any;
    abstract handleUncaughtException(trace: any[]): any;

    ignoreAjaxError(settings: any): boolean {
        return false;
    }

    setFrontendError(lines: any): void {
        $("#frontendErrorOutput").html(lines.map(HTMLspecialChars).join('<br/>'));
    }

    clearFrontendError(): void {
        $("#frontendErrorOutput").html('');
    }

    getQueryStringOptions(): any {
        let ril = $.bbq.getState('rawInputLstJSON');
        let testCasesLstJSON = $.bbq.getState('testCasesJSON');
        // note that any of these can be 'undefined'
        return {
            preseededCode: $.bbq.getState('code'),
            preseededCurInstr: Number($.bbq.getState('curInstr')),
            verticalStack: $.bbq.getState('verticalStack'),
            appMode: $.bbq.getState('mode'),
            py: $.bbq.getState('py'),
            cumulative: $.bbq.getState('cumulative'),
            heapPrimitives: $.bbq.getState('heapPrimitives'),
            textReferences: $.bbq.getState('textReferences'),
            rawInputLst: ril ? $.parseJSON(ril) : undefined,
            codeopticonSession: $.bbq.getState('cosession'),
            codeopticonUsername: $.bbq.getState('couser'),
            testCasesLst: testCasesLstJSON ? $.parseJSON(testCasesLstJSON) : undefined
        };
    }

    redrawConnectors(): void {
        if (this.myVisualizer && this.appMode == 'display') {
            this.myVisualizer.redrawConnectors();
        }
    }

    getBaseBackendOptionsObj(): any {
        let ret = {
            cumulative_mode: ($('#cumulativeModeSelector').val() == 'true'),
            heap_primitives: ($('#heapPrimitivesSelector').val() == 'true'),
            show_only_outputs: false, // necessary for legacy reasons, ergh!
            origin: this.originFrontendJsFile
        };
        return ret;
    }

    getBaseFrontendOptionsObj(): any {
        let ret = {// tricky: selector 'true' and 'false' values are strings!
            disableHeapNesting: ($('#heapPrimitivesSelector').val() == 'true'),
            textualMemoryLabels: ($('#textualMemoryLabelsSelector').val() == 'true'),
            executeCodeWithRawInputFunc: this.executeCodeWithRawInput.bind(this),

            /*  always use the same visualizer ID for all instantiated ExecutionVisualizer objects,
                so that they can sync properly across multiple clients using TogetherJS in shared sessions.
                this shouldn't lead to problems since only ONE ExecutionVisualizer will be shown at a time */
            visualizerIdOverride: '1',
            updateOutputCallback: this.updateOutputCallbackFunc.bind(this),
            startingInstruction: 0,
        };
        return ret;
    }

    updateOutputCallbackFunc(): void {
        $('#urlOutput,#urlOutputShortened,#embedCodeOutput').val('');
    }

    executeCodeFromScratch(): void {
        this.rawInputLst = []; // reset!
        this.executeCode();
    }

    executeCodeWithRawInput(rawInputStr: any, curInstr: any): void {
        this.rawInputLst.push(rawInputStr);
        this.executeCode(curInstr);
    }

    startExecutingCode(startingInstruction: number): void {
        $('#executeBtn').html(`<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Please wait ... compiling`);
        $('#executeBtn').attr('disabled', true);
        this.isExecutingCode = true;
    }

    doneExecutingCode(): void {
        $('#executeBtn').html(`<span class="glyphicon glyphicon-cloud-upload"></span>  Visualize Execution`);
        $('#executeBtn').attr('disabled', false);
        this.isExecutingCode = false;
    }

    executeCodeAndCreateViz(codeToExec: any, pyState: any, backendOptionsObj: any, frontendOptionsObj: any, outputDiv: any): void {
        let vizCallback = (dataFromBackend) => {
            let trace = dataFromBackend.trace;
            let killerException = null;
            // don't enter visualize mode if there are killer errors:
            if ( !trace || (trace.length == 0) || (trace[trace.length - 1].event == 'uncaught_exception') ) {
                this.handleUncaughtException(trace);

                if (trace.length == 1) {
                    killerException = trace[0]; // killer!
                    this.setFrontendError([trace[0].exception_msg]);
                } else if (trace.length > 0 && trace[trace.length - 1].exception_msg) {
                    killerException = trace[trace.length - 1]; // killer!
                    this.setFrontendError([trace[trace.length - 1].exception_msg]);
                } else {
                    this.setFrontendError(
                        ["Unknown error: The server may be too busy or down right now.",
                            "Or you are behind a FIREWALL that blocks access to this server.",
                            "Please reload and try again later. Or report a bug to",
                            "23515043@std.stei.itb.ac.id by clicking the 'Generate permanent link'",
                            "button at the bottom and including a URL in your email."]);
                }
            } else {
                // fail-soft to prevent running off of the end of trace
                if (frontendOptionsObj.startingInstruction >= trace.length) {
                    frontendOptionsObj.startingInstruction = 0;
                }

                if (frontendOptionsObj.runTestCaseCallback) {
                    // hacky! DO NOT actually create a visualization! instead call:
                    frontendOptionsObj.runTestCaseCallback(trace);
                } else {
                    // success!
                    this.myVisualizer = new ExecutionVisualizer(outputDiv, dataFromBackend, frontendOptionsObj);
                    /*  SUPER HACK -- slip in backendOptionsObj as an extra field
                        NB: why do we do this? for more detailed logging? */
                    (this.myVisualizer as any).backendOptionsObj = backendOptionsObj;
                    this.finishSuccessfulExecution(); // TODO: should we also run this if we're calling runTestCaseCallback?
                }
            }
        }

        this.executeCodeAndRunCallback(codeToExec, pyState, backendOptionsObj, frontendOptionsObj, vizCallback.bind(this));
    }

    executeCodeAndRunCallback(codeToExec: any, pyState: any, backendOptionsObj: any, frontendOptionsObj: any, execCallback: any): void {
        let callbackWrapper = (dataFromBackend) => {
            execCallback(dataFromBackend); // call the main event first

            // run this at the VERY END after all the dust has settled
            this.doneExecutingCode(); // rain or shine, we're done executing!
            // tricky hacky reset
            this.num414Tries = 0;
        };

        let backendScript = this.langSettingToBackendScript[pyState];
        Assert(backendScript);
        let jsonp_endpoint = this.langSettingToJsonpEndpoint[pyState]; // maybe null

        if (!backendScript) {
            this.setFrontendError(
                ["Server configuration error: No backend script",
                    "Report a bug to 23515043@std.stei.itb.ac.id by clicking on the 'Generate permanent link'",
                    "button at the bottom and including a URL in your email."]);
            return;
        }

        this.clearFrontendError();
        this.startExecutingCode(frontendOptionsObj.startingInstruction);

        frontendOptionsObj.lang = pyState;
        // kludgy exceptions
        if (pyState === '2') {
            frontendOptionsObj.lang = 'py2';
        } else if (pyState === '3') {
            frontendOptionsObj.lang = 'py3';
        } else if (pyState === 'java') {
            frontendOptionsObj.disableHeapNesting = true; // never nest Java objects, seems like a good default
        }

        /*  if we don't have any deltas, then don't bother sending deltaObj:
            NB: not all subclasses will initialize this.deltaObj */
        let deltaObjStringified = (this.deltaObj && (this.deltaObj.deltas.length > 0)) ? JSON.stringify(this.deltaObj) : null;
        if (deltaObjStringified) {
            /*  if deltaObjStringified is too long, then that will likely make
                the URL way too long. in that case, just make it null and don't
                send a delta (NB: actually set it to a canary value "overflow").
                we'll lose some info but at least the URL will hopefully not overflow: */
            if (deltaObjStringified.length > 4096) {
                deltaObjStringified = "overflow"; // set a canary to overflow
            }
        } else {
            // if we got here due to the num414Tries retries hack, set canary to "overflow"
            if (this.num414Tries > 0) {
                deltaObjStringified = "overflow_414";
            }
        }

        if (jsonp_endpoint) {
            Assert(pyState !== '2' && pyState !== '3');
            // hack! should just be a dummy script for logging only
            $.get(backendScript,
                {
                    user_script: codeToExec,
                    options_json: JSON.stringify(backendOptionsObj),
                    user_uuid: this.userUUID,
                    session_uuid: this.sessionUUID,
                    diffs_json: deltaObjStringified
                },
                function (dat) { } /* don't do anything since this is a dummy call */, "text");

            // the REAL call uses JSONP
            // http://learn.jquery.com/ajax/working-with-jsonp/
            $.ajax({
                url: jsonp_endpoint,
                // The name of the callback parameter, as specified by the YQL service
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    user_script: codeToExec,
                    options_json: JSON.stringify(backendOptionsObj)
                },
                success: callbackWrapper,
            });
        } else {
            // for Python 2 or 3, directly execute backendScript
            Assert(pyState === '2' || pyState === '3');
            $.get(backendScript,
                {
                    user_script: codeToExec,
                    raw_input_json: this.rawInputLst.length > 0 ? JSON.stringify(this.rawInputLst) : '',
                    options_json: JSON.stringify(backendOptionsObj),
                    user_uuid: this.userUUID,
                    session_uuid: this.sessionUUID,
                    diffs_json: deltaObjStringified
                },
                callbackWrapper, "json");
        }
    }

    setSurveyHTML(): void {
        var survey_v11 = `<p style="font-size: 10pt; margin-top: 12px; margin-bottom: 15px; line-height: 150%;">
                        <span><span style="color: #e93f34;">Support our research and practice Python</span>
                        by trying our new <a target="_blank" href="http://www.labinthewild.org/studies/python_tutor/">debugging skill test</a>!`;
        $('#surveyPane').html(survey_v11);
    }
}