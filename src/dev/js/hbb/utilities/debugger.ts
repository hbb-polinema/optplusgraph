export function Assert(cond) {
    if (!cond) {
        console.trace();
        alert("Assertion Failure (see console log for backtrace)");
        throw 'Assertion Failure';
    }
}