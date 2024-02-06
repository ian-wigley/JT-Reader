declare module C_sharp_JT_Reader.Codecs {
    class DeeringLookupEntry {
        cosTheta: number;
        sinTheta: number;
        cosPsi: number;
        sinPsi: number;
        constructor(cosTheta: number, sinTheta: number, cosPsi: number, sinPsi: number);
        getCosTheta(): number;
        getSinTheta(): number;
        getCosPsi(): number;
        getSinPsi(): number;
    }
}
