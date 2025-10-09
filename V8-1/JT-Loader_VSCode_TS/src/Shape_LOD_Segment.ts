import { Buffer } from "./BitBuffer";
import { DataTypes } from "./DataTypes";
import { Guid } from "./GUID";
import { Int32CDP } from "./Int32CDP";
import { JTObjectTypeIdentifiers } from "./JTObjectTypeIdentifiers";
import { Tri_Strip_Set_Shape_LOD_Element } from "./Tri_Strip_Set_Shape_LOD_Element";

export class Shape_LOD_Segment {
    _filePosCount: number;
    _fileVersion: number;
    _data: number[];
    fileBytes: number[];
    _guidBytes: number[];
    elementLength: Int32;
    objectTypeID: Guid;
    triStripSetShape: Tri_Strip_Set_Shape_LOD_Element;

    constructor(fileVersion: number, data: number[]) {
        this._fileVersion = fileVersion;
        this._filePosCount = 0;
        this._data = data;
        if (this._fileVersion < 9.5) {
            Int32CDP.SetUpData(data);
        }
        else {

        }
        this.readSegment();
    }

    private readSegment(): void {
        this.fileBytes = new Array(4);
        this._guidBytes = new Array(16);
        Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        this.elementLength = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        Buffer.BlockCopy(this._data, this._filePosCount, this._guidBytes, 0, 16);
        this.objectTypeID = DataTypes.getGuid(this._guidBytes);
        this._filePosCount += (16);
        var _compare: string = JTObjectTypeIdentifiers.GetType(this.objectTypeID);
        var objectBaseType: number = this._data[this._filePosCount];
        this._filePosCount += 1;
        if (this._fileVersion >= 9.5) {
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            var objectID: Int32 = DataTypes.getInt32(this.fileBytes);
            this._filePosCount += 4;
        }
        if (_compare == "Vertex Shape LOD Element") {

        }
        if (_compare == "Tri-Strip Set Shape LOD Element") {
            this.triStripSetShape = new Tri_Strip_Set_Shape_LOD_Element(this._fileVersion, this._data, this._filePosCount);
        }
        if (_compare == "Polyline Set Shape LOD Element") {

        }
        if (_compare == "Point Set Shape LOD Element") {

        }
        if (_compare == "Polygon Set Shape LOD Element") {

        }
        if (_compare == "Null Shape LOD Element") {

        }
    }
}
