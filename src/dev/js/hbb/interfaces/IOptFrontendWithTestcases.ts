interface IOptFrontendWithTestcases{
    parseQueryString():void;
    appStateAugmenter(appState):void;
    runTestCase(id, codeToExec, firstTestLine):void;
    vizTestCase(id, codeToExec, firstTestLine):void;
    handleUncaughtException(trace):void;
    finishSuccessfulExecution():void;
    updateOutputCallbackFunc():void;
    experimentalPopUpSyntaxErrorSurvey():void;
    popupRuntimeErrorSurvey():void;
}