module C_sharp_JT_Reader {
    export class Shape_LOD_Segment {
        _richTextBox: List<string>;
        _filePosCount: number;
        _fileVersion: number;
        _data: number[];
        fileBytes: number[];
        _guidBytes: number[];
        elementLength: Int32;
        objectTypeID: Guid;
        triStripSetShape: Tri_Strip_Set_Shape_LOD_Element;
        constructor() {

        }
        constructor(fileVersion: number, richTextBox: List<string>, data: number[]) {
            this._richTextBox = richTextBox;
            this._fileVersion = fileVersion;
            this._filePosCount = 0;
            this._data = data;
            if (this._fileVersion < 9.5) {
                Int32CDP.SetupRTF(richTextBox);
                Int32CDP.SetUpData(data);
            }
            else {

            }
            this.readSegment();
        }
        private readSegment(): void {
            this._richTextBox.Add("\n\n---------------------------- Shape LOD Element -------------------------");
            this.fileBytes = new Array(4);
            this._guidBytes = new Array(16);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            this.elementLength = DataTypes.getInt32(this.fileBytes);
            this._richTextBox.Add("\nElement Length = " + this.elementLength.ToString());
            this._filePosCount += 4;
            Buffer.BlockCopy(this._data, this._filePosCount, this._guidBytes, 0, 16);
            this.objectTypeID = DataTypes.getGuid(this._guidBytes);
            this._richTextBox.Add("\nObject Type ID = {" + this.objectTypeID.ToString() + "}");
            this._filePosCount += (16);
            var _compare: string = JTObjectTypeIdentifiers.GetType(this.objectTypeID);
            this._richTextBox.Add("\nNode Type = " + _compare);
            var objectBaseType: number = this._data[this._filePosCount];
            this._richTextBox.Add("\nObject Base Type = " + objectBaseType.ToString());
            this._filePosCount += 1;
            if (this._fileVersion >= 9.5) {
                Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                var objectID: Int32 = DataTypes.getInt32(this.fileBytes);
                this._richTextBox.Add("\nobject ID = " + objectID.ToString());
                this._filePosCount += 4;
            }
            if (_compare == "Vertex Shape LOD Element") {

            }
            if (_compare == "Tri-Strip Set Shape LOD Element") {
                this.triStripSetShape = new Tri_Strip_Set_Shape_LOD_Element(this._fileVersion, this._richTextBox, this._data, this._filePosCount);
            }
            if (_compare == "Polyline Set Shape LOD Element") {

            }
            if (_compare == "Point Set Shape LOD Element") {

            }
            if (_compare == "Polygon Set Shape LOD Element") {

            }
            if (_compare == "Null Shape LOD Element") {

            }
            this._richTextBox.Add("\n");
        }
    }
}