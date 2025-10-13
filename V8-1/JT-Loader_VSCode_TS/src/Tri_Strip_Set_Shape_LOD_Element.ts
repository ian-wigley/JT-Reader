import { UniformQuantizerCodec } from "./UniformQuantizerCodec.js";

export class Tri_Strip_Set_Shape_LOD_Element {
    _filePosCount: number;
    _versionNumber: number;
    _fileVersion: number;
    _data: number[];
    fileBytes: number[];
    _guidBytes: number[];
    m_faceIndices: List<number>;
    _primitiveListIndices: List<Int32>;
    _residualValues: Int32[];
    _texture: number[];
    _rgb: number[];
    _normal: number[];
    _vertex: number[];
    PolylineShape: boolean = false;
    _bitsPerVertex: number = 0;
    _geometricalData: number[];
    _geometryFilePosCount: number = 0;

    constructor(fileVersion: number, data: number[], filePosCount: number) {
        this._fileVersion = fileVersion;
        this._data = data;
        this._filePosCount = filePosCount;
        this._guidBytes = new Array(16);
        this.VertexShapeLodDataCollection();
    }
    private VertexShapeLodDataCollection(): void {
        this.fileBytes = new Array(2);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
        // this._versionNumber = DataTypes.getInt16(this.fileBytes);
        this._filePosCount += 2;
        if (this._versionNumber == 1) {
            if (this._fileVersion < 9.5) {
                // this.fileBytes = new Array(4);
                // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                // var _bindingAttributes: Int32 = DataTypes.getInt32(this.fileBytes);
                // this._filePosCount += 4;
                // this.QuantizationParameters();
            }
            // else {
            //     this.fileBytes = new Array(8);
            //     Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 8);
            //     var _vertexBindings: UInt64 = DataTypes.getUInt64(this.fileBytes);
            //     this._filePosCount += 8;
            //     this.TopoMeshLodDatacollection();
            // }
            // this._filePosCount += 2;
            // this.fileBytes = new Array(2);
            // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
            // this._versionNumber = DataTypes.getInt16(this.fileBytes);
            // this._filePosCount += 2;
            // var _normalBinding: number = this._data[this._filePosCount];
            // this._filePosCount += 1;
            // var _textureCoordBinding: number = this._data[this._filePosCount];
            // this._filePosCount += 1;
            // var _colorBinding: number = this._data[this._filePosCount];
            // this._filePosCount += 1;
            // this.QuantizationParameters();
            // Int32CDP.SetUpFilePosition(this._filePosCount);
            // Int32CDP.SetUpData(this._data);
            // this._residualValues = Int32CDP.Int32CDPone(CodecDriver.PredictorType.PredStride1);
            // this._primitiveListIndices = new List<number>();
            // CodecDriver.unpackResiduals(this._residualValues, this._primitiveListIndices, CodecDriver.PredictorType.PredStride1);
            // this._primitiveListIndices.forEach(function (integer) {
            //     this._richTextBox.Add(integer.ToString());
            // });
            // this._filePosCount = Int32CDP.GetFilePos();
            // if (this._bitsPerVertex == 0) {
            //     this.readLosslessCompressedRawVertexData(_normalBinding, _textureCoordBinding, _colorBinding);
            // }
            // else {
            //     this.readLossyQuantizedRawVertexData(_normalBinding, _textureCoordBinding, _colorBinding);
            // }
        }
    }
    private QuantizationParameters(): void {
        this._bitsPerVertex = this._data[this._filePosCount];
        this._filePosCount += 1;
        var _normalBitsFactor: number = this._data[this._filePosCount];
        this._filePosCount += 1;
        var _bitsPerTexCoord: number = this._data[this._filePosCount];
        this._filePosCount += 1;
        var _bitsPerColor: number = this._data[this._filePosCount];
        this._filePosCount += 1;
    }
    private readLossyQuantizedRawVertexData(normalBinding: number, textureCoordBinding: number, colorBinding: number): void {
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // var _min: number = DataTypes.getFloat32(this.fileBytes);
        // this._filePosCount += __sizeof__(float);
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // var _max: number = DataTypes.getFloat32(this.fileBytes);
        // this._filePosCount += __sizeof__(float);
        // var _numberOfBits: number = this._data[this._filePosCount];
        // this._filePosCount += 1;
        // var XUniformQuantizerData: UniformQuantizerData = new UniformQuantizerData(_min, _max, _numberOfBits);
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // _min = DataTypes.getFloat32(this.fileBytes);
        // this._filePosCount += __sizeof__(float);
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // _max = DataTypes.getFloat32(this.fileBytes);
        // this._filePosCount += __sizeof__(float);
        // _numberOfBits = this._data[this._filePosCount];
        // this._filePosCount += 1;
        // var YUniformQuantizerData: UniformQuantizerData = new UniformQuantizerData(_min, _max, _numberOfBits);
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // _min = DataTypes.getFloat32(this.fileBytes);
        // this._filePosCount += __sizeof__(float);
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // _max = DataTypes.getFloat32(this.fileBytes);
        // this._filePosCount += __sizeof__(float);
        // _numberOfBits = this._data[this._filePosCount];
        // this._filePosCount += 1;
        // var ZUniformQuantizerData: UniformQuantizerData = new UniformQuantizerData(_min, _max, _numberOfBits);
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // var _vertexCount: Int32 = DataTypes.getInt32(this.fileBytes);
        // this._filePosCount += 4;
        // Int32CDP.SetUpFilePosition(this._filePosCount);
        // var primalValues: number[] = Int32CDP.Int32CDPRead();
        var m_quantizer: UniformQuantizerCodec = new UniformQuantizerCodec();
        // var valuesX: number[] = m_quantizer.GetValues(primalValues, XUniformQuantizerData);
        // primalValues = Int32CDP.Int32CDPRead();
        // var valuesY: number[] = m_quantizer.GetValues(primalValues, YUniformQuantizerData);
        // primalValues = Int32CDP.Int32CDPRead();
        // var valuesZ: number[] = m_quantizer.GetValues(primalValues, ZUniformQuantizerData);
        // this._vertex = new Array(_vertexCount * 3);
        // for (var i: number = 0; i < _vertexCount; i++) {
        //     var j: number = i * 3;
        //     this._vertex[j + 0] = valuesX[i];
        //     this._vertex[j + 1] = valuesY[i];
        //     this._vertex[j + 2] = valuesZ[i];
        // }
        // this._filePosCount = Int32CDP.GetFilePos();
        // _numberOfBits = this._data[this._filePosCount];
        // this._filePosCount += 1;
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // var _normalCount: Int32 = DataTypes.getInt32(this.fileBytes);
        // this._filePosCount += 4;
        // Int32CDP.SetUpFilePosition(this._filePosCount);
        // var sextantCodes: number[] = Int32CDP.Int32CDPRead();
        // var octantCodes: number[] = Int32CDP.Int32CDPRead();
        // var thetaCodes: number[] = Int32CDP.Int32CDPRead();
        // var psiCodes: number[] = Int32CDP.Int32CDPRead();
        // var test1: number[] = Predictors.unpackResidualsOverwrite(sextantCodes, Predictors.PredictorType.Lag1);
        // var test2: number[] = Predictors.unpackResidualsOverwrite(octantCodes, Predictors.PredictorType.Lag1);
        // var test3: number[] = Predictors.unpackResidualsOverwrite(thetaCodes, Predictors.PredictorType.Lag1);
        // var test4: number[] = Predictors.unpackResidualsOverwrite(psiCodes, Predictors.PredictorType.Lag1);
        // var normals: Vec3D[];
        // normals = new Array(psiCodes.length);
        // var deeringCodec: DeeringNormalCodec = new DeeringNormalCodec(_numberOfBits);
        // for (var i: number = 0; i < psiCodes.length; i++) {
        //     normals[i] = deeringCodec.convertCodeToVec(sextantCodes[i], octantCodes[i], thetaCodes[i], psiCodes[i]);
        // }
        var end: number = 0;
    }

    private readLosslessCompressedRawVertexData(normalBinding: number, textureCoordBinding: number, colorBinding: number): void {
        var _stride: number = 3;
        if (textureCoordBinding == 1) {
            _stride += 2;
        }
        if (colorBinding == 1) {
            _stride += 3;
        }
        if (normalBinding == 1) {
            _stride += 3;
        }
        _stride *= 4;
        this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // var _uncompressedDataSize: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // var _compressedDataSize: Int32 = DataTypes.getInt32(this.fileBytes);
        this._filePosCount += 4;
        var len: number;
        // if (_compressedDataSize > 0 && _uncompressedDataSize > 0) {
        //     var segment: number[] = new Array(_compressedDataSize);
        //     for (var j: number = 0; j < _compressedDataSize; j++) {
        //         segment[j] = this._data[this._filePosCount];
        //         this._filePosCount += 1;
        //     }
        //     this._geometricalData = new Array(10000);
        //     this.decompressVertexData(segment, this._geometricalData);
        //     len = _uncompressedDataSize;
        //     var numFaces: number = this._primitiveListIndices.Count - 1;
        //     var numVertices: number = this._primitiveListIndices[numFaces];
        //     this._texture = new Array(_uncompressedDataSize);
        //     this._rgb = new Array(_uncompressedDataSize);
        //     this._normal = new Array(_uncompressedDataSize);
        //     this._vertex = new Array(_uncompressedDataSize);
        //     // this._textBox = new Array(_uncompressedDataSize);
        //     for (var i: number = 0; i < _uncompressedDataSize / _stride; i++) {
        //         var j: number = i * 3;
        //         if (textureCoordBinding == 1) {
        //             this._texture[j + 0] = this.readCompressedFloat();
        //             this._texture[j + 1] = this.readCompressedFloat();
        //         }
        //         if (colorBinding == 1) {
        //             this._rgb[j + 0] = this.readCompressedFloat();
        //             this._rgb[j + 1] = this.readCompressedFloat();
        //             this._rgb[j + 2] = this.readCompressedFloat();
        //         }
        //         if (normalBinding == 1) {
        //             this._normal[j + 0] = this.readCompressedFloat();
        //             this._normal[j + 1] = this.readCompressedFloat();
        //             this._normal[j + 2] = this.readCompressedFloat();
        //         }
        //         this._vertex[j + 0] = this.readCompressedFloat();
        //         this._vertex[j + 1] = this.readCompressedFloat();
        //         this._vertex[j + 2] = this.readCompressedFloat();
        //     }
        // }
        // else {
        //     len = this._data.length - this._filePosCount;
        //     this._texture = new Array(len);
        //     this._rgb = new Array(len);
        //     this._normal = new Array(len);
        //     this._vertex = new Array(len);
        //     for (var i: number = 0; i < len / _stride; i++) {
        //         var j: number = i * 3;
        //         if (textureCoordBinding == 1) {
        //             this._texture[j + 0] = this.readUnCompressedFloat();
        //             this._texture[j + 1] = this.readUnCompressedFloat();
        //         }
        //         if (colorBinding == 1) {
        //             this._rgb[j + 0] = this.readUnCompressedFloat();
        //             this._rgb[j + 1] = this.readUnCompressedFloat();
        //             this._rgb[j + 2] = this.readUnCompressedFloat();
        //         }
        //         if (normalBinding == 1) {
        //             this._normal[j + 0] = this.readUnCompressedFloat();
        //             this._normal[j + 1] = this.readUnCompressedFloat();
        //             this._normal[j + 2] = this.readUnCompressedFloat();
        //         }
        //         this._vertex[j + 0] = this.readUnCompressedFloat();
        //         this._vertex[j + 1] = this.readUnCompressedFloat();
        //         this._vertex[j + 2] = this.readUnCompressedFloat();
        //     }
        // }
        // var nbdVertices: number = 0;
        // var nbdfaces: number = 0;
        // for (var i: number = 0; i < this._primitiveListIndices.Count() - 1; i++) {
        //     var start: number = this._primitiveListIndices[i];
        //     var end: number = this._primitiveListIndices[i + 1];
        //     nbdVertices += end - start;
        //     nbdfaces += end - start - 2;
        // }
        // this.m_faceIndices = new List<number>();
        // var k: number = 0;
        // for (var i: number = 0; i < this._primitiveListIndices.Count() - 1; i++) {
        //     var start: number = this._primitiveListIndices[i];
        //     var end: number = this._primitiveListIndices[i + 1];
        //     for (var f: number = start; f < end - 2; f++) {
        //         if (f % 2 == 0) {
        //             this.m_faceIndices.Add(f);
        //             this.m_faceIndices.Add(f + 1);
        //             this.m_faceIndices.Add(f + 2);
        //         }
        //         else {
        //             this.m_faceIndices.Add(f);
        //             this.m_faceIndices.Add(f + 2);
        //             this.m_faceIndices.Add(f + 1);
        //         }
        //         k += 3;
        //     }
        // }
        // this.m_faceIndices.forEach(function (integer) {
        // });
    }

    // private readUnCompressedFloat(): number {
    //     Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
    //     this._filePosCount += __sizeof__(float);
    //     return DataTypes.getFloat32(this.fileBytes);
    // }

    // private readCompressedFloat(): number {
    //     Buffer.BlockCopy(this._geometricalData, this._geometryFilePosCount, this.fileBytes, 0, 4);
    //     this._geometryFilePosCount += __sizeof__(float);
    //     return DataTypes.getFloat32(this.fileBytes);
    // }

    // private decompressVertexData(segment: number[], outData: number[]): void {
    //     var output: MemoryStream = new MemoryStream()
    //     try {
    //         var outZStream: Stream = new zlib.ZOutputStream(output)
    //         try {
    //             var input: Stream = new MemoryStream(segment)
    //             try {
    //                 Tri_Strip_Set_Shape_LOD_Element.CopyStream(input, outZStream);
    //                 outData = output.ToArray();
    //             }
    //             finally {
    //                 if (input != null) input.Dispose();
    //             }
    //         }
    //         finally {
    //             if (outZStream != null) outZStream.Dispose();
    //         }
    //     }
    //     finally {
    //         if (output != null) output.Dispose();
    //     }
    // }

    // public static CopyStream(input: System.IO.Stream, output: System.IO.Stream): void {
    //     var buffer: number[] = new Array(4000);
    //     var len: number;
    //     while ((len = input.Read(buffer, 0, 4000)) > 0) {
    //         output.Write(buffer, 0, len);
    //     }
    //     output.Flush();
    // }

    private TopoMeshLodDatacollection(): void {
        // this.fileBytes = new Array(2);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
        // this._versionNumber = DataTypes.getInt16(this.fileBytes);
        // this._filePosCount += 2;
        // this.fileBytes = new Array(4);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
        // var _vertexRecordsObjectID: Int32 = DataTypes.getInt32(this.fileBytes);
        // this._filePosCount += 4;
        // this.TopoMeshTopologicallyCompressedLodDataCollection();
    }

    private TopoMeshTopologicallyCompressedLodDataCollection(): void {
        // this.fileBytes = new Array(2);
        // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
        // this._versionNumber = DataTypes.getInt16(this.fileBytes);
        // this._filePosCount += 2;
        // var faceDegrees: DataTypes.VecI32[] = new Array(8);
        // var vertexValences: DataTypes.VecI32 = new DataTypes.VecI32();
        // var vertexGroups: DataTypes.VecI32 = new DataTypes.VecI32();
        // var vertexFlags: DataTypes.VecI32 = new DataTypes.VecI32();
        // var faceAttributeMasks: DataTypes.VecI32[] = new Array(8);
        // var faceAttributeMask830MSB: DataTypes.VecI32 = new DataTypes.VecI32();
        // var faceAttributeMask4MSB: DataTypes.VecI32 = new DataTypes.VecI32();
        // var highDegreeFaceAttributeMasks: DataTypes.VecU32 = new DataTypes.VecU32();
        // var splitFaceSyms: DataTypes.VecI32 = new DataTypes.VecI32();
        // var splitFacePositions: DataTypes.VecI32 = new DataTypes.VecI32();
        if (this.PolylineShape) {
            this.fileBytes = new Array(4);
            // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            // var _numFaceGroupListIndices: Int32 = DataTypes.getInt32(this.fileBytes);
            // this._filePosCount += 4;
        }
        else {
            // this.fileBytes = new Array(4);
            // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            // var _numPrimitiveListIndices: Int32 = DataTypes.getInt32(this.fileBytes);
            // this._filePosCount += 4;
            // this.fileBytes = new Array(4);
            // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            // var _numVertexListIndices: Int32 = DataTypes.getInt32(this.fileBytes);
            // this._filePosCount += 4;
            if (this.PolylineShape) {

            }
            else {
                // this.fileBytes = new Array(4);
                // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                // var _fgpvListIndicesHash: Int32 = DataTypes.getInt32(this.fileBytes);
                // this._filePosCount += 4;
                // this.fileBytes = new Array(8);
                // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 8);
                // var _vertexBindings: UInt64 = DataTypes.getUInt64(this.fileBytes);
                // this._filePosCount += 8;
                // var _bitsPerVertex: number = this._data[this._filePosCount];
                // this._filePosCount += 1;
                // var _normalBitsFactor: number = this._data[this._filePosCount];
                // this._filePosCount += 1;
                // var _bitsPerTextureCoord: number = this._data[this._filePosCount];
                // this._filePosCount += 1;
                // var _bitsPerColor: number = this._data[this._filePosCount];
                // this._filePosCount += 1;
                // this.fileBytes = new Array(4);
                // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                // var _numVertexRecords: Int32 = DataTypes.getInt32(this.fileBytes);
                // this._filePosCount += 4;
                {
                    // this.fileBytes = new Array(4);
                    // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                    // var _numUniqueVertexCoords: Int32 = DataTypes.getInt32(this.fileBytes);
                    // this._filePosCount += 4;
                    // this.fileBytes = new Array(4);
                    // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                    // var _uniqueVertexListMapHash: Int32 = DataTypes.getInt32(this.fileBytes);
                    // this._filePosCount += 4;
                    // for (var i: number = 0; i < 8; i++) {
                    // }
                }
            }
            if (this._versionNumber >= 2) {
                // this.fileBytes = new Array(2);
                // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
                // this._versionNumber = DataTypes.getInt16(this.fileBytes);
                // this._filePosCount += 2;
                // this.fileBytes = new Array(8);
                // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 8);
                // var _vertexBindings: UInt64 = DataTypes.getUInt64(this.fileBytes);
                // this._filePosCount += 8;
                // this.fileBytes = new Array(4);
                // Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                // var _numAuxiliaryFields: Int32 = DataTypes.getInt32(this.fileBytes);
                // this._filePosCount += 4;
                // Buffer.BlockCopy(this._data, this._filePosCount, this._guidBytes, 0, 16);
                // var _uniqueFieldIdentifier: Guid = DataTypes.getGuid(this._guidBytes);
                // this._filePosCount += (16);
                // var _fieldType: number = this._data[this._filePosCount];
                // this._filePosCount += 1;
                // if (_fieldType > 0 && _fieldType < 5) {

                // }
            }
        }
    }
}
