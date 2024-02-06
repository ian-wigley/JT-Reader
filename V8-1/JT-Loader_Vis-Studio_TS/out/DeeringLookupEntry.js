var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class DeeringLookupEntry {
            cosTheta;
            sinTheta;
            cosPsi;
            sinPsi;
            constructor(cosTheta, sinTheta, cosPsi, sinPsi) {
                this.cosTheta = cosTheta;
                this.sinTheta = sinTheta;
                this.cosPsi = cosPsi;
                this.sinPsi = sinPsi;
            }
            getCosTheta() {
                return this.cosTheta;
            }
            getSinTheta() {
                return this.sinTheta;
            }
            getCosPsi() {
                return this.cosPsi;
            }
            getSinPsi() {
                return this.sinPsi;
            }
        }
        Codecs.DeeringLookupEntry = DeeringLookupEntry;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=DeeringLookupEntry.js.map