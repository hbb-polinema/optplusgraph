/* Utilities */ 

export function assert(cond) {
    if (!cond) {
        console.trace();
        alert("Assertion Failure (see console log for backtrace)");
        throw 'Assertion Failure';
    }
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

// same as htmlspecialchars except don't worry about expanding spaces or
// tabs since we want proper word wrapping in divs.
export function HTMLsanitize(str) {
    if (typeof (str) == "string") {
        str = str.replace(/&/g, "&amp;"); /* must do &amp; first */

        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
    }
    return str;
}

(String.prototype as any /* TS too strict */).rtrim = function () {
    return this.replace(/\s*$/g, "");
}


// make sure varname doesn't contain any weird
// characters that are illegal for CSS ID's ...
//
// I know for a fact that iterator tmp variables named '_[1]'
// are NOT legal names for CSS ID's.
// I also threw in '{', '}', '(', ')', '<', '>' as illegal characters.
//
// also some variable names are like '.0' (for generator expressions),
// and '.' seems to be illegal.
//
// also '=', '!', and '?' are common in Ruby names, so escape those as well
//
// also spaces are illegal, so convert to '_'
// TODO: what other characters are illegal?
export function varnameToCssID(varname) {
    let lbRE = new RegExp('\\[|{|\\(|<', 'g');
    let rbRE = new RegExp('\\]|}|\\)|>', 'g');

    // make sure to REPLACE ALL (using the 'g' option)
    // rather than just replacing the first entry
    return varname.replace(lbRE, 'LeftB_')
        .replace(rbRE, '_RightB')
        .replace(/[!]/g, '_BANG_')
        .replace(/[?]/g, '_QUES_')
        .replace(/[:]/g, '_COLON_')
        .replace(/[=]/g, '_EQ_')
        .replace(/[.]/g, '_DOT_')
        .replace(/ /g, '_');
}

export function isHeapRef(obj, heap) {
    // ordinary REF
    if (obj[0] === 'REF') {
        return (heap[obj[1]] !== undefined);
    } else if (obj[0] === 'C_DATA' && obj[2] === 'pointer') {
        // C-style pointer that has a valid value
        if (obj[3] != '<UNINITIALIZED>' && obj[3] != '<UNALLOCATED>') {
            return (heap[obj[3]] !== undefined);
        }
    }

    return false;
}

export function getRefID(obj) {
    if (obj[0] == 'REF') {
        return obj[1];
    } else {
        assert(obj[0] === 'C_DATA' && obj[2] === 'pointer');
        assert(obj[3] != '<UNINITIALIZED>' && obj[3] != '<UNALLOCATED>');
        return obj[3]; // pointed-to address
    }
}

// From http://stackoverflow.com/a/8809472
export function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

// From http://diveintohtml5.info/storage.html
export function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
