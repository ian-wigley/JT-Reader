var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class BaseJTNode {
        _uncompressed;
        _fileVersion = 0;
        _richTextBox;
        _filePosCount = 0;
        fileBytes = new Array(4);
        _nodeFlags;
        _attributeCount;
        _attributeObjectID;
        _objectID;
        _versionNumber;
        m_textBox = new List();
        constructor() {
        }
        constructor(name, type) {
        }
        TraverseBaseNodeData() {
            if (this._fileVersion >= 9.5) {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                this._versionNumber = C_sharp_JT_Reader.DataTypes.getInt16(this.fileBytes);
                this.m_textBox.Add("\nVersion number = " + this._versionNumber.ToString());
                this._filePosCount += 2;
            }
            else {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                this._objectID = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                this.m_textBox.Add("\nObject ID = " + this._objectID.ToString());
                this._filePosCount += 4;
            }
            Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
            this._nodeFlags = C_sharp_JT_Reader.DataTypes.getUInt32(this.fileBytes);
            var a = this.fileBytes[0];
            var b = this.fileBytes[2];
            var c = (b | a);
            this.m_textBox.Add("\nNode Flags = " + this._nodeFlags.ToString());
            this._filePosCount += 4;
            if (this._nodeFlags == 0) {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                this._attributeCount = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                this.m_textBox.Add("\nAttribute Count = " + this._attributeCount.ToString());
                this._filePosCount += 4;
                this._attributeObjectID = new Array(this._attributeCount);
                for (var i = 0; i < this._attributeCount; i++) {
                    Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                    this._attributeObjectID[i] = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                    this.m_textBox.Add("\nAttribute Object ID = " + this._attributeObjectID[i].ToString());
                    this._filePosCount += 4;
                }
            }
            else {
                this._filePosCount += 4 + 4;
            }
            return this._filePosCount;
        }
    }
    C_sharp_JT_Reader.BaseJTNode = BaseJTNode;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=BaseJTNode.js.map