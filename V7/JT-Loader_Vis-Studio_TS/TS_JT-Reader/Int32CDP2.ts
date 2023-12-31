module C_sharp_JT_Reader {
    export class Int32CDP2 {
        static _richTextBox: List<string>;
        static _filePosCount: number;
        static _valueCount: Int32;
        static _codeTextWord: UInt32[];
        static _data: number[];
        static bitLengthCodec: BitLengthCodec;
        public static Int32CDPtwo(): void {
            Int32CDP2._richTextBox.Add("\n\n----------------------- Int32CDP2 Mk 2 data Collection ------------------------");
            var fileBytes: number[];
            var endianSwapBytes: number[];
            fileBytes = new Array(4);
            Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
            Int32CDP2._valueCount = DataTypes.getInt32(fileBytes);
            Int32CDP2._richTextBox.Add("\nValue Count = " + Int32CDP2._valueCount.ToString());
            Int32CDP2._filePosCount += 4;
            if (Int32CDP2._valueCount > 0) {
                var codecType: number = Int32CDP2._data[Int32CDP2._filePosCount];
                var str8: string = codecType.ToString();
                Int32CDP2._richTextBox.Add("\nCodec Type = " + str8);
                Int32CDP2._filePosCount += 1;
                if (codecType == 0) {

                }
                if (codecType == 1) {
                    fileBytes = new Array(4);
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _codeTextLength: Int32 = DataTypes.getInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nCode Text Length = " + _codeTextLength.ToString());
                    Int32CDP2._filePosCount += 4;
                    endianSwapBytes = new Array(4);
                    Int32CDP2._codeTextWord = new Array(_codeTextLength / 32);
                    var _codeTextWords: number[] = new Array(29);
                    var count: number = 0;
                    for (var b: number = 0; b < 7; b++) {
                        Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                        endianSwapBytes = fileBytes.Reverse().ToArray();
                        _codeTextWords[count++] = endianSwapBytes[0];
                        _codeTextWords[count++] = endianSwapBytes[1];
                        _codeTextWords[count++] = endianSwapBytes[2];
                        _codeTextWords[count++] = endianSwapBytes[3];
                        Int32CDP2._richTextBox.Add("\nCode Text Word = " + _codeTextWords[b].ToString());
                        Int32CDP2._filePosCount += 1 * 4;
                    }
                    Int32CDP2.bitLengthCodec = new BitLengthCodec(Int32CDP2._richTextBox);
                }
                if (codecType == 3) {
                    fileBytes = new Array(4);
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _probabilityContextTableEntryCount: UInt32 = DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nProbability Context Table Entry Count = " + _probabilityContextTableEntryCount.ToString());
                    Int32CDP2._filePosCount += 4;
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _numberSymbolBit: UInt32 = DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nNumber Symbol Bits = " + _numberSymbolBit.ToString());
                    Int32CDP2._filePosCount += 4;
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _numberOccurrenceCountBits: UInt32 = DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nNumber Occurrence Count Bits = " + _numberOccurrenceCountBits.ToString());
                    Int32CDP2._filePosCount += 4;
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _numberValueBits: UInt32 = DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nNumber Value Bits = " + _numberValueBits.ToString());
                    Int32CDP2._filePosCount += 4;
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _minValue: UInt32 = DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nMin Value = " + _minValue.ToString());
                    Int32CDP2._filePosCount += 4;
                    for (var i: number = 0; i < _probabilityContextTableEntryCount; i++) {
                        Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                        var _symbol: UInt32 = DataTypes.getUInt32(fileBytes);
                        Int32CDP2._richTextBox.Add("\nSymbol = " + _symbol.ToString());
                        Int32CDP2._filePosCount += 4;
                        Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                        var _occurrenceCount: UInt32 = DataTypes.getUInt32(fileBytes);
                        Int32CDP2._richTextBox.Add("\nOccurence Count = " + _occurrenceCount.ToString());
                        Int32CDP2._filePosCount += 4;
                        Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                        var _associatedValue: UInt32 = DataTypes.getUInt32(fileBytes);
                        Int32CDP2._richTextBox.Add("\nAssociated Value = " + _associatedValue.ToString());
                        Int32CDP2._filePosCount += 4;
                    }
                    Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                    var _alignmentBits: UInt32 = DataTypes.getUInt32(fileBytes);
                    Int32CDP2._richTextBox.Add("\nAlignment Bits = " + _alignmentBits.ToString());
                    Int32CDP2._filePosCount += 4;
                }
                if (codecType == 4) {
                    {
                        var _chopBits: number = Int32CDP2._data[Int32CDP2._filePosCount];
                        Int32CDP2._richTextBox.Add("\nChop Bits = " + _chopBits.ToString());
                        Int32CDP2._filePosCount += 1;
                        if (_chopBits != 0) {
                            Buffer.BlockCopy(Int32CDP2._data, Int32CDP2._filePosCount, fileBytes, 0, 4);
                            var _valueBias: Int32 = DataTypes.getInt32(fileBytes);
                            Int32CDP2._richTextBox.Add("\nValue Bias = " + _valueBias.ToString());
                            Int32CDP2._filePosCount += 4;
                            var _valueSpanBits: number = Int32CDP2._data[Int32CDP2._filePosCount];
                            Int32CDP2._richTextBox.Add("\nValue Span Bits = " + _valueSpanBits.ToString());
                            Int32CDP2._filePosCount += 1;
                            var LSBValue: number[] = new Array(_valueSpanBits);
                            var MSBValue: number[] = new Array(_valueSpanBits);
                            var _choppedMsbBeginning: number = <number>(_valueSpanBits - _chopBits);
                            var _choppedMsbEnd: number = <number>(_valueSpanBits - 1);
                            var _choppedLsbBeggining: number = 0;
                            var _choppedLsbEnd: number = <number>(_valueSpanBits - 1);
                            for (var i: number = 0; i < _valueSpanBits; i++) {
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
        public static SetUpFilePosition(filePosCount: number): void {
            Int32CDP2._filePosCount = filePosCount;
        }
        public static SetUpData(data: number[]): void {
            Int32CDP2._data = data;
        }
        public static SetupRTF(richTextBox: List<string>): void {
            Int32CDP2._richTextBox = richTextBox;
        }
        public static GetFilePos(): number {
            return Int32CDP2._filePosCount;
        }
        public static GetValueCount(): number {
            return Int32CDP2._valueCount;
        }
        public static GetCodeTextWord(): UInt32[] {
            return Int32CDP2._codeTextWord;
        }
    }
}