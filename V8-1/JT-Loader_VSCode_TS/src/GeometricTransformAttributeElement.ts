import { Buffer } from "./BitBuffer.js";
import { DataTypes } from "./DataTypes.js";
import { GroupJTNode } from "./GroupJTNode.js";

export class GeometricTransformAttributeElement extends GroupJTNode {

    constructor(fileVersion: number) {
        super(fileVersion);
        // this._fileVersion = fileVersion;
    }

    public populateData(uncompressed: number[], filePosCount: number): number {
        this._uncompressed = uncompressed;
        this._filePosCount = filePosCount;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _objectID: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        var _stateFlags: number = this._uncompressed[this._filePosCount];
        this._filePosCount += 1;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _fieldInhibitFlags: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
        var _storedValuesMask: UInt16 = <UInt16>DataTypes.getInt16(this.fileBytes);
        this._filePosCount += 2;
        var m_transformMatrix: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        var c: number = _storedValuesMask;
        for (var i: number = 0; i < 16; i++) {
            if ((c & 0x8000) != 0) {
                Buffer.BlockCopy(this._uncompressed, this._filePosCount, this.fileBytes, 0, 4);
                m_transformMatrix[i] = DataTypes.getFloat32(this.fileBytes);
                this._filePosCount += 32; //sizeof(float);
            }
            c = c << 1;
        }
        return this._filePosCount;
    }
}
