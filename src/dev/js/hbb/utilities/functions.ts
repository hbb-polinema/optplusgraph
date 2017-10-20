/* 
make sure varname doesn't contain any weird
characters that are illegal for CSS ID's ...

I know for a fact that iterator tmp variables named '_[1]'
are NOT legal names for CSS ID's.
I also threw in '{', '}', '(', ')', '<', '>' as illegal characters.

also some variable names are like '.0' (for generator expressions),
and '.' seems to be illegal.

also '=', '!', and '?' are common in Ruby names, so escape those as well
also spaces are illegal, so convert to '_'

TODO: what other characters are illegal ?
*/
export function varnameToCssID(varname) {
    let lbRE = new RegExp('\\[|{|\\(|<', 'g');
    let rbRE = new RegExp('\\]|}|\\)|>', 'g');

    /*  make sure to REPLACE ALL (using the 'g' option)
        rather than just replacing the first entry */
    return varname.replace(lbRE, 'LeftB_')
        .replace(rbRE, '_RightB')
        .replace(/[!]/g, '_BANG_')
        .replace(/[?]/g, '_QUES_')
        .replace(/[:]/g, '_COLON_')
        .replace(/[=]/g, '_EQ_')
        .replace(/[.]/g, '_DOT_')
        .replace(/ /g, '_');
}

import { Assert } from './debugger';
export function getRefID(obj) {
    if (obj[0] == 'REF') {
        return obj[1];
    } else {
        Assert(obj[0] === 'C_DATA' && obj[2] === 'pointer');
        Assert(obj[3] != '<UNINITIALIZED>' && obj[3] != '<UNALLOCATED>');
        return obj[3]; // pointed-to address
    }
}

export function isHeapRef(obj, heap) {    
    if (obj[0] === 'REF') { // ordinary REF
        return (heap[obj[1]] !== undefined);
    } else if (obj[0] === 'C_DATA' && obj[2] === 'pointer') {
        // C-style pointer that has a valid value
        if (obj[3] != '<UNINITIALIZED>' && obj[3] != '<UNALLOCATED>') {
            return (heap[obj[3]] !== undefined);
        }
    }

    return false;
}

// taken from http://www.toao.net/32-my-htmlspecialchars-function-for-javascript
export function HTMLspecialChars(str) {
    if (typeof (str) == "string") {
        str = str.replace(/&/g, "&amp;"); /* must do &amp; first */

        // ignore these for now ...
        //str = str.replace(/"/g, "&quot;");
        //str = str.replace(/'/g, "&#039;");

        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");

        // replace spaces:
        str = str.replace(/ /g, "&nbsp;");

        // replace tab as four spaces:
        str = str.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
    return str;
}

/*  returns a list of length a.length * b.length with elements from both
    mixed. the elements of a and b should be primitives, but if the first element
    is a list, it flattens it. e.g.,:
    multiplyLists([1, 2, 3], [4, 5]) -> [[1,4], [1,5], [2,4], [2,5], [3,4], [3,5]] */
export function multiplyLists(a, b) {
    let ret = [];
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            let elt = a[i];
            // flatten list
            if ($.isArray(elt)) {
                ret.push(elt.concat(b[j]));
            } else {
                ret.push([elt, b[j]]);
            }
        }
    }
    return ret;
}

// From http://stackoverflow.com/a/8809472
export function generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};

// From http://diveintohtml5.info/storage.html
export function supports_HTML5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

/*  replace ( with %28 and ) with %29
    so that links embed well in Markdown and email clients */
export function sanitizeURL(s) {
    return s.replace(/\(/g, '%28').replace(/\)/g, '%29');
}

// domID is the ID of the element to attach to (without the leading '#' sign)
export function SyntaxErrorSurveyBubble(parentViz, domID) {
    this.parentViz = parentViz;

    this.domID = domID;
    this.hashID = '#' + domID;

    this.my = 'left top';
    this.at = 'right center';

    this.qtipHidden = false; // is there a qtip object present but hidden? (TODO: kinda confusing)
}
SyntaxErrorSurveyBubble.prototype.destroyQTip = function () {
    $(this.hashID).qtip('destroy');
}
SyntaxErrorSurveyBubble.prototype.redrawCodelineBubble = function () {
    if (this.parentViz.isOutputLineVisibleForBubbles(this.domID)) {
        if (this.qtipHidden) {
            $(this.hashID).qtip('show');
        } else {
            $(this.hashID).qtip('reposition');
        }
        this.qtipHidden = false;
    } else {
        $(this.hashID).qtip('hide');
        this.qtipHidden = true;
    }
}
SyntaxErrorSurveyBubble.prototype.qTipContentID = function () {
    return '#qtip-' + this.domID + '-content';
}
SyntaxErrorSurveyBubble.prototype.qTipID = function () {
    return '#qtip-' + this.domID;
}