import { Buffer } from "./BitBuffer.js";
import { DataTypes } from "./DataTypes.js";
import { GroupJTNode } from "./GroupJTNode.js";

export class Partition_Node_Element extends GroupJTNode {
    _MbString: number[];
    _count: Int32;
    _elementLength: number;
    encoding: any;

    constructor(fileVersion: number, fileCount: number, uncompressed: number[], elementLength: number) {
        super(fileVersion);
        // this._fileVersion = fileVersion;
        this._filePosCount = fileCount;
        this._uncompressed = uncompressed;
        this._elementLength = elementLength;
    }

    public TraversePartitionNode(filePosCount: number): number {
        this._filePosCount = filePosCount;
        this._filePosCount = super.TraverseGroupNode(this._filePosCount);
        if (this._fileVersion >= 9.5) {
            this._filePosCount -= 4;
        }
        else {
        }
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _partitionFlags: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        this._count = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        this._MbString = new Array(this._count * 2);
        for (var i: number = 0; i < this._MbString.length; i++) {
            this._MbString[i] = this._uncompressed[this._filePosCount];
            this._filePosCount++;
        }
        var _fileName: string = this.encoding.GetString(this._MbString);
        var bBoxBytes: number[] = new Array(24);
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, bBoxBytes, 0, 24);
        var _transformedBBox = DataTypes.getBBoxF32(bBoxBytes);
        this._filePosCount += (24);
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _area: number = DataTypes.getFloat32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _minCount: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _maxCount: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _minNodeCount: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _maxNodeCount: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _minPolyCount: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _maxPolyCount: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        if (_partitionFlags != 0) {
            Buffer.BlockCopy(this._uncompressed, this._filePosCount, bBoxBytes, 0, 24);
            var _unTransformedBBox = DataTypes.getBBoxF32(bBoxBytes);
            this._filePosCount += (24);
        }
        return this._filePosCount;
    }
    public GetFilePosition(): number {
        return this._filePosCount;
    }
}
