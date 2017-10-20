interface IOptFrontend{
    compressUpdateHistoryList():any;
    submitUpdateHistory(why):void;
    initAceEditor(height: number):void;
    setAceMode():void;
    pyInputGetValue():string;
    pyInputSetValue(dat):void;
    pyInputGetScrollTop():void;
    pyInputSetScrollTop(st):void;
    executeCodeFromScratch():void;
    executeCode(forceStartingInstr:number, forceRawInputLst:any):void;
    finishSuccessfulExecution():void;
    handleUncaughtException(trace):void;
    ignoreAjaxError(settings):boolean;
    initDeltaObj():void;
    snapshotCodeDiff():void;
    logEditDelta(delta):void;
    enterDisplayMode():void;
    enterEditMode():void;
    updateAppDisplay(newAppMode):void;
    openLiveModeUrl():boolean;
    getAppState():any;
    getToggleState():void;
    setToggleOptions(dat):void;
    parseQueryString():void;
}