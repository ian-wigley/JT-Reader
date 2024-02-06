module C_sharp_JT_Reader {
    export class Int32CDP {
        static _data: number[];
        static _filePosCount: number;
        static result: number[];
        static _codeTextWord: UInt32[];
        static _richTextBox: List<string>;
        static _codeTextCount: Int32;
        static _codeTextWords: Int32[];
        static m_bitLengthCodec: BitLengthCodec;
        static m_arithmeticCodec: ArithmeticCodec;
        public static Int32CDPone(value: CodecDriver.PredictorType): Int32[] {
            return Int32CDP.Int32CDPRead();
        }
        public static Int32CDPRead(): Int32[] {
            var _int32ProbabilityContexts: Int32ProbabilityContexts = null;
            Int32CDP._richTextBox.Add("\n----------------------- Int32CDP data Collection ------------------------");
            var fileBytes: number[];
            var _codeTextLength: Int32 = 0;
            var _valueElementCount: Int32 = 0;
            var codecType: number = Int32CDP._data[Int32CDP._filePosCount];
            var str8: string = codecType.ToString();
            Int32CDP._richTextBox.Add("Codec Type = " + str8);
            Int32CDP._filePosCount += 1;
            if (codecType == 2) {

            }
            if (codecType == 3) {
                fileBytes = new Array(4);
                _int32ProbabilityContexts = new Int32ProbabilityContexts(Int32CDP._richTextBox, Int32CDP._data, Int32CDP._filePosCount);
                Int32CDP._filePosCount = _int32ProbabilityContexts.UpDateFilePos();
                fileBytes = new Array(4);
                Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, fileBytes, 0, 4);
                var _outOfBandValueCount: Int32 = DataTypes.getInt32(fileBytes);
                Int32CDP._richTextBox.Add("Out Of Band Value Count = " + _outOfBandValueCount.ToString());
                Int32CDP._filePosCount += 4;
                if (_outOfBandValueCount > 0) {
                    var _oOOBValues: number[] = Int32CDP.Int32CDPRead();
                    _int32ProbabilityContexts.SetOOBValues(_oOOBValues);
                }
            }
            if (codecType != 0) {
                fileBytes = new Array(4);
                Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, fileBytes, 0, 4);
                _codeTextLength = DataTypes.getInt32(fileBytes);
                Int32CDP._richTextBox.Add("Code Text Length = " + _codeTextLength.ToString());
                Int32CDP._filePosCount += 4;
                fileBytes = new Array(4);
                Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, fileBytes, 0, 4);
                _valueElementCount = DataTypes.getInt32(fileBytes);
                Int32CDP._richTextBox.Add("Value Element Count = " + _valueElementCount.ToString());
                Int32CDP._filePosCount += 4;
                if (_int32ProbabilityContexts == null || _int32ProbabilityContexts.GetTableCount() == 1) {
                    Int32CDP._codeTextCount = _valueElementCount;
                }
                else {
                    fileBytes = new Array(4);
                    Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, fileBytes, 0, 4);
                    Int32CDP._codeTextCount = DataTypes.getInt32(fileBytes);
                    Int32CDP._richTextBox.Add("Code Text Count = " + Int32CDP._codeTextCount.ToString());
                    Int32CDP._filePosCount += 4;
                }
                Int32CDP._codeTextWords = new Array(_codeTextLength);
                Int32CDP._codeTextWords = Int32CDP.ReadCodeText(Int32CDP._codeTextCount, Int32CDP._codeTextWords);
            }
            Int32CDP.result = new Array(2);
            if (codecType == 1) {
                Int32CDP.m_bitLengthCodec = new BitLengthCodec(Int32CDP._richTextBox);
                Int32CDP.result = Int32CDP.m_bitLengthCodec.DecompressBitLength(Int32CDP._codeTextWords, _codeTextLength, _valueElementCount);
            }
            if (codecType == 3) {
                Int32CDP.m_arithmeticCodec = new ArithmeticCodec(Int32CDP._richTextBox);
                Int32CDP.result = Int32CDP.m_arithmeticCodec.DecodeArithmetic(_int32ProbabilityContexts, Int32CDP._codeTextWords, _codeTextLength, Int32CDP._codeTextCount, _valueElementCount);
            }
            Int32CDP._richTextBox.Add("-------------------- End of Int32CDP data Collection ---------------------");
            return Int32CDP.result;
        }
        private static ReadCodeText(_codeTextCount: number, _codeTextWords: Int32[]): Int32[] {
            var _count: number = 0;
            var _fileBytes: number[] = new Array(4);
            var conter: number = 0;
            Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, _fileBytes, 0, 4);
            var counter: number = DataTypes.getInt32(_fileBytes);
            Int32CDP._filePosCount += 1 * 4;
            var codeText: number[] = new Array(counter * 4);
            for (var j: number = 0; j < counter; j++) {
                var _reversedCodeText: number[] = new Array(4);
                Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, _fileBytes, 0, 4);
                _reversedCodeText = _fileBytes.Reverse().ToArray();
                Int32CDP._filePosCount += 1 * 4;
                for (var i: number = 0; i < 4; i++) {
                    codeText[i + _count] = _reversedCodeText[i];
                }
                _count += 4;
            }
            return codeText;
        }
        public static SetUpFilePosition(filePosCount: number): void {
            Int32CDP._filePosCount = filePosCount;
        }
        public static SetUpData(data: number[]): void {
            Int32CDP._data = data;
        }
        public static SetupRTF(richTextBox: List<string>): void {
            Int32CDP._richTextBox = richTextBox;
        }
        public static GetFilePos(): number {
            return Int32CDP._filePosCount;
        }
        public static GetValueCount(): number {
            return 0;
        }
        public static GetCodeTextWord(): UInt32[] {
            return Int32CDP._codeTextWord;
        }
    }
}