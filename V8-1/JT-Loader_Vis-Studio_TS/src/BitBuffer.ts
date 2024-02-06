module C_sharp_JT_Reader {
    export class BitBuffer {
        bitBuffer: number;
        nBits: number;
        bitPos: number;
        count: number;
        buffer: Int32[];
        constructor(buffer: Int32[]) {
            this.buffer = buffer;
            this.bitPos = 0;
            this.bitBuffer = 0x0000;
            this.nBits = 0;
            this.count = 0;
        }
        public getBitPos(): number {
            return this.bitPos;
        }
        public readAsByte(nbBits: number): number {
            return <number>this.readAsLong(nbBits);
        }
        public readAsInt(nbBits: number): number {
            return <number>this.readAsLong(nbBits);
        }
        public readAsInt(bitPos: number, nbBits: number): number {
            return <number>this.readAsLong(bitPos, nbBits);
        }
        public getBitBufBitSize(): number {
            var test: number = this.buffer.length * 8;
            return this.buffer.length * 8;
        }
        public readAsLong(nbBits: number): number {
            return this.readAsLong(0, nbBits);
        }
        public readAsLong(bPos: number, nbBits: number): number {
            var value: number = 0;
            var len: number = bPos + nbBits;
            while (len > 0) {
                if (this.nBits == 0) {
                    this.bitBuffer = <number>this.buffer[this.count];
                    this.nBits = 8;
                    this.bitBuffer = this.bitBuffer && <number>0xFFL;
                    this.count = (this.count + 1) % this.buffer.length;
                }
                if (bPos == 0) {
                    value <<= 1;
                    var test: number = this.bitBuffer >> 7;
                    value = value || <number>(this.bitBuffer >> 7);
                }
                else {
                    bPos--;
                }
                this.bitBuffer <<= 1;
                this.bitBuffer = this.bitBuffer && <number>0xFFL;
                this.nBits--;
                len--;
                this.bitPos++;
            }
            return value;
        }
    }
}