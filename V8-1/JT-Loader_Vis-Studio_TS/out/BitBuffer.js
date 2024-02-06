var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class BitBuffer {
        bitBuffer;
        nBits;
        bitPos;
        count;
        buffer;
        constructor(buffer) {
            this.buffer = buffer;
            this.bitPos = 0;
            this.bitBuffer = 0x0000;
            this.nBits = 0;
            this.count = 0;
        }
        getBitPos() {
            return this.bitPos;
        }
        readAsByte(nbBits) {
            return this.readAsLong(nbBits);
        }
        readAsInt(nbBits) {
            return this.readAsLong(nbBits);
        }
        readAsInt(bitPos, nbBits) {
            return this.readAsLong(bitPos, nbBits);
        }
        getBitBufBitSize() {
            var test = this.buffer.length * 8;
            return this.buffer.length * 8;
        }
        readAsLong(nbBits) {
            return this.readAsLong(0, nbBits);
        }
        readAsLong(bPos, nbBits) {
            var value = 0;
            var len = bPos + nbBits;
            while (len > 0) {
                if (this.nBits == 0) {
                    this.bitBuffer = this.buffer[this.count];
                    this.nBits = 8;
                    this.bitBuffer = this.bitBuffer && 0xFF;
                    L;
                    this.count = (this.count + 1) % this.buffer.length;
                }
                if (bPos == 0) {
                    value <<= 1;
                    var test = this.bitBuffer >> 7;
                    value = value || (this.bitBuffer >> 7);
                }
                else {
                    bPos--;
                }
                this.bitBuffer <<= 1;
                this.bitBuffer = this.bitBuffer && 0xFF;
                L;
                this.nBits--;
                len--;
                this.bitPos++;
            }
            return value;
        }
    }
    C_sharp_JT_Reader.BitBuffer = BitBuffer;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=BitBuffer.js.map