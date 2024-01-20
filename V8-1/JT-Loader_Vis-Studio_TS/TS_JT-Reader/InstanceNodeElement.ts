module C_sharp_JT_Reader.Nodes {
    export class InstanceNodeElement extends C_sharp_JT_Reader.GroupJTNode {
        private m_textBox: List<string> = new List<string>();
        constructor(fileVersion: number, richTextBox: List<string>) {
            _fileVersion = fileVersion;
            this.m_textBox = richTextBox;
        }
        public populateData(uncompressed: number[], filePosCount: number): number {
            this.m_textBox.Add("\n\n---------------------------------- Instance Node Data ----------------------------------");
            _uncompressed = uncompressed;
            _filePosCount = filePosCount;
            _filePosCount = TraverseBaseNodeData();
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _childNodeObjectID: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _childNodeObjectID.ToString());
            _filePosCount += 4;
            return this._filePosCount;
        }
    }
}