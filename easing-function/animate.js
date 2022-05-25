import { easeLinear } from './easing.js';
/**
 * 
 * @typedef {Object} AnimationOptions
 * Animation of a value or list of values.
 * @property {Function} [onChange] Callback; invoked on every value change
 * @property {Function} [onComplete] Callback; invoked when value change is completed
 * @property {number | number[]} [startValue=0] Starting value
 * @property {number | number[]} [endValue=100] Ending value
 * @property {number | number[]} [byValue=100] Value to modify the property by
 * @property {Function} [easing] Easing function
 * @property {number} [duration=500] Duration of change (in ms)
 * @property {Function} [abort] Additional function with logic. If returns true, animation aborts.
 * @property {number} [delay] Delay of animation start (in ms)
 */

const noop = function(){return false}

export default function animate(options) {
    options || (options = {});
    var cancel = false, context;

    context = {
        cancel: function () {
            cancel = true;
        }
    };

    var runner = function (timestamp) {
        var start = timestamp || +new Date(),
            duration = options.duration || 500,
            finish = start + duration, time,
            onChange = options.onChange || noop,
            abort = options.abort || noop,
            onComplete = options.onComplete || noop,
            easing = options.easing || easeLinear,
            isMany = 'startValue' in options ? options.startValue.length > 0 : false,
            startValue = 'startValue' in options ? options.startValue : 0,
            endValue = 'endValue' in options ? options.endValue : 100,
            byValue = options.byValue || (isMany ? startValue.map(function (value, i) {
                return endValue[i] - startValue[i];
            }) : endValue - startValue);

        options.onStart && options.onStart();

        (function tick(ticktime) {
            time = ticktime || +new Date();
            var currentTime = time > finish ? duration : (time - start),
                timePerc = currentTime / duration,
                current = isMany ? startValue.map(function (_value, i) {
                    return easing(currentTime, startValue[i], byValue[i], duration);
                }) : easing(currentTime, startValue, byValue, duration),
                valuePerc = isMany ? Math.abs((current[0] - startValue[0]) / byValue[0])
                    : Math.abs((current - startValue) / byValue);
            //  update context
            context.currentValue = isMany ? current.slice() : current;
            context.completionRate = valuePerc;
            context.durationRate = timePerc;
            if (cancel) {
                return;
            }
            if (abort(current, valuePerc, timePerc)) {
                return;
            }
            if (time > finish) {
                //  update context
                context.currentValue = isMany ? endValue.slice() : endValue;
                context.completionRate = 1;
                context.durationRate = 1;
                //  execute callbacks
                onChange(isMany ? endValue.slice() : endValue, 1, 1);
                onComplete(endValue, 1, 1);
                return;
            }
            else {
                onChange(current, valuePerc, timePerc);
                requestAnimationFrame(tick);
            }
        })(start);
    };

    if (options.delay) {
        setTimeout(function () {
            requestAnimationFrame(runner);
        }, options.delay);
    }
    else {
        requestAnimationFrame(runner);
    }

    return context.cancel;
}