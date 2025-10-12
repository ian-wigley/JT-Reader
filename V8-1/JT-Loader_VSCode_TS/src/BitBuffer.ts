
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

    public readAsIntToo(bitPos: number, nbBits: number): number {
        return <number>this.readAsLongToo(bitPos, nbBits);
    }

    public getBitBufBitSize(): number {
        // var test: number = this.buffer.length * 8;
        return this.buffer.length * 8;
    }

    public readAsLong(nbBits: number): number {
        return this.readAsLongToo(0, nbBits);
    }

    public readAsLongToo(bPos: number, nbBits: number): number {
        var value: number = 0;
        var len: number = bPos + nbBits;
        while (len > 0) {
            if (this.nBits == 0) {
                this.bitBuffer = <number>this.buffer[this.count];
                this.nBits = 8;
                this.bitBuffer = this.bitBuffer && <number>0xFF;
                this.count = (this.count + 1) % this.buffer.length;
            }
            if (bPos == 0) {
                // value <<= 1;
                // var test: number = this.bitBuffer >> 7;
                value = value || <number>(this.bitBuffer >> 7);
            }
            else {
                bPos--;
            }
            // this.bitBuffer <<= 1;
            this.bitBuffer = this.bitBuffer && <number>0xFF;
            this.nBits--;
            len--;
            this.bitPos++;
        }
        return value;
    }
}

export class Buffer {
    public static BlockCopy(src: any, srcOffset: number, dst: any, dstOffset: number, count: number): void {
        for (var i: number = 0; i < count; i++) {
            dst[dstOffset + i] = src[srcOffset + i];
        }
    }
}

export class BitConverter{
    public static GetBytes(value: number): number[] {
        var bytes: number[] = new Array(4);
        bytes[0] = (value & 0x000000FF);
        bytes[1] = (value & 0x0000FF00) >> 8;
        bytes[2] = (value & 0x00FF0000) >> 16;
        bytes[3] = (value & 0xFF000000) >> 24;
        return bytes;
    }

    public static ToInt32(value: number[], startIndex: number): number {
        return (value[startIndex] | (value[startIndex + 1] << 8) | (value[startIndex + 2] << 16) | (value[startIndex + 3] << 24));
    }

    public static ToUInt32(value: number[], startIndex: number): UInt32 {
        return (value[startIndex] | (value[startIndex + 1] << 8) | (value[startIndex + 2] << 16) | (value[startIndex + 3] << 24));
    }

    public static ToInt16(value: number[], startIndex: number): Int16 {
        return (value[startIndex] | (value[startIndex + 1] << 8));
    }

    public static ToUInt64(value: number[], startIndex: number): UInt64 {
        return (value[startIndex] | (value[startIndex + 1] << 8) | (value[startIndex + 2] << 16) | (value[startIndex + 3] << 24) |
            (value[startIndex + 4] << 32) | (value[startIndex + 5] << 40) | (value[startIndex + 6] << 48) | (value[startIndex + 7] << 56));
    }

    public static ToSingle(value: number[], startIndex: number): number {
        var intValue: number = this.ToInt32(value, startIndex);
        var sign: number = ((intValue >> 31) == 0) ? 1 : -1;
        var exponent: number = ((intValue >> 23) & 0xff);
        var mantissa: number = (exponent == 0) ?
            (intValue & 0x7fffff) << 1 :
            (intValue & 0x7fffff) | 0x800000;
        return sign * mantissa * Math.pow(2, exponent - 150);
    }
}