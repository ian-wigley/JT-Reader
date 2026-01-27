import { Guid } from "./GUID.js";
import { JTObjectTypeIdentifiers } from "./JTObjectTypeIdentifiers.js";
import { LogicalSceneGraphNode } from "./LogicalSceneGraphNode.js";
import { MetaDataNode } from "./MetaDataNode.js";
import { Shape_LOD_Segment } from "./Shape_LOD_Segment.js";
import { unzip, unzlibSync } from 'fflate';

// import { inflate } from "./index.js";

// declare var pako: any;

export class JTReader {
    fileVersion: number;
    version: string[];
    byteOrder: number;
    count: number = 0;
    reservedField: number;
    tocOffset: Int32;
    lsgSegmentID: Guid;
    entryCount: Int32;
    segmentID: Guid[];
    segmentOffset: Int32[];
    segmentLength: Int32[];
    segmentAttributes: UInt32[];
    SegmentID: Guid;
    SegmentType: Int32;
    zlibApplied: boolean[];
    compressionFlag: Int32[];
    compressedDataLength: Int32[];
    compressionAlgorithmn: number[];
    segmentFilePos: Int32[];
    SegmentLength: Int32[];
    segmentType: string[];
    segment: Uint8Array;
    element: number[];
    test: number[];
    decompressedBytes: List<Byte[]>;
    notZLibBytes: any; //List<Byte[]>;
    m_lodSegment: List<Shape_LOD_Segment>;
    m_textBox: List<string>;
    dataContents: string;
    metaNode: MetaDataNode;
    lSG: LogicalSceneGraphNode;
    // xtB_Rep: XTB_RepNode;
    shapeLODSegment: Shape_LOD_Segment;

    fileBytes: Uint8Array;
    loaded = false;

    constructor() {
        // let a = 1;
        // console.log(a);
        this.notZLibBytes = [];
    }

    public LoadJT(fileName: string): void {
        let done = false;
        let _this = this;
        let levelBytes: Uint8Array;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', fileName, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function (e) {
            levelBytes = new Uint8Array(this.response);
            done = true;
        };
        xhr.onloadend = function () {
            _this.fileBytes = levelBytes;
            _this.loaded = true;
            _this.ParseJT("");
        };
        xhr.send();
    }

    public ParseJT(fileName: string): void {
        JTObjectTypeIdentifiers.PopulateList();
        let version: string = this.ReadChars(79);
        if (!version.includes("Version 8.1 JT  DM 7.3.7.3")) { return; }
        this.byteOrder = this.ReadChar();
        if (this.byteOrder != 0) {

        }
        else if (this.byteOrder == 0) {
            let filePos: number = this.count; //<number>b.BaseStream.Position;
            this.reservedField = this.GetInt32();
            this.tocOffset = this.GetInt32();
            this.lsgSegmentID = this.GetGuid();
            //b.BaseStream.Position = this.tocOffset;
            this.count = this.tocOffset;
            this.entryCount = this.GetInt32();
            this.segmentID = new Array(this.entryCount);
            this.segmentOffset = new Array(this.entryCount);
            this.segmentLength = new Array(this.entryCount);
            this.segmentAttributes = new Array(this.entryCount);
            this.zlibApplied = new Array(this.entryCount);
            this.segmentFilePos = new Array(this.entryCount);
            this.SegmentLength = new Array(this.entryCount);
            this.segmentType = new Array(this.entryCount);
            this.compressionFlag = new Array(this.entryCount);
            this.compressedDataLength = new Array(this.entryCount);
            this.compressionAlgorithmn = new Array(this.entryCount);

            for (var i: number = 0; i < this.entryCount; i++) {
                this.segmentID[i] = this.GetGuid();
                this.segmentOffset[i] = this.GetInt32();
                this.segmentLength[i] = this.GetInt32();
                this.segmentAttributes[i] = this.GetUInt32(i);
            }

            for (var i: number = 0; i < this.entryCount; i++) {
                // b.BaseStream.Position = this.segmentOffset[i];
                this.count = this.segmentOffset[i];
                this.SegmentID = this.GetGuid();
                this.SegmentType = this.GetInt32();
                this.segmentType[i] = this.GetSegmentType(this.SegmentType, i);
                this.SegmentLength[i] = this.GetInt32();
                // this.segmentFilePos[i] = <Int32>b.BaseStream.Position;
                this.segmentFilePos[i] = this.count;
                //var basePos: number = <number>b.BaseStream.Position;//this.count;
                var basePos: number = this.count;
                // this.readBaseLSGData(i, basePos, b);
                this.readBaseLSGData(i, basePos, this.count);
            }
        }
        console.log("Done!");
    }

    private ReadChar() {
        return this.fileBytes[this.count++];
    }

    private ReadByte() {
        return this.fileBytes[this.count++];
    }


    private ReadChars(count: number) {
        count = count + 1;
        let version = "";
        for (let i = 0; i < count; i++) {
            version += String.fromCharCode(this.fileBytes[i]);
        }
        this.count += count;
        return version;
    }

    private GetInt32(): Int32 {
        var fileBytes: number[] = new Array(4);
        for (let i = 0; i < 4; i++) {
            fileBytes[i] = this.fileBytes[this.count++];
        }
        if (this.byteOrder == 0) {
            return fileBytes[0] | (fileBytes[1] << 8) | (fileBytes[2] << 16) | (fileBytes[3] << 24);
        }
        else {
            return (fileBytes[0] << 24) | (fileBytes[1] << 16) | (fileBytes[2] << 8) | (fileBytes[3]);
        }
    }

    private GetUInt32(i: number): UInt32 {
        var fileBytes: number[] = new Array(4);
        for (let i = 0; i < 4; i++) {
            fileBytes[i] = this.fileBytes[this.count++];
        }
        if (fileBytes[3] < 6) {
            this.zlibApplied[i] = true;
        }
        if (this.byteOrder != 0) {
            return fileBytes[0] | (fileBytes[1] << 8) | (fileBytes[2] << 16) | (fileBytes[3] << 24);
        }
        else {
            return (fileBytes[0] << 24) | (fileBytes[1] << 16) | (fileBytes[2] << 8) | (fileBytes[3]);
        }
    }

    private GetGuid(): Guid {
        var guidBytes: number[] = new Array(16);
        for (var i: number = 0; i < 16; i++) {
            guidBytes[i] = this.ReadByte();
        }
        return new Guid(guidBytes[0], guidBytes[1], guidBytes[2], guidBytes[3], guidBytes[4], guidBytes[5], guidBytes[6], guidBytes[7], guidBytes[8], guidBytes[9], guidBytes[10]);
    }

    private readBaseLSGData(i: number, basePos: number, b): void {
        // b.BaseStream.Position = basePos;
        if (this.zlibApplied[i] == true) {
            this.compressionFlag[i] = this.GetInt32();
            this.compressedDataLength[i] = this.GetInt32();
            this.compressionAlgorithmn[i] = this.ReadByte();
            var testLength: number = this.compressedDataLength[i] - 4;
            this.segment = new Uint8Array(testLength);
            for (var j: number = 0; j < testLength; j++) {
                this.segment[j] = this.ReadByte();
            }
            let test = new Array(10000);
            this.DecompressFile(this.segment, test);
            // this.decompressedBytes.push(test);
        }
        else {
            this.element = new Array(this.SegmentLength[i]);
            for (var j: number = 0; j < this.SegmentLength[i] - 24; j++) {
                this.element[j] = this.ReadByte();
            }
            this.notZLibBytes.push(this.element);
        }

        if (this.segmentType[i] == "Logical Scene Graph - ZLib Applied") {
        }

        if (this.segmentType[i] == "Meta Data - ZLib Applied") {
            let metaNode = new MetaDataNode(this.fileVersion);
        }

        if (this.segmentType[i] == "XT B-Rep - ZLib Applied") {
        }

        if (this.segmentType[i] == "Shape LOD0") {
            let shapeLODSegment = new Shape_LOD_Segment(this.fileVersion, this.element);
            // this.m_lodSegment.push(shapeLODSegment);
            console.log(shapeLODSegment);
        }

        if (this.segmentType[i] == "Shape LOD1") {
        }

        if (this.segmentType[i] == "Shape LOD2") {
        }
    }

    private GetSegmentType(type: number, count: number): string {
        this.zlibApplied[count] = type < 6 || type > 16;
        switch (type) {
            case 1:
                this.dataContents = "Logical Scene Graph - ZLib Applied";
                break;
            case 2:
                this.dataContents = "JT B-Rep - ZLib Applied";
                break;
            case 3:
                this.dataContents = "PMI Data - ZLib Applied";
                break;
            case 4:
                this.dataContents = "Meta Data - ZLib Applied";
                break;
            case 6:
                this.dataContents = "Shape";
                break;
            case 7:
                this.dataContents = "Shape LOD0";
                break;
            case 8:
                this.dataContents = "Shape LOD1";
                break;
            case 9:
                this.dataContents = "Shape LOD2";
                break;
            case 10:
                this.dataContents = "Shape LOD3";
                break;
            case 11:
                this.dataContents = "Shape LOD4";
                break;
            case 12:
                this.dataContents = "Shape LOD5";
                break;
            case 13:
                this.dataContents = "Shape LOD6";
                break;
            case 14:
                this.dataContents = "Shape LOD7";
                break;
            case 15:
                this.dataContents = "Shape LOD8";
                break;
            case 16:
                this.dataContents = "Shape LOD9";
                break;
            case 17:
                this.dataContents = "XT B-Rep - ZLib Applied";
                break;
            case 18:
                this.dataContents = "Wireframe Representation - ZLib Applied";
                break;
            case 20:
                this.dataContents = "ULP - ZLib Applied";
                break;
            case 24:
                this.dataContents = "LWPA - ZLib Applied";
                break;
        }
        return this.dataContents;
    }

    private DecompressFile(segment: Uint8Array /*number[]*/, outData: number[]): void {
        // let result = pako.inflate(segment);
        // @ts-ignore

        unzip(segment, (err, unzipped) => {
            // If the archive has data.xml, log it here
            console.log("unzipped: " + unzipped);
            console.log("error" + err);
        });

        // let result = unzip(segment);
        // // // let result = inflate(segment);
        // console.log(result);
        // // var output: MemoryStream = new MemoryStream()
        // // try {
        // //     var outZStream: Stream = new zlib.ZOutputStream(output)
        // //     try {
        // //         var input: Stream = new MemoryStream(segment)
        // //         try {
        // //             Form1.CopyStream(input, outZStream);
        // //             outData = output.ToArray();
        // //         }
        // //         finally {
        // //             if (input != null) input.Dispose();
        // //         }
        // //     }
        // //     finally {
        // //         if (outZStream != null) outZStream.Dispose();
        // //     }
        // // }
        // // finally {
        // //     if (output != null) output.Dispose();
        // // }
    }

    public static CopyStream(input, output): void {
        // var buffer: number[] = new Array(input.Length);
        // var len: number;
        // while ((len = input.Read(buffer, 0, <number>input.Length)) > 0) {
        //     output.Write(buffer, 0, len);
        // }
        // output.Flush();
    }

    private writeZip(decompressed: number[], fileName: string): void {
        // var _fileName: string = fileName + ".bin";
        // var writer: BinaryWriter = new BinaryWriter(File.Open(_fileName, FileMode.Create))
        // try {
        //     decompressed.forEach(function (by) {
        //         writer.Write(by);
        //     });
        // }
        // finally {
        //     if (writer != null) writer.Dispose();
        // }
    }

}


let jtReader = new JTReader();
jtReader.LoadJT("assets/H-ADAPTOR,4 BOLT STRAIGHT.jt");
