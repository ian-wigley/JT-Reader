
export class BitLengthCodec {

    public DecompressBitLength(encodedBytes: any /*Int32[]*/, codeTextLength: number, numSymbolsToRead: number): number[] {
        var encodedBits: any;//BitBuffer = new BitBuffer(encodedBytes);
        var bitFieldWith: number = 0;
        var result: number[] = new Array(numSymbolsToRead);
        var position: number = 0;
        while (encodedBits.getBitPos() < codeTextLength) {
            if (encodedBits.readAsInt(1) == 0) {
                var decodedSymbol: number = -1;
                if (bitFieldWith == 0) {
                    decodedSymbol = 0;
                }
                else {
                    decodedSymbol = encodedBits.readAsInt(bitFieldWith);
                    decodedSymbol <<= (32 - bitFieldWith);
                    decodedSymbol >>= (32 - bitFieldWith);
                }
                result[position++] = decodedSymbol;
            }
            else {
                var adjustmentBit: number = encodedBits.readAsInt(1);
                do {
                    if (adjustmentBit == 1) {
                        bitFieldWith += 2;
                    }
                    else {
                        bitFieldWith -= 2;
                    }
                }
                while (encodedBits.readAsInt(1) == adjustmentBit);
                var decodedSymbol: number = -1;
                if (bitFieldWith == 0) {
                    decodedSymbol = 0;
                }
                else {
                    decodedSymbol = encodedBits.readAsInt(bitFieldWith);
                    decodedSymbol <<= (32 - bitFieldWith);
                    decodedSymbol >>= (32 - bitFieldWith);
                }
                result[position++] = decodedSymbol;
            }
        }
        return result;
    }
}
