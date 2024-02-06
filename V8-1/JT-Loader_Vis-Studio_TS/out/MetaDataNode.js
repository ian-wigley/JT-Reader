var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class MetaDataNode extends C_sharp_JT_Reader.GroupJTNode {
        encoding = System.Text.Encoding.Unicode;
        elementLength;
        compare;
        _propertyProxyNode;
        m_textBox = new List();
        constructor() {
        }
        constructor(fileVersion, richTextBox) {
            _fileVersion = fileVersion;
            this.m_textBox = richTextBox;
        }
        populateData(uncompressed, filePosCount) {
            this.m_textBox.Add("\n\n---------------------------------- Meta Data ----------------------------------");
            _uncompressed = uncompressed;
            _filePosCount = filePosCount;
            _filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            _versionNumber = C_sharp_JT_Reader.DataTypes.getInt16(fileBytes);
            this.m_textBox.Add("\nVersion number = " + _versionNumber.ToString());
            _filePosCount += 2;
            return this._filePosCount;
        }
    }
    C_sharp_JT_Reader.MetaDataNode = MetaDataNode;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=MetaDataNode.js.map