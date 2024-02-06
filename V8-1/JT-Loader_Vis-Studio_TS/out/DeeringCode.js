var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class DeeringCode {
            m_sextant = 0;
            m_octant = 0;
            m_theta = 0;
            m_psi = 0;
            constructor(sextant, octant, theta, psi) {
                this.m_sextant = sextant;
                this.m_octant = octant;
                this.m_theta = theta;
                this.m_psi = psi;
            }
        }
        Codecs.DeeringCode = DeeringCode;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=DeeringCode.js.map