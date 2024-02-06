var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class PropertyProxyMetaData {
        _MbString;
        _count;
        _elementLength;
        _filePosCount;
        _uncompressed;
        _fileBytes;
        _fileVersion = 0;
        _richTextBox;
        m_textBox = new List();
        encoding = System.Text.Encoding.Unicode;
        constructor(fileVersion, richTextBox, fileCount, uncompressed, elementLength) {
            this._fileVersion = fileVersion;
            this._richTextBox = richTextBox;
            this._filePosCount = fileCount;
            this._uncompressed = uncompressed;
            this._elementLength = elementLength;
            this.m_textBox.Add("\n\n-------------------------- Property Proxy Meta Data ------------------------------");
        }
        TraversePropertyProxyMetaData() {
            this._fileBytes = new Array(4);
            while (this._filePosCount < this._elementLength) {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this._fileBytes, 0, 4);
                this._count = C_sharp_JT_Reader.DataTypes.getInt32(this._fileBytes);
                this._filePosCount += 4;
                this._MbString = new Array(this._count * 2);
                for (var i = 0; i < this._MbString.length; i++) {
                    this._MbString[i] = this._uncompressed[this._filePosCount];
                    this._filePosCount++;
                }
                var _propertyKey = this.encoding.GetString(this._MbString);
                this.m_textBox.Add("\nProperty Key = " + _propertyKey);
                if (_propertyKey != null) {
                    var _propertyValueType = this._uncompressed[this._filePosCount];
                    this.m_textBox.Add("\nProperty Value Type = " + _propertyValueType);
                    this._filePosCount += 1;
                    if (_propertyValueType == 1) {
                        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this._fileBytes, 0, 4);
                        this._count = C_sharp_JT_Reader.DataTypes.getInt32(this._fileBytes);
                        this._filePosCount += 4;
                        this._MbString = new Array(this._count * 2);
                        for (var i = 0; i < this._MbString.length; i++) {
                            this._MbString[i] = this._uncompressed[this._filePosCount];
                            this._filePosCount++;
                        }
                        var _propertyValue = this.encoding.GetString(this._MbString);
                        this.m_textBox.Add("\nProperty Value = " + _propertyValue);
                    }
                    if (_propertyValueType == 2) {
                        this._filePosCount += 4;
                    }
                    if (_propertyValueType == 3) {
                    }
                    if (_propertyValueType == 4) {
                        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this._fileBytes, 0, 4);
                        var Year = C_sharp_JT_Reader.DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Month = C_sharp_JT_Reader.DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Day = C_sharp_JT_Reader.DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Hour = C_sharp_JT_Reader.DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Minute = C_sharp_JT_Reader.DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        var Second = C_sharp_JT_Reader.DataTypes.getInt16(this._fileBytes);
                        this._filePosCount += 2;
                        this.m_textBox.Add("\n" + Year.ToString() + Month.ToString() + Day.ToString() + Hour.ToString() + Minute.ToString() + Second.ToString());
                    }
                }
            }
            this.m_textBox.Add("\n");
            return this._filePosCount;
        }
    }
    C_sharp_JT_Reader.PropertyProxyMetaData = PropertyProxyMetaData;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=PropertyProxyMetaData.js.map