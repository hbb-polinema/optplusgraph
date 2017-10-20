/**
 * Author   : Habibie Ed Dien (habibie.tk@gmail.com)
 * Class    : Model for detect Graph and Tree in code C/C++
 */
require('../../lib/jquery-3.0.0.min.js');
require('../../lib/d3.v3.min.js');

export class GraphViz {
    canvas: any;
    dTrace: any;
    d3Graph: any;
    isCPP: boolean = false; // C or C++ mode
    /**
     * data_graph = {
     * "step" : [3,4,5,8,10],
     * "value" : [{ 
     *              nodes: [{ name: 1 }, { name: 2 }],
     *              edges: [{ source: 0, target: 1}, { source: 2, target: 1}] 
     *           }], 
     *           [{ 
     *              ...
     *           }]
     * }
     */
    dataGraph: any = {};

    readonly width: number = 333;
    readonly heigth: number = 333;

    constructor(content, dataTrace, isCppMode) {
        this.canvas = content;
        this.dTrace = dataTrace;
        this.isCPP = isCppMode;

        this.dataGraph.step = [];
        //this.dataGraph.step[0] = 3;
        //this.dataGraph.step[1] = 5;
        //this.dataGraph.step[2] = 6;
        this.dataGraph.values = [];
        //this.dataGraph.values[0] = this.set_data();
        //this.dataGraph.values[1] = this.set_data();
        //this.dataGraph.values[3] = this.set_data();
        //console.log('dataGraph.values[1].edges[0]: ' + JSON.stringify(this.dataGraph.values[1].edges[0]));

        if (isCppMode) this.BFS_model01();
        this.BFS_model02();
    }

    BFS_model01(): void { // Model-01: matrix variable on global --> always available in first step
        let C_MUL_AR_isFound = false, isDifferent = false;
        let MATRIX: any;

        function get_matrix(data: any, step: number) {
            let DATA_GRAPH: any = {};
            $.each(data, function (key, val) {

                if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0 && !C_MUL_AR_isFound) { // found only 1 matrix for this model

                    C_MUL_AR_isFound = true;
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

                } else if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' && step == 0) { // if exist one more matrix

                    C_MUL_AR_isFound = false;
                    console.log('Matrix is found twice!'); // not match this model
                    // TODO: return false for this model

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
                    let value = [], e = 0, edges = [], nodes = [], n = 0;
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
                                //nodes.push(col);
                            } else if (temp[index] == 1 && row != col) {
                                edges.push({ "source": row /*origin node*/, "target": col /*destination node*/ });
                                nodes.push(row, col);
                                //nodes.push(col);
                            }
                            index++;
                        }
                    }

                    if (isDifferent) { // there is different value
                        console.log('nodes >> ' + JSON.stringify(nodes));
                        let get_unique_node = nodes.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
                        nodes = [];
                        console.log('get_unique_node >> ' + get_unique_node);
                        for(let i = 0; i < get_unique_node.length; i++){
                            nodes.push({ "name": get_unique_node[i] });
                        }

                        MATRIX = value;
                        DATA_GRAPH = { nodes, edges };
                        console.log('----\data: ' + JSON.stringify(DATA_GRAPH));
                    }
                }
            });

            return DATA_GRAPH;
        } // END func get_matrix()

        let index = 0; let DATA;
        for (let i = 0; i < this.dTrace.length; i++) {
            DATA = get_matrix(this.dTrace[i].globals, i);
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
        } // END for

        if (C_MUL_AR_isFound) { // if match this model
            /*$.each(this.dataGraph, function (key, val) {
                console.log(`dataGraph>> key: ${key} | val: ${val}`);
            });*/
            for (let i = 0; i < this.dataGraph.step.length; i++) {
                console.log(`dataGraph>> step: ${this.dataGraph.step[i]} | val: ${JSON.stringify(this.dataGraph.values[i])}`);
            }
        } else {
            console.log('not match');
        }

        /*let a = ["1", "1", "2", "3", "3", "1"];
        let unique = a.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
        console.log('unique: ' + unique);*/
    }

    BFS_model02(): void { // Model-02: matrix variable on local
        let C_MUL_AR_isFound = false;
        let C_MULTIDIMENSIONAL_ARRAY: any = {};

        $.each(this.dTrace[0].stack_to_render[0].encoded_locals, function (key, val) {
            //console.log(`m2>> key: ${key} | val: ${val}`);
            if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY') {
                console.log(`-----\nkey: ${key} val[0]: ${val[0]} \n val[1]: ${val[1]}`);
            }
        });
    }

    render(curStep: number): void {
        this.canvas.html('Step: ' + curStep);

        if (this.isCPP) {
            this.canvas.append('<br>' + JSON.stringify(this.dTrace[curStep], undefined, 4));
            this.canvas.append('<hr><div id="graph"></div>');
            this.compute_trace_data(curStep);
            this.d3Graph = d3.select("#graph").append('svg')
                .attr({
                    "width": this.width,
                    "height": this.heigth
                });
            //this.draw_BFS_model01(this.set_data());
            for (let i = 1; i < this.dataGraph.step.length; i++) {
                if (curStep == this.dataGraph.step[i]) {
                    console.log(`this.dataGraph.values[${i}]:\n` + JSON.stringify(this.dataGraph.values[i]));
                    let temp = this.dataGraph.values[i];
                    //this.draw_BFS_model01(temp);
                    break;
                }
            }
        } else {
            this.canvas.html('<p>For now, Only support for C or C++</p>');
        }
    }

    compute_trace_data(curStep: number): void {
        let mycanvas = this.canvas; // initial to access nested in func

        function parse(data_json: any) {
            $.each(data_json, function (key, val) {
                if (typeof val == 'object') {
                    mycanvas.append(`<h3>"${key}"</h3>`);
                    parse(val);
                } else {
                    mycanvas.append(`<hr><b>key: </b>${key} | <b>val: </b>${val}`);
                    evaluate(val);
                }
            });
        }
        function evaluate(input_val: any) {
            if (input_val === 'C_ARRAY') {
                mycanvas.append(`<p style="color:red">Array</p>`);
            } else if (input_val === 'C_STRUCT') {
                mycanvas.append(`<p style="color:blue">Struct</p>`);
            } else if (input_val === 'C_MULTIDIMENSIONAL_ARRAY') {
                mycanvas.append(`<p style="color:yellow">Multidemensi Array</p>`);
            }
        }
        parse(this.dTrace[curStep]);
    }

    draw_BFS_model01(dataset: any): void {
        const force = d3.layout.force()
            .nodes(dataset.nodes)
            .links(dataset.edges)
            .size([this.width, this.heigth])
            .linkDistance(77)
            .charge(-500)
            .theta(0.1)
            .gravity(0.05)
            .start();

        const edges = this.d3Graph.selectAll("line")
            .data(dataset.edges)
            .enter()
            .append("line")
            .attr("id", function (d, i) {
                return 'edge' + i
            })
            .attr('marker-end', 'url(#arrowhead)')
            .style("stroke", "black")
            .style("pointer-events", "none");

        const nodes = this.d3Graph.selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr({
                "r": 15
            })
            .style("fill", "#2980b9")
            .call(force.drag)

        const nodelabels = this.d3Graph.selectAll(".nodelabel")
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

        this.d3Graph.append('defs').append('marker')
            .attr({
                'id': 'arrowhead',
                'viewBox': '-0 -5 10 10',
                'refX': 25,
                'refY': 0,
                'orient': 'auto',
                'markerWidth': 10,
                'markerHeight': 10,
                'xoverflow': 'visible'
            })
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', 'black')
            .attr('stroke', 'black');

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
        });
    }

    set_data(): any {
        return {
            nodes: [
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: 6 },
                { name: 7 }
            ],
            edges: [
                { source: 0, target: 1 },
                { source: 0, target: 3 },
                { source: 2, target: 0 },
                { source: 2, target: 5 },
                { source: 1, target: 3 },
                { source: 4, target: 6 },
                { source: 3, target: 6 },
                { source: 3, target: 4 },
                { source: 3, target: 5 },
                { source: 6, target: 5 },
                { source: 3, target: 2 },
                { source: 1, target: 4 }
            ],
        };
    }

    /*test(): void {        
        function myGraph(el) {

            // Add and remove elements on the graph object
            this.addNode = function (id) {
                nodes.push({ "id": id });
                update();
            };

            this.removeNode = function (id) {
                var i = 0;
                var n = findNode(id);
                while (i < links.length) {
                    if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                        links.splice(i, 1);
                    }
                    else i++;
                }
                nodes.splice(findNodeIndex(id), 1);
                update();
            };

            this.removeLink = function (source, target) {
                for (var i = 0; i < links.length; i++) {
                    if (links[i].source.id == source && links[i].target.id == target) {
                        links.splice(i, 1);
                        break;
                    }
                }
                update();
            };

            this.removeAllLinks = function () {
                links.splice(0, links.length);
                update();
            };

            this.removeAllNodes = function () {
                nodes.splice(0, links.length);
                update();
            };

            this.addLink = function (source, target, value) {
                links.push({ "source": findNode(source), "target": findNode(target), "value": value });
                update();
            };

            var findNode = function (id) {
                for (var i in nodes) {
                    if (nodes[i]["id"] === id) return nodes[i];
                };
            };

            var findNodeIndex = function (id) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].id == id) {
                        return i;
                    }
                };
            };

            // set up the D3 visualisation in the specified element
            var w = 500,
                h = 500;
            var vis = d3.select("#svgdiv")
                .append("svg:svg")
                .attr("width", w)
                .attr("height", h)
                .attr("id", "svg")
                .attr("pointer-events", "all")
                .attr("viewBox", "0 0 " + w + " " + h)
                .attr("perserveAspectRatio", "xMinYMid")
                .append('svg:g');

            var force = d3.layout.force();

            var nodes = force.nodes(),
                links = force.links();

            var update = function () {
                var link = vis.selectAll("line")
                    .data(links, function (d) {
                        return d.source.id + "-" + d.target.id;
                    });

                link.enter().append("line")
                    .attr("id", function (d) { return d.source.id + "-" + d.target.id; })
                    .attr("class", "link");
                link.append("title")
                    .text(function (d) {
                        return d.value;
                    });
                link.exit().remove();

                var node = vis.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id;
                    });

                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .call(force.drag);

                nodeEnter.append("svg:circle")
                    .attr("r", 16)
                    .attr("id", function (d) { return "Node;" + d.id; })
                    .attr("class", "nodeStrokeClass");

                nodeEnter.append("svg:text")
                    .attr("class", "textClass")
                    .text(function (d) { return d.id; });

                node.exit().remove();
                force.on("tick", function () {

                    node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

                    link.attr("x1", function (d) { return d.source.x; })
                        .attr("y1", function (d) { return d.source.y; })
                        .attr("x2", function (d) { return d.target.x; })
                        .attr("y2", function (d) { return d.target.y; });
                });

                // Restart the force layout.
                force
                    .gravity(.05)
                    .distance(50)
                    .linkDistance(50)
                    .size([w, h])
                    .start();
            };


            // Make it all go
            update();
        }

        function drawGraph() {
            let graph;
            graph = new myGraph("#svgdiv");
            graph.addNode('A');
            graph.addNode('B');
            graph.addNode('C');
            graph.addLink('A', 'B', '10');
            graph.addLink('A', 'C', '8');
            graph.addLink('B', 'C', '15');
        }
    }*/
}