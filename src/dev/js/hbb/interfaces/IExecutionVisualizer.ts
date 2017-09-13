interface IExecutionVisualizer {
    add_pytutor_hook(hook_name, func): void;
    try_hook(hook_name, args): [boolean];
    generateID(original_id): string;
    render(): any;
    _getSortedBreakpointsList(): any;
    addToBreakpoints(executionPoints): void;
    removeFromBreakpoints(executionPoints): void;
    setBreakpoint(d): void;
    unsetBreakpoint(d): void;
    findPrevBreakpoint(): void;
    findNextBreakpoint(): void;
    stepForward(): void;
    stepBack(): void;
    updateOutput(smoothTransition: boolean): void;
    updateOutputFull(smoothTransition): void;
    updateOutputMini(): void;
    renderStep(step): void;
    redrawConnectors(): void;
    activateJavaFrontend(): void;
    updateLineAndExceptionInfo(): void;
    isOutputLineVisibleForBubbles(lineDivID): any;
}
