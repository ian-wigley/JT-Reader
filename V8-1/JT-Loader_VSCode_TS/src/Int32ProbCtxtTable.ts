export class Int32ProbCtxtTable {
//     private _probabiltyFirstPass: boolean;
//     private fileBytes: number[] = new Array(4);
//     private m_filePosCount: number = 0;
//     private m_outOfBandValues: number[];
//     private m_richTextBox: List<string>;
//     private _numberValueBits: UInt32 = 0;
//     private m_entry: Int32ProbCtxtEntry;
//     private m_tableEntries: List<Int32ProbCtxtEntry> = new List<Int32ProbCtxtEntry>();
//     private _minValue: number;
//     private m_probContext: Int32ProbabilityContexts;
//     constructor(richTextBox: List<string>, _data: number[], filePosCount: number, firstTable: boolean, bitReader: BitReader, probCtxt: Int32ProbabilityContexts) {
//         this.m_richTextBox = richTextBox;
//         this.m_filePosCount = filePosCount;
//         this._probabiltyFirstPass = firstTable;
//         var _probabilityContextTableEntryCount: UInt32 = <UInt32>bitReader.readU32(32, this.m_filePosCount);
//         this.m_richTextBox.Add("Probability Context Table Entry Count = " + _probabilityContextTableEntryCount.ToString());
//         this.m_filePosCount = bitReader.getFilePos();
//         var _numberSymbolBit: UInt32 = <UInt32>bitReader.readU32(6, this.m_filePosCount);
//         this.m_richTextBox.Add("Number Symbol Bits = " + _numberSymbolBit.ToString());
//         this.m_filePosCount = bitReader.getFilePos();
//         var _numberOccurrenceCountBits: UInt32 = <UInt32>bitReader.readU32(6, this.m_filePosCount);
//         this.m_richTextBox.Add("Number Occurrence Count Bits = " + _numberOccurrenceCountBits.ToString());
//         this.m_filePosCount = bitReader.getFilePos();
//         if (this._probabiltyFirstPass) {
//             this._numberValueBits = <UInt32>bitReader.readU32(6, this.m_filePosCount);
//             this.m_richTextBox.Add("Number Value Bits = " + this._numberValueBits.ToString());
//             this.m_filePosCount = bitReader.getFilePos();
//         }
//         var _numberReservedFieldBits: UInt32 = <UInt32>bitReader.readU32(6, this.m_filePosCount);
//         this.m_richTextBox.Add("Number Reserved Field Bits = " + _numberReservedFieldBits.ToString());
//         this.m_filePosCount = bitReader.getFilePos();
//         var m_cumCount: number = 0;
//         if (this._probabiltyFirstPass) {
//             this._minValue = <number>bitReader.readU32(32, this.m_filePosCount);
//             this.m_richTextBox.Add("Min Value = " + this._minValue.ToString());
//             this.m_filePosCount = bitReader.getFilePos();
//         }
//         for (var i: number = 0; i < _probabilityContextTableEntryCount; i++) {
//             var _symbol: number = <number>bitReader.readU32(<number>_numberSymbolBit, this.m_filePosCount) - 2;
//             this.m_richTextBox.Add("Symbol = " + _symbol.ToString());
//             this.m_filePosCount = bitReader.getFilePos();
//             var _occurrenceCount: UInt32 = <UInt32>bitReader.readU32(<number>_numberOccurrenceCountBits, this.m_filePosCount);
//             this.m_richTextBox.Add("Occurence Count = " + _occurrenceCount.ToString());
//             this.m_filePosCount = bitReader.getFilePos();
//             var _associatedValue: number = 0;
//             if (this._probabiltyFirstPass) {
//                 _associatedValue = <number>bitReader.readU32(<number>this._numberValueBits, this.m_filePosCount) + this._minValue;
//                 this.m_richTextBox.Add("Associated Value = " + _associatedValue.ToString());
//                 this.m_filePosCount = bitReader.getFilePos();
//             }
//             else {
//                 _associatedValue = 0;
//             }
//             var _nextContext: number = <number>bitReader.readU32(<number>_numberReservedFieldBits, this.m_filePosCount);
//             this.m_richTextBox.Add("Associated Value = " + _associatedValue.ToString());
//             this.m_filePosCount = bitReader.getFilePos();
//             this.m_entry = new Int32ProbCtxtEntry(<number>_symbol, <number>_occurrenceCount, <number>_associatedValue, <number>m_cumCount, <number>_nextContext);
//             this.m_tableEntries.Add(this.m_entry);
//             m_cumCount += <number>_occurrenceCount;
//         }
//     }
//     public GetTotalCount(): number {
//         var m_totalCount: number = 0;
//         this.m_tableEntries.forEach(function (m_entry) {
//             m_totalCount += <number>m_entry.getOccCount();
//         });
//         return m_totalCount;
//     }
//     public LookupEntryByCumCount(count: number): Int32ProbCtxtEntry {
//         var sum: number = this.m_tableEntries[0].getOccCount();
//         var idx: number = 0;
//         while (count >= sum) {
//             idx += 1;
//             if (idx >= this.m_tableEntries.Count) {
//                 idx--;
//             }
//             sum += this.m_tableEntries[idx].getOccCount();
//         }
//         return this.m_tableEntries[idx];
//     }
//     public GetFilePosition(): number {
//         return this.m_filePosCount;
//     }
}
