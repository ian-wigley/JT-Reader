module C_sharp_JT_Reader.Codecs {
    export class BitReader {
        bitBuf: BitBuffer;
        encodedBytes: Int32[];
        _data: number[];
        private m_filePos: number;
        constructor(data: number[]) {
            this._data = data;
            this.encodedBytes = new Array(0);
            this.bitBuf = new BitBuffer(this.encodedBytes);
            this.m_filePos = 0;
        }
        public readU32(nbBits: number, _filePosCount: number): number {
            if (nbBits == 0) {
                return 0;
            }
            this.m_filePos = _filePosCount;
            var nbLeft: number = this.getNbBitsLeft();
            if (nbLeft < nbBits) {
                var nbBytes: number = ((nbBits - nbLeft - 1) / 8) + 1;
                var sizeBytes: number = nbBytes;
                var cpt: number = 0;
                if (nbLeft != 0) {
                    sizeBytes += 1;
                }
                var byteBuf: Int32[] = new Array(sizeBytes);
                if (nbLeft != 0) {
                    var remainingByte: number = this.bitBuf.readAsByte(nbLeft);
                    byteBuf[cpt] = remainingByte;
                    cpt += 1;
                }
                var tmpBytes: number[] = new Array(nbBytes);
                Buffer.BlockCopy(this._data, this.m_filePos, tmpBytes, 0, nbBytes);
                this.m_filePos += nbBytes;
                for (var i: number = cpt; i < sizeBytes; i++) {
                    byteBuf[i] = tmpBytes[i - cpt];
                }
                this.bitBuf = new BitBuffer(byteBuf);
            }
            if (nbLeft > 0) {
                if (nbLeft < nbBits)
                    return this.bitBuf.readAsInt(8 - nbLeft, nbBits);
                else return this.bitBuf.readAsInt(nbBits);
            }
            else {
                var res: number = this.bitBuf.readAsInt(nbBits);
                return res;
            }
        }
        public getNbBitsLeft(): number {
            return <number>(this.bitBuf.getBitBufBitSize() - this.bitBuf.getBitPos());
        }
        public getFilePos(): number {
            return this.m_filePos;
        }
    }
}