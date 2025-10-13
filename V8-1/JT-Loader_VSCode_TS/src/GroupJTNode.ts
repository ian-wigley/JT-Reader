import { BaseJTNode } from "./BaseJTNode.js";
import { Buffer } from "./BitBuffer.js";
import { DataTypes } from "./DataTypes.js";

export class GroupJTNode extends BaseJTNode {

    constructor(fileVersion: number) {
        super();
        this._fileVersion = fileVersion;
    }

    public TraverseGroupNode(filePosCount: number): number {
        this._filePosCount = filePosCount;
        this._filePosCount = this.TraverseBaseNodeData();
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _childCount: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        var _childNodeObjectID: Int32[] = new Array(_childCount);
        for (var i: number = 0; i < _childCount; i++) {
            Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
            _childNodeObjectID[i] = DataTypes.getInt32(this.fileBytes);
            this._filePosCount += 4;
        }
        return this._filePosCount;
    }
}
