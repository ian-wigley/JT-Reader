﻿export class DeeringLookupEntry {

    cosTheta: number;
    sinTheta: number;
    cosPsi: number;
    sinPsi: number;

    constructor(cosTheta: number, sinTheta: number, cosPsi: number, sinPsi: number) {
        this.cosTheta = cosTheta;
        this.sinTheta = sinTheta;
        this.cosPsi = cosPsi;
        this.sinPsi = sinPsi;
    }

    public getCosTheta(): number {
        return this.cosTheta;
    }

    public getSinTheta(): number {
        return this.sinTheta;
    }

    public getCosPsi(): number {
        return this.cosPsi;
    }

    public getSinPsi(): number {
        return this.sinPsi;
    }
}