module C_sharp_JT_Reader.Codecs {
    export class BitLengthCodec2 {
        constructor() {

        }
        public decode(nValues: Int32, vCodeText: DataTypes.VecU32, nBitsCodeText: Int32, ovValues: VecI32): boolean {
            var nBits: Int32 = 0,
                nTotalBits = 0,
                iSymbol = 0;
            var cNumCurBits: Int32 = 0;
            var cBitsInMinSymbol: Int32 = 0;
            var cBitsInMaxSymbol: Int32 = 0;
            var iMinSymbol: Int32 = 0;
            var iMaxSymbol: Int32 = 0;
            var nSyms: Int32 = 0;
            var paiValues: Int32 = 0;
            ovValues.setLength(nValues);
            paiValues = ovValues.ptr();
            var iTmp: Int32 = 0;
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
                var iMean: Int32 = 0;
                var cBlkValBits: Int32 = 0;
                var cBlkLenBits: Int32 = 0;
                this.GetSignedBits(iMean, 32);
                this.GetUnsignedBits(cBlkValBits, 3);
                this.GetUnsignedBits(cBlkLenBits, 3);
                var cMaxFieldDecr: Int32 = -(1 << (cBlkValBits - 1)),
                    cMaxFieldIncr = (1 << (cBlkValBits - 1)) - 1;
                var cCurFieldWidth: Int32 = 0;
                var cDeltaFieldWidth: Int32 = 0;
                var cRunLen: Int32 = 0;
                var k: Int32 = 0;
                for (var ii: Int32 = 0; ii < nValues;) {
                    do {
                        this.GetSignedBits(cDeltaFieldWidth, cBlkValBits);
                        cCurFieldWidth += cDeltaFieldWidth;
                    }
                    while (cDeltaFieldWidth == cMaxFieldDecr || cDeltaFieldWidth == cMaxFieldIncr);
                    this.GetUnsignedBits(cRunLen, cBlkLenBits);
                    for (; k < ii + cRunLen; k++) {
                        this.GetSignedBits(iTmp, cCurFieldWidth);
                    }
                    ii += cRunLen;
                }
            }
            return true;
        }
        _nBitsInSymbol(iSymbol: Int32): Int32 {
            if (iSymbol == 0)
                return 0;
            var cMaxCodeSpan: Int32 = 0;
            var i: Int32, nBits;
            for (; i <= cMaxCodeSpan && nBits < 31; i += i, nBits++)
                ;
            return nBits;
        }
        getNextCodeText(uCodeText: UInt32, nBits: Int32): boolean {
            return true;
        }
        GetUnsignedBits(val1: number, val2: number): void {

        }
        GetSignedBits(val1: number, val2: number): void {

        }
    }
}