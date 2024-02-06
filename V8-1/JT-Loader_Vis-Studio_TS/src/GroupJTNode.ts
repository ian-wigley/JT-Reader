module C_sharp_JT_Reader {
    export class GroupJTNode extends BaseJTNode {
        m_textBox: List<string> = new List<string>();
        constructor() {

        }
        constructor(fileVersion: number, richTextBox: RichTextBox) {
            _fileVersion = fileVersion;
            _richTextBox = richTextBox;
        }
        public TraverseGroupNode(richTextBox: RichTextBox, filePosCount: number): number {
            _richTextBox = richTextBox;
            _filePosCount = filePosCount;
            _filePosCount = TraverseBaseNodeData();
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _childCount: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _childCount.ToString());
            _filePosCount += 4;
            var _childNodeObjectID: Int32[] = new Array(_childCount);
            for (var i: number = 0; i < _childCount; i++) {
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                _childNodeObjectID[i] = DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nChild Node Object ID = " + _childNodeObjectID[i].ToString());
                _filePosCount += 4;
            }
            return _filePosCount;
        }
    }
}