var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Nodes;
    (function (Nodes) {
        class InstanceNodeElement extends C_sharp_JT_Reader.GroupJTNode {
            m_textBox = new List();
            constructor(fileVersion, richTextBox) {
                _fileVersion = fileVersion;
                this.m_textBox = richTextBox;
            }
            populateData(uncompressed, filePosCount) {
                this.m_textBox.Add("\n\n---------------------------------- Instance Node Data ----------------------------------");
                _uncompressed = uncompressed;
                _filePosCount = filePosCount;
                _filePosCount = TraverseBaseNodeData();
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                var _childNodeObjectID = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nChild Count = " + _childNodeObjectID.ToString());
                _filePosCount += 4;
                return this._filePosCount;
            }
        }
        Nodes.InstanceNodeElement = InstanceNodeElement;
    })(Nodes = C_sharp_JT_Reader.Nodes || (C_sharp_JT_Reader.Nodes = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=InstanceNodeElement.js.map