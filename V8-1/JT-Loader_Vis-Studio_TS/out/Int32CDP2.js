var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class Int32CDP2 {
        static _richTextBox;
        static _filePosCount;
        static _valueCount;
        static _codeTextWord;
        static _data;
        static bitLengthCodec;
        static Int32CDPtwo() {
            Int32CDP2._richTextBox.Add("\n\n----------------------- Int32CDP2 Mk 2 data Collection ------------------------");
            var fileBytes;
            var endianSwapBytes;
            fileBytes = new Array(4);
            Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
            Int32CDP2._valueCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            Int32CDP2._richTextBox.Add("\nValue Count = " + Int32CDP2._valueCount.ToString());
            Int32CDP2._filePosCount += 4;
            if (Int32CDP2._valueCount > 0) {
                var codecType = Int32CDP2._data[Int32CDP2._filePosCount];
                var str8 = codecType.ToString();
                Int32CDP2._richTextBox.Add("\nCodec Type = " + str8);
                Int32CDP2._filePosCount += 1;
                if (codecType == 0) {
                }
                if (codecType == 1) {
                    fileBytes = new Array(4);
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _codeTextLength = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nCode Text Length = " + _codeTextLength.ToString());
                    Int32CDP2._filePosCount += 4;
                    endianSwapBytes = new Array(4);
                    Int32CDP2._codeTextWord = new Array(_codeTextLength / 32);
                    var _codeTextWords = new Array(29);
                    var count = 0;
                    for (var b = 0; b < 7; b++) {
                        Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                        endianSwapBytes = fileBytes.Reverse().ToArray();
                        _codeTextWords[count++] = endianSwapBytes[0];
                        _codeTextWords[count++] = endianSwapBytes[1];
                        _codeTextWords[count++] = endianSwapBytes[2];
                        _codeTextWords[count++] = endianSwapBytes[3];
                        Int32CDP2._richTextBox.Add("\nCode Text Word = " + _codeTextWords[b].ToString());
                        Int32CDP2._filePosCount += 1 * 4;
                    }
                    Int32CDP2.bitLengthCodec = new C_sharp_JT_Reader.BitLengthCodec(Int32CDP2._richTextBox);
                }
                if (codecType == 3) {
                    fileBytes = new Array(4);
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _probabilityContextTableEntryCount = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nProbability Context Table Entry Count = " + _probabilityContextTableEntryCount.ToString());
                    Int32CDP2._filePosCount += 4;
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _numberSymbolBit = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nNumber Symbol Bits = " + _numberSymbolBit.ToString());
                    Int32CDP2._filePosCount += 4;
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _numberOccurrenceCountBits = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nNumber Occurrence Count Bits = " + _numberOccurrenceCountBits.ToString());
                    Int32CDP2._filePosCount += 4;
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _numberValueBits = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nNumber Value Bits = " + _numberValueBits.ToString());
                    Int32CDP2._filePosCount += 4;
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _minValue = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nMin Value = " + _minValue.ToString());
                    Int32CDP2._filePosCount += 4;
                    for (var i = 0; i < _probabilityContextTableEntryCount; i++) {
                        Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                        var _symbol = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                        Int32CDP2._richTextBox.Add("\nSymbol = " + _symbol.ToString());
                        Int32CDP2._filePosCount += 4;
                        Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                        var _occurrenceCount = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                        Int32CDP2._richTextBox.Add("\nOccurence Count = " + _occurrenceCount.ToString());
                        Int32CDP2._filePosCount += 4;
                        Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                        var _associatedValue = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                        Int32CDP2._richTextBox.Add("\nAssociated Value = " + _associatedValue.ToString());
                        Int32CDP2._filePosCount += 4;
                    }
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _alignmentBits = C_sharp_JT_Reader.DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nAlignment Bits = " + _alignmentBits.ToString());
                    Int32CDP2._filePosCount += 4;
                }
                if (codecType == 4) {
                    {
                        var _chopBits = Int32CDP2._data[Int32CDP2._filePosCount];
                        Int32CDP2._richTextBox.Add("\nChop Bits = " + _chopBits.ToString());
                        Int32CDP2._filePosCount += 1;
                        if (_chopBits != 0) {
                            Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                            var _valueBias = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                            Int32CDP2._richTextBox.Add("\nValue Bias = " + _valueBias.ToString());
                            Int32CDP2._filePosCount += 4;
                            var _valueSpanBits = Int32CDP2._data[Int32CDP2._filePosCount];
                            Int32CDP2._richTextBox.Add("\nValue Span Bits = " + _valueSpanBits.ToString());
                            Int32CDP2._filePosCount += 1;
                            var LSBValue = new Array(_valueSpanBits);
                            var MSBValue = new Array(_valueSpanBits);
                            var _choppedMsbBeginning = (_valueSpanBits - _chopBits);
                            var _choppedMsbEnd = (_valueSpanBits - 1);
                            var _choppedLsbBeggining = 0;
                            var _choppedLsbEnd = (_valueSpanBits - 1);
                            for (var i = 0; i < _valueSpanBits; i++) {
                                Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                                LSBValue[i] = fileBytes[_choppedLsbBeggining];
                                MSBValue[i] = fileBytes[_choppedMsbBeginning];
                                Int32CDP2._richTextBox.Add("\n");
                            }
                        }
                    }
                }
            }
            Int32CDP2._richTextBox.Add("\n\n-------------------- End of Int32CDP2 Mk 2 data Collection ---------------------");
        }
        static SetUpFilePosition(filePosCount) {
            Int32CDP2._filePosCount = filePosCount;
        }
        static SetUpData(data) {
            Int32CDP2._data = data;
        }
        static SetupRTF(richTextBox) {
            Int32CDP2._richTextBox = richTextBox;
        }
        static GetFilePos() {
            return Int32CDP2._filePosCount;
        }
        static GetValueCount() {
            return Int32CDP2._valueCount;
        }
        static GetCodeTextWord() {
            return Int32CDP2._codeTextWord;
        }
    }
    C_sharp_JT_Reader.Int32CDP2 = Int32CDP2;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=Int32CDP2.js.map