module C_sharp_JT_Reader {
    export class BaseJTNode {
        protected _uncompressed: number[];
        protected _fileVersion: number = 0;
        protected _richTextBox: RichTextBox;
        protected _filePosCount: number = 0;
        protected fileBytes: number[] = new Array(4);
        protected _nodeFlags: UInt32;
        protected _attributeCount: Int32;
        protected _attributeObjectID: Int32[];
        protected _objectID: Int32;
        protected _versionNumber: Int16;
        protected m_textBox: List<string> = new List<string>();
        constructor() {

        }
        constructor(name: string, type: string) {

        }
        protected TraverseBaseNodeData(): number {
            if (this._fileVersion >= 9.5) {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                this._versionNumber = DataTypes.getInt16(this.fileBytes);
                this.m_textBox.Add("\nVersion number = " + this._versionNumber.ToString());
                this._filePosCount += 2;
            }
            else {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                this._objectID = DataTypes.getInt32(this.fileBytes);
                this.m_textBox.Add("\nObject ID = " + this._objectID.ToString());
                this._filePosCount += 4;
            }
            Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
            this._nodeFlags = DataTypes.getUInt32(this.fileBytes);
            var a: number = this.fileBytes[0];
            var b: number = this.fileBytes[2];
            var c: number = <number>(b | a);
            this.m_textBox.Add("\nNode Flags = " + this._nodeFlags.ToString());
            this._filePosCount += 4;
            if (this._nodeFlags == 0) {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                this._attributeCount = DataTypes.getInt32(this.fileBytes);
                this.m_textBox.Add("\nAttribute Count = " + this._attributeCount.ToString());
                this._filePosCount += 4;
                this._attributeObjectID = new Array(this._attributeCount);
                for (var i: number = 0; i < this._attributeCount; i++) {
                    Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                    this._attributeObjectID[i] = DataTypes.getInt32(this.fileBytes);
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
}