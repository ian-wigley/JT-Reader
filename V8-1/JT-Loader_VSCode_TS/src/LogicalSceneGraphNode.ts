import { BaseJTNode } from "./BaseJTNode.js";
import { Buffer } from "./BitBuffer.js";
import { DataTypes } from "./DataTypes.js";
import { GeometricTransformAttributeElement } from "./GeometricTransformAttributeElement.js";
import { GroupJTNode } from "./GroupJTNode.js";
import { Guid } from "./GUID.js";
import { InstanceNodeElement } from "./InstanceNodeElement.js";
import { JTObjectTypeIdentifiers } from "./JTObjectTypeIdentifiers.js";
import { MetaDataNode } from "./MetaDataNode.js";
import { Partition_Node_Element } from "./Partition_Node_Element.js";
import { PropertyProxyMetaData } from "./PropertyProxyMetaData.js";

export class LogicalSceneGraphNode extends GroupJTNode {
    elementLength: Int32;
    objectTypeID: Guid;
    compare: string;
    finished: boolean = false;
    m_partitionNode: Partition_Node_Element;
    m_propertyProxyNode: PropertyProxyMetaData;
    m_metaDataNode: MetaDataNode;
    m_instanceNode: InstanceNodeElement;
    m_geometricTransformAttributeElement: GeometricTransformAttributeElement;
    m_nodeCollection: List<BaseJTNode>;// = new List<BaseJTNode>();

    constructor(fileVersion: number) {
        super(fileVersion);
        this._fileVersion = fileVersion;
    }

    public populateData(uncompressed: number[]): void {

        this._uncompressed = uncompressed;
        this._filePosCount = 0;
        var guidBytes: number[] = new Array(16);
        while (!this.finished) {
            Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
            this.elementLength = DataTypes.getInt32(this.fileBytes);
            this._filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this._filePosCount, guidBytes, 0, 16);
            this.objectTypeID = DataTypes.getGuid(guidBytes);
            this._filePosCount += (16);
            var objectBaseType: number = this._uncompressed[this._filePosCount];
            this._filePosCount += 1;
            if (this._fileVersion >= 9.5) {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                var objectID: Int32 = DataTypes.getInt32(this.fileBytes);
                this._filePosCount += 4;
            }
            this.compare = JTObjectTypeIdentifiers.GetType(this.objectTypeID);

            if (this.compare == "Property Proxy Meta Data Element") {
                this.m_propertyProxyNode = new PropertyProxyMetaData(this._fileVersion, this._filePosCount, this._uncompressed, this.elementLength);
                this._filePosCount = this.m_propertyProxyNode.TraversePropertyProxyMetaData();
            }
            if (this.compare == "Partition Node Element") {
                this.m_partitionNode = new Partition_Node_Element(this._fileVersion, this._filePosCount, this._uncompressed, this.elementLength);
                this._filePosCount = this.m_partitionNode.TraversePartitionNode(this._filePosCount);
                this.m_nodeCollection.push(this.m_partitionNode);
            }
            if (this.compare == "Instance Node Element") {
                this.m_instanceNode = new InstanceNodeElement(this._fileVersion);
                this._filePosCount = this.m_instanceNode.populateData(this._uncompressed, this._filePosCount);
                this.m_nodeCollection.push(this.m_instanceNode);
            }
            if (this.compare == "Meta Data Node Element") {
                this.m_metaDataNode = new MetaDataNode(this._fileVersion);
                this._filePosCount = this.m_metaDataNode.populateData(this._uncompressed, this._filePosCount);
                this.m_nodeCollection.push(this.m_metaDataNode);
            }
            if (this.compare == "Geometric Transform Attribute Element") {
                this.m_geometricTransformAttributeElement = new GeometricTransformAttributeElement(this._fileVersion);
                this._filePosCount = this.m_geometricTransformAttributeElement.populateData(this._uncompressed, this._filePosCount);
                this.m_nodeCollection.push(this.m_geometricTransformAttributeElement);
            }
            if (this.compare == "EOF") {
                this.finished = true;
            }
        }
    }
}
