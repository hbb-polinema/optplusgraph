interface IAbstractBaseFrontend {
    executeCode(forceStartingInstr?: number, forceRawInputLst?: string[]): any;
    finishSuccessfulExecution(): any; // called by executeCodeAndCreateViz
    handleUncaughtException(trace: any[]): any; // called by executeCodeAndCreateViz
    ignoreAjaxError(settings): boolean;
    setFrontendError(lines): void;
    clearFrontendError(): void;
    getQueryStringOptions(): any;
    redrawConnectors(): void;
    getBaseBackendOptionsObj(): any;
    getBaseFrontendOptionsObj(): any;
    updateOutputCallbackFunc(): void;
    executeCodeFromScratch(): void;
    executeCodeWithRawInput(rawInputStr, curInstr): void;
    startExecutingCode(startingInstruction: number): void;
    doneExecutingCode(): void;
    executeCodeAndCreateViz(codeToExec, pyState, backendOptionsObj, frontendOptionsObj, outputDiv): void;
    executeCodeAndRunCallback(codeToExec, pyState, backendOptionsObj, frontendOptionsObj, execCallback): void;
    setSurveyHTML(): void;
}