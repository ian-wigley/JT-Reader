var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class BitLengthCodec {
        _richTextBox;
        constructor(richTextBox) {
            this._richTextBox = richTextBox;
        }
        DecompressBitLength(encodedBytes, codeTextLength, numSymbolsToRead) {
            var encodedBits = new C_sharp_JT_Reader.BitBuffer(encodedBytes);
            var bitFieldWith = 0;
            var result = new Array(numSymbolsToRead);
            var position = 0;
            while (encodedBits.getBitPos() < codeTextLength) {
                if (encodedBits.readAsInt(1) == 0) {
                    var decodedSymbol = -1;
                    if (bitFieldWith == 0) {
                        decodedSymbol = 0;
                    }
                    else {
                        decodedSymbol = encodedBits.readAsInt(bitFieldWith);
                        decodedSymbol <<= (32 - bitFieldWith);
                        decodedSymbol >>= (32 - bitFieldWith);
                    }
                    result[position++] = decodedSymbol;
                }
                else {
                    var adjustmentBit = encodedBits.readAsInt(1);
                    do {
                        if (adjustmentBit == 1) {
                            bitFieldWith += 2;
                        }
                        else {
                            bitFieldWith -= 2;
                        }
                    } while (encodedBits.readAsInt(1) == adjustmentBit);
                    var decodedSymbol = -1;
                    if (bitFieldWith == 0) {
                        decodedSymbol = 0;
                    }
                    else {
                        decodedSymbol = encodedBits.readAsInt(bitFieldWith);
                        decodedSymbol <<= (32 - bitFieldWith);
                        decodedSymbol >>= (32 - bitFieldWith);
                    }
                    result[position++] = decodedSymbol;
                }
            }
            return result;
        }
    }
    C_sharp_JT_Reader.BitLengthCodec = BitLengthCodec;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=BitLengthCodec.js.map