var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class BitLengthCodec2 {
            constructor() {
            }
            decode(nValues, vCodeText, nBitsCodeText, ovValues) {
                var nBits = 0, nTotalBits = 0, iSymbol = 0;
                var cNumCurBits = 0;
                var cBitsInMinSymbol = 0;
                var cBitsInMaxSymbol = 0;
                var iMinSymbol = 0;
                var iMaxSymbol = 0;
                var nSyms = 0;
                var paiValues = 0;
                ovValues.setLength(nValues);
                paiValues = ovValues.ptr();
                var iTmp = 0;
                this.GetUnsignedBits(iTmp, 1);
                if (iTmp == 0) {
                    this.GetUnsignedBits(cBitsInMinSymbol, 6);
                    this.GetUnsignedBits(cBitsInMaxSymbol, 6);
                    this.GetSignedBits(iMinSymbol, cBitsInMinSymbol);
                    this.GetSignedBits(iMaxSymbol, cBitsInMaxSymbol);
                    cNumCurBits = this._nBitsInSymbol(iMaxSymbol - iMinSymbol);
                    while (nBits < nTotalBits || nSyms < nValues) {
                        this.GetUnsignedBits(iSymbol, cNumCurBits);
                        iSymbol += iMinSymbol;
                        nSyms++;
                    }
                }
                else {
                    var iMean = 0;
                    var cBlkValBits = 0;
                    var cBlkLenBits = 0;
                    this.GetSignedBits(iMean, 32);
                    this.GetUnsignedBits(cBlkValBits, 3);
                    this.GetUnsignedBits(cBlkLenBits, 3);
                    var cMaxFieldDecr = -(1 << (cBlkValBits - 1)), cMaxFieldIncr = (1 << (cBlkValBits - 1)) - 1;
                    var cCurFieldWidth = 0;
                    var cDeltaFieldWidth = 0;
                    var cRunLen = 0;
                    var k = 0;
                    for (var ii = 0; ii < nValues;) {
                        do {
                            this.GetSignedBits(cDeltaFieldWidth, cBlkValBits);
                            cCurFieldWidth += cDeltaFieldWidth;
                        } while (cDeltaFieldWidth == cMaxFieldDecr || cDeltaFieldWidth == cMaxFieldIncr);
                        this.GetUnsignedBits(cRunLen, cBlkLenBits);
                        for (; k < ii + cRunLen; k++) {
                            this.GetSignedBits(iTmp, cCurFieldWidth);
                        }
                        ii += cRunLen;
                    }
                }
                return true;
            }
            _nBitsInSymbol(iSymbol) {
                if (iSymbol == 0)
                    return 0;
                var cMaxCodeSpan = 0;
                var i, nBits;
                for (; i <= cMaxCodeSpan && nBits < 31; i += i, nBits++)
                    ;
                return nBits;
            }
            getNextCodeText(uCodeText, nBits) {
                return true;
            }
            GetUnsignedBits(val1, val2) {
            }
            GetSignedBits(val1, val2) {
            }
        }
        Codecs.BitLengthCodec2 = BitLengthCodec2;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=BitLengthCodec2.js.map