﻿export class BaseJTNode {

    protected _uncompressed: number[];
    protected _fileVersion: number = 0;
    protected _filePosCount: number = 0;
    protected fileBytes: number[] = new Array(4);
    protected _nodeFlags: number;
    protected _attributeCount: number;
    protected _attributeObjectID: number[];
    protected _objectID: number;
    protected _versionNumber: number;

    protected TraverseBaseNodeData(): number {
        if (this._fileVersion >= 9.5) {
            // Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
            // this._versionNumber = DataTypes.getInt16(this.fileBytes);
            this._filePosCount += 2;
        }
        else {
            // Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
            // this._objectID = DataTypes.getInt32(this.fileBytes);
            this._filePosCount += 4;
        }

        // Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        // this._nodeFlags = DataTypes.getUInt32(this.fileBytes);
        let a: number = this.fileBytes[0];
        let b: number = this.fileBytes[2];
        let c: number = (b | a);
        this._filePosCount += 4;
        if (this._nodeFlags == 0) {
            // Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
            // this._attributeCount = DataTypes.getInt32(this.fileBytes);
            this._filePosCount += 4;
            this._attributeObjectID = new Array(this._attributeCount);
            for (let i: number = 0; i < this._attributeCount; i++) {
                // Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                // this._attributeObjectID[i] = DataTypes.getInt32(this.fileBytes);
                this._filePosCount += 4;
            }
        }
        else {
            this._filePosCount += 4 + 4;
        }
        return this._filePosCount;
    }
}