var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class Tri_Strip_Set_Shape_LOD_Element {
        _richTextBox;
        _filePosCount;
        _versionNumber;
        _fileVersion;
        _data;
        fileBytes;
        _guidBytes;
        m_faceIndices;
        _primitiveListIndices;
        _residualValues;
        _texture;
        _rgb;
        _normal;
        _vertex;
        _textBox;
        PolylineShape = false;
        _bitsPerVertex = 0;
        _geometricalData;
        _geometryFilePosCount = 0;
        constructor() {
        }
        constructor(fileVersion, richTextBox, data, filePosCount) {
            this._richTextBox = richTextBox;
            this._fileVersion = fileVersion;
            this._data = data;
            this._filePosCount = filePosCount;
            this._guidBytes = new Array(16);
            this.VertexShapeLodDataCollection();
        }
        VertexShapeLodDataCollection() {
            this._richTextBox.Add("------------------------ Tri Strip Set Shape LOD Element ----------------------");
            this.fileBytes = new Array(2);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
            this._versionNumber = C_sharp_JT_Reader.DataTypes.getInt16(this.fileBytes);
            this._richTextBox.Add("Version number = " + this._versionNumber.ToString());
            this._filePosCount += 2;
            if (this._versionNumber == 1) {
                if (this._fileVersion < 9.5) {
                    this.fileBytes = new Array(4);
                    Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                    var _bindingAttributes = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                    this._richTextBox.Add("Binding Attributes = " + _bindingAttributes.ToString());
                    this._filePosCount += 4;
                    this.QuantizationParameters();
                }
                else {
                    this.fileBytes = new Array(8);
                    Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 8);
                    var _vertexBindings = C_sharp_JT_Reader.DataTypes.getUInt64(this.fileBytes);
                    this._richTextBox.Add("Vertex Bindings = " + _vertexBindings.ToString());
                    this._filePosCount += 8;
                    this.TopoMeshLodDatacollection();
                }
                this._richTextBox.Add("File Position = " + this._filePosCount.ToString() + "");
                this._filePosCount += 2;
                this.fileBytes = new Array(2);
                Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
                this._versionNumber = C_sharp_JT_Reader.DataTypes.getInt16(this.fileBytes);
                this._richTextBox.Add("Version number = " + this._versionNumber.ToString());
                this._filePosCount += 2;
                var _normalBinding = this._data[this._filePosCount];
                this._richTextBox.Add("Normal Binding = " + _normalBinding.ToString());
                this._filePosCount += 1;
                var _textureCoordBinding = this._data[this._filePosCount];
                this._richTextBox.Add("Texture Coord Binding = " + _textureCoordBinding.ToString());
                this._filePosCount += 1;
                var _colorBinding = this._data[this._filePosCount];
                this._richTextBox.Add("Colour Binding = " + _colorBinding.ToString());
                this._filePosCount += 1;
                this.QuantizationParameters();
                C_sharp_JT_Reader.Int32CDP.SetUpFilePosition(this._filePosCount);
                C_sharp_JT_Reader.Int32CDP.SetUpData(this._data);
                this._residualValues = C_sharp_JT_Reader.Int32CDP.Int32CDPone(C_sharp_JT_Reader.CodecDriver.PredictorType.PredStride1);
                this._primitiveListIndices = new List();
                C_sharp_JT_Reader.CodecDriver.unpackResiduals(this._residualValues, this._primitiveListIndices, C_sharp_JT_Reader.CodecDriver.PredictorType.PredStride1);
                this._richTextBox.Add("\n");
                this._richTextBox.Add("------ Primitive List Indices ------");
                this._primitiveListIndices.forEach(function (integer) {
                    this._richTextBox.Add(integer.ToString());
                });
                this._richTextBox.Add("\n");
                this._filePosCount = C_sharp_JT_Reader.Int32CDP.GetFilePos();
                if (this._bitsPerVertex == 0) {
                    this.readLosslessCompressedRawVertexData(_normalBinding, _textureCoordBinding, _colorBinding);
                }
                else {
                    this.readLossyQuantizedRawVertexData(_normalBinding, _textureCoordBinding, _colorBinding);
                }
            }
        }
        QuantizationParameters() {
            this._bitsPerVertex = this._data[this._filePosCount];
            this._richTextBox.Add("Bits Per Vertex = " + this._bitsPerVertex.ToString());
            this._filePosCount += 1;
            var _normalBitsFactor = this._data[this._filePosCount];
            this._richTextBox.Add("Normal Bits Factor = " + _normalBitsFactor.ToString());
            this._filePosCount += 1;
            var _bitsPerTexCoord = this._data[this._filePosCount];
            this._richTextBox.Add("Bits Per Texture Coord = " + _bitsPerTexCoord.ToString());
            this._filePosCount += 1;
            var _bitsPerColor = this._data[this._filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _bitsPerColor.ToString());
            this._filePosCount += 1;
        }
        readLossyQuantizedRawVertexData(normalBinding, textureCoordBinding, colorBinding) {
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            var _min = C_sharp_JT_Reader.DataTypes.getFloat32(this.fileBytes);
            this._richTextBox.Add("Min Value = " + _min.ToString());
            this._filePosCount += __sizeof__(float);
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            var _max = C_sharp_JT_Reader.DataTypes.getFloat32(this.fileBytes);
            this._richTextBox.Add("Max Value = " + _max.ToString());
            this._filePosCount += __sizeof__(float);
            var _numberOfBits = this._data[this._filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _numberOfBits.ToString());
            this._filePosCount += 1;
            var XUniformQuantizerData = new C_sharp_JT_Reader.UniformQuantizerData(_min, _max, _numberOfBits);
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            _min = C_sharp_JT_Reader.DataTypes.getFloat32(this.fileBytes);
            this._richTextBox.Add("Min Value = " + _min.ToString());
            this._filePosCount += __sizeof__(float);
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            _max = C_sharp_JT_Reader.DataTypes.getFloat32(this.fileBytes);
            this._richTextBox.Add("Max Value = " + _max.ToString());
            this._filePosCount += __sizeof__(float);
            _numberOfBits = this._data[this._filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _numberOfBits.ToString());
            this._filePosCount += 1;
            var YUniformQuantizerData = new C_sharp_JT_Reader.UniformQuantizerData(_min, _max, _numberOfBits);
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            _min = C_sharp_JT_Reader.DataTypes.getFloat32(this.fileBytes);
            this._richTextBox.Add("Min Value = " + _min.ToString());
            this._filePosCount += __sizeof__(float);
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            _max = C_sharp_JT_Reader.DataTypes.getFloat32(this.fileBytes);
            this._richTextBox.Add("Max Value = " + _max.ToString());
            this._filePosCount += __sizeof__(float);
            _numberOfBits = this._data[this._filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _numberOfBits.ToString());
            this._filePosCount += 1;
            var ZUniformQuantizerData = new C_sharp_JT_Reader.UniformQuantizerData(_min, _max, _numberOfBits);
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            var _vertexCount = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
            this._richTextBox.Add("Vertex Count = " + _vertexCount.ToString());
            this._filePosCount += 4;
            C_sharp_JT_Reader.Int32CDP.SetUpFilePosition(this._filePosCount);
            var primalValues = C_sharp_JT_Reader.Int32CDP.Int32CDPRead();
            var m_quantizer = new C_sharp_JT_Reader.UniformQuantizerCodec(this._richTextBox);
            var valuesX = m_quantizer.GetValues(primalValues, XUniformQuantizerData);
            primalValues = C_sharp_JT_Reader.Int32CDP.Int32CDPRead();
            var valuesY = m_quantizer.GetValues(primalValues, YUniformQuantizerData);
            primalValues = C_sharp_JT_Reader.Int32CDP.Int32CDPRead();
            var valuesZ = m_quantizer.GetValues(primalValues, ZUniformQuantizerData);
            this._vertex = new Array(_vertexCount * 3);
            for (var i = 0; i < _vertexCount; i++) {
                var j = i * 3;
                this._vertex[j + 0] = valuesX[i];
                this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + this._vertex[j + 0].ToString());
                this._vertex[j + 1] = valuesY[i];
                this._richTextBox.Add("Vertex Value " + (j + 1).ToString() + " = " + this._vertex[j + 1].ToString());
                this._vertex[j + 2] = valuesZ[i];
                this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + this._vertex[j + 2].ToString());
            }
            this._filePosCount = C_sharp_JT_Reader.Int32CDP.GetFilePos();
            _numberOfBits = this._data[this._filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _numberOfBits.ToString());
            this._filePosCount += 1;
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            var _normalCount = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
            this._richTextBox.Add("Normal Count = " + _normalCount.ToString());
            this._filePosCount += 4;
            C_sharp_JT_Reader.Int32CDP.SetUpFilePosition(this._filePosCount);
            var sextantCodes = C_sharp_JT_Reader.Int32CDP.Int32CDPRead();
            var octantCodes = C_sharp_JT_Reader.Int32CDP.Int32CDPRead();
            var thetaCodes = C_sharp_JT_Reader.Int32CDP.Int32CDPRead();
            var psiCodes = C_sharp_JT_Reader.Int32CDP.Int32CDPRead();
            var test1 = Predictors.unpackResidualsOverwrite(sextantCodes, Predictors.PredictorType.Lag1);
            var test2 = Predictors.unpackResidualsOverwrite(octantCodes, Predictors.PredictorType.Lag1);
            var test3 = Predictors.unpackResidualsOverwrite(thetaCodes, Predictors.PredictorType.Lag1);
            var test4 = Predictors.unpackResidualsOverwrite(psiCodes, Predictors.PredictorType.Lag1);
            var normals;
            normals = new Array(psiCodes.length);
            var deeringCodec = new DeeringNormalCodec(_numberOfBits);
            for (var i = 0; i < psiCodes.length; i++) {
                normals[i] = deeringCodec.convertCodeToVec(sextantCodes[i], octantCodes[i], thetaCodes[i], psiCodes[i]);
            }
            var end = 0;
        }
        readLosslessCompressedRawVertexData(normalBinding, textureCoordBinding, colorBinding) {
            var _stride = 3;
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
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            var _uncompressedDataSize = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
            this._richTextBox.Add("Uncompressed Data Size = " + _uncompressedDataSize.ToString());
            this._filePosCount += 4;
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            var _compressedDataSize = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
            this._richTextBox.Add("Compressed Data Size = " + _compressedDataSize.ToString());
            this._filePosCount += 4;
            var len;
            if (_compressedDataSize > 0 && _uncompressedDataSize > 0) {
                var segment = new Array(_compressedDataSize);
                for (var j = 0; j < _compressedDataSize; j++) {
                    segment[j] = this._data[this._filePosCount];
                    this._filePosCount += 1;
                }
                this._geometricalData = new Array(10000);
                this.decompressVertexData(segment, this._geometricalData);
                len = _uncompressedDataSize;
                var numFaces = this._primitiveListIndices.Count - 1;
                var numVertices = this._primitiveListIndices[numFaces];
                this._texture = new Array(_uncompressedDataSize);
                this._rgb = new Array(_uncompressedDataSize);
                this._normal = new Array(_uncompressedDataSize);
                this._vertex = new Array(_uncompressedDataSize);
                this._textBox = new Array(_uncompressedDataSize);
                for (var i = 0; i < _uncompressedDataSize / _stride; i++) {
                    var j = i * 3;
                    if (textureCoordBinding == 1) {
                        this._texture[j + 0] = this.readCompressedFloat();
                        this._texture[j + 1] = this.readCompressedFloat();
                    }
                    if (colorBinding == 1) {
                        this._rgb[j + 0] = this.readCompressedFloat();
                        this._rgb[j + 1] = this.readCompressedFloat();
                        this._rgb[j + 2] = this.readCompressedFloat();
                    }
                    if (normalBinding == 1) {
                        this._normal[j + 0] = this.readCompressedFloat();
                        this._normal[j + 1] = this.readCompressedFloat();
                        this._normal[j + 2] = this.readCompressedFloat();
                    }
                    this._vertex[j + 0] = this.readCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + this._vertex[j + 0].ToString());
                    this._vertex[j + 1] = this.readCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 1).ToString() + " = " + this._vertex[j + 1].ToString());
                    this._vertex[j + 2] = this.readCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + this._vertex[j + 2].ToString());
                }
            }
            else {
                len = this._data.length - this._filePosCount;
                this._texture = new Array(len);
                this._rgb = new Array(len);
                this._normal = new Array(len);
                this._vertex = new Array(len);
                for (var i = 0; i < len / _stride; i++) {
                    var j = i * 3;
                    if (textureCoordBinding == 1) {
                        this._texture[j + 0] = this.readUnCompressedFloat();
                        this._texture[j + 1] = this.readUnCompressedFloat();
                    }
                    if (colorBinding == 1) {
                        this._rgb[j + 0] = this.readUnCompressedFloat();
                        this._rgb[j + 1] = this.readUnCompressedFloat();
                        this._rgb[j + 2] = this.readUnCompressedFloat();
                    }
                    if (normalBinding == 1) {
                        this._normal[j + 0] = this.readUnCompressedFloat();
                        this._normal[j + 1] = this.readUnCompressedFloat();
                        this._normal[j + 2] = this.readUnCompressedFloat();
                    }
                    this._vertex[j + 0] = this.readUnCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + this._vertex[j + 0].ToString());
                    this._vertex[j + 1] = this.readUnCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 1).ToString() + " = " + this._vertex[j + 1].ToString());
                    this._vertex[j + 2] = this.readUnCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + this._vertex[j + 2].ToString());
                }
            }
            var nbdVertices = 0;
            var nbdfaces = 0;
            for (var i = 0; i < this._primitiveListIndices.Count() - 1; i++) {
                var start = this._primitiveListIndices[i];
                var end = this._primitiveListIndices[i + 1];
                nbdVertices += end - start;
                nbdfaces += end - start - 2;
            }
            this.m_faceIndices = new List();
            var k = 0;
            for (var i = 0; i < this._primitiveListIndices.Count() - 1; i++) {
                var start = this._primitiveListIndices[i];
                var end = this._primitiveListIndices[i + 1];
                for (var f = start; f < end - 2; f++) {
                    if (f % 2 == 0) {
                        this.m_faceIndices.Add(f);
                        this.m_faceIndices.Add(f + 1);
                        this.m_faceIndices.Add(f + 2);
                    }
                    else {
                        this.m_faceIndices.Add(f);
                        this.m_faceIndices.Add(f + 2);
                        this.m_faceIndices.Add(f + 1);
                    }
                    k += 3;
                }
            }
            this._richTextBox.Add("\n");
            this._richTextBox.Add("------ Indices ------");
            this.m_faceIndices.forEach(function (integer) {
                this._richTextBox.Add(integer.ToString());
            });
            this._richTextBox.Add("\n");
        }
        readUnCompressedFloat() {
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            this._filePosCount += __sizeof__(float);
            return C_sharp_JT_Reader.DataTypes.getFloat32(this.fileBytes);
        }
        readCompressedFloat() {
            Buffer.BlockCopy(this._geometricalData, this._geometryFilePosCount, this.fileBytes, 0, 4);
            this._geometryFilePosCount += __sizeof__(float);
            return C_sharp_JT_Reader.DataTypes.getFloat32(this.fileBytes);
        }
        decompressVertexData(segment, outData) {
            var output = new MemoryStream();
            try {
                var outZStream = new zlib.ZOutputStream(output);
                try {
                    var input = new MemoryStream(segment);
                    try {
                        Tri_Strip_Set_Shape_LOD_Element.CopyStream(input, outZStream);
                        outData = output.ToArray();
                    }
                    finally {
                        if (input != null)
                            input.Dispose();
                    }
                }
                finally {
                    if (outZStream != null)
                        outZStream.Dispose();
                }
            }
            finally {
                if (output != null)
                    output.Dispose();
            }
        }
        static CopyStream(input, output) {
            var buffer = new Array(4000);
            var len;
            while ((len = input.Read(buffer, 0, 4000)) > 0) {
                output.Write(buffer, 0, len);
            }
            output.Flush();
        }
        TopoMeshLodDatacollection() {
            this.fileBytes = new Array(2);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
            this._versionNumber = C_sharp_JT_Reader.DataTypes.getInt16(this.fileBytes);
            this._richTextBox.Add("Version number = " + this._versionNumber.ToString());
            this._filePosCount += 2;
            this.fileBytes = new Array(4);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
            var _vertexRecordsObjectID = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
            this._richTextBox.Add("Vertex Records Object ID = " + _vertexRecordsObjectID.ToString());
            this._filePosCount += 4;
            this.TopoMeshTopologicallyCompressedLodDataCollection();
        }
        TopoMeshTopologicallyCompressedLodDataCollection() {
            this.fileBytes = new Array(2);
            Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
            this._versionNumber = C_sharp_JT_Reader.DataTypes.getInt16(this.fileBytes);
            this._richTextBox.Add("Version number = " + this._versionNumber.ToString());
            this._filePosCount += 2;
            var faceDegrees = new Array(8);
            var vertexValences = new C_sharp_JT_Reader.DataTypes.VecI32();
            var vertexGroups = new C_sharp_JT_Reader.DataTypes.VecI32();
            var vertexFlags = new C_sharp_JT_Reader.DataTypes.VecI32();
            var faceAttributeMasks = new Array(8);
            var faceAttributeMask830MSB = new C_sharp_JT_Reader.DataTypes.VecI32();
            var faceAttributeMask4MSB = new C_sharp_JT_Reader.DataTypes.VecI32();
            var highDegreeFaceAttributeMasks = new C_sharp_JT_Reader.DataTypes.VecU32();
            var splitFaceSyms = new C_sharp_JT_Reader.DataTypes.VecI32();
            var splitFacePositions = new C_sharp_JT_Reader.DataTypes.VecI32();
            if (this.PolylineShape) {
                this.fileBytes = new Array(4);
                Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                var _numFaceGroupListIndices = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                this._richTextBox.Add("Number of Auxiliary Fields = " + _numFaceGroupListIndices.ToString());
                this._filePosCount += 4;
            }
            else {
                this.fileBytes = new Array(4);
                Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                var _numPrimitiveListIndices = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                this._richTextBox.Add("Number of Primitive List Indices = " + _numPrimitiveListIndices.ToString());
                this._filePosCount += 4;
                this.fileBytes = new Array(4);
                Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                var _numVertexListIndices = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                this._richTextBox.Add("Number of Vertex List Indices = " + _numVertexListIndices.ToString());
                this._filePosCount += 4;
                if (this.PolylineShape) {
                }
                else {
                    this.fileBytes = new Array(4);
                    Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                    var _fgpvListIndicesHash = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                    this._richTextBox.Add("Number of Vertex Records = " + _fgpvListIndicesHash.ToString());
                    this._filePosCount += 4;
                    this.fileBytes = new Array(8);
                    Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 8);
                    var _vertexBindings = C_sharp_JT_Reader.DataTypes.getUInt64(this.fileBytes);
                    this._richTextBox.Add("Vertex Bindings = " + _vertexBindings.ToString());
                    this._filePosCount += 8;
                    var _bitsPerVertex = this._data[this._filePosCount];
                    this._richTextBox.Add("Bits Per Vertex = " + _bitsPerVertex.ToString());
                    this._filePosCount += 1;
                    var _normalBitsFactor = this._data[this._filePosCount];
                    this._richTextBox.Add("Normal Bits Factor = " + _normalBitsFactor.ToString());
                    this._filePosCount += 1;
                    var _bitsPerTextureCoord = this._data[this._filePosCount];
                    this._richTextBox.Add("Bits Per Texture Coord = " + _bitsPerTextureCoord.ToString());
                    this._filePosCount += 1;
                    var _bitsPerColor = this._data[this._filePosCount];
                    this._richTextBox.Add("Bits Per Color = " + _bitsPerColor.ToString());
                    this._filePosCount += 1;
                    this.fileBytes = new Array(4);
                    Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                    var _numVertexRecords = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                    this._richTextBox.Add("Number of Vertex Records = " + _numVertexRecords.ToString());
                    this._filePosCount += 4;
                    {
                        this.fileBytes = new Array(4);
                        Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                        var _numUniqueVertexCoords = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                        this._richTextBox.Add("Number of Unique Vertex Coords = " + _numUniqueVertexCoords.ToString());
                        this._filePosCount += 4;
                        this.fileBytes = new Array(4);
                        Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                        var _uniqueVertexListMapHash = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                        this._richTextBox.Add("Unique Vertex List Map Hash = " + _uniqueVertexListMapHash.ToString());
                        this._filePosCount += 4;
                        for (var i = 0; i < 8; i++) {
                        }
                    }
                }
                if (this._versionNumber >= 2) {
                    this.fileBytes = new Array(2);
                    Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 2);
                    this._versionNumber = C_sharp_JT_Reader.DataTypes.getInt16(this.fileBytes);
                    this._richTextBox.Add("Version number = " + this._versionNumber.ToString());
                    this._filePosCount += 2;
                    this.fileBytes = new Array(8);
                    Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 8);
                    var _vertexBindings = C_sharp_JT_Reader.DataTypes.getUInt64(this.fileBytes);
                    this._richTextBox.Add("Vertex Bindings = " + _vertexBindings.ToString());
                    this._filePosCount += 8;
                    this.fileBytes = new Array(4);
                    Buffer.BlockCopy(this._data, this._filePosCount, this.fileBytes, 0, 4);
                    var _numAuxiliaryFields = C_sharp_JT_Reader.DataTypes.getInt32(this.fileBytes);
                    this._richTextBox.Add("Number of Auxiliary Fields = " + _numAuxiliaryFields.ToString());
                    this._filePosCount += 4;
                    Buffer.BlockCopy(this._data, this._filePosCount, this._guidBytes, 0, 16);
                    var _uniqueFieldIdentifier = C_sharp_JT_Reader.DataTypes.getGuid(this._guidBytes);
                    this._richTextBox.Add("Object Type ID = {" + _uniqueFieldIdentifier.ToString() + "}");
                    this._filePosCount += (16);
                    var _fieldType = this._data[this._filePosCount];
                    this._richTextBox.Add("Object Base Type = " + _fieldType.ToString());
                    this._filePosCount += 1;
                    this._richTextBox.Add("---------------------------------- ????????? -------------------------------------");
                    if (_fieldType > 0 && _fieldType < 5) {
                    }
                }
            }
        }
    }
    C_sharp_JT_Reader.Tri_Strip_Set_Shape_LOD_Element = Tri_Strip_Set_Shape_LOD_Element;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=Tri_Strip_Set_Shape_LOD_Element.js.map