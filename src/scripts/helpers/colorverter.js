class Colorverter {
    constructor() {
        this._hexRegex = new RegExp('[0-9A-F]{2}', 'i');
        this._errors = Object.freeze({
            invalidValue(colorVal) {
                return `Not a proper color value: '${colorVal}'!`;
            }
        });
    }

// -----------------------------------------------------------------------------
// helpers
// -----------------------------------------------------------------------------

    _roundValues(color) {
        const safe = [];
        for (let i = 0; i < color.length; i++) {
            const part = color[i];
            if (typeof part === 'number') {
                safe.push(Math.round(part));
            } else {
                safe.push(part);
            }
        }
        return safe;
    }

    _intToHex(decimal) {
        const hex = Math.round(Number(decimal)).toString(16);
        // make sure to always have two characters
        return `0${hex}`.slice(-2);
    }

    _hexToInt(hex) {
        return parseInt(hex, 16);
    }

// -----------------------------------------------------------------------------
// random color generators
// -----------------------------------------------------------------------------

    getRandomRgb() {
        return this._roundValues([
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
        ]);
    }

    getRandomHex() {
        return this.rgbToHex(this.getRandomRgb());
    }

    getRandomHsl() {
        return this.rgbToHsl(this.getRandomRgb());
    }

    getRandomHwb() {
        return this.rgbToHwb(this.getRandomRgb());
    }

// -----------------------------------------------------------------------------
// colors validation
// -----------------------------------------------------------------------------

    isColor(color) {
        // color needs to be an array
        if (color instanceof Array !== true) {
            return false;
        }
        // color needs to have 3 parameters
        if (color.length !== 3) {
            return false;
        }
        return true;
    }

    isHex(hex) {
        if (!this.isColor(hex)) {
            return false;
        }

        let isValuesInRange = true;
        let isValuesHex = true;
        for (const value of hex) {
            if (!this._isHexValue(value)) {
                isValuesHex = false;
            }
            if (!this._isIntInRange(this._hexToInt(value), 0, 255)) {
                isValuesInRange = false;
            }
        }

        return isValuesHex && isValuesInRange;
    }

    isRgb(rgb) {
        if (!this.isColor(rgb)) {
            return false;
        }
        for (const value of rgb) {
            if (!this._isIntInRange(value, 0, 255)) {
                return false;
            }
        }
        return true;
    }

    isHsl(hsl) {
        if (!this.isColor(hsl)) {
            return false;
        }
        if (!this._isIntInRange(hsl[0], 0, 360)) {
            return false;
        }
        if (!this._isIntInRange(hsl[1], 0, 100)) {
            return false;
        }
        if (!this._isIntInRange(hsl[2], 0, 100)) {
            return false;
        }
        return true;
    }

    isHwb(hwb) {
        if (!this.isColor(hwb)) {
            return false;
        }
        if (!this._isIntInRange(hwb[0], 0, 360)) {
            return false;
        }
        if (!this._isIntInRange(hwb[1], 0, 100)) {
            return false;
        }
        if (!this._isIntInRange(hwb[2], 0, 100)) {
            return false;
        }
        return true;
    }

    isSameColor(first, second) {
        if (!this.isColor(first) || !this.isColor(second)) {
            return false;
        }
        // different lenght means different array
        if (first.length !== second.length) {
            return false;
        }
        let isSame = true;
        for (let i = 0; i < first.length; i++) {
            if (first[i] !== second[i]) {
                isSame = false;
                break;
            }
        }
        return isSame;
    }

    _isIntInRange(number, min, max) {
        if (!Number.isInteger(number)) {
            return false;
        }

        if (number < min) {
            return false;
        } else if (number > max) {
            return false;
        } else {
            return true;
        }
    }

    _isHexValue(hexValue) {
        if (typeof hexValue !== 'string') {
            return false;
        }
        return this._hexRegex.test(hexValue);
    }

// -----------------------------------------------------------------------------
// conversion from hex
// -----------------------------------------------------------------------------

    hexToRgb(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        const red = this._hexToInt(colorVal[0]);
        const green = this._hexToInt(colorVal[1]);
        const blue = this._hexToInt(colorVal[2]);
        return [red, green, blue];
    }

    hexToHsl(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this._hexToHslFloat(colorVal));
    }

    hexToHwb(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this._hexToHwbFloat(colorVal));
    }

    _hexToHslFloat(colorVal) {
        return this._rgbToHslFloat(this.hexToRgb(colorVal));
    }

    _hexToHwbFloat(colorVal) {
        return this._rgbToHwbFloat(this.hexToRgb(colorVal));
    }

// -----------------------------------------------------------------------------
// conversion from rgb
// -----------------------------------------------------------------------------

    rgbToHex(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        const red16 = this._intToHex(colorVal[0]);
        const green16 = this._intToHex(colorVal[1]);
        const blue16 = this._intToHex(colorVal[2]);
        return [red16, green16, blue16];
    }

    rgbToHsl(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this._rgbToHslFloat(colorVal));
    }

    rgbToHwb(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this._rgbToHwbFloat(colorVal));
    }

    _rgbToHslFloat(colorVal) {
        const red = colorVal[0] / 255;
        const green = colorVal[1] / 255;
        const blue = colorVal[2] / 255;

        const min = Math.min(red, green, blue);
        const max = Math.max(red, green, blue);
        const delta = max - min;

        // get Hue value
        let hue = null;
        if (max === min) {
            hue = 0;
        } else if (red === max) {
            hue = (green - blue) / delta;
        } else if (green === max) {
            hue = 2 + (blue - red) / delta;
        } else if (blue === max) {
            hue = 4 + (red - green) / delta;
        }
        hue = Math.min(hue * 60, 360);
        if (hue < 0) {
            hue += 360;
        }

        // get Lightness value
        const lightness = (min + max) / 2;

        // get Saturation value
        let saturation = null;
        if (max === min) {
            saturation = 0;
        } else if (lightness <= 0.5) {
            saturation = delta / (max + min);
        } else {
            saturation = delta / (2 - max - min);
        }

        return [hue, saturation * 100, lightness * 100];
    }

    _rgbToHwbFloat(colorVal) {
        const red = colorVal[0];
        const green = colorVal[1];
        const blue = colorVal[2];

        const hue = this._rgbToHslFloat(colorVal)[0];
        const whiteness = 1 / 255 * Math.min(red, Math.min(green, blue));
        const blackness = 1 - 1 / 255 * Math.max(red, Math.max(green, blue));

        return [hue, whiteness * 100, blackness * 100];
    }

// -----------------------------------------------------------------------------
// conversion from hsl
// -----------------------------------------------------------------------------

    hslToHex(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this.rgbToHex(this._hslToRgbFloat(colorVal));
    }

    hslToRgb(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this._hslToRgbFloat(colorVal));
    }

    hslToHwb(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this._hslToHwbFloat(colorVal));
    }

    _hslToRgbFloat(colorVal) {
        const hue = colorVal[0] / 360;
        const sat = colorVal[1] / 100;
        const lum = colorVal[2] / 100;

        let q = null;
        if (lum <= 0.5) {
            q = lum * (1 + sat);
        } else {
            q = lum + sat - lum * sat;
        }

        const p = 2 * lum - q;

        const rt = hue + (1 / 3);
        const gt = hue;
        const bt = hue - (1 / 3);

        const r = Math.round(this._hueToRgb(p, q, rt) * 255);
        const g = Math.round(this._hueToRgb(p, q, gt) * 255);
        const b = Math.round(this._hueToRgb(p, q, bt) * 255);

        return [r, g, b];
    }

    _hueToRgb(p, q, h) {
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }

        if (h * 6 < 1) {
            return p + ((q - p) * h * 6);
        } else if ((h * 2) < 1) {
            return q;
        } else if ((h * 3) < 2) {
            return p + ((q - p) * ((2 / 3) - h) * 6);
        } else {
            return p;
        }
    }

    _hslToHwbFloat(colorVal) {
        return this._rgbToHwbFloat(this._hslToRgbFloat(colorVal));
    }

// -----------------------------------------------------------------------------
// conversion from hwb
// -----------------------------------------------------------------------------

    hwbToHex(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this.rgbToHex(this._hwbToRgbFloat(colorVal));
    }

    hwbToRgb(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this._hwbToRgbFloat(colorVal));
    }

    hwbToHsl(colorVal) {
        if (!this.isColor(colorVal)) {
            throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this._hwbToHslFloat(colorVal));
    }

    // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
    _hwbToRgbFloat(colorVal) {
        const hue = colorVal[0] / 360;
        let whiteness = colorVal[1] / 100;
        let blackness = colorVal[2] / 100;
        const ratio = whiteness + blackness;

        // whiteness + blackness cant be > 1
        if (ratio > 1) {
            whiteness /= ratio;
            blackness /= ratio;
        }

        const i = Math.floor(6 * hue);
        const v = 1 - blackness;
        let f = 6 * hue - i;
        if ((i & 0x01) !== 0) {
            f = 1 - f;
        }
        // linear interpolation
        const n = whiteness + f * (v - whiteness);

        let red = 0;
        let green = 0;
        let blue = 0;

        switch (i) {
            case 6: case 0:
                red = v;
                green = n;
                blue = whiteness;
                break;
            case 1:
                red = n;
                green = v;
                blue = whiteness;
                break;
            case 2:
                red = whiteness;
                green = v;
                blue = n;
                break;
            case 3:
                red = whiteness;
                green = n;
                blue = v;
                break;
            case 4:
                red = n;
                green = whiteness;
                blue = v;
                break;
            case 5:
                red = v;
                green = whiteness;
                blue = n;
                break;
            default:
                throw new Error(`unproper case ${i} for HWB: ${colorVal}`);
        }

        return [red * 255, green * 255, blue * 255];
    }

    _hwbToHslFloat(colorVal) {
        return this._rgbToHslFloat(this._hwbToRgbFloat(colorVal));
    }
}

export default new Colorverter();
