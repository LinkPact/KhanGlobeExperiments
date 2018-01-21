/**
 * Created by jakob on 2018-01-21.
 */


function memoize(fn) {
    return function() {
        var args = Array.prototype.slice.call(arguments);
        var key = "";
        var len = args.length;
        var cur = null;

        while (len--) {
            cur = args[len];
            key += (cur === Object(cur)) ? JSON.stringify(cur): cur;

            fn.memoize || (fn.memoize = {});
        }

        return (key in fn.memoize) ? fn.memoize[key]:
            fn.memoize[key] = fn.apply(this, args);
    };
}


function debounce(func, wait, immediate) {
    var timeout;
    return function() {

        var context = this;
        var args = arguments;

        var later = function() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    }
}

