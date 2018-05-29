interface IDataVisualizer {
    openTab(button:any, tabName:any): void; // add by @habibieeddien
    height(): void;
    generateHeapObjID(objID, stepNum): string;
    getRealLabel(label: string): string;
    resetJsPlumbManager(): void;
    precomputeCurTraceLayouts(): void;
    isCppMode(): boolean;
    structurallyEquivalent(obj1, obj2): boolean;
    isPrimitiveType(obj): boolean;
    renderDataStructures(curInstr: number): void; // main event
    renderPrimitiveObject(obj, stepNum: number, d3DomElement): void;
    renderNestedObject(obj, stepNum: number, d3DomElement): void;
    renderCompoundObject(objID, stepNum: number, d3DomElement, isTopLevel): void;
    renderCStructArray(obj, stepNum, d3DomElement): void;
    redrawConnectors(): void;
}