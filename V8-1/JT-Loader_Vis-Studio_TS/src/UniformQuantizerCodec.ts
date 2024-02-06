module C_sharp_JT_Reader {
    export class UniformQuantizerCodec {
        _inputVal: Int32 = 0;
        _minInputRange: number = 0;
        _maxInputRange: number = 0;
        _nBits: Int32 = 0;
        m_textBox: List<string> = new List<string>();
        constructor(richTextBox: List<string>) {
            this.m_textBox = richTextBox;
            var _iMaxCode: UInt32 = (this._nBits < 32) ? <UInt32>(0x1 << this._nBits) - 1 : 0xffffffff;
            var _encodeMultiplier: number = <number>_iMaxCode / (this._maxInputRange - this._minInputRange);
            var _outputVal: UInt32 = <UInt32>((this._inputVal - this._minInputRange) * _encodeMultiplier + 0.5);
            this.m_textBox.Add("\n\nUniformQuantizerCodec Output = " + _outputVal.ToString());
        }
        public GetValues(Values: number[], Data: UniformQuantizerData): number[] {
            var output: number[] = new Array(Values.length);
            this._minInputRange = Data.GetMin();
            this._maxInputRange = Data.GetMax();
            this._nBits = Data.GetNumberOfBits();
            var _iMaxCode: UInt32 = (this._nBits < 32) ? <UInt32>(0x1 << this._nBits) - 1 : 0xffffffff;
            var _encodeMultiplier: number = <number>_iMaxCode / (this._maxInputRange - this._minInputRange);
            var _outputVal: UInt32 = <UInt32>((this._inputVal - this._minInputRange) * _encodeMultiplier + 0.5);
            for (var i: number = 0; i < Values.length; i++) {
                output[i] = <number>((Values[i] - 0.5) / _encodeMultiplier + this._minInputRange);
            }
            return output;
        }
    }
}