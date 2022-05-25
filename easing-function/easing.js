/**
 * Each function accepts arguments for the parameters t, b, c and d. The following applies to the parameters of all functions:
 * t = Time - Amount of time that has passed since the beginning of the animation. Usually starts at 0 and is slowly increased using a game loop or other update function.
 * b = Beginning value - The starting point of the animation. Usually it's a static value, you can start at 0 for example.
 * c = Change in value - The amount of change needed to go from starting point to end point. It's also usually a static value.
 * d = Duration - Amount of time the animation will take. Usually a static value aswell
 */

/**
 * demo
 * x = easeLinear(0, 200, 300, 1);
 * t = 0 - Animation is just started. Zero time has passed
 * b = 200 - The starting position of the objects x-coordinate is 200
 * c = 300 - The object has to move 300 to the right, ending at 500
 * d = 1 - The object has one second to perform this motion from 200 to 500
 */

export function easeLinear (t, b, c, d) {
    return c * t / d + b;
}

// quadratic 二次函数
export function easeInQuad (t, b, c, d) {
    return c * (t /= d) * t + b;
}

export function easeOutQuad (t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

export function easeInOutQuad (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

//Sinusoidal 正弦曲线
export function easeInSine (t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}
 
export function easeOutSine (t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

export function easeInOutSine (t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

//Exponential 指数
export function easeInExpo (t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

export function easeOutExpo (t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

export function easeInOutExpo (t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

//Circular 圆
export function easeInCirc (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

export function easeOutCirc (t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

export function easeInOutCirc (t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

//Cubic 三次函数
export function easeInCubic (t, b, c, d) {
    return c * (t /= d) * t * t + b;
}
export function easeOutCubic (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

export function easeInOutCubic (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}

//Quartic 四次
export function easeInQuart (t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}

export function easeOutQuart (t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

export function easeInOutQuart (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

//Quintic 五次
export function easeInQuint (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}

export function easeOutQuint (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

export function easeInOutQuint (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

//Elastic 弹性
export function easeInElastic (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

export function easeOutElastic (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}

export function easeInOutElastic (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

//Back 回退
export function easeInBack (t, b, c, d) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

export function easeOutBack (t, b, c, d) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

export function easeInOutBack (t, b, c, d) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}

//Bounce 反弹
export function easeInBounce(t, b, c, d) {
	return c - easeOutBounce(d - t, 0, c, d) + b;
}

export function easeOutBounce(t, b, c, d) {
	if ((t /= d) < 1 / 2.75) {
		return c * (7.5625 * t * t) + b;
	} else if (t < 2 / 2.75) {
		return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	} else if (t < 2.5 / 2.75) {
		return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	} else {
		return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	}
}

export function easeInOutBounce(t, b, c, d) {
	if (t < d / 2) {
		return easeInBounce(t * 2, 0, c, d) * 0.5 + b;
	}
	return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
}