interface INavigationController{
    hideUserInputDiv():void;
    showUserInputDiv():void;
    setSliderVal(v: number):void;
    setVcrControls(msg: string, isFirstInstr: boolean, isLastInstr: boolean):void;
    setupSlider(maxSliderVal: number):void;
    renderSliderBreakpoints(sortedBreakpointsList):void;
    showError(msg: string):void;
}