var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class DeeringNormalLookupTable {
            nBits;
            cosTheta;
            sinTheta;
            cosPsi;
            sinPsi;
            constructor() {
                var numberbits = 8;
                this.nBits = Math.Min(numberbits, 31);
                var tableSize = (1 << this.nBits);
                this.cosTheta = new Array(tableSize + 1);
                this.sinTheta = new Array(tableSize + 1);
                this.cosPsi = new Array(tableSize + 1);
                this.sinPsi = new Array(tableSize + 1);
                var psiMax = 0.615479709;
                var fTableSize = tableSize;
                for (var ii = 0; ii <= tableSize; ii++) {
                    var theta = Math.Asin(Math.Tan(psiMax * (tableSize - ii) / fTableSize));
                    var psi = psiMax * ((ii) / fTableSize);
                    this.cosTheta[ii] = Math.Cos(theta);
                    this.sinTheta[ii] = Math.Sin(theta);
                    this.cosPsi[ii] = Math.Cos(psi);
                    this.sinPsi[ii] = Math.Sin(psi);
                }
            }
            numBitsPerAngle() {
                return this.nBits;
            }
            lookupThetaPsi(theta, psi, numberBits) {
                var offset = this.nBits - numberBits;
                var offTheta = (theta << offset) & 0xFFFFFFFF, L;
                var offPsi = (psi << offset) & 0xFFFFFFFF, L;
                return new Codecs.DeeringLookupEntry(this.cosTheta[offTheta], this.sinTheta[offTheta], this.cosPsi[offPsi], this.sinPsi[offPsi]);
            }
        }
        Codecs.DeeringNormalLookupTable = DeeringNormalLookupTable;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=DeeringNormalLookupTable.js.map