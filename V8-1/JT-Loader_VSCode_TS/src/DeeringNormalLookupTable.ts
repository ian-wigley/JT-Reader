import { DeeringLookupEntry } from "./DeeringLookupEntry.js";

export class DeeringNormalLookupTable {
    nBits: number;
    cosTheta: number[];
    sinTheta: number[];
    cosPsi: number[];
    sinPsi: number[];

    constructor() {
        var numberbits: number = 8;
        this.nBits = Math.min(numberbits, 31);
        var tableSize: number = (1 << this.nBits);
        this.cosTheta = new Array(tableSize + 1);
        this.sinTheta = new Array(tableSize + 1);
        this.cosPsi = new Array(tableSize + 1);
        this.sinPsi = new Array(tableSize + 1);
        var psiMax: number = 0.615479709;
        var fTableSize: number = tableSize;
        for (var ii: number = 0; ii <= tableSize; ii++) {
            var theta: number = Math.asin(Math.tan(psiMax * (tableSize - ii) / fTableSize));
            var psi: number = psiMax * ((ii) / fTableSize);
            this.cosTheta[ii] = Math.cos(theta);
            this.sinTheta[ii] = Math.sin(theta);
            this.cosPsi[ii] = Math.cos(psi);
            this.sinPsi[ii] = Math.sin(psi);
        }
    }

    public numBitsPerAngle(): number {
        return this.nBits;
    }

    public lookupThetaPsi(theta: number, psi: number, numberBits: number): DeeringLookupEntry {
        var offset: number = this.nBits - numberBits;
        var offTheta: number = (theta << offset) & 0xFFFFFFFF;
        var offPsi: number = (psi << offset) & 0xFFFFFFFF;
        return new DeeringLookupEntry(this.cosTheta[<number>offTheta],
            this.sinTheta[<number>offTheta], this.cosPsi[<number>offPsi],
            this.sinPsi[<number>offPsi]);
    }
}
