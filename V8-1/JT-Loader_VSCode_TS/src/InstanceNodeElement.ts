import { Buffer } from "./BitBuffer.js";
import { DataTypes } from "./DataTypes.js";
import { GroupJTNode } from "./GroupJTNode.js";

export class InstanceNodeElement extends GroupJTNode {

    constructor(fileVersion: number) {
        super(fileVersion);
        // this._fileVersion = fileVersion;
    }

    public populateData(uncompressed: number[], filePosCount: number): number {
        this._uncompressed = uncompressed;
        this._filePosCount = filePosCount;
        this._filePosCount = this.TraverseBaseNodeData();
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _childNodeObjectID: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        return this._filePosCount;
    }
}
