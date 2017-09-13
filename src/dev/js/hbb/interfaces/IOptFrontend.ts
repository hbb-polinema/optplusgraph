interface IOptFrontend{
    compressUpdateHistoryList():void;
    submitUpdateHistory(why):void;
    initAceEditor(height: number):void;
    setAceMode():void;
    pyInputGetValue():void;
    pyInputSetValue(dat):void;
    pyInputGetScrollTop():void;
    pyInputSetScrollTop(st):void;
    executeCodeFromScratch():void;
    executeCode(forceStartingInstr:number, forceRawInputLst:any):void;
    finishSuccessfulExecution():void;
    handleUncaughtException(trace):void;
    ignoreAjaxError(settings):void;
    initDeltaObj():void;
    snapshotCodeDiff():void;
    logEditDelta(delta):void;
    enterDisplayMode():void;
    enterEditMode():void;
    updateAppDisplay(newAppMode):void;
    openLiveModeUrl():void;
    getAppState():void;
    getToggleState():void;
    setToggleOptions(dat):void;
    parseQueryString():void;
}