module C_sharp_JT_Reader {
    export class Partition_Node_Element extends GroupJTNode {
        _MbString: number[];
        _count: Int32;
        _elementLength: number;
        m_textBox: List<string> = new List<string>();
        encoding: System.Text.Encoding = System.Text.Encoding.Unicode;
        constructor() {

        }
        constructor(fileVersion: number, textBox: List<string>, fileCount: number, uncompressed: number[], elementLength: number) {
            _fileVersion = fileVersion;
            this.m_textBox = textBox;
            _filePosCount = fileCount;
            _uncompressed = uncompressed;
            this._elementLength = elementLength;
            this.m_textBox.Add("\n\n---------------------------- Partition Node Data --------------------------------");
        }
        public TraversePartitionNode(filePosCount: number): number {
            _filePosCount = filePosCount;
            _filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);
            if (_fileVersion >= 9.5) {
                _filePosCount -= 4;
            }
            else {

            }
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _partitionFlags: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nPartition Flags = " + _partitionFlags.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            this._count = DataTypes.getInt32(fileBytes);
            _filePosCount += 4;
            this._MbString = new Array(this._count * 2);
            for (var i: number = 0; i < this._MbString.length; i++) {
                this._MbString[i] = _uncompressed[_filePosCount];
                _filePosCount++;
            }
            var _fileName: string = this.encoding.GetString(this._MbString);
            this.m_textBox.Add("\nFile Name = " + _fileName);
            var bBoxBytes: number[] = new Array(24);
            Buffer.BlockCopy(_uncompressed, _filePosCount, bBoxBytes, 0, 24);
            var _transformedBBox: DataTypes.BBoxF32 = DataTypes.getBBoxF32(bBoxBytes);
            this.m_textBox.Add("\nTransformed Bounding Box Min Corner x = " + _transformedBBox.minCorner.x.ToString());
            this.m_textBox.Add("Transformed Bounding Box Min Corner y = " + _transformedBBox.minCorner.y.ToString());
            this.m_textBox.Add("Transformed Bounding Box Min Corner z = " + _transformedBBox.minCorner.z.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner x = " + _transformedBBox.maxCorner.x.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner y = " + _transformedBBox.maxCorner.y.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner z = " + _transformedBBox.maxCorner.z.ToString());
            _filePosCount += (24);
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _area: number = DataTypes.getFloat32(fileBytes);
            this.m_textBox.Add("Area = " + _area.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _minCount: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Count = " + _minCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _maxCount: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Count = " + _maxCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _minNodeCount: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Node Count = " + _minNodeCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _maxNodeCount: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Node Count = " + _maxNodeCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _minPolyCount: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Polygon Count = " + _minPolyCount.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _maxPolyCount: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Polygon Count = " + _maxPolyCount.ToString());
            _filePosCount += 4;
            if (_partitionFlags != 0) {
                Buffer.BlockCopy(_uncompressed, _filePosCount, bBoxBytes, 0, 24);
                var _unTransformedBBox: DataTypes.BBoxF32 = DataTypes.getBBoxF32(bBoxBytes);
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
        public GetFilePosition(): number {
            return this._filePosCount;
        }
    }
}