module C_sharp_JT_Reader {
    export class LogicalSceneGraphNode extends C_sharp_JT_Reader.GroupJTNode {
        elementLength: Int32;
        objectTypeID: Guid;
        compare: string;
        finished: boolean = false;
        m_partitionNode: Partition_Node_Element;
        m_propertyProxyNode: PropertyProxyMetaData;
        m_metaDataNode: MetaDataNode;
        m_instanceNode: InstanceNodeElement;
        m_geometricTransformAttributeElement: GeometricTransformAttributeElement;
        m_nodeCollection: List<BaseJTNode> = new List<BaseJTNode>();
        m_textBox: List<string> = new List<string>();
        constructor(fileVersion: number, textBox: List<string>) {
            _fileVersion = fileVersion;
            this.m_textBox = textBox;
        }
        public populateData(uncompressed: number[]): void {
            this.m_textBox.Add("\n\n---------------------------- Logical Scene Graph ------------------------------");
            _uncompressed = uncompressed;
            _filePosCount = 0;
            var guidBytes: number[] = new Array(16);
            while (!this.finished) {
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                this.elementLength = DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nElement Length = " + this.elementLength.ToString());
                _filePosCount += 4;
                Buffer.BlockCopy(_uncompressed, _filePosCount, guidBytes, 0, 16);
                this.objectTypeID = DataTypes.getGuid(guidBytes);
                this.m_textBox.Add("\nObject Type ID = {" + this.objectTypeID.ToString() + "}");
                _filePosCount += (16);
                var objectBaseType: number = _uncompressed[_filePosCount];
                this.m_textBox.Add("\nObject Base Type = " + objectBaseType.ToString());
                _filePosCount += 1;
                if (_fileVersion >= 9.5) {
                    Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                    var objectID: Int32 = DataTypes.getInt32(fileBytes);
                    this.m_textBox.Add("\nobject ID = " + objectID.ToString());
                    _filePosCount += 4;
                }
                this.compare = JTObjectTypeIdentifiers.GetType(this.objectTypeID);
                this.m_textBox.Add("\nNode Type = " + this.compare);
                this.m_textBox.Add("\n");
                if (this.compare == "Property Proxy Meta Data Element") {
                    this.m_propertyProxyNode = new PropertyProxyMetaData(_fileVersion, _richTextBox, _filePosCount, _uncompressed, this.elementLength);
                    _filePosCount = this.m_propertyProxyNode.TraversePropertyProxyMetaData();
                }
                if (this.compare == "Partition Node Element") {
                    this.m_partitionNode = new Partition_Node_Element(_fileVersion, this.m_textBox, _filePosCount, _uncompressed, this.elementLength);
                    _filePosCount = this.m_partitionNode.TraversePartitionNode(_filePosCount);
                    this.m_nodeCollection.Add(this.m_partitionNode);
                }
                if (this.compare == "Instance Node Element") {
                    this.m_instanceNode = new InstanceNodeElement(_fileVersion, this.m_textBox);
                    _filePosCount = this.m_instanceNode.populateData(_uncompressed, _filePosCount);
                    this.m_nodeCollection.Add(this.m_instanceNode);
                }
                if (this.compare == "Meta Data Node Element") {
                    this.m_metaDataNode = new MetaDataNode(_fileVersion, this.m_textBox);
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
        public setRTB(rTB: RichTextBox): void {
            this._richTextBox = rTB;
        }
    }
}