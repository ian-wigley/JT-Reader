var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class UniformQuantizerCodec {
        _inputVal = 0;
        _minInputRange = 0;
        _maxInputRange = 0;
        _nBits = 0;
        m_textBox = new List();
        constructor(richTextBox) {
            this.m_textBox = richTextBox;
            var _iMaxCode = (this._nBits < 32) ? (0x1 << this._nBits) - 1 : 0xffffffff;
            var _encodeMultiplier = _iMaxCode / (this._maxInputRange - this._minInputRange);
            var _outputVal = ((this._inputVal - this._minInputRange) * _encodeMultiplier + 0.5);
            this.m_textBox.Add("\n\nUniformQuantizerCodec Output = " + _outputVal.ToString());
        }
        GetValues(Values, Data) {
            var output = new Array(Values.length);
            this._minInputRange = Data.GetMin();
            this._maxInputRange = Data.GetMax();
            this._nBits = Data.GetNumberOfBits();
            var _iMaxCode = (this._nBits < 32) ? (0x1 << this._nBits) - 1 : 0xffffffff;
            var _encodeMultiplier = _iMaxCode / (this._maxInputRange - this._minInputRange);
            var _outputVal = ((this._inputVal - this._minInputRange) * _encodeMultiplier + 0.5);
            for (var i = 0; i < Values.length; i++) {
                output[i] = ((Values[i] - 0.5) / _encodeMultiplier + this._minInputRange);
            }
            return output;
        }
    }
    C_sharp_JT_Reader.UniformQuantizerCodec = UniformQuantizerCodec;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=UniformQuantizerCodec.js.map