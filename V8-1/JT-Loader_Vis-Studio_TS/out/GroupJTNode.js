var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class GroupJTNode extends C_sharp_JT_Reader.BaseJTNode {
        m_textBox = new List();
        constructor() {
        }
        constructor(fileVersion, richTextBox) {
            _fileVersion = fileVersion;
            _richTextBox = richTextBox;
        }
        TraverseGroupNode(richTextBox, filePosCount) {
            _richTextBox = richTextBox;
            _filePosCount = filePosCount;
            _filePosCount = TraverseBaseNodeData();
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _childCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _childCount.ToString());
            _filePosCount += 4;
            var _childNodeObjectID = new Array(_childCount);
            for (var i = 0; i < _childCount; i++) {
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                _childNodeObjectID[i] = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nChild Node Object ID = " + _childNodeObjectID[i].ToString());
                _filePosCount += 4;
            }
            return _filePosCount;
        }
    }
    C_sharp_JT_Reader.GroupJTNode = GroupJTNode;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=GroupJTNode.js.map