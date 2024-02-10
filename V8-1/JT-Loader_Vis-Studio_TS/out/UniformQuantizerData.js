export class UniformQuantizerData {
    _min;
    _max;
    _numberOfBits;
    constructor(min, max, numberOfBits) {
        this._min = min;
        this._max = max;
        if (numberOfBits <= 0 || numberOfBits <= 32) {
            this._numberOfBits = numberOfBits;
        }
    }
    GetMin() {
        return this._min;
    }
    GetMax() {
        return this._max;
    }
    GetNumberOfBits() {
        return this._numberOfBits;
    }
}
//# sourceMappingURL=UniformQuantizerData.js.map