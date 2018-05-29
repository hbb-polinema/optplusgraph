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

export class GraphVisualizer {
    divTab: any;
    dTrace: any;
    SVG: any = null; FORCE: any; LAYER1: any; LAYER2: any;
    NODES: any; LINKS: any; CIRCLE: any; LINE: any; ANIMATELAYER: any;
    initialRender: boolean = false;
    indexNode: number; indexEdge: number;
    isCPP: boolean = false; // C or C++ mode
    equalDrawed: boolean = false;
    /**
     * dataGraph = {
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
    dataGraph: any = {};
    tempStep: any = [];
    dataChangedOnStep: number;
    VIZ: GRAPH = GRAPH.None;
    G: any = { "directed": null, "instantValue": null };

    width: number = 444;
    readonly height: number = 444;

    constructor(content, dataTrace, isCppMode) {
        this.divTab = content;
        this.dTrace = dataTrace;
        this.isCPP = isCppMode;

        this.checkModelGraph(isCppMode);
    }

    checkModelGraph(isCppMode: boolean): void {
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

        this.tempStep[0] = 0;
        this.tempStep[1] = 0;
        this.dataChangedOnStep = 0;
    }

    model01_MatrixGlobal(): void { // Model-01: matrix variable on global --> always available in first step
        // TODO: check other var for support this model process
        let C_MUL_AR_isFound = false, isDifferent = false;
        let MATRIX_BFR: any; // for compare matrix before and after step
        let instantValue = false;
        let G = this.G;

        function get_matrix(data: any, step: number) {
            let DATA_GRAPH: any = {};
            $.each(data, function (key, val) {
                if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0 && !C_MUL_AR_isFound) { // found only 1 matrix for this model

                    C_MUL_AR_isFound = true; KEY.keyname = key;
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

                    for (let row = 0; row < row_length; row++) {
                        value[row] = [];
                        for (let col = 0; col < col_length; col++) {
                            value[row][col] = temp[index];
                            index++;
                        }
                    }
                    // directed or undirected
                    for (let row = 0; row < row_length; row++) {
                        for (let col = 0; col < col_length; col++) {
                            if (row == col) continue;// source == target. So, it shouldn't same! // ignore and continue loop
                            if (value[row][col] !== value[col][row]) G.directed = true;
                        }
                    }

                    // for matrix instant initial value
                    if (instantValue) {
                        // ambil data graf, keluar dari each
                        G.instantValue = true; index = 0;
                        let nodes = [], edges = [], duplicate = false;
                        for (let row = 0; row < row_length; row++) {
                            for (let col = 0; col < col_length; col++) {
                                if (row == col) { // source == target. So, it shouldn't same!
                                    index++;
                                    continue; // ignore and continue loop
                                }

                                duplicate = edges.some(function (e) { return e.source === col && e.target === row; }); // duplicate edge or not
                                if (weighted && temp[index] > 0) {
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
                        MATRIX_BFR = value;
                    }

                } else if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0) { // if exist one more matrix

                    C_MUL_AR_isFound = false;
                    console.log('Matrix is found twice!'); // not match this model

                } else if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step > 0) { // compare data in second step

                    let [row, col] = (String(val[2])).split(',');
                    let size = (Number([row]) * Number([col])) + 2; // get dimension of matrix
                    let index = 0, temp = [], weighted = false;
                    for (let i = 3; i <= size; i++) {
                        if (val[i][0] === 'C_DATA' && val[i][2] === 'int') {
                            temp[index] = val[i][3]; // temp value
                            if (temp[index] > 1) weighted = true;
                            index++;
                        } else {
                            console.log('something not int'); // TODO: required to be re-tested
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
                            if (weighted) {
                                if (MATRIX_BFR[row][col] != temp[index] && temp[index] > 0 && row != col) {
                                    isDifferent = true;
                                    edges.push({ "source": row /*origin node*/, "target": col /*destination node*/, "weight": temp[index] });
                                    nodes.push(row, col);
                                } else if (temp[index] > 0 && row != col) { // node before stay drawed
                                    edges.push({ "source": row, "target": col, "weight": temp[index] });
                                    nodes.push(row, col);
                                }
                            } else {
                                if (MATRIX_BFR[row][col] != temp[index] && temp[index] == 1 && row != col) {
                                    isDifferent = true;
                                    edges.push({ "source": row /*origin node*/, "target": col /*destination node*/ });
                                    nodes.push(row, col);
                                } else if (temp[index] == 1 && row != col) { // node before stay drawed
                                    edges.push({ "source": row, "target": col });
                                    nodes.push(row, col);
                                }
                            }

                            index++;
                        }
                    }

                    // directed or undirected
                    for (let row = 0; row < row_length; row++) {
                        for (let col = 0; col < col_length; col++) {
                            if (row == col) continue;// source == target. So, it shouldn't same! // ignore and continue loop
                            if (value[row][col] !== value[col][row]) G.directed = true;
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

                        MATRIX_BFR = value;
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
                } else this.dataGraph.values[0] = MATRIX_BFR;
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
            this.G = G;
        }
    }

    model02_MatrixLocal(): void { // Model-02: matrix variable on local
        let C_MUL_AR_isFound = false, isDifferent = false;
        let MATRIX: any;

        function get_matrix(data: any, step: number) {
            let DATA_GRAPH: any = {};
            $.each(data, function (key, val) {
                if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0 && !C_MUL_AR_isFound) { // TODO: here value always zero, why?

                    C_MUL_AR_isFound = true; KEY.keyname = key;
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
                            console.log('something not int'); // TODO: required to be re-tested
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
        }
    }

    model03_PointerGlobal(): void { // Model-03: struct, pointer, array
        /**
         * TODO: check STRUCT --> node/pointer --> relation/link/edge
         * - what about weighted or unweighted?
         * - directed or undirected can check: if available[(src,trg) && (trg,src)]
         * - filter duplicate nodes (DONE), edges (DONE)
         * - is there pointer global or local ?
         * - what about lib c++ list, vector, arrayList, class, procedure/function ?
         */

        let C_STRUCT = false, G = this.G;
        let edges_temp = [], nodes = [];
        let dataHeap = [];
        let EDGES = [], targetNodes = [];

        function parseHeap(dataJSON: any) {
            let rootLengthPacket = [], subRootLengthPacket = [];
            $.each(dataJSON, function (key, val) {
                dataHeap.push(val); // contain data graph pointer

                if (Array.isArray(val) && val[0] === "C_ARRAY") {
                    rootLengthPacket.push(val.length);
                    if (Array.isArray(val[2])) {
                        subRootLengthPacket.push(val[2].length);
                    }
                }
            });

            let root = rootLengthPacket.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
            let subRoot = subRootLengthPacket.filter(function (item, i, ar) { return ar.indexOf(item) === i; });

            let modusRoot = getModus(root, rootLengthPacket); // get most data show up, TODO: how if nothing? every value just 1
            let modusSubRoot = getModus(subRoot, subRootLengthPacket);
            let adj = [], struct = [], foundAdjList = false;

            for (let i = 0; i < dataHeap.length; i++) { // get data graph. TODO: very much for loop, need improve!
                if (dataHeap[i].length === modusRoot && dataHeap[i][2].length === modusSubRoot) {
                    if (dataHeap[i][2][0] === "C_STRUCT") {
                        struct.push(dataHeap[i][2]);
                        KEY.keyname = dataHeap[i][2][2];
                    }
                }

                if (dataHeap[i][0] === "C_ARRAY" && !foundAdjList) {
                    for (let j = 2; j < dataHeap[i].length; j++) {
                        if (dataHeap[i][j][2] === "pointer") {
                            adj.push(dataHeap[i][j]);
                            foundAdjList = true; // TODO: possible have one more adjList?
                        }
                    }
                }
            }

            let src_nodes = [];
            for (let src = 0; src < adj.length; src++) {
                if (adj[src][3] !== "0x0" && adj[src][3] !== "<UNINITIALIZED>") {
                    getTargetNodes(adj[src][3], struct);
                    if (targetNodes.length > 0) {
                        for (let i = 0; i < targetNodes.length; i++) {
                            if (isDuplicate(EDGES, src, targetNodes[i])) { // filter duplicate edges
                                EDGES.push({ "source": src, "target": targetNodes[i] }); // TODO: before push, check ordering edges in dataGraph. cause break rendering
                                nodes.push(src, targetNodes[i]);
                            }
                        }
                    }
                    targetNodes = [];
                }
            }
            getUniqueNode();
            //console.log(EDGES);
            return EDGES;
        }

        function getUniqueNode() {
            let get_unique_node = nodes.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
            nodes = [];
            get_unique_node.sort();
            get_unique_node.forEach(e => { nodes.push({ "name": e }); });
            for (let i = 0; i < EDGES.length; i++) { // change `value edge` based on position `nodes.name`
                let position = get_unique_node.indexOf(EDGES[i].source);
                EDGES[i].source = position;
                position = get_unique_node.indexOf(EDGES[i].target);
                EDGES[i].target = position;
            }
        }

        function isDuplicate(e, src, trg) {
            if (e.some(function (d) { return d.source === trg && d.target === src; })) {
                //console.log('undirected');
                return false;
            } else if (e.some(function (d) { return d.source === src && d.target === trg; })) {
                //console.log('directed');
                return false;
            } else {
                return true;
            }
        }

        function getTargetNodes(src, struct) {
            for (let trg = 0; trg < struct.length; trg++) {
                if (src === struct[trg][1]) {
                    targetNodes.push(struct[trg][3][1][3]);
                    if (struct[trg][4][1][3] !== "0x0" && struct[trg][4][1][3] !== "<UNINITIALIZED>") {
                        getTargetNodes(struct[trg][4][1][3], struct);
                    }
                }
            }
        }

        function getModus(data1: any, data2: any) {
            let modus = 0, higherVal = 0, rootData = 0;
            for (let i = 0; i < data1.length; i++) {
                for (let j = 0; j < data2.length; j++) {
                    if (data1[i] == data2[j]) {
                        modus++;
                    }
                }

                if (modus > higherVal) {
                    higherVal = modus;
                    rootData = data1[i];
                }
                modus = 0; // reset
            }

            return rootData;
        }

        function arrayDiff(arr1, arr2) { // compare two data array to eliminate duplicate data every step
            if (arr1.length !== arr2.length)
                return true;
            for (let i = arr1.length; i--;) {
                if (arr1[i].source !== arr2[i].source || arr1[i].target !== arr2[i].target)
                    return true;
            }
            return false;
        }

        let index = 1, edges = [];
        this.dataGraph.step[0] = 0;
        this.dataGraph.values[0] = { "nodes": "first", "edges": "first" };

        function isDuplicateBeforePush(e, src, trg) {
            for (let i = 0; i < e.length; i++) {
                if (e[i].source === src && e[i].target === trg)
                    return true;
            }
            return false;
        }

        function pushOrderEdges(edgesOlder, edgesNew) {
            let newEdges = [];
            //console.log('pushOrderEdges======\nedgesNow: ' + JSON.stringify(e));
            let lengthE = edgesNew.length;
            if (edgesOlder.length < edgesNew.length) {
                for (let i = 0; i < edgesOlder.length; i++) { // TODO: need improve, very much for loop
                    for (let j = 0; j < lengthE; j++) {
                        if (edgesNew[j].source === edgesOlder[i].source && edgesNew[j].target === edgesOlder[i].target) {
                            edgesNew.splice(j, 1);
                            lengthE = edgesNew.length;
                        }
                    }
                }
                for (let i = 0; i < edgesOlder.length; i++) {
                    for (let j = 0; j < edgesNew.length; j++) {
                        if (edgesNew[j].source !== edgesOlder[i].source || edgesNew[j].target !== edgesOlder[i].target) {
                            if (!isDuplicateBeforePush(newEdges, edgesNew[j].source, edgesNew[j].target)) newEdges.push(edgesNew[j]);
                        }
                    }
                }
            } else if (edgesOlder.length > edgesNew.length) { //TODO: how if removed node ?
                //newEdges.pop();
                console.log('pop');
            }

            //console.log('edgesOlder: ' + JSON.stringify(edgesOlder));
            //console.log('newEdges: ' + JSON.stringify(newEdges));

            return newEdges.length > 0 ? edgesOlder.concat(newEdges) : edgesOlder;
        }

        function pushOrderNodes(nodesOlder, nodesNew){
            //console.debug('nodesOlder: ' + JSON.stringify(nodesOlder));
            //console.debug('nodesNew: ' + JSON.stringify(nodesNew));
            let lengthN = nodesNew.length;
            if(nodesOlder.length < nodesNew.length){
                for(let i = 0; i < nodesOlder.length; i++){
                    for(let j = 0; j < lengthN; j++){
                        if(nodesNew[j].name === nodesOlder[i].name){
                            nodesNew.splice(j, 1);
                            lengthN = nodesNew.length;
                            break;
                        }
                    }
                }
            } else if (nodesOlder.length > nodesNew.length){
                // TODO: removed nodes process
            }

            //console.debug('=======> nodesNew: ' + JSON.stringify(nodesNew));
            return nodesNew.length > 0 ? nodesOlder.concat(nodesNew) : nodesOlder;
        }

        /**
         * This is main execution/process data
         * There is 6 function needed: parseHeap, getUniqueNode, isDuplicate, getTargetNodes, getModus, arrayDiff
         */
        for (let i = 1; i < this.dTrace.length; i++) {
            edges = parseHeap(this.dTrace[i].heap);
            if (Object.keys(this.dTrace[i].heap).length > 1 && edges.length > 0) { // check heap is not empty                
                let tempEdges = [];//, tempNodes = [];
                if (index >= 2) {
                    console.log('Edges on Index: ' + JSON.stringify(edges));
                    tempEdges = pushOrderEdges(this.dataGraph.values[index - 1].edges, edges);
                    edges = tempEdges;
                    //tempNodes = pushOrderNodes(this.dataGraph.values[index - 1].nodes, nodes);
                    //nodes = tempNodes;
                }

                if (arrayDiff(this.dataGraph.values[index - 1].edges, edges)) {
                    console.error('Edges: ' + JSON.stringify(edges));
                    this.dataGraph.step[index] = i;
                    this.dataGraph.values[index] = { nodes, edges };
                    console.error(i + ' | ' + JSON.stringify(this.dataGraph.values[index]));
                    console.log('============================');
                    index++; C_STRUCT = true;
                }
            }
            nodes = []; edges = []; EDGES = [];// reset to empty array            
            dataHeap = [];
        }

        if (C_STRUCT) { // if match this model | TODO: pointer always in struct ?
            console.log('GRAPH.PointerGlobal');
            this.VIZ = GRAPH.PointerGlobal;
        }
    }

    model04_PointerLocal(): void { // Model-04: pointer local variable
        // belum menemukan contoh graf kode program dg model ini
    }

    model05_Matrix2Dimension(): void {
        // [ [src,trg], [src,trg], ... ] model seperti ini gmn jk berbobot?
    }

    infoBar(): void {
        this.SVG.append("text")
            .attr({
                "id": "infoBar",
                "x": 11,
                "y": 11,
                "text-anchor": "start",
            })
            .style("font-size", "10pt")
            .style("fill", "#34495e")
            .text(`var: `);
    }

    render(curStep: number): void {
        if (!this.isCPP) // make sure in C/C++ mode
            return;

        if (this.SVG !== null) this.animate(curStep);

        let diff = false;
        if (this.dataChangedOnStep === 0) { // The First Step
            this.dataChangedOnStep++;
        } else if (this.dataChangedOnStep === 1) { // The Next Step, wherever jump or not
            this.tempStep[1] = this.getDatum(this.dataGraph, curStep);
            this.dataChangedOnStep++;
        } else if (this.dataChangedOnStep > 1) { // The Next Step and so on
            this.tempStep[0] = this.tempStep[1];
            this.tempStep[1] = this.getDatum(this.dataGraph, curStep);
            diff = this.diffData(this.tempStep[0], this.tempStep[1]); // compare data before step and after
            if (diff) this.equalDrawed = false; // if data different, draw it
        }

        let data = null;
        switch (this.VIZ) { // helper for model
            case GRAPH.None:
                this.divTab.html('<h3>Nothing Graph Structure!</h3>');
                break;

            case GRAPH.MatrixGlobal:
            case GRAPH.PointerGlobal:
                if (this.equalDrawed && this.SVG) return;
                data = this.getDatum(this.dataGraph, curStep);
                if (this.initialRender) {
                    this.divTab.html('<div id="graph"></div>');
                    //this.canvas.append('<br>' + JSON.stringify(this.dTrace[curStep], undefined, 4));
                    //this.compute_trace_data(curStep);
                    this.width = $("#graph").outerWidth(true);
                    this.SVG = d3.select("#graph").append("svg")
                        .attr({
                            "width": this.width,
                            "height": this.height
                        }).style("background-color", "#ecf0f1");

                    this.SVG.append("text")
                        .attr({
                            "id": "statusBar",
                            "x": this.width - 11,
                            "y": this.height - 11,
                            "text-anchor": "end",
                        })
                        .style("font-size", "10pt")
                        .style("fill", "#34495e")
                        .text(`Node: - item | Edge: - link`);

                    this.infoBar();
                    if (KEY.keyname) d3.select("#infoBar").text(`var: ${KEY.keyname}`);
                }

                if (data) {
                    this.drawGraph2(data);
                    let weightText = "unweighted";
                    try {
                        if (data.edges[0].weight) weightText = "weighted";
                    } catch (error) {
                        weightText = "unweighted"; // ?? - sometime can't catch here
                    }
                    d3.select("#statusBar").text(`Node: ${data.nodes.length} item | Edge: ${data.edges.length} link | ${weightText} | ${this.G.directed ? "directed" : "undirected"}`); // TODO: undirected --> access G.directed
                }
                break;

            case GRAPH.MatrixLocal:
                if (this.equalDrawed && this.SVG) return;
                data = this.getDatum(this.dataGraph, curStep);
                if (this.initialRender) {
                    this.divTab.html('<div id="graph"></div>');
                    //this.canvas.append('<br>' + JSON.stringify(this.dTrace[curStep], undefined, 4));
                    //this.compute_trace_data(curStep);
                    this.width = $("#graph").outerWidth(true);
                    this.SVG = d3.select("#graph").append("svg")
                        .attr({
                            "width": this.width,
                            "height": this.height
                        }).style("background-color", "#ecf0f1");

                    this.SVG.append("text")
                        .attr({
                            "id": "statusBar",
                            "x": this.width - 11,
                            "y": this.height - 11,
                            "text-anchor": "end",
                        })
                        .style("font-size", "10pt")
                        .style("fill", "#34495e")
                        .text(`Node: - item | Edge: - link`);

                    this.infoBar();
                    if (KEY.keyname) d3.select("#infoBar").text(`var: ${KEY.keyname}`);
                }

                if (data) {
                    this.drawGraph2(data);
                    let weightText = "unweighted";
                    try {
                        if (data.edges[0].weight) weightText = "weighted";
                    } catch (error) {
                        weightText = "unweighted"; // ?? - sometime can't catch here
                    }
                    d3.select("#statusBar").text(`Node: ${data.nodes.length} item | Edge: ${data.edges.length} link | ${weightText} | undirected`); // TODO: undirected --> access G.directed
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

    getDatum(data: any, step: number): any {
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

    diffData(data1: any, data2: any): boolean {
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

            this.ANIMATELAYER = this.SVG.append("g").attr("id", "animateLayer");
            this.LAYER1 = this.SVG.append("g").attr("id", "layerLine");

            this.LAYER1.append('defs').append('marker') // arrowhead
                .attr({
                    'id': 'arrowhead',
                    'viewBox': '-0 -5 10 10',
                    'refX': 25,
                    'refY': 0,
                    'orient': 'auto',
                    'markerWidth': 9,
                    'markerHeight': 9,
                    'xoverflow': 'visible'
                })
                .append('svg:path')
                .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
                .attr('fill', '#34495e')
                .attr('stroke', '#34495e');

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
        try {
            if (dataset.edges[0].weight) haveWeight = true;
        } catch (error) {
            haveWeight = false;
        }

        if (this.NODES.length < dataset.nodes.length) {
            this.addDatum(dataset);
        } else if (this.NODES.length > dataset.nodes.length) {
            this.removeDatum(dataset);
        } else if (this.LINKS.length < dataset.edges.length) {
            this.addDatum(dataset);
        } else if (this.LINKS.length > dataset.edges.length) {
            this.removeDatum(dataset);
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
    }

    addDatum(dataset: any): void {
        setTimeout(this.addNode(dataset), 750);
    }

    addNode(dataset: any): void {
        if (this.indexNode < dataset.nodes.length) {
            this.NODES.push(dataset.nodes[this.indexNode]);
            this.indexNode++;
            this.redraw(dataset);
            this.addDatum(dataset); // call recursive
        } else if (this.indexEdge < dataset.edges.length) {
            this.LINKS.push(dataset.edges[this.indexEdge]);
            this.indexEdge++;
            this.redraw(dataset);
            this.addDatum(dataset); // call recursive
        }
    }

    removeDatum(dataset: any): void {
        setTimeout(this.removeNode(dataset), 750);
    }

    removeNode(dataset: any): void {
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
            this.removeDatum(dataset); // call recursive
        } else if (this.LINKS.length > dataset.edges.length) {
            let edge = this.LINKS.length - 1;
            this.LINKS.pop();
            this.LAYER1.selectAll('.link_' + edge).remove();
            this.redraw(dataset);
            this.removeDatum(dataset); // call recursive
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

        if (this.G.directed) {
            this.LINE.attr('marker-end', 'url(#arrowhead)');
        }

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
            let link = document.getElementsByClassName('link'); // TODO: how if no link between node_src and node_trg ?
            let src_node = document.getElementById('node' + src);
            let trg_node = document.getElementById('node' + trg);
            let cx1, cy1, cx2, cy2, src_node_cx, src_node_cy, trg_node_cx, trg_node_cy;
            try {
                cx1 = src_node.getAttribute('cx'); cx2 = trg_node.getAttribute('cx');
                cy1 = src_node.getAttribute('cy'); cy2 = trg_node.getAttribute('cy');
            } catch (error) {
                return;
            }
            if (cx1) src_node_cx = Number(cx1);
            if (cy1) src_node_cy = Number(cy1);
            if (cx2) trg_node_cx = Number(cx2);
            if (cy2) trg_node_cy = Number(cy2);
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

        //let error = false;
        if (KEY.source_var && KEY.target_var) {
            switch (this.VIZ) {
                case GRAPH.None:

                    break;

                case GRAPH.MatrixGlobal:
                case GRAPH.PointerGlobal:
                    console.log('animate - MatrixGlobal');

                    parse(this.dTrace[curStep - 1].globals);

                    console.log('s: ', KEY.source, ' - t: ', KEY.target);
                    if (KEY.source == null || KEY.target == null) { // find in local, maybe in function/procedure
                        try { // sometimes error, cause not all line have it (this attribut)
                            parse(this.dTrace[curStep - 1].stack_to_render[1].encoded_locals);
                        } catch (e) {
                            //error = true;
                            parse(this.dTrace[curStep - 1].stack_to_render[0].encoded_locals);
                            console.log('error');
                        }
                    }

                    if (KEY.source !== null && KEY.target !== null) {
                        if (KEY.source !== KEY.target) {
                            let edge = searchLine(KEY.source, KEY.target);
                            if (edge) this.animationColor(KEY.source, KEY.target, edge);
                            console.log('==> Edge: ' + JSON.stringify(edge));
                        }
                    }
                    break;

                case GRAPH.MatrixLocal:
                    console.log('animate - MatrixLocal');

                    try { // sometimes error, cause not all line have it (this attribut)
                        parse(this.dTrace[curStep - 1].stack_to_render[1].encoded_locals);
                    } catch (e) {
                        //error = true;
                        parse(this.dTrace[curStep - 1].stack_to_render[0].encoded_locals);
                        console.log('error');
                    }

                    console.log('s: ', KEY.source, ' - t: ', KEY.target, '\nKEY: ', JSON.stringify(KEY));
                    if (KEY.source !== null && KEY.target !== null) {
                        if (KEY.source !== KEY.target) {
                            let edge = searchLine(KEY.source, KEY.target);
                            if (edge) this.animationColor(KEY.source, KEY.target, edge);
                            console.log('==> Edge: ' + JSON.stringify(edge));
                        }
                    }
                    break;
            }
        }

        KEY.source_var = null; KEY.source = null;
        KEY.target_var = null; KEY.target = null;
    }

    animationColor(src, trg, line): void { // TODO: add corner info label --> visual variabel graf and what doing
        d3.select("#infoBar").text(`var: ${KEY.keyname}\nAnimating in progress\n${src} -> ${trg}`);

        this.LAYER2.select("#node" + src)
            .transition()
            .duration(250)
            .attr("stroke", "#f1c40f")
            .attr("stroke-width", "7px")
            .delay(1500)
            .transition()
            .duration(1750)
            .attr("stroke-width", "0px");

        if (line.id !== "") {
            console.log('===>append line');
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
        }

        this.LAYER2.select("#node" + trg)
            .transition()
            .duration(750)
            .attr("stroke", "#f1c40f")
            .attr("stroke-width", "7px")
            .delay(1500)
            .transition()
            .duration(1750)
            .attr("stroke-width", "0px");

        if (line.id !== "") {
            console.log('===>remove line');
            let animateLayer = this.ANIMATELAYER;
            setTimeout(function () {
                animateLayer.selectAll('line').remove();
            }, 3000);
        }
    }
}