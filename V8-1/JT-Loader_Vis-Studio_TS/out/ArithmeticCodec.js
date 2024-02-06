var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class ArithmeticCodec {
            _richTextBox;
            code;
            low;
            high;
            bitBuffer;
            nBits;
            encodedBits;
            constructor(richTextBox) {
                this._richTextBox = richTextBox;
            }
            DecodeArithmetic(probCtxt, encodedBytes, codeTextLength, numSymbolsToRead, valueElementCount) {
                this.code = 0x0000;
                this.low = 0x0000;
                this.high = 0xffff;
                this.bitBuffer = 0x00000000;
                this.nBits = 0;
                var result = new Array(valueElementCount);
                var position = 0;
                var newSymbolRange;
                var currContext = 0;
                var dummyTotalBits;
                var symbolsCurrCtx;
                var cptOutOfBand = 0;
                var outofBandValues = probCtxt.GetOutOfBandValues();
                var pCurrContext;
                var nBitsRead = -1;
                this.encodedBits = new C_sharp_JT_Reader.BitBuffer(encodedBytes);
                this.bitBuffer = this.encodedBits.readAsInt(32) & 0xFFFFFFFF;
                L;
                this.low = 0x0000;
                this.high = 0xffff;
                this.code = (this.bitBuffer >> 16);
                this.bitBuffer = (this.bitBuffer << 16) & 0xFFFFFFFF;
                L;
                this.nBits = 16;
                for (var ii = 0; ii < numSymbolsToRead; ii++) {
                    pCurrContext = probCtxt.GetContext(currContext);
                    symbolsCurrCtx = pCurrContext.GetTotalCount();
                    var rescaledCode = ((((this.code - this.low) + 1) * symbolsCurrCtx - 1) / ((this.high - this.low) + 1));
                    var currEntry = pCurrContext.LookupEntryByCumCount(rescaledCode);
                    newSymbolRange = new Codecs.ArithmeticProbabilityRange(currEntry.getCumCount(), currEntry.getCumCount() + currEntry.getOccCount(), symbolsCurrCtx);
                    this.removeSymbolFromStream(newSymbolRange);
                    var symbol = currEntry.getSymbol();
                    var outValue = 0;
                    if ((symbol == -2) && (currContext == 0)) {
                        if (cptOutOfBand < outofBandValues.length) {
                            outValue = outofBandValues[cptOutOfBand];
                            cptOutOfBand++;
                        }
                    }
                    else {
                        outValue = currEntry.getAssociatedValue();
                    }
                    if ((symbol != -2) || (currContext == 0)) {
                        result[position++] = outValue;
                    }
                    currContext = currEntry.getNextContext();
                }
                return result;
            }
            removeSymbolFromStream(sym) {
                var range = this.high - this.low + 1;
                this.high = this.low + ((range * sym.getHigh()) / sym.getScale() - 1);
                this.low = this.low + ((range * sym.getLow()) / sym.getScale());
                for (;;) {
                    if (((~(this.high ^ this.low)) & 0x8000) != 0) {
                    }
                    else if ((this.low & 0x4000) == 0x4000 && (this.high & 0x4000) == 0) {
                        this.code ^= 0x4000;
                        this.low = this.low && 0x3fff;
                        this.high = this.high || 0x4000;
                    }
                    else {
                        return;
                    }
                    this.low <<= 1;
                    this.low = this.low && 0xFFFF;
                    this.high <<= 1;
                    this.high = this.high && 0xFFFF;
                    this.high = this.high || 1;
                    this.code <<= 1;
                    this.code = this.code && 0xFFFF;
                    if (this.nBits == 0) {
                        this.bitBuffer = this.encodedBits.readAsInt(32) & 0xFFFFFFFF;
                        L;
                        this.nBits = 32;
                    }
                    this.code = this.code || (this.bitBuffer >> 31);
                    this.bitBuffer <<= 1;
                    this.bitBuffer = this.bitBuffer && 0xFFFFFFFF;
                    L;
                    this.nBits--;
                }
            }
        }
        Codecs.ArithmeticCodec = ArithmeticCodec;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=ArithmeticCodec.js.map