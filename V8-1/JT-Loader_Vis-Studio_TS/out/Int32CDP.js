var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class Int32CDP {
        static _data;
        static _filePosCount;
        static result;
        static _codeTextWord;
        static _richTextBox;
        static _codeTextCount;
        static _codeTextWords;
        static m_bitLengthCodec;
        static m_arithmeticCodec;
        static Int32CDPone(value) {
            return Int32CDP.Int32CDPRead();
        }
        static Int32CDPRead() {
            var _int32ProbabilityContexts = null;
            Int32CDP._richTextBox.Add("\n----------------------- Int32CDP data Collection ------------------------");
            var fileBytes;
            var _codeTextLength = 0;
            var _valueElementCount = 0;
            var codecType = Int32CDP._data[Int32CDP._filePosCount];
            var str8 = codecType.ToString();
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
                var _outOfBandValueCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                Int32CDP._richTextBox.Add("Out Of Band Value Count = " + _outOfBandValueCount.ToString());
                Int32CDP._filePosCount += 4;
                if (_outOfBandValueCount > 0) {
                    var _oOOBValues = Int32CDP.Int32CDPRead();
                    _int32ProbabilityContexts.SetOOBValues(_oOOBValues);
                }
            }
            if (codecType != 0) {
                fileBytes = new Array(4);
                Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, fileBytes, 0, 4);
                _codeTextLength = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                Int32CDP._richTextBox.Add("Code Text Length = " + _codeTextLength.ToString());
                Int32CDP._filePosCount += 4;
                fileBytes = new Array(4);
                Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, fileBytes, 0, 4);
                _valueElementCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                Int32CDP._richTextBox.Add("Value Element Count = " + _valueElementCount.ToString());
                Int32CDP._filePosCount += 4;
                if (_int32ProbabilityContexts == null || _int32ProbabilityContexts.GetTableCount() == 1) {
                    Int32CDP._codeTextCount = _valueElementCount;
                }
                else {
                    fileBytes = new Array(4);
                    Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, fileBytes, 0, 4);
                    Int32CDP._codeTextCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                    Int32CDP._richTextBox.Add("Code Text Count = " + Int32CDP._codeTextCount.ToString());
                    Int32CDP._filePosCount += 4;
                }
                Int32CDP._codeTextWords = new Array(_codeTextLength);
                Int32CDP._codeTextWords = Int32CDP.ReadCodeText(Int32CDP._codeTextCount, Int32CDP._codeTextWords);
            }
            Int32CDP.result = new Array(2);
            if (codecType == 1) {
                Int32CDP.m_bitLengthCodec = new C_sharp_JT_Reader.BitLengthCodec(Int32CDP._richTextBox);
                Int32CDP.result = Int32CDP.m_bitLengthCodec.DecompressBitLength(Int32CDP._codeTextWords, _codeTextLength, _valueElementCount);
            }
            if (codecType == 3) {
                Int32CDP.m_arithmeticCodec = new ArithmeticCodec(Int32CDP._richTextBox);
                Int32CDP.result = Int32CDP.m_arithmeticCodec.DecodeArithmetic(_int32ProbabilityContexts, Int32CDP._codeTextWords, _codeTextLength, Int32CDP._codeTextCount, _valueElementCount);
            }
            Int32CDP._richTextBox.Add("-------------------- End of Int32CDP data Collection ---------------------");
            return Int32CDP.result;
        }
        static ReadCodeText(_codeTextCount, _codeTextWords) {
            var _count = 0;
            var _fileBytes = new Array(4);
            var conter = 0;
            Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, _fileBytes, 0, 4);
            var counter = C_sharp_JT_Reader.DataTypes.getInt32(_fileBytes);
            Int32CDP._filePosCount += 1 * 4;
            var codeText = new Array(counter * 4);
            for (var j = 0; j < counter; j++) {
                var _reversedCodeText = new Array(4);
                Buffer.BlockCopy(Int32CDP._data, Int32CDP._filePosCount, _fileBytes, 0, 4);
                _reversedCodeText = _fileBytes.Reverse().ToArray();
                Int32CDP._filePosCount += 1 * 4;
                for (var i = 0; i < 4; i++) {
                    codeText[i + _count] = _reversedCodeText[i];
                }
                _count += 4;
            }
            return codeText;
        }
        static SetUpFilePosition(filePosCount) {
            Int32CDP._filePosCount = filePosCount;
        }
        static SetUpData(data) {
            Int32CDP._data = data;
        }
        static SetupRTF(richTextBox) {
            Int32CDP._richTextBox = richTextBox;
        }
        static GetFilePos() {
            return Int32CDP._filePosCount;
        }
        static GetValueCount() {
            return 0;
        }
        static GetCodeTextWord() {
            return Int32CDP._codeTextWord;
        }
    }
    C_sharp_JT_Reader.Int32CDP = Int32CDP;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=Int32CDP.js.map