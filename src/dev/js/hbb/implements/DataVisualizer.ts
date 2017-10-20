require('../../lib/d3.v3.min.js');
require('../../lib/jquery-3.0.0.min.js');
require('../../lib/jquery.jsPlumb-1.3.10-all-min.js'); // DO NOT UPGRADE ABOVE 1.3.10 OR ELSE BREAKAGE WILL OCCUR 
require('../../lib/jquery-ui-1.11.4/jquery-ui.js');
require('../../lib/jquery-ui-1.11.4/jquery-ui.css');
require('../../lib/jquery.ba-bbq.js'); // contains slight pgbovine modifications
require('../../../css/pytutor.css');

import { Assert } from '../utilities/debugger';
import { ExecutionVisualizer } from './ExecutionVisualizer';
import { varnameToCssID, getRefID, isHeapRef, HTMLspecialChars, multiplyLists } from '../utilities/functions';
import { CONNECTOR_BASE_COLOR, CONNECTOR_HIGHLIGHT_COLOR, CONNECTOR_INACTIVE_COLOR } from '../view/colors';

declare var jsPlumb: any;
var rightwardNudgeHack = true; // ???

export class DataVisualizer implements IDataVisualizer {
    owner: ExecutionVisualizer;
    params: any; // aliases owner.params for convenience
    curTrace: any[]; // aliases owner.curTrace
    domRoot: any;
    domRootD3: any;
    curTraceLayouts: any[];
    jsPlumbInstance: any;
    jsPlumbManager: any;
    classAttrsHidden: any = {}; // kludgy hack for 'show/hide attributes' for class objects

    constructor(owner, domRoot, domRootD3) {
        this.owner = owner;
        this.params = this.owner.params;
        this.curTrace = this.owner.curTrace;

        this.domRoot = domRoot;
        this.domRootD3 = domRootD3;

        let codeVizHTML =
            `<div class="tab">
                <button class="tablinks active" id="primitif">Primitif</button>
                <button class="tablinks" id="abstract">Abstract</button>
            </div>
            
            <div id="dataViz" class="tabcontent" style="display:block">
                <table id="stackHeapTable">
                    <tr>
                        <td id="stack_td">
                            <div id="globals_area">
                                <div id="stackHeader">${this.getRealLabel("Frames")}</div>
                            </div>
                            <div id="stack"></div>
                        </td>
                        <td id="heap_td">
                            <div id="heap">
                                <div id="heapHeader">${this.getRealLabel("Objects")}</div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div id="abstractViz" class="tabcontent" style="display:none">
                <h3>Abstract Visualization</h3>
                <p>Abstract Visualization.</p>
            </div>`;

        this.domRoot.append(codeVizHTML);

        // @habibieeddien
        this.domRoot.find("#primitif").click(() => { this.openTab('primitif', 'dataViz'); });
        this.domRoot.find("#abstract").click(() => { this.openTab('abstract', 'abstractViz'); });

        // create a persistent globals frame
        // (note that we need to keep #globals_area separate from #stack for d3 to work its magic)
        this.domRoot.find("#globals_area").append('<div class="stackFrame" id="'
            + this.owner.generateID('globals') + '"><div id="' + this.owner.generateID('globals_header')
            + '" class="stackFrameHeader">' + this.getRealLabel('Global frame') + '</div><table class="stackFrameVarTable" id="'
            + this.owner.generateID('global_table') + '"></table></div>');

        this.jsPlumbInstance = jsPlumb.getInstance({
            Endpoint: ["Dot", { radius: 3 }],
            EndpointStyles: [{ fillStyle: CONNECTOR_BASE_COLOR }, { fillstyle: null } /* make right endpoint invisible */],
            Anchors: ["RightMiddle", "LeftMiddle"],
            PaintStyle: { lineWidth: 1, strokeStyle: CONNECTOR_BASE_COLOR },

            // bezier curve style:
            //Connector: [ "Bezier", { curviness:15 }], /* too much 'curviness' causes lines to run together */
            //Overlays: [[ "Arrow", { length: 14, width:10, foldback:0.55, location:0.35 }]],

            // state machine curve style:
            Connector: ["StateMachine"],
            Overlays: [["Arrow", { length: 10, width: 7, foldback: 0.55, location: 1 }]],
            EndpointHoverStyles: [{ fillStyle: CONNECTOR_HIGHLIGHT_COLOR }, { fillstyle: null } /* make right endpoint invisible */],
            HoverPaintStyle: { lineWidth: 1, strokeStyle: CONNECTOR_HIGHLIGHT_COLOR },
        });
    }

    openTab(button: any, tabName: any): void {
        // Declare all variables
        let i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        document.getElementById(button).className += " active";
    }

    height(): void {
        return this.domRoot.find('#dataViz').height();
    }

    generateHeapObjID(objID: any, stepNum: any): string {
        return this.owner.generateID('heap_object_' + objID + '_s' + stepNum);
    }

    getRealLabel(label: string): string {
        if (this.params.lang === 'js' || this.params.lang === 'ts' || this.params.lang === 'ruby') {
            if (label === 'list') {
                return 'array';
            } else if (label === 'instance') {
                return 'object';
            } else if (label === 'True') {
                return 'true';
            } else if (label === 'False') {
                return 'false';
            }
        }

        if (this.params.lang === 'js') {
            if (label === 'dict') {
                return 'Map';
            } else if (label === 'set') {
                return 'Set';
            }
        } else if (this.params.lang === 'ruby') {
            if (label === 'dict') {
                return 'hash';
            } else if (label === 'set') {
                return 'Set'; // the Ruby Set class is capitalized
            } else if (label === 'function') {
                return 'method';
            } else if (label === 'None') {
                return 'nil';
            } else if (label === 'Global frame') {
                return 'Global Object';
            }
        } else if (this.params.lang === 'java') {
            if (label === 'None') {
                return 'null';
            } else if (label === 'True') {
                return 'true';
            } else if (label === 'False') {
                return 'false';
            }
        } else if (this.params.lang === 'c' || this.params.lang === 'cpp') {
            if (label === 'Global frame') {
                return 'Global variables';
            } else if (label === 'Frames') {
                return 'Stack';
            } else if (label === 'Objects') {
                return 'Heap';
            }
        }

        // default fallthrough case if no matches above
        return label;
    }

    resetJsPlumbManager(): void {
        this.jsPlumbManager = {
            heap_pointer_src_id: 1, // increment this to be unique for each heap_pointer_src_*

            // Key:   CSS ID of the div element representing the stack frame variable
            //        (for stack->heap connections) or heap object (for heap->heap connections)
            //        the format is: '<this.visualizerID>__heap_pointer_src_<src id>'
            // Value: CSS ID of the div element representing the value rendered in the heap
            //        (the format is given by generateHeapObjID())
            //
            // The reason we need to prepend this.visualizerID is because jsPlumb needs
            // GLOBALLY UNIQUE IDs for use as connector endpoints.
            //
            // TODO: jsPlumb might be able to directly take DOM elements rather
            // than IDs, which makes the above point moot. But let's just stick
            // with this for now until I want to majorly refactor :)

            // the only elements in these sets are NEW elements to be rendered in this
            // particular call to renderDataStructures.
            connectionEndpointIDs: d3.map(),
            heapConnectionEndpointIDs: d3.map(), // subset of connectionEndpointIDs for heap->heap connections
            // analogous to connectionEndpointIDs, except for environment parent pointers
            parentPointerConnectionEndpointIDs: d3.map(),

            renderedHeapObjectIDs: d3.map(), // format given by generateHeapObjID()
        };
    }

    precomputeCurTraceLayouts(): void {
        this.curTraceLayouts = [];
        this.curTraceLayouts.push([]); // pre-seed with an empty sentinel to simplify the code

        let myViz = this; // to prevent confusion of 'this' inside of nested functions

        Assert(this.curTrace && this.curTrace.length > 0);
        $.each(this.curTrace, function (i, curEntry) {
            let prevLayout = myViz.curTraceLayouts[myViz.curTraceLayouts.length - 1];

            // make a DEEP COPY of prevLayout to use as the basis for curLine
            let curLayout = $.extend(true /* deep copy */, [], prevLayout);

            // initialize with all IDs from curLayout
            let idsToRemove = d3.map();
            $.each(curLayout, function (i, row) {
                for (let j = 1 /* ignore row ID tag */; j < row.length; j++) {
                    idsToRemove.set(row[j], 1);
                }
            });

            var idsAlreadyLaidOut = d3.map(); // to prevent infinite recursion

            function curLayoutIndexOf(id) {
                for (let i = 0; i < curLayout.length; i++) {
                    let row = curLayout[i];
                    let index = row.indexOf(id);
                    if (index > 0) { // index of 0 is impossible since it's the row ID tag
                        return { row: row, index: index }
                    }
                }
                return null;
            }

            function isLinearObj(heapObj) {
                let hook_result = myViz.owner.try_hook("isLinearObj", { heapObj: heapObj });
                if (hook_result[0]) return hook_result[1];

                return heapObj[0] == 'LIST' || heapObj[0] == 'TUPLE' || heapObj[0] == 'SET';
            }

            function recurseIntoObject(id, curRow, newRow) {
                // heuristic for laying out 1-D linked data structures: check for enclosing elements that are
                // structurally identical and then lay them out as siblings in the same "row"
                let heapObj = curEntry.heap[id];

                if (myViz.isCppMode()) {
                    // soften this assumption since C-style pointers might not point
                    // to the heap; they can point to any piece of data!
                    if (!heapObj) {
                        return;
                    }
                } else {
                    Assert(heapObj);
                }

                if (isLinearObj(heapObj)) {
                    $.each(heapObj, function (ind, child) {
                        if (ind < 1) return; // skip type tag

                        if (!myViz.isPrimitiveType(child)) {
                            let childID = getRefID(child);

                            if (myViz.params.disableHeapNesting) {
                                updateCurLayout(childID, [], []);
                            } else {
                                updateCurLayout(childID, curRow, newRow);
                            }
                        }
                    });
                } else if (heapObj[0] == 'DICT') {
                    $.each(heapObj, function (ind, child) {
                        if (ind < 1) return; // skip type tag

                        if (myViz.params.disableHeapNesting) {
                            let dictKey = child[0];
                            if (!myViz.isPrimitiveType(dictKey)) {
                                let keyChildID = getRefID(dictKey);
                                updateCurLayout(keyChildID, [], []);
                            }
                        }

                        let dictVal = child[1];
                        if (!myViz.isPrimitiveType(dictVal)) {
                            let childID = getRefID(dictVal);
                            if (myViz.structurallyEquivalent(heapObj, curEntry.heap[childID])) {
                                updateCurLayout(childID, curRow, newRow);
                            } else if (myViz.params.disableHeapNesting) {
                                updateCurLayout(childID, [], []);
                            }
                        }
                    });
                } else if (heapObj[0] == 'INSTANCE' || heapObj[0] == 'CLASS') {
                    jQuery.each(heapObj, function (ind, child) {
                        let headerLength = (heapObj[0] == 'INSTANCE') ? 2 : 3;
                        if (ind < headerLength) return;

                        if (myViz.params.disableHeapNesting) {
                            let instKey = child[0];
                            if (!myViz.isPrimitiveType(instKey)) {
                                let keyChildID = getRefID(instKey);
                                updateCurLayout(keyChildID, [], []);
                            }
                        }

                        let instVal = child[1];
                        if (!myViz.isPrimitiveType(instVal)) {
                            let childID = getRefID(instVal);
                            if (myViz.structurallyEquivalent(heapObj, curEntry.heap[childID])) {
                                updateCurLayout(childID, curRow, newRow);
                            }
                            else if (myViz.params.disableHeapNesting) {
                                updateCurLayout(childID, [], []);
                            }
                        }
                    });
                }
                else if ((heapObj[0] == 'C_ARRAY') || (heapObj[0] == 'C_MULTIDIMENSIONAL_ARRAY') || (heapObj[0] == 'C_STRUCT')) {
                    updateCurLayoutAndRecurse(heapObj);
                }
            }

            /*  id     - the new object ID to be inserted somewhere in curLayout (if it's not already in there)
                curRow - a row within curLayout where new linked list elements can be appended onto (might be null)
                newRow - a new row that might be spliced into curRow or appended as a new row in curLayout */
            function updateCurLayout(id, curRow, newRow) {
                if (idsAlreadyLaidOut.has(id)) {
                    return; // PUNT!
                }

                let curLayoutLoc = curLayoutIndexOf(id);
                let alreadyLaidOut = idsAlreadyLaidOut.has(id);
                idsAlreadyLaidOut.set(id, 1); // unconditionally set now

                // if id is already in curLayout ...
                if (curLayoutLoc) {
                    let foundRow = curLayoutLoc.row;
                    let foundIndex = curLayoutLoc.index;

                    idsToRemove.remove(id); // this id is already accounted for!

                    // very subtle ... if id hasn't already been handled in
                    // this iteration, then splice newRow into foundRow. otherwise
                    // (later) append newRow onto curLayout as a truly new row
                    if (!alreadyLaidOut) {
                        // splice the contents of newRow right BEFORE foundIndex.
                        // (Think about when you're trying to insert in id=3 into ['row1', 2, 1]
                        //  to represent a linked list 3->2->1. You want to splice the 3
                        //  entry right before the 2 to form ['row1', 3, 2, 1])
                        if (newRow.length > 1) {
                            let args = [foundIndex, 0];
                            for (let i = 1; i < newRow.length; i++) { // ignore row ID tag
                                args.push(newRow[i]);
                                idsToRemove.remove(newRow[i]);
                            }
                            foundRow.splice.apply(foundRow, args);

                            // remove ALL elements from newRow since they've all been accounted for
                            // (but don't reassign it away to an empty list, since the
                            // CALLER checks its value. TODO: how to get rid of this gross hack?!?)
                            newRow.splice(0, newRow.length);
                        }
                    }

                    // recurse to find more top-level linked entries to append onto foundRow
                    recurseIntoObject(id, foundRow, []);
                } else {
                    // push id into newRow ...
                    if (newRow.length == 0) {
                        newRow.push('row' + id); // unique row ID (since IDs are unique)
                    }
                    newRow.push(id);

                    // recurse to find more top-level linked entries ...
                    recurseIntoObject(id, curRow, newRow);

                    // if newRow hasn't been spliced into an existing row yet during
                    // a child recursive call ...
                    if (newRow.length > 0) {
                        if (curRow && curRow.length > 0) {
                            // append onto the END of curRow if it exists
                            for (let i = 1; i < newRow.length; i++) { // ignore row ID tag
                                curRow.push(newRow[i]);
                            }
                        } else {
                            /*  otherwise push to curLayout as a new row
                            
                                TODO: this might not always look the best, since we might sometimes want to
                                splice newRow in the MIDDLE of curLayout. Consider this example:
                            
                                x = [1,2,3]
                                y = [4,5,6]
                                x = [7,8,9]
                            
                                when the third line is executed, the arrows for x and y will be crossed (ugly!)
                                since the new row for the [7,8,9] object is pushed to the end (bottom) of curLayout.
                                The proper behavior is to push it to the beginning of curLayout where the old row for 'x' used to be.*/
                            curLayout.push($.extend(true /* make a deep copy */, [], newRow));
                        }

                        // regardless, newRow is now accounted for, so clear it
                        for (let i = 1; i < newRow.length; i++) { // ignore row ID tag
                            idsToRemove.remove(newRow[i]);
                        }
                        newRow.splice(0, newRow.length); // kill it!
                    }
                }
            }

            function updateCurLayoutAndRecurse(elt) {
                if (!elt) return; // early bail out

                if (isHeapRef(elt, curEntry.heap)) {
                    let id = getRefID(elt);
                    updateCurLayout(id, null, []);
                }
                recurseIntoCStructArray(elt);
            }

            /*  traverse inside of C structs and arrays to find whether they (recursively) contain
                any references to heap objects within themselves. be able to handle arbitrary nesting!*/
            function recurseIntoCStructArray(val) {
                if (val[0] === 'C_ARRAY') {
                    $.each(val, function (ind, elt) {
                        if (ind < 2) return; // these have 2 header fields
                        updateCurLayoutAndRecurse(elt);
                    });
                } else if (val[0] === 'C_MULTIDIMENSIONAL_ARRAY' || val[0] === 'C_STRUCT') {
                    $.each(val, function (ind, kvPair) {
                        if (ind < 3) return; // these have 3 header fields
                        updateCurLayoutAndRecurse(kvPair[1]);
                    });
                }
            }

            // iterate through all globals and ordered stack frames and call updateCurLayout
            $.each(curEntry.ordered_globals, function (i, varname) {
                let val = curEntry.globals[varname];
                if (val !== undefined) { // might not be defined at this line, which is OKAY!
                    // TODO: try to unify this behavior between C/C++ and other languages:
                    if (myViz.isCppMode()) {
                        updateCurLayoutAndRecurse(val);
                    } else {
                        if (!myViz.isPrimitiveType(val)) {
                            let id = getRefID(val);
                            updateCurLayout(id, null, []);
                        }
                    }
                }
            });

            $.each(curEntry.stack_to_render, function (i, frame) {
                $.each(frame.ordered_varnames, function (xxx, varname) {
                    let val = frame.encoded_locals[varname];
                    // TODO: try to unify this behavior between C/C++ and other languages:
                    if (myViz.isCppMode()) {
                        updateCurLayoutAndRecurse(val);
                    } else {
                        if (!myViz.isPrimitiveType(val)) {
                            let id = getRefID(val);
                            updateCurLayout(id, null, []);
                        }
                    }
                });
            });

            // iterate through remaining elements of idsToRemove and REMOVE them from curLayout
            idsToRemove.forEach(function (id, xxx) {
                let idInt = Number(id); // keys are stored as strings, so convert!!!
                $.each(curLayout, function (rownum, row) {
                    let ind = row.indexOf(idInt);
                    if (ind > 0) { // remember that index 0 of the row is the row ID tag
                        row.splice(ind, 1);
                    }
                });
            });

            // now remove empty rows (i.e., those with only a row ID tag) from curLayout
            curLayout = curLayout.filter(function (row) { return row.length > 1 });

            myViz.curTraceLayouts.push(curLayout);
        });

        this.curTraceLayouts.splice(0, 1); // remove seeded empty sentinel element
        Assert(this.curTrace.length == this.curTraceLayouts.length);
    }

    isCppMode(): boolean {
        return (this.params.lang === 'c' || this.params.lang === 'cpp');
    }

    structurallyEquivalent(obj1: any, obj2: any):boolean {
        // punt if either isn't a compound type
        if (this.isPrimitiveType(obj1) || this.isPrimitiveType(obj2)) {
            return false;
        }

        // must be the same compound type
        if (obj1[0] != obj2[0]) {
            return false;
        }

        // must have the same number of elements or fields
        if (obj1.length != obj2.length) {
            return false;
        }

        // for a list or tuple, same size (e.g., a cons cell is a list/tuple of size 2)
        if (obj1[0] == 'LIST' || obj1[0] == 'TUPLE') {
            return true;
        } else {
            let startingInd = -1;

            if (obj1[0] == 'DICT') {
                startingInd = 2;
            } else if (obj1[0] == 'INSTANCE') {
                startingInd = 3;
            } else {
                return false; // punt on all other types
            }

            let obj1fields = d3.map();
            // for a dict or object instance, same names of fields (ordering doesn't matter)
            for (var i = startingInd; i < obj1.length; i++) {
                obj1fields.set(obj1[i][0], 1); // use as a set
            }

            for (var i = startingInd; i < obj2.length; i++) {
                if (!obj1fields.has(obj2[i][0])) {
                    return false;
                }
            }

            return true;
        }
    }

    isPrimitiveType(obj: any): boolean {
        var hook_result = this.owner.try_hook("isPrimitiveType", { obj: obj });
        if (hook_result[0]) return hook_result[1];

        // null is a primitive
        if (obj === null) {
            return true;
        }

        if (typeof obj == "object") {
            // kludge: only 'SPECIAL_FLOAT' objects count as primitives
            return (obj[0] == 'SPECIAL_FLOAT' || obj[0] == 'JS_SPECIAL_VAL' ||
                obj[0] == 'C_DATA' /* TODO: is this right?!? */);
        } else {
            // non-objects are primitives
            return true;
        }
    }

    renderDataStructures(curInstr: number): void {
        let myViz = this; // to prevent confusion of 'this' inside of nested functions

        let curEntry = this.curTrace[curInstr];
        let curToplevelLayout = this.curTraceLayouts[curInstr];

        myViz.resetJsPlumbManager(); // very important!!!

        // for simplicity (but sacrificing some performance), delete all
        // connectors and redraw them from scratch. doing so avoids mysterious
        // jsPlumb connector alignment issues when the visualizer's enclosing
        // div contains, say, a "position: relative;" CSS tag
        // (which happens in the IPython Notebook)
        let existingConnectionEndpointIDs = d3.map();
        myViz.jsPlumbInstance.select({ scope: 'varValuePointer' }).each(function (c) {
            // This is VERY crude, but to prevent multiple redundant HEAP->HEAP
            // connectors from being drawn with the same source and origin, we need to first
            // DELETE ALL existing HEAP->HEAP connections, and then re-render all of
            // them in each call to this function. The reason why we can't safely
            // hold onto them is because there's no way to guarantee that the
            // *__heap_pointer_src_<src id> IDs are consistent across execution points.
            //
            // thus, only add to existingConnectionEndpointIDs if this is NOT heap->heap
            if (!c.sourceId.match(/__heap_pointer_src_/)) {
                existingConnectionEndpointIDs.set(c.sourceId, c.targetId);
            }
        });

        let existingParentPointerConnectionEndpointIDs = d3.map();
        myViz.jsPlumbInstance.select({ scope: 'frameParentPointer' }).each(function (c) {
            existingParentPointerConnectionEndpointIDs.set(c.sourceId, c.targetId);
        });

        // Heap object rendering phase:
        // count everything in curToplevelLayout as already rendered since we will render them
        // in d3 .each() statements
        $.each(curToplevelLayout, function (xxx, row) {
            for (var i = 0; i < row.length; i++) {
                var objID = row[i];
                var heapObjID = myViz.generateHeapObjID(objID, curInstr);
                myViz.jsPlumbManager.renderedHeapObjectIDs.set(heapObjID, 1);
            }
        });

        // use d3 to render the heap by mapping curToplevelLayout into <table class="heapRow">
        // and <td class="toplevelHeapObject"> elements

        // for simplicity, CLEAR this entire div every time, which totally
        // gets rid of the incremental benefits of using d3 for, say,
        // transitions or efficient updates. but it provides more
        // deterministic and predictable output for other functions. sigh, i'm
        // not really using d3 to the fullest, but oh wells!
        myViz.domRoot.find('#heap')
            .empty()
            .html(`<div id="heapHeader">${myViz.getRealLabel("Objects")}</div>`);

        let heapRows = myViz.domRootD3.select('#heap')
            .selectAll('table.heapRow')
            .attr('id', function (d, i) { return 'heapRow' + i; }) // add unique ID
            .data(curToplevelLayout, function (objLst) {
                return objLst[0]; // return first element, which is the row ID tag
            });


        // insert new heap rows
        heapRows.enter().append('table')
            .attr('id', function (d, i) { return 'heapRow' + i; }) // add unique ID
            .attr('class', 'heapRow');

        // delete a heap row
        let hrExit = heapRows.exit();
        hrExit
            .each(function (d, idx) {
                $(this).empty(); // crucial for garbage collecting jsPlumb connectors!
            })
            .remove();

        // update an existing heap row
        let toplevelHeapObjects = heapRows
            .selectAll('td.toplevelHeapObject')
            .data(function (d, i) { return d.slice(1, d.length); }, /* map over each row, skipping row ID tag */
            function (objID) { return objID; } /* each object ID is unique for constancy */);

        // insert a new toplevelHeapObject
        let tlhEnter = toplevelHeapObjects.enter().append('td')
            .attr('class', 'toplevelHeapObject')
            .attr('id', function (d, i) { return 'toplevel_heap_object_' + d; });

        // remember that the enter selection is added to the update
        // selection so that we can process it later ...

        // update a toplevelHeapObject
        toplevelHeapObjects
            .order() // VERY IMPORTANT to put in the order corresponding to data elements
            .each(function (objID, i) {
                // TODO: add a smoother transition in the future
                // Right now, just delete the old element and render a new one in its place
                $(this).empty();

                if (myViz.isCppMode()) {
                    // TODO: why might this be undefined?!? because the object
                    // disappeared from the heap all of a sudden?!?
                    if (curEntry.heap[objID] !== undefined) {
                        myViz.renderCompoundObject(objID, curInstr, $(this), true);
                    }
                } else {
                    myViz.renderCompoundObject(objID, curInstr, $(this), true);
                }
            });

        // delete a toplevelHeapObject
        let tlhExit = toplevelHeapObjects.exit();
        tlhExit.each(function (d, idx) {
            $(this).empty(); // crucial for garbage collecting jsPlumb connectors!
        }).remove();

        // Render globals and then stack frames using d3:
        // TODO: this sometimes seems buggy on Safari, so nix it for now:
        function highlightAliasedConnectors(d, i) {
            // if this row contains a stack pointer, then highlight its arrow and
            // ALL aliases that also point to the same heap object
            let stackPtrId = $(this).find('div.stack_pointer').attr('id');
            if (stackPtrId) {
                let foundTargetId = null;
                myViz.jsPlumbInstance.select({ source: stackPtrId }).each(function (c) { foundTargetId = c.targetId; });

                // use foundTargetId to highlight ALL ALIASES
                myViz.jsPlumbInstance.select().each(function (c) {
                    if (c.targetId == foundTargetId) {
                        c.setHover(true);
                        $(c.canvas).css("z-index", 2000); // ... and move it to the VERY FRONT
                    }
                    else {
                        c.setHover(false);
                    }
                });
            }
        }

        function unhighlightAllConnectors(d, i) {
            myViz.jsPlumbInstance.select().each(function (c) {
                c.setHover(false);
            });
        }

        /*  TODO: coalesce code for rendering globals and stack frames,
            since there's so much copy-and-paste grossness right now

            render all global variables IN THE ORDER they were created by the program,
            in order to ensure continuity:
            Derive a list where each element contains varname as long as value is NOT undefined.
            (Sometimes entries in curEntry.ordered_globals are undefined, so filter those out.)*/
        let realGlobalsLst = [];
        $.each(curEntry.ordered_globals, function (i, varname) {
            let val = curEntry.globals[varname];

            // (use '!==' to do an EXACT match against undefined)
            if (val !== undefined) { // might not be defined at this line, which is OKAY!
                realGlobalsLst.push(varname);
            }
        });

        let globalsID = myViz.owner.generateID('globals');
        let globalTblID = myViz.owner.generateID('global_table');

        let globalVarTable = myViz.domRootD3.select('#' + globalTblID)
            .selectAll('tr')
            .data(realGlobalsLst,
            function (d) { return d; } // use variable name as key
            );

        globalVarTable
            .enter()
            .append('tr')
            .attr('class', 'variableTr')
            .attr('id', function (d, i) {
                return myViz.owner.generateID(varnameToCssID('global__' + d + '_tr')); // make globally unique (within the page)
            });

        let globalVarTableCells = globalVarTable
            .selectAll('td.stackFrameVar,td.stackFrameValue')
            .data(function (d, i) { return [d, d]; }) /* map varname down both columns */

        globalVarTableCells.enter()
            .append('td')
            .attr('class', function (d, i) { return (i == 0) ? 'stackFrameVar' : 'stackFrameValue'; });

        // remember that the enter selection is added to the update
        // selection so that we can process it later ...

        // UPDATE
        globalVarTableCells
            .order() // VERY IMPORTANT to put in the order corresponding to data elements
            .each(function (varname, i) {
                if (i == 0) {
                    $(this).html(varname);
                } else {
                    /*  always delete and re-render the global var ... NB: trying to cache and compare the old value using,
                        say -- $(this).attr('data-curvalue', valStringRepr) -- leads to a mysterious and killer memory leak that I can't figure out yet*/
                    $(this).empty();

                    // make sure varname doesn't contain any weird characters that are illegal for CSS ID's ...
                    let varDivID = myViz.owner.generateID('global__' + varnameToCssID(varname));

                    // need to get rid of the old connector in preparation for rendering a new one:
                    existingConnectionEndpointIDs.remove(varDivID);

                    let val = curEntry.globals[varname];
                    if (myViz.isPrimitiveType(val)) {
                        myViz.renderPrimitiveObject(val, curInstr, $(this));
                    } else if (val[0] === 'C_STRUCT' || val[0] === 'C_ARRAY' || val[0] === 'C_MULTIDIMENSIONAL_ARRAY') {
                        // C structs and arrays can be inlined in frames
                        myViz.renderCStructArray(val, curInstr, $(this));
                    } else {
                        let heapObjID = myViz.generateHeapObjID(getRefID(val), curInstr);

                        if (myViz.params.textualMemoryLabels) {
                            let labelID = varDivID + '_text_label';
                            $(this).append('<div class="objectIdLabel" id="' + labelID + '">id' + getRefID(val) + '</div>');
                            $(this).find('div#' + labelID).hover(
                                function () {
                                    myViz.jsPlumbInstance.connect({
                                        source: labelID, target: heapObjID,
                                        scope: 'varValuePointer'
                                    });
                                },
                                function () {
                                    myViz.jsPlumbInstance.select({ source: labelID }).detach();
                                });
                        } else {
                            /*  add a stub so that we can connect it with a connector later. IE needs this div to be NON-EMPTY
                                in order to properly render jsPlumb endpoints, so that's why we add an "&nbsp;" */
                            $(this).append('<div class="stack_pointer" id="' + varDivID + '">&nbsp;</div>');

                            Assert(!myViz.jsPlumbManager.connectionEndpointIDs.has(varDivID));
                            myViz.jsPlumbManager.connectionEndpointIDs.set(varDivID, heapObjID);
                        }
                    }
                }
            });

        globalVarTableCells.exit()
            .each(function (d, idx) {
                $(this).empty(); // crucial for garbage collecting jsPlumb connectors!
            })
            .remove();

        globalVarTable.exit()
            .each(function (d, i) {
                // detach all stack_pointer connectors for divs that are being removed
                $(this).find('.stack_pointer').each(function (i, sp) {
                    existingConnectionEndpointIDs.remove($(sp).attr('id'));
                });
                $(this).empty(); // crucial for garbage collecting jsPlumb connectors!
            })
            .remove();

        // for aesthetics, hide globals if there aren't any globals to display
        if (curEntry.ordered_globals.length == 0) {
            this.domRoot.find('#' + globalsID).hide();
        } else {
            this.domRoot.find('#' + globalsID).show();
        }

        // holy cow, the d3 code for stack rendering is ABSOLUTELY NUTS!
        let stackDiv = myViz.domRootD3.select('#stack');

        // VERY IMPORTANT for selectAll selector to be SUPER specific here!
        let stackFrameDiv = stackDiv.selectAll('div.stackFrame,div.zombieStackFrame')
            .data(curEntry.stack_to_render, function (frame) {
                // VERY VERY VERY IMPORTANT for properly handling closures and nested functions
                // (see the backend code for more details)
                return frame.unique_hash;
            });

        let sfdEnter = stackFrameDiv.enter()
            .append('div')
            .attr('class', function (d, i) { return d.is_zombie ? 'zombieStackFrame' : 'stackFrame'; })
            .attr('id', function (d, i) {
                return d.is_zombie ? myViz.owner.generateID("zombie_stack" + i)
                    : myViz.owner.generateID("stack" + i);
            })
            // HTML5 custom data attributes
            .attr('data-frame_id', function (frame, i) { return frame.frame_id; })
            .attr('data-parent_frame_id', function (frame, i) {
                return (frame.parent_frame_id_list.length > 0) ? frame.parent_frame_id_list[0] : null;
            })
            .each(function (frame, i) {
                if (!myViz.params.drawParentPointers) {
                    return;
                }
                // only run if myViz.params.drawParentPointers is true ...
                let my_CSS_id = $(this).attr('id');

                /*  render a parent pointer whose SOURCE node is this frame
                    i.e., connect this frame to p, where this.parent_frame_id == p.frame_id
                    (if this.parent_frame_id is null, then p is the global frame)*/
                if (frame.parent_frame_id_list.length > 0) {
                    let parent_frame_id = frame.parent_frame_id_list[0];
                    /*  tricky turkey!
                        ok this hack just HAPPENS to work by luck ... usually there will only be ONE frame
                        that matches this selector, but sometimes multiple frames match, in which case the
                        FINAL frame wins out (since parentPointerConnectionEndpointIDs is a map where each
                        key can be mapped to only ONE value). it so happens that the final frame winning
                        out looks "desirable" for some of the closure test cases that I've tried. but
                        this code is quite brittle :( */
                    myViz.domRoot.find('div#stack [data-frame_id=' + parent_frame_id + ']').each(function (i, e) {
                        let parent_CSS_id = $(this).attr('id');
                        myViz.jsPlumbManager.parentPointerConnectionEndpointIDs.set(my_CSS_id, parent_CSS_id);
                    });
                } else {
                    // render a parent pointer to the global frame
                    // only do this if there are actually some global variables to display ...
                    if (curEntry.ordered_globals.length > 0) {
                        myViz.jsPlumbManager.parentPointerConnectionEndpointIDs.set(my_CSS_id, globalsID);
                    }
                }

                /*  tricky turkey: render parent pointers whose TARGET node is this frame.
                    i.e., for all frames f such that f.parent_frame_id == my_frame_id, connect f to this frame.
                    (make sure not to confuse frame IDs with CSS IDs!!!)*/
                let my_frame_id = frame.frame_id;
                myViz.domRoot.find('div#stack [data-parent_frame_id=' + my_frame_id + ']').each(function (i, e) {
                    let child_CSS_id = $(this).attr('id');
                    myViz.jsPlumbManager.parentPointerConnectionEndpointIDs.set(child_CSS_id, my_CSS_id);
                });
            });

        sfdEnter
            .append('div')
            .attr('class', 'stackFrameHeader')
            .html(function (frame, i) {

                // pretty-print lambdas and display other weird characters
                // (might contain '<' or '>' for weird names like <genexpr>)
                let funcName = HTMLspecialChars(frame.func_name).replace('&lt;lambda&gt;', '\u03bb')
                    .replace('\n', '<br/>');

                let headerLabel = funcName;

                // only display if you're someone's parent (unless showAllFrameLabels)
                if (frame.is_parent || myViz.params.showAllFrameLabels) {
                    headerLabel = 'f' + frame.frame_id + ': ' + headerLabel;
                }

                // optional (btw, this isn't a CSS id)
                if (frame.parent_frame_id_list.length > 0) {
                    let parentFrameID = frame.parent_frame_id_list[0];
                    headerLabel = headerLabel + ' [parent=f' + parentFrameID + ']';
                } else if (myViz.params.showAllFrameLabels) {
                    headerLabel = headerLabel + ' [parent=Global]';
                }

                return headerLabel;
            });

        sfdEnter
            .append('table')
            .attr('class', 'stackFrameVarTable');


        let stackVarTable = stackFrameDiv
            .order() // VERY IMPORTANT to put in the order corresponding to data elements
            .select('table').selectAll('tr')
            .data(function (frame) {
                // each list element contains a reference to the entire frame
                // object as well as the variable name
                // TODO: look into whether we can use d3 parent nodes to avoid
                // this hack ... http://bost.ocks.org/mike/nest/
                return frame.ordered_varnames.map(function (varname) { return { varname: varname, frame: frame }; });
            },
            function (d) {
                // TODO: why would d ever be null?!? weird
                if (d) {
                    return d.varname; // use variable name as key
                }
            }
            );

        stackVarTable
            .enter()
            .append('tr')
            .attr('class', 'variableTr')
            .attr('id', function (d, i) {
                return myViz.owner.generateID(varnameToCssID(d.frame.unique_hash + '__' + d.varname + '_tr')); // make globally unique (within the page)
            });

        let stackVarTableCells = stackVarTable
            .selectAll('td.stackFrameVar,td.stackFrameValue')
            .data(function (d, i) { return [d, d] /* map identical data down both columns */; });

        stackVarTableCells.enter()
            .append('td')
            .attr('class', function (d, i) { return (i == 0) ? 'stackFrameVar' : 'stackFrameValue'; });

        stackVarTableCells
            .order() // VERY IMPORTANT to put in the order corresponding to data elements
            .each(function (d, i) {
                let varname = d.varname;
                let frame = d.frame;

                if (i == 0) {
                    if (varname == '__return__')
                        $(this).html('<span class="retval">Return<br/>value</span>');
                    else
                        $(this).html(varname);
                } else {
                    // always delete and re-render the stack var ...
                    // NB: trying to cache and compare the old value using,
                    // say -- $(this).attr('data-curvalue', valStringRepr) -- leads to
                    // a mysterious and killer memory leak that I can't figure out yet
                    $(this).empty();

                    // make sure varname and frame.unique_hash don't contain any weird
                    // characters that are illegal for CSS ID's ...
                    let varDivID = myViz.owner.generateID(varnameToCssID(frame.unique_hash + '__' + varname));

                    // need to get rid of the old connector in preparation for rendering a new one:
                    existingConnectionEndpointIDs.remove(varDivID);

                    let val = frame.encoded_locals[varname];
                    if (myViz.isPrimitiveType(val)) {
                        myViz.renderPrimitiveObject(val, curInstr, $(this));
                    } else if (val[0] === 'C_STRUCT' || val[0] === 'C_ARRAY' || val[0] === 'C_MULTIDIMENSIONAL_ARRAY') {
                        // C structs and arrays can be inlined in frames
                        myViz.renderCStructArray(val, curInstr, $(this));
                    } else {
                        let heapObjID = myViz.generateHeapObjID(getRefID(val), curInstr);
                        if (myViz.params.textualMemoryLabels) {
                            let labelID = varDivID + '_text_label';
                            $(this).append('<div class="objectIdLabel" id="' + labelID + '">id' + getRefID(val) + '</div>');
                            $(this).find('div#' + labelID).hover(
                                function () {
                                    myViz.jsPlumbInstance.connect({
                                        source: labelID, target: heapObjID,
                                        scope: 'varValuePointer'
                                    });
                                },
                                function () {
                                    myViz.jsPlumbInstance.select({ source: labelID }).detach();
                                });
                        } else {
                            // add a stub so that we can connect it with a connector later.
                            // IE needs this div to be NON-EMPTY in order to properly
                            // render jsPlumb endpoints, so that's why we add an "&nbsp;"!
                            $(this).append('<div class="stack_pointer" id="' + varDivID + '">&nbsp;</div>');

                            Assert(!myViz.jsPlumbManager.connectionEndpointIDs.has(varDivID));
                            myViz.jsPlumbManager.connectionEndpointIDs.set(varDivID, heapObjID);
                        }
                    }
                }
            });


        stackVarTableCells.exit()
            .each(function (d, idx) {
                $(this).empty(); // crucial for garbage collecting jsPlumb connectors!
            })
            .remove();

        stackVarTable.exit()
            .each(function (d, i) {
                $(this).find('.stack_pointer').each(function (i, sp) {
                    // detach all stack_pointer connectors for divs that are being removed
                    existingConnectionEndpointIDs.remove($(sp).attr('id'));
                });

                $(this).empty(); // crucial for garbage collecting jsPlumb connectors!
            })
            .remove();

        stackFrameDiv.exit()
            .each(function (frame, i) {
                $(this).find('.stack_pointer').each(function (i, sp) {
                    // detach all stack_pointer connectors for divs that are being removed
                    existingConnectionEndpointIDs.remove($(sp).attr('id'));
                });

                let my_CSS_id = $(this).attr('id');

                // Remove all pointers where either the source or destination end is my_CSS_id
                existingParentPointerConnectionEndpointIDs.forEach(function (k, v) {
                    if (k == my_CSS_id || v == my_CSS_id) {
                        existingParentPointerConnectionEndpointIDs.remove(k);
                    }
                });

                $(this).empty(); // crucial for garbage collecting jsPlumb connectors!
            })
            .remove();

        /*  Rightward nudge hack to make tree-like structures look more sane without any
            sophisticated graph rendering code. Thanks to John DeNero for this suggestion in Fall 2012.

            This hack tries to ensure that all pointers that span different rows point
            RIGHTWARD (as much as possible), which makes tree-like structures look decent. e.g.,:

            t = [[['a', 'b'], ['c', 'd']], [[1,2], [3,4]]]
            
            Do it here since all of the divs have been rendered by now, but no
            jsPlumb arrows have been rendered yet.*/
        if (rightwardNudgeHack) {
            // Basic idea: keep a set of all nudged ROWS for each nudger row, so
            // that when you get nudged, you can, in turn, nudge all of the rows
            // that you've nudged. this algorithm nicely takes care of the fact
            // that there might not be cycles in objects that you've nudged, but
            // there are cycles in entire rows.
            //
            // Key:   ID of .heapRow object that did the nudging
            // Value: set of .heapRow ID that were (transitively) nudged by this element
            //        (represented as a d3.map)
            let nudger_to_nudged_rows = {};

            // VERY IMPORTANT to sort these connector IDs in ascending order,
            // since I think they're rendered left-to-right, top-to-bottom in ID
            // order, so we want to run the nudging algorithm in that same order.
            let srcHeapConnectorIDs = myViz.jsPlumbManager.heapConnectionEndpointIDs.keys();
            srcHeapConnectorIDs.sort();

            $.each(srcHeapConnectorIDs, function (i, srcID) {
                let dstID = myViz.jsPlumbManager.heapConnectionEndpointIDs.get(srcID);

                let srcAnchorObject = myViz.domRoot.find('#' + srcID);
                let srcHeapObject = srcAnchorObject.closest('.heapObject');
                let dstHeapObject = myViz.domRoot.find('#' + dstID);
                Assert(dstHeapObject.attr('class') == 'heapObject');

                let srcHeapRow = srcHeapObject.closest('.heapRow');
                let dstHeapRow = dstHeapObject.closest('.heapRow');

                let srcRowID = srcHeapRow.attr('id');
                let dstRowID = dstHeapRow.attr('id');

                // only consider nudging if srcID and dstID are on different rows
                if (srcRowID != dstRowID) {
                    let srcAnchorLeft = srcAnchorObject.offset().left;
                    let srcHeapObjectLeft = srcHeapObject.offset().left;
                    let dstHeapObjectLeft = dstHeapObject.offset().left;

                    // if srcAnchorObject is to the RIGHT of dstHeapObject, then nudge
                    // dstHeapObject to the right
                    if (srcAnchorLeft > dstHeapObjectLeft) {
                        // an extra nudge of 32px matches up pretty well with the
                        // current CSS padding around .toplevelHeapObject
                        let delta = (srcAnchorLeft - dstHeapObjectLeft) + 32;

                        // set margin rather than padding so that arrows tips still end
                        // at the left edge of the element. whoa, set relative CSS using +=, nice!
                        dstHeapObject.css('margin-left', '+=' + delta);

                        let cur_nudgee_set = nudger_to_nudged_rows[srcRowID];
                        if (cur_nudgee_set === undefined) {
                            cur_nudgee_set = d3.map();
                            nudger_to_nudged_rows[srcRowID] = cur_nudgee_set;
                        }
                        cur_nudgee_set.set(dstRowID, 1 /* useless value */);

                        // now if dstRowID itself nudged some other nodes, then nudge
                        // all of its nudgees by delta as well
                        let dst_nudgee_set = nudger_to_nudged_rows[dstRowID];
                        if (dst_nudgee_set) {
                            dst_nudgee_set.forEach(function (k, v) {
                                // don't nudge if it's yourself, to make cycles look
                                // somewhat reasonable (although still not ideal). e.g.,:
                                //   x = [1,2]
                                //   y = [3,x]
                                //   x[1] = y
                                if (k != srcRowID) {
                                    // nudge this entire ROW by delta as well
                                    myViz.domRoot.find('#' + k).css('margin-left', '+=' + delta);

                                    // then transitively add to entry for srcRowID
                                    cur_nudgee_set.set(k, 1 /* useless value */);
                                }
                            });
                        }
                    }
                }
            });
        }

        // NB: ugh, I'm not very happy about this hack, but it seems necessary
        // for embedding within sophisticated webpages such as IPython Notebook

        // delete all connectors. do this AS LATE AS POSSIBLE so that
        // (presumably) the calls to $(this).empty() earlier in this function
        // will properly garbage collect the connectors
        //
        // WARNING: for environment parent pointers, garbage collection doesn't seem to
        // be working as intended :(
        //
        // I suspect that this is due to the fact that parent pointers are SIBLINGS
        // of stackFrame divs and not children, so when stackFrame divs get destroyed,
        // their associated parent pointers do NOT.)
        myViz.jsPlumbInstance.reset();

        // use jsPlumb scopes to keep the different kinds of pointers separated
        function renderVarValueConnector(varID, valueID) {
            // special-case handling for C/C++ pointers, just to keep from rocking
            // the boat on my existing (battle-tested) code
            if (myViz.isCppMode()) {
                if (myViz.domRoot.find('#' + valueID).length) {
                    myViz.jsPlumbInstance.connect({ source: varID, target: valueID, scope: 'varValuePointer' });
                } else {
                    // pointer isn't pointing to anything valid; put a poo emoji here
                    myViz.domRoot.find('#' + varID).html('\uD83D\uDCA9' /* pile of poo emoji */);
                }
            } else {
                myViz.jsPlumbInstance.connect({ source: varID, target: valueID, scope: 'varValuePointer' });
            }
        }


        let totalParentPointersRendered = 0;

        function renderParentPointerConnector(srcID, dstID) {
            // SUPER-DUPER-ugly hack since I can't figure out a cleaner solution for now:
            // if either srcID or dstID no longer exists, then SKIP rendering ...
            if ((myViz.domRoot.find('#' + srcID).length == 0) ||
                (myViz.domRoot.find('#' + dstID).length == 0)) {
                return;
            }

            myViz.jsPlumbInstance.connect({
                source: srcID, target: dstID,
                anchors: ["LeftMiddle", "LeftMiddle"],

                // 'horizontally offset' the parent pointers up so that they don't look as ugly ...
                //connector: ["Flowchart", { stub: 9 + (6 * (totalParentPointersRendered + 1)) }],

                // actually let's try a bezier curve ...
                connector: ["Bezier", { curviness: 45 }],

                endpoint: ["Dot", { radius: 4 }],
                //hoverPaintStyle: {lineWidth: 1, strokeStyle: CONNECTOR_INACTIVE_COLOR}, // no hover colors
                scope: 'frameParentPointer'
            });
            totalParentPointersRendered++;
        }

        if (!myViz.params.textualMemoryLabels) {
            // re-render existing connectors and then ...
            //
            // NB: in C/C++ mode, to keep things simple, don't try to redraw
            // existingConnectionEndpointIDs since we want to redraw all arrows
            // each and every time.
            if (!myViz.isCppMode()) {
                existingConnectionEndpointIDs.forEach(renderVarValueConnector);
            }
            // add all the NEW connectors that have arisen in this call to renderDataStructures
            myViz.jsPlumbManager.connectionEndpointIDs.forEach(renderVarValueConnector);
        }
        // do the same for environment parent pointers
        if (myViz.params.drawParentPointers) {
            existingParentPointerConnectionEndpointIDs.forEach(renderParentPointerConnector);
            myViz.jsPlumbManager.parentPointerConnectionEndpointIDs.forEach(renderParentPointerConnector);
        }

        function highlight_frame(frameID) {
            myViz.jsPlumbInstance.select().each(function (c) {
                // find the enclosing .stackFrame ...
                let stackFrameDiv = c.source.closest('.stackFrame');

                // if this connector starts in the selected stack frame ...
                if (stackFrameDiv.attr('id') == frameID) {
                    // then HIGHLIGHT IT!
                    c.setPaintStyle({ lineWidth: 1, strokeStyle: CONNECTOR_BASE_COLOR });
                    c.endpoints[0].setPaintStyle({ fillStyle: CONNECTOR_BASE_COLOR });
                    //c.endpoints[1].setVisible(false, true, true); // JUST set right endpoint to be invisible

                    $(c.canvas).css("z-index", 1000); // ... and move it to the VERY FRONT
                }
                // for heap->heap connectors
                else if (myViz.jsPlumbManager.heapConnectionEndpointIDs.has(c.endpoints[0].elementId)) {
                    // NOP since it's already the color and style we set by default
                }
                // TODO: maybe this needs special consideration for C/C++ code? dunno
                else if (stackFrameDiv.length > 0) {
                    // else unhighlight it
                    // (only if c.source actually belongs to a stackFrameDiv (i.e.,
                    //  it originated from the stack). for instance, in C there are
                    //  heap pointers, but we doen't use heapConnectionEndpointIDs)
                    c.setPaintStyle({ lineWidth: 1, strokeStyle: CONNECTOR_INACTIVE_COLOR });
                    c.endpoints[0].setPaintStyle({ fillStyle: CONNECTOR_INACTIVE_COLOR });
                    //c.endpoints[1].setVisible(false, true, true); // JUST set right endpoint to be invisible

                    $(c.canvas).css("z-index", 0);
                }
            });

            // clear everything, then just activate this one ...
            myViz.domRoot.find(".stackFrame").removeClass("highlightedStackFrame");
            myViz.domRoot.find('#' + frameID).addClass("highlightedStackFrame");
        }

        // highlight the top-most non-zombie stack frame or, if not available, globals
        let frame_already_highlighted = false;
        $.each(curEntry.stack_to_render, function (i, e) {
            if (e.is_highlighted) {
                highlight_frame(myViz.owner.generateID('stack' + i));
                frame_already_highlighted = true;
            }
        });

        if (!frame_already_highlighted) {
            highlight_frame(myViz.owner.generateID('globals'));
        }

        myViz.owner.try_hook("end_renderDataStructures", { myViz: myViz.owner /* tricky! use owner to be safe */ });
    }

    renderPrimitiveObject(obj: any, stepNum: number, d3DomElement: any): void {
        let myViz = this; // to prevent confusion of 'this' inside of nested functions

        if (this.owner.try_hook("renderPrimitiveObject", { obj: obj, d3DomElement: d3DomElement })[0])
            return;

        let typ = typeof obj;

        if (obj == null) {
            d3DomElement.append('<span class="nullObj">' + this.getRealLabel('None') + '</span>');
        } else if (typ == "number") {
            d3DomElement.append('<span class="numberObj">' + obj + '</span>');
        } else if (typ == "boolean") {
            if (obj) {
                d3DomElement.append('<span class="boolObj">' + this.getRealLabel('True') + '</span>');
            } else {
                d3DomElement.append('<span class="boolObj">' + this.getRealLabel('False') + '</span>');
            }
        } else if (typ == "string") {
            // escape using HTMLspecialChars to prevent HTML/script injection
            let literalStr = HTMLspecialChars(obj);

            // print as a double-quoted string literal
            // with explicit newlines as <br/>
            literalStr = literalStr.replace(new RegExp('\n', 'g'), '<br/>'); // replace ALL
            literalStr = literalStr.replace(new RegExp('\"', 'g'), '\\"'); // replace ALL
            literalStr = '"' + literalStr + '"';

            d3DomElement.append('<span class="stringObj">' + literalStr + '</span>');
        } else if (typ == "object") {
            if (obj[0] == 'C_DATA') {
                let typeName = obj[2];
                // special cases for brevity:
                if (typeName === 'short int') {
                    typeName = 'short';
                } else if (typeName === 'short unsigned int') {
                    typeName = 'unsigned short';
                } else if (typeName === 'long int') {
                    typeName = 'long';
                } else if (typeName === 'long long int') {
                    typeName = 'long long';
                } else if (typeName === 'long unsigned int') {
                    typeName = 'unsigned long';
                } else if (typeName === 'long long unsigned int') {
                    typeName = 'unsigned long long int';
                }

                let isValidPtr = ((typeName === 'pointer') && (obj[3] !== '<UNINITIALIZED>') && (obj[3] !== '<UNALLOCATED>'));
                let addr = obj[1];
                let leader = '';

                // prefix with 'cdata_' so that we can distinguish this from a
                // top-level heap ID generated by generateHeapObjID
                let cdataId = myViz.generateHeapObjID('cdata_' + addr, stepNum);

                if (isValidPtr) {
                    // for pointers, put cdataId in the header
                    d3DomElement.append('<div id="' + cdataId + '" class="cdataHeader">' + leader + typeName + '</div>');

                    let ptrVal = obj[3];

                    // add a stub so that we can connect it with a connector later.
                    // IE needs this div to be NON-EMPTY in order to properly
                    // render jsPlumb endpoints, so that's why we add an "&nbsp;"!
                    let ptrSrcId = myViz.generateHeapObjID('ptrSrc_' + addr, stepNum);
                    let ptrTargetId = myViz.generateHeapObjID('cdata_' + ptrVal, stepNum); // don't forget cdata_ prefix!

                    let debugInfo = '';

                    // make it really narrow so that the div doesn't STRETCH too wide
                    d3DomElement.append('<div style="width: 10px;" id="' + ptrSrcId + '" class="cdataElt">&nbsp;' + debugInfo + '</div>');

                    // special case: display 0x0 address as a NULL pointer value,
                    // to distinguish it from all other pointers, since sometimes
                    // C/C++ programmers *explicitly* set a pointer to null
                    if (ptrVal === '0x0') {
                        $('#' + ptrSrcId).html('<span class="cdataUninit">NULL</span>');
                    } else {
                        Assert(!myViz.jsPlumbManager.connectionEndpointIDs.has(ptrSrcId));
                        myViz.jsPlumbManager.connectionEndpointIDs.set(ptrSrcId, ptrTargetId);
                    }
                } else {
                    // for non-pointers, put cdataId on the element itself, so that
                    // pointers can point directly at the element, not the header
                    d3DomElement.append('<div class="cdataHeader">' + leader + typeName + '</div>');

                    let rep = '';
                    if (typeof obj[3] === 'string') {
                        let literalStr = obj[3];
                        if (literalStr === '<UNINITIALIZED>') {
                            rep = '<span class="cdataUninit">?</span>';
                            //rep = '\uD83D\uDCA9'; // pile of poo emoji
                        } else if (literalStr == '<UNALLOCATED>') {
                            rep = '\uD83D\uDC80'; // skull emoji
                        } else {
                            // a regular string
                            literalStr = literalStr.replace(new RegExp("\n", 'g'), '\\n'); // replace ALL
                            literalStr = literalStr.replace(new RegExp("\t", 'g'), '\\t'); // replace ALL
                            literalStr = literalStr.replace(new RegExp('\"', 'g'), '\\"'); // replace ALL

                            // unprintable chars are denoted with '???', so show them as
                            // a special unicode character:
                            if (typeName === 'char' && literalStr === '???') {
                                literalStr = '\uFFFD'; // question mark in black diamond unicode character
                            } else {
                                // print as a SINGLE-quoted string literal (to emulate C-style chars)
                                literalStr = "'" + literalStr + "'";
                            }
                            rep = HTMLspecialChars(literalStr);
                        }
                    } else {
                        rep = HTMLspecialChars(obj[3]);
                    }

                    d3DomElement.append('<div id="' + cdataId + '" class="cdataElt">' + rep + '</div>');
                }
            } else {
                Assert(obj[0] == 'SPECIAL_FLOAT' || obj[0] == 'JS_SPECIAL_VAL');
                d3DomElement.append('<span class="numberObj">' + obj[1] + '</span>');
            }

        } else {
            Assert(false);
        }
    }

    renderNestedObject(obj: any, stepNum: number, d3DomElement: any): void {
        if (this.isPrimitiveType(obj)) {
            this.renderPrimitiveObject(obj, stepNum, d3DomElement);
        } else {
            if (obj[0] === 'REF') {
                // obj is a ["REF", <int>] so dereference the 'pointer' to render that object
                this.renderCompoundObject(getRefID(obj), stepNum, d3DomElement, false);
            } else {
                Assert(obj[0] === 'C_STRUCT' || obj[0] === 'C_ARRAY' || obj[0] === 'C_MULTIDIMENSIONAL_ARRAY');
                this.renderCStructArray(obj, stepNum, d3DomElement);
            }
        }
    }

    renderCompoundObject(objID: any, stepNum: number, d3DomElement: any, isTopLevel: any): void {
        let myViz = this; // to prevent confusion of 'this' inside of nested functions
        let heapObjID = myViz.generateHeapObjID(objID, stepNum);

        if (!isTopLevel && myViz.jsPlumbManager.renderedHeapObjectIDs.has(heapObjID)) {
            let srcDivID = myViz.owner.generateID('heap_pointer_src_' + myViz.jsPlumbManager.heap_pointer_src_id);
            myViz.jsPlumbManager.heap_pointer_src_id++; // just make sure each source has a UNIQUE ID

            let dstDivID = heapObjID;

            if (myViz.params.textualMemoryLabels) {
                let labelID = srcDivID + '_text_label';
                d3DomElement.append('<div class="objectIdLabel" id="' + labelID + '">id' + objID + '</div>');

                myViz.domRoot.find('div#' + labelID).hover(
                    function () {
                        myViz.jsPlumbInstance.connect({
                            source: labelID, target: dstDivID,
                            scope: 'varValuePointer'
                        });
                    },
                    function () {
                        myViz.jsPlumbInstance.select({ source: labelID }).detach();
                    });
            } else {
                // render jsPlumb arrow source since this heap object has already been rendered
                // (or will be rendered soon)

                // add a stub so that we can connect it with a connector later.
                // IE needs this div to be NON-EMPTY in order to properly
                // render jsPlumb endpoints, so that's why we add an "&nbsp;"!
                d3DomElement.append('<div id="' + srcDivID + '">&nbsp;</div>');

                Assert(!myViz.jsPlumbManager.connectionEndpointIDs.has(srcDivID));
                myViz.jsPlumbManager.connectionEndpointIDs.set(srcDivID, dstDivID);

                Assert(!myViz.jsPlumbManager.heapConnectionEndpointIDs.has(srcDivID));
                myViz.jsPlumbManager.heapConnectionEndpointIDs.set(srcDivID, dstDivID);
            }

            return; // early return!
        }

        // wrap ALL compound objects in a heapObject div so that jsPlumb
        // connectors can point to it:
        d3DomElement.append('<div class="heapObject" id="' + heapObjID + '"></div>');
        d3DomElement = myViz.domRoot.find('#' + heapObjID); // TODO: maybe inefficient

        myViz.jsPlumbManager.renderedHeapObjectIDs.set(heapObjID, 1);

        let curHeap = myViz.curTrace[stepNum].heap;
        let obj = curHeap[objID];
        Assert($.isArray(obj));

        // prepend the type label with a memory address label
        let typeLabelPrefix = '';
        if (myViz.params.textualMemoryLabels) {
            typeLabelPrefix = 'id' + objID + ':';
        }

        let hook_result = myViz.owner.try_hook("renderCompoundObject",
            {
                objID: objID, d3DomElement: d3DomElement,
                isTopLevel: isTopLevel, obj: obj,
                typeLabelPrefix: typeLabelPrefix,
                stepNum: stepNum,
                myViz: myViz
            });
        if (hook_result[0]) return;

        if (obj[0] == 'LIST' || obj[0] == 'TUPLE' || obj[0] == 'SET' || obj[0] == 'DICT') {
            let label = obj[0].toLowerCase();

            Assert(obj.length >= 1);
            if (obj.length == 1) {
                d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + ' empty ' + myViz.getRealLabel(label) + '</div>');
            } else {
                d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + myViz.getRealLabel(label) + '</div>');
                d3DomElement.append('<table class="' + label + 'Tbl"></table>');
                let tbl = d3DomElement.children('table');

                if (obj[0] == 'LIST' || obj[0] == 'TUPLE') {
                    tbl.append('<tr></tr><tr></tr>');
                    let headerTr = tbl.find('tr:first');
                    let contentTr = tbl.find('tr:last');
                    $.each(obj, function (ind, val) {
                        if (ind < 1) return; // skip type tag and ID entry

                        // add a new column and then pass in that newly-added column
                        // as d3DomElement to the recursive call to child:
                        headerTr.append('<td class="' + label + 'Header"></td>');
                        headerTr.find('td:last').append(ind - 1);

                        contentTr.append('<td class="' + label + 'Elt"></td>');
                        myViz.renderNestedObject(val, stepNum, contentTr.find('td:last'));
                    });
                } else if (obj[0] == 'SET') {
                    // create an R x C matrix:
                    let numElts = obj.length - 1;

                    // gives roughly a 3x5 rectangular ratio, square is too, err,
                    // 'square' and boring
                    let numRows = Math.round(Math.sqrt(numElts));
                    if (numRows > 3) {
                        numRows -= 1;
                    }

                    let numCols = Math.round(numElts / numRows);
                    // round up if not a perfect multiple:
                    if (numElts % numRows) {
                        numCols += 1;
                    }

                    jQuery.each(obj, function (ind, val) {
                        if (ind < 1) return; // skip 'SET' tag

                        if (((ind - 1) % numCols) == 0) {
                            tbl.append('<tr></tr>');
                        }

                        let curTr = tbl.find('tr:last');
                        curTr.append('<td class="setElt"></td>');
                        myViz.renderNestedObject(val, stepNum, curTr.find('td:last'));
                    });
                } else if (obj[0] == 'DICT') {
                    $.each(obj, function (ind, kvPair) {
                        if (ind < 1) return; // skip 'DICT' tag

                        tbl.append('<tr class="dictEntry"><td class="dictKey"></td><td class="dictVal"></td></tr>');
                        let newRow = tbl.find('tr:last');
                        let keyTd = newRow.find('td:first');
                        let valTd = newRow.find('td:last');

                        let key = kvPair[0];
                        let val = kvPair[1];

                        myViz.renderNestedObject(key, stepNum, keyTd);
                        myViz.renderNestedObject(val, stepNum, valTd);
                    });
                }
            }
        } else if (obj[0] == 'INSTANCE' || obj[0] == 'CLASS') {
            let isInstance = (obj[0] == 'INSTANCE');
            let headerLength = isInstance ? 2 : 3;

            Assert(obj.length >= headerLength);

            if (isInstance) {
                d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + obj[1] + ' ' + myViz.getRealLabel('instance') + '</div>');
            } else {
                let superclassStr = '';
                if (obj[2].length > 0) {
                    superclassStr += ('[extends ' + obj[2].join(', ') + '] ');
                }
                d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + obj[1] + ' class ' + superclassStr +
                    '<br/>' + '<a href="javascript:void(0)" id="attrToggleLink">hide attributes</a>' + '</div>');
            }

            // right now, let's NOT display class members, since that clutters
            // up the display too much. in the future, consider displaying
            // class members in a pop-up pane on mouseover or mouseclick
            // actually nix what i just said above ...
            //if (!isInstance) return;

            if (obj.length > headerLength) {
                let lab = isInstance ? 'inst' : 'class';
                d3DomElement.append('<table class="' + lab + 'Tbl"></table>');
                let tbl = d3DomElement.children('table');

                $.each(obj, function (ind, kvPair) {
                    if (ind < headerLength) return; // skip header tags

                    tbl.append('<tr class="' + lab + 'Entry"><td class="' + lab + 'Key"></td><td class="' + lab + 'Val"></td></tr>');

                    let newRow = tbl.find('tr:last');
                    let keyTd = newRow.find('td:first');
                    let valTd = newRow.find('td:last');

                    // the keys should always be strings, so render them directly (and without quotes):
                    // (actually this isn't the case when strings are rendered on the heap)
                    if (typeof kvPair[0] == "string") {
                        // common case ...
                        let attrnameStr = HTMLspecialChars(kvPair[0]);
                        keyTd.append('<span class="keyObj">' + attrnameStr + '</span>');
                    } else {
                        // when strings are rendered as heap objects ...
                        myViz.renderNestedObject(kvPair[0], stepNum, keyTd);
                    }

                    // values can be arbitrary objects, so recurse:
                    myViz.renderNestedObject(kvPair[1], stepNum, valTd);
                });
            }

            // class attributes can be displayed or hidden, so as not to
            // CLUTTER UP the display with a ton of attributes, especially
            // from imported modules and custom types created from, say,
            // collections.namedtuple
            if (!isInstance) {
                let className = obj[1];
                d3DomElement.find('.typeLabel #attrToggleLink').click(function () {
                    let elt = d3DomElement.find('.classTbl');
                    elt.toggle();
                    $(this).html((elt.is(':visible') ? 'hide' : 'show') + ' attributes');

                    if (elt.is(':visible')) {
                        myViz.classAttrsHidden[className] = false;
                        $(this).html('hide attributes');
                    } else {
                        myViz.classAttrsHidden[className] = true;
                        $(this).html('show attributes');
                    }

                    myViz.redrawConnectors(); // redraw all arrows!
                    return false; // don't reload the page
                });

                // "remember" whether this was hidden earlier during this visualization session
                if (myViz.classAttrsHidden[className]) {
                    d3DomElement.find('.classTbl').hide();
                    d3DomElement.find('.typeLabel #attrToggleLink').html('show attributes');
                }
            }
        } else if (obj[0] == 'INSTANCE_PPRINT') {
            d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + obj[1] + ' instance</div>');

            strRepr = HTMLspecialChars(obj[2]); // escape strings!
            d3DomElement.append('<table class="customObjTbl"><tr><td class="customObjElt">' + strRepr + '</td></tr></table>');
        } else if (obj[0] == 'FUNCTION') {
            Assert(obj.length == 3);

            // pretty-print lambdas and display other weird characters:
            let funcName = HTMLspecialChars(obj[1]).replace('&lt;lambda&gt;', '\u03bb');
            let parentFrameID = obj[2]; // optional

            if (!myViz.params.compactFuncLabels) {
                d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + myViz.getRealLabel('function') + '</div>');
            }

            let funcPrefix = myViz.params.compactFuncLabels ? 'func' : '';

            if (parentFrameID) {
                d3DomElement.append('<div class="funcObj">' + funcPrefix + ' ' + funcName + ' [parent=f' + parentFrameID + ']</div>');
            } else if (myViz.params.showAllFrameLabels) {
                d3DomElement.append('<div class="funcObj">' + funcPrefix + ' ' + funcName + ' [parent=Global]</div>');
            } else {
                d3DomElement.append('<div class="funcObj">' + funcPrefix + ' ' + funcName + '</div>');
            }
        } else if (obj[0] == 'JS_FUNCTION') { /* TODO: refactor me */
            // JavaScript function
            Assert(obj.length == 5);
            let funcName = HTMLspecialChars(obj[1]);
            let funcCode = typeLabelPrefix + HTMLspecialChars(obj[2]);
            let funcProperties = obj[3]; // either null or a non-empty list of key-value pairs
            let parentFrameID = obj[4];

            if (funcProperties || parentFrameID || myViz.params.showAllFrameLabels) {
                d3DomElement.append('<table class="classTbl"></table>');
                let tbl = d3DomElement.children('table');
                tbl.append('<tr><td class="funcCod" colspan="2"><pre class="funcCode">' + funcCode + '</pre>' + '</td></tr>');

                if (funcProperties) {
                    Assert(funcProperties.length > 0);
                    $.each(funcProperties, function (ind, kvPair) {
                        tbl.append('<tr class="classEntry"><td class="classKey"></td><td class="classVal"></td></tr>');
                        let newRow = tbl.find('tr:last');
                        let keyTd = newRow.find('td:first');
                        let valTd = newRow.find('td:last');
                        keyTd.append('<span class="keyObj">' + HTMLspecialChars(kvPair[0]) + '</span>');
                        myViz.renderNestedObject(kvPair[1], stepNum, valTd);
                    });
                }

                if (parentFrameID) {
                    tbl.append('<tr class="classEntry"><td class="classKey">parent</td><td class="classVal">' + 'f' + parentFrameID + '</td></tr>');
                } else if (myViz.params.showAllFrameLabels) {
                    tbl.append('<tr class="classEntry"><td class="classKey">parent</td><td class="classVal">' + 'global' + '</td></tr>');
                }
            } else {
                // compact form:
                d3DomElement.append('<pre class="funcCode">' + funcCode + '</pre>');
            }
        } else if (obj[0] == 'HEAP_PRIMITIVE') {
            Assert(obj.length == 3);

            let typeName = obj[1];
            let primitiveVal = obj[2];

            // add a bit of padding to heap primitives, for aesthetics
            d3DomElement.append('<div class="heapPrimitive"></div>');
            d3DomElement.find('div.heapPrimitive').append('<div class="typeLabel">' + typeLabelPrefix + typeName + '</div>');
            myViz.renderPrimitiveObject(primitiveVal, stepNum, d3DomElement.find('div.heapPrimitive'));
        } else if (obj[0] == 'C_STRUCT' || obj[0] == 'C_ARRAY' || obj[0] === 'C_MULTIDIMENSIONAL_ARRAY') {
            myViz.renderCStructArray(obj, stepNum, d3DomElement);
        } else {
            // render custom data type
            Assert(obj.length == 2);

            let typeName = obj[0];
            var strRepr = obj[1];

            strRepr = HTMLspecialChars(strRepr); // escape strings!

            d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + typeName + '</div>');
            d3DomElement.append('<table class="customObjTbl"><tr><td class="customObjElt">' + strRepr + '</td></tr></table>');
        }
    }

    renderCStructArray(obj: any, stepNum: any, d3DomElement: any): void {
        let myViz = this; // to prevent confusion of 'this' inside of nested functions

        if (obj[0] == 'C_STRUCT') {
            Assert(obj.length >= 3);
            let addr = obj[1];
            let typename = obj[2];

            let leader = '';
            if (myViz.params.lang === 'cpp') {
                // call it 'object' instead of 'struct'
                d3DomElement.append('<div class="typeLabel">' + leader + 'object ' + typename + '</div>');
            } else {
                d3DomElement.append('<div class="typeLabel">' + leader + 'struct ' + typename + '</div>');
            }

            if (obj.length > 3) {
                d3DomElement.append('<table class="instTbl"></table>');

                let tbl = d3DomElement.children('table');

                $.each(obj, function (ind, kvPair) {
                    if (ind < 3) return; // skip header tags

                    tbl.append('<tr class="instEntry"><td class="instKey"></td><td class="instVal"></td></tr>');

                    let newRow = tbl.find('tr:last');
                    let keyTd = newRow.find('td:first');
                    let valTd = newRow.find('td:last');

                    // the keys should always be strings, so render them directly (and without quotes):
                    // (actually this isn't the case when strings are rendered on the heap)
                    Assert(typeof kvPair[0] == "string");
                    // common case ...
                    let attrnameStr = HTMLspecialChars(kvPair[0]);
                    keyTd.append('<span class="keyObj">' + attrnameStr + '</span>');

                    // values can be arbitrary objects, so recurse:
                    myViz.renderNestedObject(kvPair[1], stepNum, valTd);
                });
            }
        } else if (obj[0] == 'C_MULTIDIMENSIONAL_ARRAY') {
            // since we can display only 2 dimensions sensibly, make the first
            // dimension into rows and flatten all other dimensions together into
            // columns. in the common case for a 2-D array, this will do the
            // perfect thing: first dimension is rows, second dimension is columns.
            // e.g., for a 4-D array, the first dimension is rows, and dimensions
            // 2, 3, and 4 are flattened together into columns. we can't do
            // any better than this since it doesn't make sense to display
            // more than 2 dimensions at once on screen
            Assert(obj.length >= 3);
            let addr = obj[1];
            let dimensions = obj[2];
            Assert(dimensions.length > 1); // make sure we're really multidimensional!

            let leader = '';
            d3DomElement.append('<div class="typeLabel">' + leader + 'array</div>');
            d3DomElement.append('<table class="cArrayTbl"></table>');
            let tbl = d3DomElement.children('table');

            // a list of array indices for each dimension
            let indicesByDimension = [];
            for (let d = 0; d < dimensions.length; d++) {
                indicesByDimension.push(d3.range(dimensions[d]));
            }

            // common case is 2-D:
            let allDimensions = multiplyLists(indicesByDimension[0], indicesByDimension[1]);
            // for all dimensions above the second one ...
            for (let d = 2; d < dimensions.length; d++) {
                allDimensions = multiplyLists(allDimensions, indicesByDimension[d]);
            }

            // ignore dimensions[0], which is rows
            let numColumns = 1;
            for (let i = 1; i < dimensions.length; i++) {
                numColumns *= dimensions[i];
            }

            for (let row = 0; row < dimensions[0]; row++) {
                // a pair of rows for header + content, respectively
                tbl.append('<tr></tr>');
                let headerTr = tbl.find('tr:last');
                tbl.append('<tr></tr>');
                let contentTr = tbl.find('tr:last');

                for (let col = 0; col < numColumns; col++) {
                    let flattenedInd = (row * numColumns) + col; // the real index into the 1-D flattened array stored in obj[3:]
                    let realInd = flattenedInd + 3; // skip 3 header fields to get to the real index in obj
                    let val = obj[realInd];
                    let indToDisplay = allDimensions[flattenedInd].join(',');

                    // add a new column and then pass in that newly-added column
                    // as d3DomElement to the recursive call to child:
                    headerTr.append('<td class="cMultidimArrayHeader"></td>');
                    headerTr.find('td:last').append(indToDisplay);

                    contentTr.append('<td class="cMultidimArrayElt"></td>');
                    myViz.renderNestedObject(val, stepNum, contentTr.find('td:last'));
                }
            }
        } else {
            Assert(obj[0] == 'C_ARRAY');
            Assert(obj.length >= 2);
            let addr = obj[1];

            let leader = '';
            d3DomElement.append('<div class="typeLabel">' + leader + 'array</div>');
            d3DomElement.append('<table class="cArrayTbl"></table>');
            let tbl = d3DomElement.children('table');

            tbl.append('<tr></tr><tr></tr>');
            let headerTr = tbl.find('tr:first');
            let contentTr = tbl.find('tr:last');
            $.each(obj, function (ind, val) {
                if (ind < 2) return; // skip 'C_ARRAY' and addr

                // add a new column and then pass in that newly-added column
                // as d3DomElement to the recursive call to child:
                headerTr.append('<td class="cArrayHeader"></td>');
                headerTr.find('td:last').append(ind - 2 /* adjust */);

                contentTr.append('<td class="cArrayElt"></td>');
                myViz.renderNestedObject(val, stepNum, contentTr.find('td:last'));
            });
        }
    }

    redrawConnectors(): void {
        this.jsPlumbInstance.repaintEverything();
    }

}