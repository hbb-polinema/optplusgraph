interface IDataVisualizer{ 
    openTab(evt, tabName):void;
    height():void;
    generateHeapObjID(objID, stepNum):void;
    getRealLabel(label):void;
    resetJsPlumbManager():void;
    precomputeCurTraceLayouts():void;
    isCppMode():void;
    structurallyEquivalent(obj1, obj2);
    isPrimitiveType(obj):void;
    renderDataStructures(curInstr: number):void;
    renderPrimitiveObject(obj, stepNum: number, d3DomElement):void;
    renderNestedObject(obj, stepNum: number, d3DomElement):void;
    renderCompoundObject(objID, stepNum: number, d3DomElement, isTopLevel):void;
    renderCStructArray(obj, stepNum, d3DomElement):void;
    redrawConnectors():void;
}