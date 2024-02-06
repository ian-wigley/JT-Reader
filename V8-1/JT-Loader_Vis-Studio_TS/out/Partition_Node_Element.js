var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class Partition_Node_Element extends C_sharp_JT_Reader.GroupJTNode {
        _MbString;
        _count;
        _elementLength;
        m_textBox = new List();
        encoding = System.Text.Encoding.Unicode;
        constructor() {
        }
        constructor(fileVersion, textBox, fileCount, uncompressed, elementLength) {
            _fileVersion = fileVersion;
            this.m_textBox = textBox;
            _filePosCount = fileCount;
            _uncompressed = uncompressed;
            this._elementLength = elementLength;
            this.m_textBox.Add("\n\n---------------------------- Partition Node Data --------------------------------");
        }
        TraversePartitionNode(filePosCount) {
            _filePosCount = filePosCount;
            _filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);
            if (_fileVersion >= 9.5) {
                _filePosCount -= 4;
            }
            else {
            }
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _partitionFlags = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nPartition Flags = " + _partitionFlags.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            this._count = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            _filePosCount += 4;
            this._MbString = new Array(this._count * 2);
            for (var i = 0; i < this._MbString.length; i++) {
                this._MbString[i] = _uncompressed[_filePosCount];
                _filePosCount++;
            }
            var _fileName = this.encoding.GetString(this._MbString);
            this.m_textBox.Add("\nFile Name = " + _fileName);
            var bBoxBytes = new Array(24);
            Buffer.BlockCopy(_uncompressed, _filePosCount, bBoxBytes, 0, 24);
            var _transformedBBox = C_sharp_JT_Reader.DataTypes.getBBoxF32(bBoxBytes);
            this.m_textBox.Add("\nTransformed Bounding Box Min Corner x = " + _transformedBBox.minCorner.x.ToString());
            this.m_textBox.Add("Transformed Bounding Box Min Corner y = " + _transformedBBox.minCorner.y.ToString());
            this.m_textBox.Add("Transformed Bounding Box Min Corner z = " + _transformedBBox.minCorner.z.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner x = " + _transformedBBox.maxCorner.x.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner y = " + _transformedBBox.maxCorner.y.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner z = " + _transformedBBox.maxCorner.z.ToString());
            _filePosCount += (24);
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _area = C_sharp_JT_Reader.DataTypes.getFloat32(fileBytes);
            this.m_textBox.Add("Area = " + _area.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _minCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Count = " + _minCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _maxCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Count = " + _maxCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _minNodeCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Node Count = " + _minNodeCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _maxNodeCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Node Count = " + _maxNodeCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _minPolyCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Polygon Count = " + _minPolyCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _maxPolyCount = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Polygon Count = " + _maxPolyCount.ToString());
            _filePosCount += 4;
            if (_partitionFlags != 0) {
                Buffer.BlockCopy(_uncompressed, _filePosCount, bBoxBytes, 0, 24);
                var _unTransformedBBox = C_sharp_JT_Reader.DataTypes.getBBoxF32(bBoxBytes);
                this.m_textBox.Add("UnTransformed Bounding Box Min Corner x = " + _unTransformedBBox.minCorner.x.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Min Corner y = " + _unTransformedBBox.minCorner.y.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Min Corner z = " + _unTransformedBBox.minCorner.z.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Max Corner x = " + _unTransformedBBox.maxCorner.x.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Max Corner y = " + _unTransformedBBox.maxCorner.y.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Max Corner z = " + _unTransformedBBox.maxCorner.z.ToString());
                _filePosCount += (24);
            }
            this.m_textBox.Add("\n");
            return this._filePosCount;
        }
        GetFilePosition() {
            return this._filePosCount;
        }
    }
    C_sharp_JT_Reader.Partition_Node_Element = Partition_Node_Element;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=Partition_Node_Element.js.map