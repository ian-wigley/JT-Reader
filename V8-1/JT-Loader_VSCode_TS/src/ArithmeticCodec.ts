import { ArithmeticProbabilityRange } from "./ArithmeticProbabilityRange.js";
import { BitBuffer } from "./BitBuffer.js";
import { Int32ProbCtxtEntry } from "./Int32ProbCtxtEntry.js";

export class ArithmeticCodec {

    private code: number;
    private low: number;
    private high: number;
    private bitBuffer: number;
    private nBits: number;
    private encodedBits: BitBuffer;

    // constructor(richTextBox: List<string>) {
    //     this._richTextBox = richTextBox;
    // }

    //public DecodeArithmetic(probCtxt: Int32ProbabilityContexts, encodedBytes: Int32[], codeTextLength: number, numSymbolsToRead: number, valueElementCount: number): number[] {
    public DecodeArithmetic(probCtxt: any /*Int32ProbabilityContexts*/, encodedBytes: number[] /*Int32[]*/, codeTextLength: number, numSymbolsToRead: number, valueElementCount: number): number[] {
        this.code = 0x0000;
        this.low = 0x0000;
        this.high = 0xffff;
        this.bitBuffer = 0x00000000;
        this.nBits = 0;
        var result: number[] = new Array(valueElementCount);
        var position: number = 0;
        var newSymbolRange: ArithmeticProbabilityRange;
        var currContext: number = 0;
        var dummyTotalBits: number;
        var symbolsCurrCtx: number;
        var cptOutOfBand: number = 0;
        var outofBandValues: number[] = probCtxt.GetOutOfBandValues();
        var pCurrContext: any; //Int32ProbCtxtTable;
        var nBitsRead: number = -1;
        this.encodedBits = new BitBuffer(encodedBytes);
        this.bitBuffer = this.encodedBits.readAsInt(32) & 0xFFFFFFFF;
        this.low = 0x0000;
        this.high = 0xffff;
        this.code = <number>(this.bitBuffer >> 16);
        this.bitBuffer = (this.bitBuffer << 16) & 0xFFFFFFFF;
        this.nBits = 16;

        for (var ii: number = 0; ii < numSymbolsToRead; ii++) {
            pCurrContext = probCtxt.GetContext(currContext);
            symbolsCurrCtx = pCurrContext.GetTotalCount();
            var rescaledCode: number = (((<number>(this.code - this.low) + 1) * symbolsCurrCtx - 1) / (<number>(this.high - this.low) + 1));
            var currEntry: Int32ProbCtxtEntry = pCurrContext.LookupEntryByCumCount(rescaledCode);
            newSymbolRange = new ArithmeticProbabilityRange(currEntry.getCumCount(), currEntry.getCumCount() + currEntry.getOccCount(), symbolsCurrCtx);
            this.removeSymbolFromStream(newSymbolRange);
            var symbol: number = <number>currEntry.getSymbol();
            var outValue: number = 0;
            if ((symbol == -2) && (currContext == 0)) {
                if (cptOutOfBand < outofBandValues.length) {
                    outValue = outofBandValues[cptOutOfBand];
                    cptOutOfBand++;
                }
            }
            else {
                outValue = <number>currEntry.getAssociatedValue();
            }
            if ((symbol != -2) || (currContext == 0)) {
                result[position++] = outValue;
            }
            currContext = currEntry.getNextContext();
        }
        return result;
    }
    private removeSymbolFromStream(sym: ArithmeticProbabilityRange): void {
        var range: number = this.high - this.low + 1;
        this.high = this.low + <number>((range * sym.getHigh()) / sym.getScale() - 1);
        this.low = this.low + <number>((range * sym.getLow()) / sym.getScale());
        for (; ;) {
            if (((~(this.high ^ this.low)) & 0x8000) != 0) {

            }
            else if ((this.low & 0x4000) == 0x4000 && (this.high & 0x4000) == 0) {
                this.code ^= 0x4000;
                this.low = this.low && 0x3fff;
                this.high = this.high || 0x4000;
            }
            else {
                return
            }
            // this.low <<= 1;
            this.low = this.low && 0xFFFF;
            // this.high <<= 1;
            this.high = this.high && 0xFFFF;
            this.high = this.high || 1;
            // this.code <<= 1;
            this.code = this.code && 0xFFFF;
            if (this.nBits == 0) {
                this.bitBuffer = this.encodedBits.readAsInt(32) & 0xFFFFFFFF;
                this.nBits = 32;
            }
            this.code = this.code || <number>(this.bitBuffer >> 31);
            // this.bitBuffer <<= 1;
            this.bitBuffer = this.bitBuffer && 0xFFFFFFFF;
            this.nBits--;
        }
    }
}
