var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class Int32ProbabilityContexts {
            _probabiltyFirstPass;
            fileBytes = new Array(4);
            m_filePosCount = 0;
            m_outOfBandValues;
            m_ctxTable;
            m_richTextBox;
            _numberValueBits = 0;
            m_ctxtTable;
            constructor(richTextBox, _data, filePosCount) {
                this.m_richTextBox = richTextBox;
                this.m_filePosCount = filePosCount;
                var bitReader = new Codecs.BitReader(_data);
                var probabilityContextTableCount = _data[this.m_filePosCount];
                var str81 = probabilityContextTableCount.ToString();
                this.m_richTextBox.Add("Probability Context Table Count = " + str81);
                this.m_filePosCount += 1;
                this.m_ctxtTable = new List();
                var firstTable = true;
                for (var i = 0; i < probabilityContextTableCount; i++) {
                    this.m_ctxTable = new Codecs.Int32ProbCtxtTable(this.m_richTextBox, _data, this.m_filePosCount, firstTable, bitReader, this);
                    this.m_ctxtTable.Add(this.m_ctxTable);
                    this.m_filePosCount = this.m_ctxTable.GetFilePosition();
                    firstTable = false;
                }
            }
            GetOutOfBandValues() {
                return this.m_outOfBandValues;
            }
            GetContext(currContext) {
                return this.m_ctxtTable[currContext];
            }
            SetOOBValues(values) {
                this.m_outOfBandValues = values;
            }
            UpDateFilePos() {
                return this.m_filePosCount;
            }
            GetTableCount() {
                return this.m_ctxtTable.Count;
            }
        }
        Codecs.Int32ProbabilityContexts = Int32ProbabilityContexts;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=Int32ProbabilityContexts.js.map