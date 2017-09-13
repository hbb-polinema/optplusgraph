interface IOptFrontendSharedSessions{
    ignoreAjaxError(settings):void;
    logEditDelta(delta):void;
    startExecutingCode(startingInstruction:number):void;
    updateAppDisplay(newAppMode):void;
    finishSuccessfulExecution():void;
    initTogetherJS():void;
    requestSync():void;
    syncAppState(appState):void;
    TogetherjsReadyHandler():void;
    TogetherjsCloseHandler():void;
    startSharedSession():void;
    appStateEq(s1, s2):void;
    populateTogetherJsShareUrl():void;
    
}