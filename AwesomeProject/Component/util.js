const sqrt = Math.sqrt;

function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}
export var str = "abc";
export default {sqrt,square,diag};
