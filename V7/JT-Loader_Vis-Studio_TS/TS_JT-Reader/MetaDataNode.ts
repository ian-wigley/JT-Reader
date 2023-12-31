module C_sharp_JT_Reader {
    export class MetaDataNode extends C_sharp_JT_Reader.GroupJTNode {
        protected encoding: System.Text.Encoding = System.Text.Encoding.Unicode;
        protected elementLength: Int32;
        compare: string;
        _propertyProxyNode: PropertyProxyMetaData;
        m_textBox: List<string> = new List<string>();
        constructor() {

        }
        constructor(fileVersion: number, richTextBox: List<string>) {
            _fileVersion = fileVersion;
            this.m_textBox = richTextBox;
        }
        public populateData(uncompressed: number[], filePosCount: number): number {
            this.m_textBox.Add("\n\n---------------------------------- Meta Data ----------------------------------");
            _uncompressed = uncompressed;
            _filePosCount = filePosCount;
            _filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            _versionNumber = DataTypes.getInt16(fileBytes);
            this.m_textBox.Add("\nVersion number = " + _versionNumber.ToString());
            _filePosCount += 2;
            return this._filePosCount;
        }
    }
}