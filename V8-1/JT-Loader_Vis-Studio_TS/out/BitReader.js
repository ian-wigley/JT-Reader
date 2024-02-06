var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class BitReader {
            bitBuf;
            encodedBytes;
            _data;
            m_filePos;
            constructor(data) {
                this._data = data;
                this.encodedBytes = new Array(0);
                this.bitBuf = new C_sharp_JT_Reader.BitBuffer(this.encodedBytes);
                this.m_filePos = 0;
            }
            readU32(nbBits, _filePosCount) {
                if (nbBits == 0) {
                    return 0;
                }
                this.m_filePos = _filePosCount;
                var nbLeft = this.getNbBitsLeft();
                if (nbLeft < nbBits) {
                    var nbBytes = ((nbBits - nbLeft - 1) / 8) + 1;
                    var sizeBytes = nbBytes;
                    var cpt = 0;
                    if (nbLeft != 0) {
                        sizeBytes += 1;
                    }
                    var byteBuf = new Array(sizeBytes);
                    if (nbLeft != 0) {
                        var remainingByte = this.bitBuf.readAsByte(nbLeft);
                        byteBuf[cpt] = remainingByte;
                        cpt += 1;
                    }
                    var tmpBytes = new Array(nbBytes);
                    Buffer.BlockCopy(this._data, this.m_filePos, tmpBytes, 0, nbBytes);
                    this.m_filePos += nbBytes;
                    for (var i = cpt; i < sizeBytes; i++) {
                        byteBuf[i] = tmpBytes[i - cpt];
                    }
                    this.bitBuf = new C_sharp_JT_Reader.BitBuffer(byteBuf);
                }
                if (nbLeft > 0) {
                    if (nbLeft < nbBits)
                        return this.bitBuf.readAsInt(8 - nbLeft, nbBits);
                    else
                        return this.bitBuf.readAsInt(nbBits);
                }
                else {
                    var res = this.bitBuf.readAsInt(nbBits);
                    return res;
                }
            }
            getNbBitsLeft() {
                return (this.bitBuf.getBitBufBitSize() - this.bitBuf.getBitPos());
            }
            getFilePos() {
                return this.m_filePos;
            }
        }
        Codecs.BitReader = BitReader;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=BitReader.js.map