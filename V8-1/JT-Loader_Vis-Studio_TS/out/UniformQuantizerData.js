var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class UniformQuantizerData {
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
    C_sharp_JT_Reader.UniformQuantizerData = UniformQuantizerData;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=UniformQuantizerData.js.map