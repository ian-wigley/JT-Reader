declare module C_sharp_JT_Reader.Codecs {
    class DeeringNormalLookupTable {
        nBits: number;
        cosTheta: number[];
        sinTheta: number[];
        cosPsi: number[];
        sinPsi: number[];
        constructor();
        numBitsPerAngle(): number;
        lookupThetaPsi(theta: number, psi: number, numberBits: number): DeeringLookupEntry;
    }
}
