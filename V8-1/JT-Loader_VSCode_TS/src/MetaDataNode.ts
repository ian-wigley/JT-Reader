import { BaseJTNode } from "./BaseJTNode.js";

export class MetaDataNode  extends BaseJTNode {

    constructor(fileVersion: number) {
        super();
        // this._fileVersion = fileVersion;
    }

    public populateData(uncompressed: number[], _filePosCount: number): number {
        // this._uncompressed = uncompressed;
        // this._filePosCount = filePosCount;
        // this.elementLength = elementLength;
        return 0;
    }
}