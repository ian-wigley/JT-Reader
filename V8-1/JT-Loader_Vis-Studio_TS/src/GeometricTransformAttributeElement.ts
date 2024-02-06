module C_sharp_JT_Reader.Nodes {
    export class GeometricTransformAttributeElement extends C_sharp_JT_Reader.GroupJTNode {
        private m_textBox: List<string> = new List<string>();
        constructor(fileVersion: number, richTextBox: List<string>) {
            _fileVersion = fileVersion;
            this.m_textBox = richTextBox;
        }
        public populateData(uncompressed: number[], filePosCount: number): number {
            this.m_textBox.Add("\n\n-----------------Geometric Transform Attribute Element Node Data ----------------");
            _uncompressed = uncompressed;
            _filePosCount = filePosCount;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _objectID: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _objectID.ToString());
            _filePosCount += 4;
            var _stateFlags: number = _uncompressed[_filePosCount];
            this.m_textBox.Add("\nState Flags = " + _stateFlags.ToString());
            _filePosCount += 1;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _fieldInhibitFlags: Int32 = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _fieldInhibitFlags.ToString());
            _filePosCount += 4;
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            var _storedValuesMask: UInt16 = <UInt16>DataTypes.getInt16(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _storedValuesMask.ToString());
            _filePosCount += 2;
            var m_transformMatrix: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            var c: number = _storedValuesMask;
            for (var i: number = 0; i < 16; i++) {
                if ((c & 0x8000) != 0) {
                    Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                    m_transformMatrix[i] = DataTypes.getFloat32(fileBytes);
                    _filePosCount += __sizeof__(float);
                }
                c = c << 1;
            }
            return this._filePosCount;
        }
    }
}