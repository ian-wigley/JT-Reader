declare module C_sharp_JT_Reader.Codecs {
    class ArithmeticProbabilityRange {
        private m_low;
        private m_high;
        private m_scale;
        constructor(low: number, high: number, scale: number);
        getLow(): number;
        getHigh(): number;
        getScale(): number;
    }
}
