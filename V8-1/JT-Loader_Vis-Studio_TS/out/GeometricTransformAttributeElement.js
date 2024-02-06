var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    var Nodes;
    (function (Nodes) {
        class GeometricTransformAttributeElement extends C_sharp_JT_Reader.GroupJTNode {
            m_textBox = new List();
            constructor(fileVersion, richTextBox) {
                _fileVersion = fileVersion;
                this.m_textBox = richTextBox;
            }
            populateData(uncompressed, filePosCount) {
                this.m_textBox.Add("\n\n-----------------Geometric Transform Attribute Element Node Data ----------------");
                _uncompressed = uncompressed;
                _filePosCount = filePosCount;
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                var _objectID = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nChild Count = " + _objectID.ToString());
                _filePosCount += 4;
                var _stateFlags = _uncompressed[_filePosCount];
                this.m_textBox.Add("\nState Flags = " + _stateFlags.ToString());
                _filePosCount += 1;
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                var _fieldInhibitFlags = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nChild Count = " + _fieldInhibitFlags.ToString());
                _filePosCount += 4;
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                var _storedValuesMask = C_sharp_JT_Reader.DataTypes.getInt16(fileBytes);
                this.m_textBox.Add("\nChild Count = " + _storedValuesMask.ToString());
                _filePosCount += 2;
                var m_transformMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
                var c = _storedValuesMask;
                for (var i = 0; i < 16; i++) {
                    if ((c & 0x8000) != 0) {
                        Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                        m_transformMatrix[i] = C_sharp_JT_Reader.DataTypes.getFloat32(fileBytes);
                        _filePosCount += __sizeof__(float);
                    }
                    c = c << 1;
                }
                return this._filePosCount;
            }
        }
        Nodes.GeometricTransformAttributeElement = GeometricTransformAttributeElement;
    })(Nodes = C_sharp_JT_Reader.Nodes || (C_sharp_JT_Reader.Nodes = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=GeometricTransformAttributeElement.js.map