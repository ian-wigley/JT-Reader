module C_sharp_JT_Reader {
    export class PropertyProxyMetaData {
        _MbString: number[];
        _count: Int32;
        _elementLength: Int32;
        _filePosCount: Int32;
        _uncompressed: number[];
        _fileBytes: number[];
        _fileVersion: number = 0;
        _richTextBox: RichTextBox;
        m_textBox: List<string> = new List<string>();
        encoding: System.Text.Encoding = System.Text.Encoding.Unicode;
        constructor(fileVersion: number, richTextBox: RichTextBox, fileCount: number, uncompressed: number[], elementLength: number) {
            this._fileVersion = fileVersion;
            this._richTextBox = richTextBox;
            this._filePosCount = fileCount;
            this._uncompressed = uncompressed;
            this._elementLength = elementLength;
            this.m_textBox.Add("\n\n-------------------------- Property Proxy Meta Data ------------------------------");
        }
        public TraversePropertyProxyMetaData(): number {
            this._fileBytes = new Array(4);
            while (this._filePosCount < this._elementLength) {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this._fileBytes, 0, 4);
                this._count = DataTypes.getInt32(this._fileBytes);
                this._filePosCount += 4;
                this._MbString = new Array(this._count * 2);
                for (var i: number = 0; i < this._MbString.length; i++) {
                    this._MbString[i] = this._uncompressed[this._filePosCount];
                    this._filePosCount++;
                }
                var _propertyKey: string = this.encoding.GetString(this._MbString);
                this.m_textBox.Add("\nProperty Key = " + _propertyKey);
                if (_propertyKey != null) {
                    var _propertyValueType: number = this._uncompressed[this._filePosCount];
                    this.m_textBox.Add("\nProperty Value Type = " + _propertyValueType);
                    this._filePosCount += 1;
                    if (_propertyValueType == 1) {
                        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this._fileBytes, 0, 4);
                        this._count = DataTypes.getInt32(this._fileBytes);
                        this._filePosCount += 4;
                        this._MbString = new Array(this._count * 2);
                        for (var i: number = 0; i < this._MbString.length; i++) {
                            this._MbString[i] = this._uncompressed[this._filePosCount];
                            this._filePosCount++;
                        }
                        var _propertyValue: string = this.encoding.GetString(this._MbString);
                        this.m_textBox.Add("\nProperty Value = " + _propertyValue);
                    }
                    if (_propertyValueType == 2) {
                        this._filePosCount += 4;
                    }
                    if (_propertyValueType == 3) {

                    }
                    if (_propertyValueType == 4) {
                        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this._fileBytes, 0, 4);
                        var Year: Int16 = DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Month: Int16 = DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Day: Int16 = DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Hour: Int16 = DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Minute: Int16 = DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Second: Int16 = DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        this.m_textBox.Add("\n" + Year.ToString() + Month.ToString() + Day.ToString() + Hour.ToString() + Minute.ToString() + Second.ToString());
                    }
                }
            }
            this.m_textBox.Add("\n");
            return this._filePosCount;
        }
    }
}