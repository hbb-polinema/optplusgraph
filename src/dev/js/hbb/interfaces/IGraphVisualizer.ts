interface IGraphVisualizer{
    check_model_graph(isCppMode: boolean): void;
    model01_MatrixGlobal(): void;
    model02_MatrixLocal(): void;
    model03_PointerGlobal(): void;
    model04_PointerLocal(): void;
    infoBar(): void;
    render(curStep: number): void; // TODO: change to createViz
    set_data(data: any, step: number): any;
    diff_data(data1: any, data2: any): boolean;
    drawGraph2(dataset: any): void;
    add_datum(dataset: any): void;
    add_node(dataset: any): void;
    remove_datum(dataset: any): void;
    remove_node(dataset: any): void;
    redraw(dataset: any): void;
    animate(curStep: number): void;
    animationColor(src, trg, line): void;
}