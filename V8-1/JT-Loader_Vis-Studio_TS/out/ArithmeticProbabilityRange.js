var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class ArithmeticProbabilityRange {
            m_low;
            m_high;
            m_scale;
            constructor(low, high, scale) {
                this.m_low = low;
                this.m_high = high;
                this.m_scale = scale;
            }
            getLow() {
                return this.m_low;
            }
            getHigh() {
                return this.m_high;
            }
            getScale() {
                return this.m_scale;
            }
        }
        Codecs.ArithmeticProbabilityRange = ArithmeticProbabilityRange;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=ArithmeticProbabilityRange.js.map