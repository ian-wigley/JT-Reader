var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Codecs;
    (function (Codecs) {
        class Int32ProbCtxtTable {
            _probabiltyFirstPass;
            fileBytes = new Array(4);
            m_filePosCount = 0;
            m_outOfBandValues;
            m_richTextBox;
            _numberValueBits = 0;
            m_entry;
            m_tableEntries = new List();
            _minValue;
            m_probContext;
            constructor(richTextBox, _data, filePosCount, firstTable, bitReader, probCtxt) {
                this.m_richTextBox = richTextBox;
                this.m_filePosCount = filePosCount;
                this._probabiltyFirstPass = firstTable;
                var _probabilityContextTableEntryCount = bitReader.readU32(32, this.m_filePosCount);
                this.m_richTextBox.Add("Probability Context Table Entry Count = " + _probabilityContextTableEntryCount.ToString());
                this.m_filePosCount = bitReader.getFilePos();
                var _numberSymbolBit = bitReader.readU32(6, this.m_filePosCount);
                this.m_richTextBox.Add("Number Symbol Bits = " + _numberSymbolBit.ToString());
                this.m_filePosCount = bitReader.getFilePos();
                var _numberOccurrenceCountBits = bitReader.readU32(6, this.m_filePosCount);
                this.m_richTextBox.Add("Number Occurrence Count Bits = " + _numberOccurrenceCountBits.ToString());
                this.m_filePosCount = bitReader.getFilePos();
                if (this._probabiltyFirstPass) {
                    this._numberValueBits = bitReader.readU32(6, this.m_filePosCount);
                    this.m_richTextBox.Add("Number Value Bits = " + this._numberValueBits.ToString());
                    this.m_filePosCount = bitReader.getFilePos();
                }
                var _numberReservedFieldBits = bitReader.readU32(6, this.m_filePosCount);
                this.m_richTextBox.Add("Number Reserved Field Bits = " + _numberReservedFieldBits.ToString());
                this.m_filePosCount = bitReader.getFilePos();
                var m_cumCount = 0;
                if (this._probabiltyFirstPass) {
                    this._minValue = bitReader.readU32(32, this.m_filePosCount);
                    this.m_richTextBox.Add("Min Value = " + this._minValue.ToString());
                    this.m_filePosCount = bitReader.getFilePos();
                }
                for (var i = 0; i < _probabilityContextTableEntryCount; i++) {
                    var _symbol = bitReader.readU32(_numberSymbolBit, this.m_filePosCount) - 2;
                    this.m_richTextBox.Add("Symbol = " + _symbol.ToString());
                    this.m_filePosCount = bitReader.getFilePos();
                    var _occurrenceCount = bitReader.readU32(_numberOccurrenceCountBits, this.m_filePosCount);
                    this.m_richTextBox.Add("Occurence Count = " + _occurrenceCount.ToString());
                    this.m_filePosCount = bitReader.getFilePos();
                    var _associatedValue = 0;
                    if (this._probabiltyFirstPass) {
                        _associatedValue = bitReader.readU32(this._numberValueBits, this.m_filePosCount) + this._minValue;
                        this.m_richTextBox.Add("Associated Value = " + _associatedValue.ToString());
                        this.m_filePosCount = bitReader.getFilePos();
                    }
                    else {
                        _associatedValue = 0;
                    }
                    var _nextContext = bitReader.readU32(_numberReservedFieldBits, this.m_filePosCount);
                    this.m_richTextBox.Add("Associated Value = " + _associatedValue.ToString());
                    this.m_filePosCount = bitReader.getFilePos();
                    this.m_entry = new C_sharp_JT_Reader.Int32ProbCtxtEntry(_symbol, _occurrenceCount, _associatedValue, m_cumCount, _nextContext);
                    this.m_tableEntries.Add(this.m_entry);
                    m_cumCount += _occurrenceCount;
                }
            }
            GetTotalCount() {
                var m_totalCount = 0;
                this.m_tableEntries.forEach(function (m_entry) {
                    m_totalCount += m_entry.getOccCount();
                });
                return m_totalCount;
            }
            LookupEntryByCumCount(count) {
                var sum = this.m_tableEntries[0].getOccCount();
                var idx = 0;
                while (count >= sum) {
                    idx += 1;
                    if (idx >= this.m_tableEntries.Count) {
                        idx--;
                    }
                    sum += this.m_tableEntries[idx].getOccCount();
                }
                return this.m_tableEntries[idx];
            }
            GetFilePosition() {
                return this.m_filePosCount;
            }
        }
        Codecs.Int32ProbCtxtTable = Int32ProbCtxtTable;
    })(Codecs = C_sharp_JT_Reader.Codecs || (C_sharp_JT_Reader.Codecs = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=Int32ProbCtxtTable.js.map