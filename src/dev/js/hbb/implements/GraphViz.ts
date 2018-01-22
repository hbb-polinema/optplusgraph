/**
 * Author   : Habibie Ed Dien (habibie.tk@gmail.com)
 * Class    : Model for detect Graph in code C/C++
 */
require('../../lib/jquery-3.0.0.min.js');
require('../../lib/d3.v3.min.js');

/**
 * KEY = { keyname: "", source_var:"", target_var:"", source:"", target:"" }
 */
export var KEY: any = {};

const enum GRAPH {
    /**
     * Matrix Global:
     * 1. tidak berbobot (matrix identity: 0 1)
     *      a. directed
     *      b. undirected
     * 2. berbobot (matrix have value > 0 & < 999):
     *      a. directed
     *      b. undirected
     * 
     * Matrix Local:
     * 1. tidak berbobot
     *      a. directed
     *      b. undirected
     * 2. berbobot
     *      a. directed
     *      b. undirected
     */
    None,
    MatrixGlobal,
    MatrixLocal,
    PointerGlobal,
    PointerLocal
};

export class GraphViz {
    divTab: any;
    dTrace: any;
    SVG: any = null; FORCE: any; LAYER1: any; LAYER2: any;
    NODES: any; LINKS: any; CIRCLE: any; LINE: any; ANIMATELAYER: any;
    initialRender: boolean = false;
    indexNode: number; indexEdge: number;
    isCPP: boolean = false; // C or C++ mode
    equalDrawed: boolean = false;
    /**
     * data_graph = {
     * "step" : [3,4,5,8,10],
     * "values" : [{ 
     *              nodes: [{ name: 1 }, { name: 2 }],
     *              edges: [{ source: 0, target: 1}, { source: 2, target: 1}] 
     *           }], 
     *           [{ 
     *              ...
     *           }]
     * }
     */
    dataGraph: any = {}; EDGES: any = [];
    temp_step: any = [];
    dataChangedOnStep: number;
    VIZ: GRAPH = GRAPH.None;
    G: any = { "directed": null, "instantValue": null };

    readonly width: number = 444;
    readonly height: number = 444;

    constructor(content, dataTrace, isCppMode) {
        this.divTab = content;
        this.dTrace = dataTrace;
        this.isCPP = isCppMode;

        this.check_model_graph(isCppMode);
    }

    check_model_graph(isCppMode: boolean): void {
        if (!isCppMode) {
            this.divTab.html('<p>Sorry! For now, Only support for C or C++</p>');
            return;
        }

        this.dataGraph.step = [];
        this.dataGraph.values = [];

        if (this.VIZ == GRAPH.None) this.model01_MatrixGlobal();     // Model-01: MatrixGlobal
        if (this.VIZ == GRAPH.None) this.model02_MatrixLocal();      // Model-02: MatrixLocal
        if (this.VIZ == GRAPH.None) this.model03_PointerGlobal();    // Model-03: PointerGlobal
        if (this.VIZ == GRAPH.None) this.model04_PointerLocal();     // Model-04: PointerLocal

        this.temp_step[0] = 0;
        this.temp_step[1] = 0;
        this.dataChangedOnStep = 0;
    }

    model01_MatrixGlobal(): void { // Model-01: matrix variable on global --> always available in first step
        // TODO: check other var for support this model process
        let C_MUL_AR_isFound = false, isDifferent = false;
        let MATRIX: any; // for compare matrix before and after step
        let instantValue = false;
        let G = this.G;

        function get_matrix(data: any, step: number) {
            let DATA_GRAPH: any = {};
            $.each(data, function (key, val) {
                if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0 && !C_MUL_AR_isFound) { // found only 1 matrix for this model

                    C_MUL_AR_isFound = true;
                    let [row, col] = (String(val[2])).split(',');
                    let size = (Number([row]) * Number([col])) + 2; // get dimension of matrix
                    let index = 0, temp = [], weighted = false;

                    for (let i = 3; i <= size; i++) { // i = 3, in attribut JSON begin value
                        if (val[i][0] === 'C_DATA' && val[i][2] === 'int') {
                            if (val[i][3] !== 0) instantValue = true;
                            if (val[i][3] > 1) weighted = true; // TODO: is it right?? how if directed-weighted?
                            temp[index] = val[i][3]; // temp value
                            index++;
                        } else {
                            console.log('something not int'); // is it possible?
                            break;
                        }
                    }

                    index = 0;
                    let value = [];
                    let row_length = Number([row]);
                    let col_length = Number([col]);

                    // for matrix instant initial value
                    if (instantValue) {
                        // ambil data graf, keluar dari each
                        G.instantValue = true;
                        let nodes = [], edges = [], duplicate = false;
                        for (let row = 0; row < row_length; row++) {
                            for (let col = 0; col < col_length; col++) {
                                if (row == col) { // source == target. So, it shouldn't same!
                                    index++;
                                    continue; // ignore and continue loop
                                }

                                duplicate = edges.some(function (e) { return e.source === col && e.target === row; }); // duplicate edge or not
                                if (weighted && temp[index] > 1) {
                                    if (!duplicate) {
                                        edges.push({ "source": row /*origin node*/, "target": col /*destination node*/, "weight": temp[index] });
                                        nodes.push(row, col);
                                    }
                                } else if (!weighted && temp[index] == 1) {
                                    if (!duplicate) {
                                        edges.push({ "source": row /*origin node*/, "target": col /*destination node*/ });
                                        nodes.push(row, col);
                                    }
                                }
                                index++;
                            }
                        }

                        let get_unique_node = nodes.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
                        nodes = [];
                        get_unique_node.forEach(e => { nodes.push({ "name": e }); });

                        for (let i = 0; i < edges.length; i++) { // change `value edge` based on position `nodes.name`
                            let position = get_unique_node.indexOf(edges[i].source);
                            edges[i].source = position;
                            position = get_unique_node.indexOf(edges[i].target);
                            edges[i].target = position;
                        }

                        DATA_GRAPH = { nodes, edges };
                        return false; // break out $.each
                    } else {
                        G.instantValue = false;
                        for (let row = 0; row < row_length; row++) {
                            value[row] = [];
                            for (let col = 0; col < col_length; col++) {
                                value[row][col] = temp[index];
                                index++;
                            }
                        }
                        MATRIX = value;
                    }

                } else if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0) { // if exist one more matrix

                    C_MUL_AR_isFound = false;
                    console.log('Matrix is found twice!'); // not match this model

                } else if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step > 0) { // compare data in second step

                    let [row, col] = (String(val[2])).split(',');
                    let size = (Number([row]) * Number([col])) + 2; // get dimension of matrix
                    let index = 0, temp = [];
                    for (let i = 3; i <= size; i++) {
                        if (val[i][0] === 'C_DATA' && val[i][2] === 'int') {
                            temp[index] = val[i][3]; // temp value
                            index++;
                        } else {
                            console.log('something not int');
                            break;
                        }
                    }

                    index = 0;
                    let value = [], edges = [], nodes = [];
                    let row_length = Number([row]);
                    let col_length = Number([col]);
                    for (let row = 0; row < row_length; row++) {
                        value[row] = [];
                        for (let col = 0; col < col_length; col++) {
                            value[row][col] = temp[index];
                            if (MATRIX[row][col] != temp[index] && temp[index] == 1 && row != col) {
                                isDifferent = true;
                                edges.push({ "source": row /*origin node*/, "target": col /*destination node*/ });
                                nodes.push(row, col);
                            } else if (temp[index] == 1 && row != col) { // node before stay drawed
                                edges.push({ "source": row, "target": col });
                                nodes.push(row, col);
                            }
                            index++;
                        }
                    }

                    if (isDifferent) { // there is different value on every step
                        let get_unique_node = nodes.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
                        nodes = [];
                        get_unique_node.forEach(e => { nodes.push({ "name": e }); });
                        for (let i = 0; i < edges.length; i++) { // change `value edge` based on position `nodes.name`
                            let position = get_unique_node.indexOf(edges[i].source);
                            edges[i].source = position;
                            position = get_unique_node.indexOf(edges[i].target);
                            edges[i].target = position;
                        }

                        MATRIX = value;
                        DATA_GRAPH = { nodes, edges };
                    }
                }
            });

            return DATA_GRAPH;
        } // END func get_matrix()

        let index = 0; let DATA;
        /**
         * This is main execution/process data
         * There is 1 function needed: get_matrix
         */
        for (let i = 0; i < this.dTrace.length; i++) {
            DATA = get_matrix(this.dTrace[i].globals, i); // global var
            if (!C_MUL_AR_isFound) break; // if exist one more matrix in first step, ignore it and exit

            if (i == 0) {
                this.dataGraph.step[0] = 0;
                if (instantValue) {
                    this.dataGraph.values[0] = DATA;
                    break; // out loop for
                } else this.dataGraph.values[0] = MATRIX;
                index++;
            } else {
                if (isDifferent) {
                    this.dataGraph.step[index] = i;
                    this.dataGraph.values[index] = DATA;
                    index++;
                    isDifferent = false;
                }
            }
        } // END for

        if (C_MUL_AR_isFound) { // if match this model
            console.log('GRAPH.MatrixGlobal');
            this.VIZ = GRAPH.MatrixGlobal;
        }
    }

    model02_MatrixLocal(): void { // Model-02: matrix variable on local
        let C_MUL_AR_isFound = false, isDifferent = false;
        let MATRIX: any, Last = this.dTrace.length - 1, EDGES;

        function get_matrix(data: any, step: number) {
            let DATA_GRAPH: any = {};
            $.each(data, function (key, val) {
                if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0 && !C_MUL_AR_isFound) { // TODO: here value always zero, why?

                    C_MUL_AR_isFound = true; console.log('keyname ==> ' + key); KEY.keyname = key;
                    let [row, col] = (String(val[2])).split(',');
                    let size = (Number([row]) * Number([col])) + 2; // get dimension of matrix
                    let index = 0, temp = [];

                    for (let i = 3; i <= size; i++) {
                        if (val[i][0] === 'C_DATA' && val[i][2] === 'int') {
                            if (typeof val[i][3] === 'number') // because some value is undefined
                                temp[index] = val[i][3]; // temp value
                            else
                                temp[index] = 0;
                            index++;
                        } else {
                            console.log('something not int');
                            break;
                        }
                    }

                    index = 0;
                    let value: any = [];
                    let row_length = Number([row]);
                    let col_length = Number([col]);
                    for (let row = 0; row < row_length; row++) {
                        value[row] = [];
                        for (let col = 0; col < col_length; col++) {
                            value[row][col] = temp[index];
                            index++;
                        }
                    }
                    MATRIX = value;

                } else if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0) {

                    C_MUL_AR_isFound = false;
                    console.log('Matrix is found twice!'); // not match this model

                } else if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step > 0) {

                    let [row, col] = (String(val[2])).split(',');
                    let size = (Number([row]) * Number([col])) + 2; // get dimension of matrix
                    let index = 0, temp = [];
                    for (let i = 3; i <= size; i++) {
                        if (val[i][0] === 'C_DATA' && val[i][2] === 'int') {
                            if (typeof val[i][3] === 'number')
                                temp[index] = val[i][3]; // temp value
                            else
                                temp[index] = 0;
                            index++;
                        } else {
                            console.log('something not int');
                            break;
                        }
                    }

                    let weighted = false;
                    let isWeighted = temp.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
                    if (isWeighted.length == 2) {
                        isWeighted[1] > 1 ? weighted = true : weighted = false;
                    } else if (isWeighted.length > 2) {
                        weighted = true;
                    }

                    index = 0;
                    let value = [], edges = [], nodes = [];
                    let row_length = Number([row]);
                    let col_length = Number([col]);
                    for (let row = 0; row < row_length; row++) {
                        value[row] = [];
                        for (let col = 0; col < col_length; col++) {
                            value[row][col] = temp[index];
                            if (MATRIX[row][col] != temp[index] && row != col) {
                                isDifferent = true;
                                if (temp[index] > 0 && temp[index] < 999) {
                                    if (check_edges(edges, row, col)) {
                                        if (weighted) edges.push({ "source": row, "target": col, "weight": temp[index] });
                                        else edges.push({ "source": row, "target": col });
                                        nodes.push(row, col);
                                    }
                                }
                            } else if (temp[index] > 0 && temp[index] < 999 && row != col) {
                                if (check_edges(edges, row, col)) {
                                    if (weighted) edges.push({ "source": row, "target": col, "weight": temp[index] });
                                    else edges.push({ "source": row, "target": col });
                                    nodes.push(row, col);
                                }
                            }
                            index++;
                        }
                    }

                    if (step === Last) EDGES = edges; // use for animate

                    if (isDifferent) { // there is different value on every step
                        let get_unique_node = nodes.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
                        nodes = [];
                        get_unique_node.forEach(e => { nodes.push({ "name": e }); });
                        for (let i = 0; i < edges.length; i++) { // change `value edge` based on index position `nodes.name`
                            let position = get_unique_node.indexOf(edges[i].source);
                            edges[i].source = position;
                            position = get_unique_node.indexOf(edges[i].target);
                            edges[i].target = position;
                        }

                        MATRIX = value;
                        DATA_GRAPH = { nodes, edges };
                    }

                }
            });

            return DATA_GRAPH;
        } // END func get_matrix()

        function check_edges(edges, src, target) { // if edge same with before, don't input edge
            let isNew = true;
            edges.forEach(e => { if (src === e.target && target == e.source) isNew = false; });
            return isNew;
        }

        let index = 0; let DATA;
        /**
         * This is main execution/process data
         * There is 2 function needed: get_matrix, check_edges
         */
        for (let i = 0; i < this.dTrace.length; i++) {
            DATA = get_matrix(this.dTrace[i].stack_to_render[0].encoded_locals, i); // local var
            if (!C_MUL_AR_isFound) break; // if exist one more matrix in first step, ignore it and exit

            if (i == 0) {
                this.dataGraph.step[0] = 0;
                this.dataGraph.values[0] = MATRIX;
                index++;
            } else {
                if (isDifferent) {
                    this.dataGraph.step[index] = i;
                    this.dataGraph.values[index] = DATA;
                    index++;
                    isDifferent = false;
                }
            }
        }

        if (C_MUL_AR_isFound) { // if match this model
            console.log('GRAPH.MatrixLocal');
            this.VIZ = GRAPH.MatrixLocal;
            this.EDGES = EDGES;
        }
    }

    model03_PointerGlobal(): void { // Model-03: struct, pointer, array
        // TODO: check STRUCT --> node/pointer --> relation/link/edge
        let C_STRUCT = false;
        let edges_temp = [], nodes = [];

        function get_heap(data_json: any) {
            $.each(data_json, function (key, val) {
                if (typeof key === 'string') {
                    if (key.match(/0x/g) !== null) { // get address memory pointer
                        get_edge(val);
                    }
                }
            });

            let G = [];
            if (edges_temp.length > 1) {
                edges_temp.forEach(e => {
                    if (e.next[3] !== '0x0' && e.next[3] !== '<UNINITIALIZED>') { // filter unknown address memory
                        for (let i = 0; i < edges_temp.length; i++) {
                            if (e.next[3] === edges_temp[i].vertex[1]) {
                                if (e.vertex[3] !== edges_temp[i].vertex[3]) {
                                    G.push({ "source": e.vertex[3], "target": edges_temp[i].vertex[3] });
                                    nodes.push(e.vertex[3], edges_temp[i].vertex[3]);
                                }
                            }
                        }
                    }
                });
            }

            let get_unique_node = nodes.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
            nodes = [];
            get_unique_node.forEach(e => { nodes.push({ "name": e }); });
            for (let i = 0; i < G.length; i++) { // change `value edge` based on position `nodes.name`
                let position = get_unique_node.indexOf(G[i].source);
                G[i].source = position;
                position = get_unique_node.indexOf(G[i].target);
                G[i].target = position;
            }
            edges_temp = []; // reset to empty array
            return G;
        }

        function get_edge(data: any) {
            $.each(data, function (key, val) {
                if (val[0] === 'C_STRUCT' && val.length == 5) { // if struct only have 2 member var, TODO: How about if more var?
                    if (val[3][1][0] === 'C_DATA' && val[4][1][0] === 'C_DATA') {
                        if (val[3][1][2] === 'int' && val[4][1][2] === 'pointer')
                            edges_temp.push({ "vertex": val[3][1], "next": val[4][1] });
                    }
                }
            });
        }

        function is_different(arr1, arr2) { // compare two data array to eliminate duplicate data every step
            if (arr1.length !== arr2.length)
                return true;
            for (let i = arr1.length; i--;) {
                if (arr1[i].source !== arr2[i].source || arr1[i].target !== arr2[i].target)
                    return true;
            }
            return false;
        }

        let index = 1;
        this.dataGraph.step[0] = 0;
        this.dataGraph.values[0] = { "nodes": "first", "edges": "first" };
        /**
         * This is main execution/process data
         * There is 3 function needed: get_heap, get_edge, is_different
         */
        for (let i = 1; i < this.dTrace.length; i++) {
            let edges = get_heap(this.dTrace[i].heap);
            if (Object.keys(this.dTrace[i].heap).length > 1 && edges.length > 0) { // check heap is not empty                
                if (index > 0 && is_different(this.dataGraph.values[index - 1].edges, edges)) {
                    this.dataGraph.step[index] = i;
                    this.dataGraph.values[index] = { nodes, edges };
                    index++; C_STRUCT = true;
                }
            }
            nodes = []; // reset to empty array
        }

        if (C_STRUCT) { // if match this model
            console.log('GRAPH.PointerGlobal');
            this.VIZ = GRAPH.PointerGlobal;
        }
    }

    model04_PointerLocal(): void { // Model-04: pointer local variable
        //
    }

    render(curStep: number): void {
        if (!this.isCPP) // make sure in C/C++ mode
            return;

        this.animate(curStep);

        let diff = false;
        if (this.dataChangedOnStep === 0) { // The First Step
            this.dataChangedOnStep++;
        } else if (this.dataChangedOnStep === 1) { // The Next Step, wherever jump or not
            this.temp_step[1] = this.set_data(this.dataGraph, curStep);
            this.dataChangedOnStep++;
        } else if (this.dataChangedOnStep > 1) { // The Next Step and so on
            this.temp_step[0] = this.temp_step[1];
            this.temp_step[1] = this.set_data(this.dataGraph, curStep);
            diff = this.diff_data(this.temp_step[0], this.temp_step[1]); // compare data before step and after
            if (diff) this.equalDrawed = false; // if data different, draw it
        }

        let data = null;
        switch (this.VIZ) {
            case GRAPH.None:
                this.divTab.html('<h3>Nothing Graph Structure!</h3>');
                break;

            case GRAPH.MatrixGlobal:
            case GRAPH.PointerGlobal:
                if (this.equalDrawed && this.SVG) return;
                data = this.set_data(this.dataGraph, curStep);
                if (this.initialRender) {
                    this.divTab.html('<div id="graph"></div>');
                    //this.canvas.append('<br>' + JSON.stringify(this.dTrace[curStep], undefined, 4));
                    //this.compute_trace_data(curStep);
                    this.SVG = d3.select("#graph").append("svg")
                        .attr({
                            "width": this.width,
                            "height": this.height
                        }).style("background-color", "#ecf0f1");
                }

                if (data) {
                    //this.draw_graph(data);
                    //this.drawGraph(data);
                    this.drawGraph2(data);
                }
                break;

            case GRAPH.MatrixLocal:
                if (this.equalDrawed && this.SVG) return;
                data = this.set_data(this.dataGraph, curStep);
                if (this.initialRender) {
                    this.divTab.html('<div id="graph"></div>');
                    //this.canvas.append('<br>' + JSON.stringify(this.dTrace[curStep], undefined, 4));
                    //this.compute_trace_data(curStep);
                    this.SVG = d3.select("#graph").append("svg")
                        .attr({
                            "width": this.width,
                            "height": this.height
                        }).style("background-color", "#ecf0f1");
                }

                if (data) {
                    //console.log('========data=======\n' + JSON.stringify(data));
                    //this.draw_graph(data);
                    //this.drawGraph(data);
                    this.drawGraph2(data);
                }
                break;
        }
    }

    compute_trace_data(curStep: number): void { // for development
        //let mycanvas = this.divTab; // initial to access nested in func

        function parse(data_json: any) {
            $.each(data_json, function (key, val) {
                if (typeof val === 'object') {
                    //mycanvas.append(`<h3>"${key}"</h3>`);
                    console.log(`===${key}===`);
                    parse(val);
                } else {
                    //mycanvas.append(`<hr><b>key: </b>${key} | <b>val: </b>${val}`);
                    console.log(`\nkey: ${key} | val: ${val}`);
                    evaluate(val);
                }
            });
        }
        function evaluate(input_val: any) {
            if (input_val === 'C_ARRAY') {
                //mycanvas.append(`<p style="color:red">Array</p>`);
                console.log(`===Array===`);
            } else if (input_val === 'C_STRUCT') {
                //mycanvas.append(`<p style="color:blue">Struct</p>`);
                console.log(`===Struct===`);
            } else if (input_val === 'C_MULTIDIMENSIONAL_ARRAY') {
                //mycanvas.append(`<p style="color:yellow">Multidimensi Array</p>`);
                console.log(`===Multidimensi Array===`);
            }
        }
        parse(this.dTrace[curStep]);
    }

    draw_graph(dataset: any): void {
        let colors = d3.scale.category10();
        let i = 0;
        let force = d3.layout.force()
            .nodes(dataset.nodes)
            .links(dataset.edges)
            .size([this.width, this.height])
            //.linkDistance(function (link) { i++; return 10*i; })
            .charge(-5000)
            .linkStrength(0.5);
        //.theta(0.1)
        //.gravity(0.05);
        //.start();

        if (dataset.edges[0].weight) {
            console.log('====have weight=====');
            //force.linkStrength(100);
            force.linkDistance(function (d, i) {
                console.log(JSON.stringify(d));
                return 0.5;
            });
        } else {
            force.linkDistance(171);
        }

        force.start();

        let edges = this.SVG.selectAll("line")
            .data(dataset.edges)
            .enter()
            .append("line")
            .attr("id", function (d, i) {
                return 'edge' + i;
            })
            //.attr('marker-end', 'url(#arrowhead)') // arrow head edges
            .style("stroke", "black")
            .style("pointer-events", "none");

        let nodes = this.SVG.selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr({ "r": 15 })
            .style("fill", function (d, i) { return colors(i); })
            .call(force.drag);

        let nodelabels = this.SVG.selectAll(".nodelabel")
            .data(dataset.nodes)
            .enter()
            .append("text")
            .attr({
                "x": function (d) {
                    return d.x;
                },
                "y": function (d) {
                    return d.y;
                },
                "class": "nodelabel",
                "stroke": "black",
                "text-anchor": "middle",
                "dy": ".4em"
            })
            .text(function (d) {
                return d.name;
            });

        let edgelabels, edgepaths, weight = false;
        if (this.VIZ === GRAPH.MatrixLocal) {
            weight = true;
            edgepaths = this.SVG.selectAll(".edgepath")
                .data(dataset.edges)
                .enter()
                .append('path')
                .attr({
                    'd': function (d) {
                        return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                    },
                    'class': 'edgepath',
                    'fill-opacity': 0,
                    'stroke-opacity': 0,
                    'fill': 'blue',
                    'stroke': 'red',
                    'id': function (d, i) {
                        return 'edgepath' + i;
                    }
                })
                .style("pointer-events", "none");

            edgelabels = this.SVG.selectAll(".edgelabel")
                .data(dataset.edges)
                .enter()
                .append('text')
                .style("pointer-events", "none")
                .attr({
                    'class': 'edgelabel',
                    'id': function (d, i) {
                        return 'edgelabel' + i
                    },
                    'dx': 80,
                    'dy': 0,
                    'font-size': 12,
                    'fill': 'black'
                });

            edgelabels.append('textPath')
                .attr('xlink:href', function (d, i) {
                    return '#edgepath' + i
                })
                .style("pointer-events", "none")
                .text(function (d, i) {
                    return d.weight; // bobot nilai garis
                });
        }

        force.on("tick", function () {
            edges.attr({
                "x1": function (d) {
                    return d.source.x;
                },
                "y1": function (d) {
                    return d.source.y;
                },
                "x2": function (d) {
                    return d.target.x;
                },
                "y2": function (d) {
                    return d.target.y;
                }
            });

            nodes.attr({
                "cx": function (d) {
                    return d.x;
                },
                "cy": function (d) {
                    return d.y;
                }
            });

            nodelabels.attr("x", function (d) {
                return d.x;
            })
                .attr("y", function (d) {
                    return d.y;
                });

            if (weight) {
                edgepaths.attr('d', function (d) {
                    let path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                    return path;
                });

                edgelabels.attr('transform', function (d, i) {
                    if (d.target.x < d.source.x) {
                        let bbox = this.getBBox();
                        let rx = bbox.x + bbox.width / 2;
                        let ry = bbox.y + bbox.height / 2;
                        return 'rotate(180 ' + rx + ' ' + ry + ')';
                    } else {
                        return 'rotate(0)';
                    }
                });
            }
        });
    }

    set_data(data: any, step: number): any {
        if (this.G.instantValue === true) {
            if (this.SVG === null) this.initialRender = true;
            return data.values[0];
        }

        let LengthOfStep = data.step.length;
        if (step < data.step[1]) {
            this.equalDrawed = false; this.SVG = null;
            this.divTab.html(`<h3>Nothing to render!</h3><p>Available later after step ${data.step[1]}</p>`);
        } else {
            if (this.SVG === null) this.initialRender = true;
            if (LengthOfStep == 2) return data.values[1]; // only this condition
        }

        for (let i = 1; i < LengthOfStep - 1; i++) { // first step always 0, so begin second step
            if (step !== 0 && step >= data.step[i] && step < data.step[i + 1]) {
                this.equalDrawed = true;
                return data.values[i];
            } else if (step >= data.step[LengthOfStep - 1] && i === LengthOfStep - 2) {
                this.equalDrawed = true;
                return data.values[i + 1];
            }
        }

        return false;
    }

    diff_data(data1: any, data2: any): boolean {
        if (!Array.isArray(data1.nodes) || !Array.isArray(data2.nodes))
            return false;
        if (data1.nodes.length !== data2.nodes.length)
            return true;
        if (data1.edges.length !== data2.edges.length)
            return true;

        return false;
    }

    drawGraph(dataset: any): void {
        let haveWeight = false;
        if (dataset.edges[0].weight) haveWeight = true;

        let force = d3.layout.force()
            .charge(-7000)
            .linkDistance(77)
            .size([this.width, this.height]);

        let container = this.SVG.append("g");
        force.nodes(dataset.nodes)
            .links(dataset.edges)
            .linkStrength(0.1)
            .friction(0.5)
            .gravity(0.5)
            .start();

        let ID = 0;
        dataset.edges.forEach(function (d, i) {
            setTimeout(function () {
                let nodes = dataset.nodes.filter(function (n, i) {
                    return d.source.index == i || d.target.index == i;
                });

                container.append("g").attr("id", "gline" + ID)
                    .append("line")
                    .datum(d)
                    .attr("class", "link")
                    .attr("id", "line" + ID)
                    .style("stroke", "black");

                nodes.forEach(function (node) {
                    let nodeG = container.append("g").attr("id", "gcircle" + ID)
                        .datum(node);

                    nodeG.append("circle")
                        .attr("r", 15)
                        .attr("id", "node" + ID)
                        .attr("cursor", "pointer")
                        .style("fill", "#34495e")
                        .call(force.drag);
                    ID++;

                    nodeG.append("text")
                        .attr("class", "nodelabel")
                        .attr("x", function (d) {
                            return d.x;
                        })
                        .attr("y", function (d) {
                            return d.y;
                        })
                        .attr("text-anchor", "middle")
                        .attr("dy", ".4em")
                        .attr("stroke", "#ecf0f1")
                        .attr("fill", "#ecf0f1")
                        .text(function (d) {
                            return d.name;
                        });
                });

                if (haveWeight) {
                    container.append('g').attr("id", "gpath" + ID)
                        .append('path')
                        .datum(d)
                        .attr({
                            'd': function (d) {
                                return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                            },
                            'class': 'edgepath',
                            'id': 'edgepath' + i
                        })
                        .style("pointer-events", "none");

                    let edgelabels = container.append('g').attr("id", "gedgelabel" + ID)
                        .append('text')
                        .datum(d)
                        .style("pointer-events", "none")
                        .attr({
                            'class': 'edgelabel',
                            'id': 'edgelabel' + i,
                            'dx': 60,
                            'dy': -5,
                            'font-size': 12,
                            'fill': 'black'
                        });

                    edgelabels.append('textPath')
                        .attr('xlink:href', '#edgepath' + i)
                        .style("pointer-events", "none")
                        .text(function (d) {
                            return d.weight; // bobot nilai garis
                        });
                }

                force.resume();
            }, 777 * (i + 1));
        });

        force.on("tick", function () {
            container.selectAll(".link")
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            container.selectAll("circle")
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });

            container.selectAll(".nodelabel")
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y;
                });

            if (haveWeight) {
                container.selectAll(".edgepath")
                    .attr('d', function (d) {
                        let path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                        return path;
                    });

                container.selectAll(".edgelabel")
                    .attr('transform', function (d, i) {
                        if (d.target.x < d.source.x) {
                            let bbox = this.getBBox();
                            let rx = bbox.x + bbox.width / 2;
                            let ry = bbox.y + bbox.height / 2;
                            return 'rotate(180 ' + rx + ' ' + ry + ')';
                        } else {
                            return 'rotate(0)';
                        }
                    });
            }
        });

        /*let final_node = [],
            oneProcess = true;*/
        force.on("end", function () {
            console.log("end - ID: " + ID);
            let IDx = 0;
            dataset.edges.forEach(function (d, i) {
                setTimeout(function () {
                    animationColor(IDx);
                    IDx++;
                    animationColor(IDx);
                    IDx++;
                    //console.log("IDx: " + IDx + " | cx: " + container.select("#node" + IDx).attr("cx"));

                    /*if (oneProcess) {
                        final_node.push({
                            "IDx": IDx,
                            "cx": container.select("#node" + IDx).attr("cx")
                        });
                        if (IDx == (ID - 1)) oneProcess = false;
                    }*/
                }, 1000 * i);
            });
        });

        function animationColor(id) {
            container.select("#node" + id)
                .transition()
                .duration(750)
                .attr("stroke", "#f1c40f")
                .attr("stroke-width", "7px")
                .delay(1500)
                .transition()
                .duration(1750)
                .attr("stroke-width", "0px");

            container.select("#line" + id)
                .transition()
                .duration(1000)
                .style("stroke", "#f1c40f")
                .style("stroke-width", "5px")
                .delay(1500)
                .transition()
                .duration(750)
                .style("stroke", "black")
                .style("stroke-width", "1px");
        }
    }

    drawGraph2(dataset: any): void {
        let haveWeight = false;
        let force = this.FORCE;
        let layer1 = this.LAYER1;
        let layer2 = this.LAYER2;
        let animateLayer = this.ANIMATELAYER;

        if (this.initialRender) {
            this.FORCE = d3.layout.force()
                .linkStrength(0.1)
                .charge(-7000)
                .linkDistance(77)
                .friction(0.5)
                .gravity(0.5)
                .size([this.width, this.height]);

            this.ANIMATELAYER = this.SVG.append("g").attr("id", "animateLayer"); // ??
            this.LAYER1 = this.SVG.append("g").attr("id", "layerLine");
            this.LAYER2 = this.SVG.append("g").attr("id", "layerCirlce");
            this.NODES = this.FORCE.nodes();
            this.LINKS = this.FORCE.links();
            this.CIRCLE = this.LAYER2.selectAll("circle");
            this.LINE = this.LAYER1.selectAll("line");
            this.initialRender = false;
            force = this.FORCE;
            layer1 = this.LAYER1;
            layer2 = this.LAYER2;
            animateLayer = this.ANIMATELAYER;
        }

        this.indexNode = this.NODES.length;
        this.indexEdge = this.LINKS.length;
        if (dataset.edges[0].weight) haveWeight = true;

        if (this.NODES.length < dataset.nodes.length) {
            this.add_datum(dataset);
        } else if (this.NODES.length > dataset.nodes.length) {
            this.remove_datum(dataset);
        } else if (this.LINKS.length < dataset.edges.length) {
            this.add_datum(dataset);
        } else if (this.LINKS.length > dataset.edges.length) {
            this.remove_datum(dataset);
        }

        force.on("tick", function () {
            layer1.selectAll("line")
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            layer2.selectAll("circle")
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });

            layer2.selectAll(".nodelabel")
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y;
                });

            if (haveWeight) {
                layer1.selectAll(".edgepath").attr('d', function (d) {
                    let path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                    return path;
                });

                layer1.selectAll(".edgelabel").attr('transform', function (d, i) {
                    if (d.target.x < d.source.x) {
                        let bbox = this.getBBox();
                        let rx = bbox.x + bbox.width / 2;
                        let ry = bbox.y + bbox.height / 2;
                        return 'rotate(180 ' + rx + ' ' + ry + ')';
                    } else {
                        return 'rotate(0)';
                    }
                });
            }
        });

        let source: Number = 0;
        let target: Number = 0;
        let line: any = { "id": "_", "x1": 0, "y1": 0, "x2": 0, "y2": 0 };
        let src_node: any = { "cx": 0, "cy": 0 };
        let trg_node: any = { "cx": 0, "cy": 0 };
        let DA: any = [];
        console.log('==== START ==> ', DA);
        /*this.EDGES.forEach(function (d, i) {
            source = d.source; target = d.target;
            DA.push({ source, target, line, src_node, trg_node })
        });
        for(let i = 0; i < this.EDGES.length; i++){
            source = this.EDGES[i].source; target = this.EDGES[i].target;
            line.id = "_"; line.x1 = 0; line.y1 = 0; line.x2 = 0; line.y2 = 0;
            src_node.cx = 0; src_node.cy = 0;
            trg_node.cx = 0; trg_node.cy = 0;
            DA.push({ source, target, line, src_node, trg_node });
        }*/
        //this.dataAnimate = dataAnimate;
        //console.log('=>dataAnimate: ', this.dataAnimate);
        //console.log('coba lagi == 0 d ==> ', DA);

        let temp = this.EDGES;
        function animation() {
            for (let i = 0; i < temp.length; i++) {
                source = temp[i].source; target = temp[i].target;
                line.id = "_"; line.x1 = 0; line.y1 = 0; line.x2 = 0; line.y2 = 0;

                let node = document.getElementById('node' + source);
                let cx = Number(node.getAttribute("cx"));
                let cy = Number(node.getAttribute("cy"));
                src_node.cx = cx; src_node.cy = cy;

                node = document.getElementById('node' + target);
                cx = Number(node.getAttribute("cx"));
                cy = Number(node.getAttribute("cy"));
                trg_node.cx = cx; trg_node.cy = cy;

                DA.push({ source, target, line, src_node, trg_node });
            }
            let L = layer1.selectAll('line');
            //L[0].forEach(e => console.log('==> e: ', e));
            //console.log('coba 0 d ==> ', DA[0]);
            for (let i = 0; i < DA.length; i++) {
                /*let node = layer2.select('#node' + DA[i].source);
                let cx = Number(node[0][0].getAttribute("cx"));
                let cy = Number(node[0][0].getAttribute("cy"));
                DA[i].src_node.cx = cx;
                DA[i].src_node.cy = cy;
                console.log('src_node=> ', cx, ' | ', cy);

                node = layer2.select('#node' + DA[i].target);
                cx = Number(node[0][0].getAttribute("cx"));
                cy = Number(node[0][0].getAttribute("cy"));
                DA[i].trg_node.cx = cx;
                DA[i].trg_node.cy = cy;
                console.log('trg_node=> ', cx, ' | ', cy);*/
                //console.log(i, ' - d ==> ', DA[i]);

                for (let j = 0; j < L[0].length; j++) {
                    /*if( (dataAnimate[i].src_node.cx == Number(L[0][j].getAttribute('x1')) && 
                        dataAnimate[i].src_node.cy == Number(L[0][j].getAttribute('y1'))) &&
                        
                        (dataAnimate[i].trg_node.cx == Number(L[0][j].getAttribute('x2')) && 
                        dataAnimate[i].trg_node.cy == Number(L[0][j].getAttribute('y2')))
                      ){
                          dataAnimate[i].line.id = L[0][j].getAttribute('id');
                          dataAnimate[i].line.x1 = Number(L[0][j].getAttribute('x1'));
                          dataAnimate[i].line.x2 = Number(L[0][j].getAttribute('x2'));
                          dataAnimate[i].line.y1 = Number(L[0][j].getAttribute('y1'));
                          dataAnimate[i].line.y2 = Number(L[0][j].getAttribute('y2'));
                      }*/
                    //console.log(j, ' - ', L[0][j], ' | ', L[0][j].getAttribute('id'));
                }
            }

            let line1 = document.getElementById('line_1');
            let x1 = Number(line1.getAttribute('x1'));
            let y1 = Number(line1.getAttribute('y1'));
            let x2 = Number(line1.getAttribute('x2'));
            let y2 = Number(line1.getAttribute('y2'));

            animateLayer.append("line")
                .style({
                    "stroke": "red",
                    "stroke-width": "5px"
                })
                .attr({
                    x1: x1,
                    y1: y1,
                    x2: x1 + 10,
                    y2: y1 + 10
                })
                .transition()
                .duration(1500)
                .attr({
                    x2: x2,
                    y2: y2
                });

            setTimeout(function () {
                animateLayer.selectAll('line').remove();
            }, 5000);
        }

        //force.on("end", animation);
    }

    add_datum(dataset: any): void {
        setTimeout(this.add_node(dataset), 750);
    }

    add_node(dataset: any): void {
        if (this.indexNode < dataset.nodes.length) {
            this.NODES.push(dataset.nodes[this.indexNode]);
            this.indexNode++;
            this.redraw(dataset);
            this.add_datum(dataset); // call recursive
        } else if (this.indexEdge < dataset.edges.length) {
            this.LINKS.push(dataset.edges[this.indexEdge]);
            this.indexEdge++;
            this.redraw(dataset);
            this.add_datum(dataset); // call recursive
        }
    }

    remove_datum(dataset: any): void {
        setTimeout(this.remove_node(dataset), 750);
    }

    remove_node(dataset: any): void {
        if (this.NODES.length > dataset.nodes.length) {
            let n = this.NODES.splice((this.NODES.length - 1), 1);
            let edge = this.LINKS;

            this.LINKS = this.LINKS.filter(function (l) {
                return l.source.name !== n[0].name && l.target.name !== n[0].name;
            });

            this.LAYER2.selectAll('.node_' + n[0].name).remove();
            for (let i = edge.length - 1; i > this.LINKS.length - 1; i--) {
                this.LAYER1.selectAll('.link_' + i).remove();
            }
            this.redraw(dataset);
            this.remove_datum(dataset); // call recursive
        } else if (this.LINKS.length > dataset.edges.length) {
            let edge = this.LINKS.length - 1;
            this.LINKS.pop();
            this.LAYER1.selectAll('.link_' + edge).remove();
            this.redraw(dataset);
            this.remove_datum(dataset); // call recursive
        }
    }

    redraw(dataset: any): void {
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        this.FORCE.stop();

        // sticky node
        function dragstart(d) { d3.select(this).classed("fixed", d.fixed = true); }
        function dblclick(d) { d3.select(this).classed("fixed", d.fixed = false); }
        let drag = this.FORCE.drag().on("dragstart", dragstart);

        this.LINE = this.LINE.data(this.LINKS);
        this.LINE.enter()
            .insert("line")
            .attr("class", function (d, i) {
                return "link link_" + i;
            })
            .attr("id", function (d, i) {
                return "line_" + i;
            })
            .style("stroke", "#34495e");

        if (dataset.edges[0].weight) {
            this.LINE.enter()
                .insert('path')
                .attr({
                    'd': function (d) {
                        let path = 'M ' + getRandom(100, 400) + ' ' + getRandom(100, 400) + ' L ' + getRandom(100, 400) + ' ' + getRandom(100, 400);
                        return path;
                    },
                    'class': function (d, i) {
                        return 'edgepath link_' + i;
                    },
                    'id': function (d, i) {
                        return "edgepath_" + i;
                    }
                })
                .style("pointer-events", "none");

            this.LINE.enter()
                .insert('text')
                .style("pointer-events", "none")
                .attr({
                    'class': function (d, i) {
                        return 'edgelabel link_' + i;
                    },
                    'id': function (d, i) {
                        return "edgelabel_" + i;
                    },
                    'dx': 60,
                    'dy': -5,
                    'font-size': 12,
                    'fill': 'black'
                })
                .insert('textPath')
                .attr('id', function (d, i) {
                    return 'textpath_' + i;
                })
                .attr("class", function (d, i) {
                    return "link_" + i;
                })
                .attr('xlink:href', function (d, i) {
                    return '#edgepath_' + i;
                })
                .style("pointer-events", "none")
                .text(function (d) {
                    return d.weight; // bobot nilai garis
                });
        }

        this.LINE.exit()
            .remove();

        this.CIRCLE = this.CIRCLE.data(this.NODES);
        this.CIRCLE.enter()
            .insert("circle")
            .attr("r", 15)
            .attr("id", function (d) {
                return "node" + d.name;
            })
            .attr("class", function (d) {
                return "node node_" + d.name;
            })
            .attr("cursor", "move")
            .on("dblclick", dblclick)
            .call(drag);
        this.CIRCLE.append('title').text('double-click and drag to sticky');

        this.CIRCLE.enter()
            .insert("text")
            .attr("class", function (d) {
                return "nodelabel node_" + d.name;
            })
            .attr("id", function (d) {
                return "nodelabel" + d.name;
            })
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .attr("text-anchor", "middle")
            .attr("dy", ".4em")
            .attr("stroke", "#ecf0f1")
            .attr("fill", "#ecf0f1")
            .text(function (d) {
                return d.name;
            });

        this.CIRCLE.exit()
            .remove();

        this.FORCE.start();
    }

    animate(curStep: number): void {
        /**
         * TODO: Cari line antara node source & target
         * 1. all_line = selectAll line;
         * 2. for line in all_line:
         *        if  line.x1 == src_node.cx && line.y1 == src_node.cy:
         *              if line.x2 == trg_node.cx && line.y2 == trg_node.cy:
         *                      select this line_id & animate;
         *                      break;
         */
        function parse(json: any) {
            $.each(json, function (key, val) {
                if (typeof val === 'object') {
                    if (key === KEY.source_var) {
                        console.log(`==KEY.source_var==${key}==${val[3]}==`);
                        KEY.source = val[3];
                    }
                    if (key === KEY.target_var) {
                        console.log(`==KEY.target_var==${key}==${val[3]}==`);
                        KEY.target = val[3];
                    }
                    parse(val);
                }
            });
        }

        function searchLine(src, trg) {
            let line: any = {}; line.id = ''; line.x1 = 0; line.x2 = 0; line.x2 = 0; line.y2 = 0;
            let link = document.getElementsByClassName('link');
            let src_node = document.getElementById('node' + src);
            let trg_node = document.getElementById('node' + trg);
            let src_node_cx = Number(src_node.getAttribute('cx'));
            let src_node_cy = Number(src_node.getAttribute('cy'));
            let trg_node_cx = Number(trg_node.getAttribute('cx'));
            let trg_node_cy = Number(trg_node.getAttribute('cy'));
            console.log('src_node: ' + src_node + ' | trg_node: ' + trg_node);
            console.log('src_node_cx: ' + src_node_cx + ' | src_node_cy: ' + src_node_cy);
            console.log('trg_node_cx: ' + trg_node_cx + ' | trg_node_cy: ' + trg_node_cy);

            for (let i = 0; i < link.length; i++) {
                let x1 = Number(link[i].getAttribute('x1'));
                let y1 = Number(link[i].getAttribute('y1'));
                console.log('x1: ' + x1 + ' | y1: ' + y1);
                let x2 = Number(link[i].getAttribute('x2'));
                let y2 = Number(link[i].getAttribute('y2'));
                console.log('x2: ' + x2 + ' | y2: ' + y2);

                if (x1 == src_node_cx && y1 == src_node_cy) {
                    if (x2 == trg_node_cx && y2 == trg_node_cy) {
                        line.id = link[i].getAttribute('id');
                        line.x1 = x1; line.y1 = y1;
                        line.x2 = x2; line.y2 = y2;
                        console.log('==>line: ' + JSON.stringify(line));
                        break;
                    }
                } else if (x1 == trg_node_cx && y1 == trg_node_cy) {
                    if (x2 == src_node_cx && y2 == src_node_cy) {
                        line.id = link[i].getAttribute('id');
                        line.x1 = x2; line.y1 = y2;
                        line.x2 = x1; line.y2 = y1;
                        console.log('==>line: ' + JSON.stringify(line));
                        break;
                    }
                }

            }

            return line;
        }

        //console.log('========\n', JSON.stringify(this.dTrace[curStep - 1]), '\n=========');
        if (KEY.source_var && KEY.target_var) {
            switch (this.VIZ) {
                case GRAPH.None:

                    break;

                case GRAPH.MatrixGlobal:
                case GRAPH.PointerGlobal:

                    break;

                case GRAPH.MatrixLocal:
                    console.log('animate - MatrixLocal');
                    let error = false;
                    try { // sometimes error, cause not all line have it (this attribut)
                        parse(this.dTrace[curStep - 1].stack_to_render[1].encoded_locals); // TODO: find value only in "is_highlighted":true , how?
                    } catch (error) {
                        error = true;
                        console.log('error');
                    }
                    if (error) parse(this.dTrace[curStep - 1].stack_to_render[0].encoded_locals);

                    if ((KEY.source && KEY.target) && (KEY.source !== KEY.target)) {
                        console.log('s: ', KEY.source, ' - t: ', KEY.target);
                        let edge = searchLine(KEY.source, KEY.target);
                        this.animationColor(KEY.source, KEY.target, edge);
                        console.log('==> Edge: ' + JSON.stringify(edge));
                    }
                    break;
            }
        }

        KEY.source_var = null; KEY.source = null;
        KEY.target_var = null; KEY.target = null;
    }

    animationColor(src, trg, line): void {
        this.LAYER2.select("#node" + src)
            .transition()
            .duration(750)
            .attr("stroke", "#f1c40f")
            .attr("stroke-width", "7px")
            .delay(1500)
            .transition()
            .duration(1750)
            .attr("stroke-width", "0px");

        this.ANIMATELAYER.append("line")
            .style({
                "stroke": "red",
                "stroke-width": "5px"
            })
            .attr({
                x1: line.x1,
                y1: line.y1,
                x2: line.x1 + 10,
                y2: line.y1 + 10
            })
            .transition()
            .duration(1500)
            .attr({
                x2: line.x2,
                y2: line.y2
            });
        
        this.LAYER2.select("#node" + trg)
            .transition()
            .duration(750)
            .attr("stroke", "#f1c40f")
            .attr("stroke-width", "7px")
            .delay(1500)
            .transition()
            .duration(1750)
            .attr("stroke-width", "0px");

        let animateLayer = this.ANIMATELAYER;
        setTimeout(function () {
            animateLayer.selectAll('line').remove();
        }, 3000);
    }
}