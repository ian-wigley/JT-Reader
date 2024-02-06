var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class LogicalSceneGraphNode extends C_sharp_JT_Reader.GroupJTNode {
        elementLength;
        objectTypeID;
        compare;
        finished = false;
        m_partitionNode;
        m_propertyProxyNode;
        m_metaDataNode;
        m_instanceNode;
        m_geometricTransformAttributeElement;
        m_nodeCollection = new List();
        m_textBox = new List();
        constructor(fileVersion, textBox) {
            _fileVersion = fileVersion;
            this.m_textBox = textBox;
        }
        populateData(uncompressed) {
            this.m_textBox.Add("\n\n---------------------------- Logical Scene Graph ------------------------------");
            _uncompressed = uncompressed;
            _filePosCount = 0;
            var guidBytes = new Array(16);
            while (!this.finished) {
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                this.elementLength = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nElement Length = " + this.elementLength.ToString());
                _filePosCount += 4;
                Buffer.BlockCopy(_uncompressed, _filePosCount, guidBytes, 0, 16);
                this.objectTypeID = C_sharp_JT_Reader.DataTypes.getGuid(guidBytes);
                this.m_textBox.Add("\nObject Type ID = {" + this.objectTypeID.ToString() + "}");
                _filePosCount += (16);
                var objectBaseType = _uncompressed[_filePosCount];
                this.m_textBox.Add("\nObject Base Type = " + objectBaseType.ToString());
                _filePosCount += 1;
                if (_fileVersion >= 9.5) {
                    Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                    var objectID = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
                    this.m_textBox.Add("\nobject ID = " + objectID.ToString());
                    _filePosCount += 4;
                }
                this.compare = C_sharp_JT_Reader.JTObjectTypeIdentifiers.GetType(this.objectTypeID);
                this.m_textBox.Add("\nNode Type = " + this.compare);
                this.m_textBox.Add("\n");
                if (this.compare == "Property Proxy Meta Data Element") {
                    this.m_propertyProxyNode = new C_sharp_JT_Reader.PropertyProxyMetaData(_fileVersion, _richTextBox, _filePosCount, _uncompressed, this.elementLength);
                    _filePosCount = this.m_propertyProxyNode.TraversePropertyProxyMetaData();
                }
                if (this.compare == "Partition Node Element") {
                    this.m_partitionNode = new C_sharp_JT_Reader.Partition_Node_Element(_fileVersion, this.m_textBox, _filePosCount, _uncompressed, this.elementLength);
                    _filePosCount = this.m_partitionNode.TraversePartitionNode(_filePosCount);
                    this.m_nodeCollection.Add(this.m_partitionNode);
                }
                if (this.compare == "Instance Node Element") {
                    this.m_instanceNode = new InstanceNodeElement(_fileVersion, this.m_textBox);
                    _filePosCount = this.m_instanceNode.populateData(_uncompressed, _filePosCount);
                    this.m_nodeCollection.Add(this.m_instanceNode);
                }
                if (this.compare == "Meta Data Node Element") {
                    this.m_metaDataNode = new C_sharp_JT_Reader.MetaDataNode(_fileVersion, this.m_textBox);
                    _filePosCount = this.m_metaDataNode.populateData(_uncompressed, _filePosCount);
                    this.m_nodeCollection.Add(this.m_metaDataNode);
                }
                if (this.compare == "Geometric Transform Attribute Element") {
                    this.m_geometricTransformAttributeElement = new GeometricTransformAttributeElement(_fileVersion, this.m_textBox);
                    _filePosCount = this.m_geometricTransformAttributeElement.populateData(_uncompressed, _filePosCount);
                    this.m_nodeCollection.Add(this.m_geometricTransformAttributeElement);
                }
                if (this.compare == "EOF") {
                    this.finished = true;
                }
            }
        }
        setRTB(rTB) {
            this._richTextBox = rTB;
        }
    }
    C_sharp_JT_Reader.LogicalSceneGraphNode = LogicalSceneGraphNode;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=LogicalSceneGraphNode.js.map