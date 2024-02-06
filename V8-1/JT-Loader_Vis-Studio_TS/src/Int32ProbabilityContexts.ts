module C_sharp_JT_Reader.Codecs {
    export class Int32ProbabilityContexts {
        private _probabiltyFirstPass: boolean;
        private fileBytes: number[] = new Array(4);
        private m_filePosCount: number = 0;
        private m_outOfBandValues: number[];
        private m_ctxTable: Int32ProbCtxtTable;
        private m_richTextBox: List<string>;
        private _numberValueBits: UInt32 = 0;
        private m_ctxtTable: List<Int32ProbCtxtTable>;
        constructor(richTextBox: List<string>, _data: number[], filePosCount: number) {
            this.m_richTextBox = richTextBox;
            this.m_filePosCount = filePosCount;
            var bitReader: BitReader = new BitReader(_data);
            var probabilityContextTableCount: number = _data[this.m_filePosCount];
            var str81: string = probabilityContextTableCount.ToString();
            this.m_richTextBox.Add("Probability Context Table Count = " + str81);
            this.m_filePosCount += 1;
            this.m_ctxtTable = new List<Int32ProbCtxtTable>();
            var firstTable: boolean = true;
            for (var i: number = 0; i < probabilityContextTableCount; i++) {
                this.m_ctxTable = new Int32ProbCtxtTable(this.m_richTextBox, _data, this.m_filePosCount, firstTable, bitReader, this);
                this.m_ctxtTable.Add(this.m_ctxTable);
                this.m_filePosCount = this.m_ctxTable.GetFilePosition();
                firstTable = false;
            }
        }
        public GetOutOfBandValues(): number[] {
            return this.m_outOfBandValues;
        }
        public GetContext(currContext: number): Int32ProbCtxtTable {
            return this.m_ctxtTable[currContext];
        }
        public SetOOBValues(values: number[]): void {
            this.m_outOfBandValues = values;
        }
        public UpDateFilePos(): number {
            return this.m_filePosCount;
        }
        public GetTableCount(): number {
            return this.m_ctxtTable.Count;
        }
    }
}