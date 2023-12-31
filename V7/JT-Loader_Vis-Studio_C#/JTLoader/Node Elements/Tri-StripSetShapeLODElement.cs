/////////////////////////////////////////////////////////////////////
//
// This class contains the LOD Shape Node used by the JT File
//
// Refer to 7.2.2.1.3 Tri-Strip Set Shape LOD Element page 124 - on (Ver 9.5 rev D)
//
/////////////////////////////////////////////////////////////////////
// Figure 174: Vertex Based Shape Compressed Rep Data data collection

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;
using zlib;
using C_sharp_JT_Reader.Codecs;
using C_sharp_JT_Reader.DataType;

namespace C_sharp_JT_Reader
{
    /* 7.2.2.1.2 Tri-Strip Set Shape LOD Element (Ver 8.1 page 117)
       Object Type ID: 0x10dd10ab, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97
       A Tri-Strip Set Shape LOD Element contains the geometric shape definition data (e.g. vertices, polygons,
       normals, etc.) for a single LOD of a collection of independent and unconnected triangle strips. Each strip
       constitutes one primitive of the set and the ordering of the vertices (identified in Vertex Based Shape
       Compressed Rep Data as making up a single tri-strip primitive) in forming triangles, is the same as
       OpenGL’s triangle strip definition [4].
      
       A Tri-Strip Set Shape LOD Element is typically referenced by a Tri-Strip Set Shape Node Element using
       Late Loaded Property Atom Elements (see 7.2.1.1.1.10.3 Tri-Strip Set Shape Node Element and 7.2.1.2.7
       Late Loaded Property Atom Element respectively).
    
          Element Header
                |
        Vertex Shape LOD Data
                |
        I16 : Version Number
                |
        Vertex Based Shape
        Compressed Rep Data 
     
     */

    class Tri_Strip_Set_Shape_LOD_Element
    {
        #region Fields

        List<string> _richTextBox;
        int _filePosCount;
        int _versionNumber;
        float _fileVersion;
        byte[] _data;
        byte[] fileBytes;
        byte[] _guidBytes;

        List<int> m_faceIndices;
        List<Int32> _primitiveListIndices;
        Int32[] _residualValues;

        double[] _texture;
        double[] _rgb;
        float[] _normal;
        float[] _vertex;

        string[] _textBox;


        bool PolylineShape = false;
        byte _bitsPerVertex = 0;

        byte[] _geometricalData;
        int _geometryFilePosCount = 0;

        #endregion

        public Tri_Strip_Set_Shape_LOD_Element()
        {
        }

        public Tri_Strip_Set_Shape_LOD_Element(float fileVersion, List<string> richTextBox, byte[] data, int filePosCount)
        {
            _richTextBox = richTextBox;
            _fileVersion = fileVersion;
            _data = data;
            _filePosCount = filePosCount;
            _guidBytes = new byte[16];

            // 7.1.3.2.1 Logical Element Header
            VertexShapeLodDataCollection();
        }


        // Method to read the retrieve the Geometry contained within the file Figure 85 page 111
        private void VertexShapeLodDataCollection()
        {
            this._richTextBox.Add("------------------------ Tri Strip Set Shape LOD Element ----------------------");

            // Vertex Shape LOD Element - Note to move to own class !!
            fileBytes = new byte[2];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 2);
            _versionNumber = DataTypes.getInt16(fileBytes);
            this._richTextBox.Add("Version number = " + _versionNumber.ToString());
            _filePosCount += sizeof(Int16);

            // Version number “0x0001” is currently the only valid value. 
            if (_versionNumber == 1)
            {
                if (_fileVersion < 9.5)
                {
                    fileBytes = new byte[4];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    Int32 _bindingAttributes = DataTypes.getInt32(fileBytes);
                    this._richTextBox.Add("Binding Attributes = " + _bindingAttributes.ToString());
                    _filePosCount += sizeof(Int32);

                    QuantizationParameters();
                }
                else
                {
                    fileBytes = new byte[8];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 8);
                    UInt64 _vertexBindings = DataTypes.getUInt64(fileBytes);
                    this._richTextBox.Add("Vertex Bindings = " + _vertexBindings.ToString());
                    _filePosCount += sizeof(UInt64);

                    TopoMeshLodDatacollection();
                }

                this._richTextBox.Add("File Position = " + _filePosCount.ToString() + "");

                //*** Fudge ***//
                _filePosCount += 2;

                // Vertex Based Shape Compressed Rep data Collection (Ver 8.1 Fig 174 page 229) (Ver 9.5 Fig 175 page 235)
                fileBytes = new byte[2];
                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 2);
                _versionNumber = DataTypes.getInt16(fileBytes);
                this._richTextBox.Add("Version number = " + _versionNumber.ToString());
                _filePosCount += sizeof(Int16);

                byte _normalBinding = _data[_filePosCount];
                this._richTextBox.Add("Normal Binding = " + _normalBinding.ToString());
                _filePosCount += sizeof(byte);

                byte _textureCoordBinding = _data[_filePosCount];
                this._richTextBox.Add("Texture Coord Binding = " + _textureCoordBinding.ToString());
                _filePosCount += sizeof(byte);

                byte _colorBinding = _data[_filePosCount];
                this._richTextBox.Add("Colour Binding = " + _colorBinding.ToString());
                _filePosCount += sizeof(byte);


                QuantizationParameters();

                // Pass the File position counter to the CDP2
                Int32CDP.SetUpFilePosition(_filePosCount);
                Int32CDP.SetUpData(_data);
                //               _primitiveListIndices = Int32CDP.Int32CDPone(CodecDriver.PredictorType.PredStride1);
                _residualValues = Int32CDP.Int32CDPone(CodecDriver.PredictorType.PredStride1);


                _primitiveListIndices = new List<int>();


                CodecDriver.unpackResiduals(_residualValues, _primitiveListIndices, CodecDriver.PredictorType.PredStride1);


                this._richTextBox.Add("\n");
                this._richTextBox.Add("------ Primitive List Indices ------");

                foreach (int integer in _primitiveListIndices)
                {
                    this._richTextBox.Add(integer.ToString());
                }

                this._richTextBox.Add("\n");

                // Update the file position counter 
                _filePosCount = Int32CDP.GetFilePos();


                if (_bitsPerVertex == 0)
                {
                    // Lossless Compressed Raw Vetex Data
                    readLosslessCompressedRawVertexData(_normalBinding, _textureCoordBinding, _colorBinding);
                }
                else
                {
                    // Lossy Quantized Raw Vertex Data
                    readLossyQuantizedRawVertexData(_normalBinding, _textureCoordBinding, _colorBinding);
                }
            }
        }


        /*
         7.2.1.1.1.10.2.1.1 Quantization Parameters
        Quantization Parameters specifies for each shape data type grouping (i.e. Vertex, Normal, Texture
        Coordinates, Color) the number of quantization bits used for given qualitative compression level. Although
        these Quantization Parameters values are saved in the associated/referenced Shape LOD Element, they are
        also saved here so that a JT File loader/reader does not have to load the Shape LOD Element in order to
        determine the Shape quantization level. See 7.2.2.1Shape LOD Element for complete description of Shape
        LOD Elements.
        */
        private void QuantizationParameters()
        {
            _bitsPerVertex = _data[_filePosCount];
            this._richTextBox.Add("Bits Per Vertex = " + _bitsPerVertex.ToString());
            _filePosCount += sizeof(byte);

            byte _normalBitsFactor = _data[_filePosCount];
            this._richTextBox.Add("Normal Bits Factor = " + _normalBitsFactor.ToString());
            _filePosCount += sizeof(byte);

            byte _bitsPerTexCoord = _data[_filePosCount];
            this._richTextBox.Add("Bits Per Texture Coord = " + _bitsPerTexCoord.ToString());
            _filePosCount += sizeof(byte);

            byte _bitsPerColor = _data[_filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _bitsPerColor.ToString());
            _filePosCount += sizeof(byte);
        }


        private void readLossyQuantizedRawVertexData(int normalBinding, int textureCoordBinding, int colorBinding)
        {
            // Quantized Vertex Coord Array
            //              |
            // Point Quantizer Data

            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            float _min = DataTypes.getFloat32(fileBytes);
            this._richTextBox.Add("Min Value = " + _min.ToString());
            //float _min = 0;
            _filePosCount += sizeof(float);


            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            float _max = DataTypes.getFloat32(fileBytes);
            this._richTextBox.Add("Max Value = " + _max.ToString());

            //float _max = 0;
            _filePosCount += sizeof(float);


            byte _numberOfBits = _data[_filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _numberOfBits.ToString());
            _filePosCount += sizeof(byte);

            // Point Quantizer Data
            UniformQuantizerData XUniformQuantizerData = new UniformQuantizerData(_min, _max, _numberOfBits);


            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            _min = DataTypes.getFloat32(fileBytes);
            this._richTextBox.Add("Min Value = " + _min.ToString());
            //float _min = 0;
            _filePosCount += sizeof(float);


            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            _max = DataTypes.getFloat32(fileBytes);
            this._richTextBox.Add("Max Value = " + _max.ToString());

            //float _max = 0;
            _filePosCount += sizeof(float);


            _numberOfBits = _data[_filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _numberOfBits.ToString());
            _filePosCount += sizeof(byte);

            // Point Quantizer Data
            UniformQuantizerData YUniformQuantizerData = new UniformQuantizerData(_min, _max, _numberOfBits);


            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            _min = DataTypes.getFloat32(fileBytes);
            this._richTextBox.Add("Min Value = " + _min.ToString());
            //float _min = 0;
            _filePosCount += sizeof(float);


            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            _max = DataTypes.getFloat32(fileBytes);
            this._richTextBox.Add("Max Value = " + _max.ToString());

            //float _max = 0;
            _filePosCount += sizeof(float);


            _numberOfBits = _data[_filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _numberOfBits.ToString());
            _filePosCount += sizeof(byte);

            // Point Quantizer Data
            UniformQuantizerData ZUniformQuantizerData = new UniformQuantizerData(_min, _max, _numberOfBits);







            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            Int32 _vertexCount = DataTypes.getInt32(fileBytes);
            this._richTextBox.Add("Vertex Count = " + _vertexCount.ToString());
            _filePosCount += sizeof(Int32);

            // Update the read position
            Int32CDP.SetUpFilePosition(_filePosCount);

            int[] primalValues = Int32CDP.Int32CDPRead();

            UniformQuantizerCodec m_quantizer = new UniformQuantizerCodec(_richTextBox);

            float[] valuesX = m_quantizer.GetValues(primalValues, XUniformQuantizerData);

            primalValues = Int32CDP.Int32CDPRead();

            float[] valuesY = m_quantizer.GetValues(primalValues, YUniformQuantizerData);
            
            primalValues = Int32CDP.Int32CDPRead();

            float[] valuesZ = m_quantizer.GetValues(primalValues, ZUniformQuantizerData);


            _vertex = new float[_vertexCount * 3];

            // Loop through the vertex values
            for (int i = 0; i < _vertexCount; i++)
            {
                int j = i * 3;
                //if (textureCoordBinding == 1)
                //{
                //    _texture[j + 0] = readCompressedFloat();
                //    _texture[j + 1] = readCompressedFloat();
                //}
                //if (colorBinding == 1)
                //{
                //    _rgb[j + 0] = readCompressedFloat();
                //    _rgb[j + 1] = readCompressedFloat();
                //    _rgb[j + 2] = readCompressedFloat();
                //}
                //if (normalBinding == 1)
                //{
                //    _normal[j + 0] = readCompressedFloat();
                //    _normal[j + 1] = readCompressedFloat();
                //    _normal[j + 2] = readCompressedFloat();
                //}
                _vertex[j + 0] = valuesX[i];
                this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + _vertex[j + 0].ToString());
                _vertex[j + 1] = valuesY[i];
                this._richTextBox.Add("Vertex Value " + (j + 1).ToString() + " = " + _vertex[j + 1].ToString());
                _vertex[j + 2] = valuesZ[i];
                this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + _vertex[j + 2].ToString());
            }


            ///
            /// Indices
            ///

 ////////////           if (normalBinding)///////////////////////


            // Update the read position
            _filePosCount = Int32CDP.GetFilePos();

            _numberOfBits = _data[_filePosCount];
            this._richTextBox.Add("Bits Per Colour = " + _numberOfBits.ToString());
            _filePosCount += sizeof(byte);


            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            Int32 _normalCount = DataTypes.getInt32(fileBytes);
            this._richTextBox.Add("Normal Count = " + _normalCount.ToString());
            _filePosCount += sizeof(Int32);


            // Update the read position
            Int32CDP.SetUpFilePosition(_filePosCount);

            int[] sextantCodes = Int32CDP.Int32CDPRead();
            int[] octantCodes = Int32CDP.Int32CDPRead();
            int[] thetaCodes = Int32CDP.Int32CDPRead();
            int[] psiCodes = Int32CDP.Int32CDPRead();

            int[] test1 = Predictors.unpackResidualsOverwrite(sextantCodes, Predictors.PredictorType.Lag1);
            int[] test2 = Predictors.unpackResidualsOverwrite(octantCodes, Predictors.PredictorType.Lag1);
            int[] test3 = Predictors.unpackResidualsOverwrite(thetaCodes, Predictors.PredictorType.Lag1);
            int[] test4 = Predictors.unpackResidualsOverwrite(psiCodes, Predictors.PredictorType.Lag1);



            Vec3D[] normals;

            normals = new Vec3D[psiCodes.Length];
            DeeringNormalCodec deeringCodec = new DeeringNormalCodec(_numberOfBits);

            for (int i = 0; i < psiCodes.Length; i++)
            {
                normals[i] = deeringCodec.convertCodeToVec(sextantCodes[i], octantCodes[i], thetaCodes[i], psiCodes[i]);
            }
            int end = 0;
        }




        private void readLosslessCompressedRawVertexData(int normalBinding, int textureCoordBinding, int colorBinding)
        {

            // Calculate the Stride value used for reading the correct parts of the data within the Vertex Data Array
            int _stride = 3;
            if (textureCoordBinding == 1)
            {
                _stride += 2;
            }
            if (colorBinding == 1)
            {
                _stride += 3;
            }
            if (normalBinding == 1)
            {
                _stride += 3;
            }
            // Multiply the resulting stride by 4, because the bytes are Float32 values made up from 4 bytes @ a time

            _stride *= 4;


            fileBytes = new byte[4];

            //int uncompressedDataSize = getReader().readI32();
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            Int32 _uncompressedDataSize = DataTypes.getInt32(fileBytes);
            this._richTextBox.Add("Uncompressed Data Size = " + _uncompressedDataSize.ToString());
            _filePosCount += sizeof(Int32);

            //int compressedDataSize = getReader().readI32();
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            Int32 _compressedDataSize = DataTypes.getInt32(fileBytes);
            this._richTextBox.Add("Compressed Data Size = " + _compressedDataSize.ToString());
            _filePosCount += sizeof(Int32);

            int len;
            if (_compressedDataSize > 0 && _uncompressedDataSize > 0)
            {

                // Copy the segment data to an array
                byte[] segment = new byte[_compressedDataSize];

                for (int j = 0; j < _compressedDataSize; j++)
                {
                    segment[j] = _data[_filePosCount];
                    _filePosCount += sizeof(byte);
                }

                _geometricalData = new byte[10000];

                // Pass the segment to the ZLib decompression method
                decompressVertexData(segment, out _geometricalData);
                len = _uncompressedDataSize;

                int numFaces = _primitiveListIndices.Count - 1;//.Length - 1;
                int numVertices = _primitiveListIndices[numFaces];

                //{[u,v] [r,g,b] [nx,ny,nz] x,y,z}, {[u,v] [r,g,b] [nx,ny,nz] x,y,z}, …, for all vertices.
                _texture = new double[_uncompressedDataSize];
                _rgb = new double[_uncompressedDataSize];
                _normal = new float[_uncompressedDataSize];
                _vertex = new float[_uncompressedDataSize];


                _textBox = new string[_uncompressedDataSize];


                // Loop through the uncompressed vertex data collection
                for (int i = 0; i < _uncompressedDataSize / _stride; i++)
                {
                    int j = i * 3;
                    if (textureCoordBinding == 1)
                    {
                        _texture[j + 0] = readCompressedFloat();
                        _texture[j + 1] = readCompressedFloat();
                    }
                    if (colorBinding == 1)
                    {
                        _rgb[j + 0] = readCompressedFloat();
                        _rgb[j + 1] = readCompressedFloat();
                        _rgb[j + 2] = readCompressedFloat();
                    }
                    if (normalBinding == 1)
                    {
                        _normal[j + 0] = readCompressedFloat();
                        _normal[j + 1] = readCompressedFloat();
                        _normal[j + 2] = readCompressedFloat();
                    }
                    _vertex[j + 0] = readCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + _vertex[j + 0].ToString());
                    //_textBox[i] = "Vertex Value " + (j + 0).ToString() + " = " + _vertex[j + 0].ToString();
                    _vertex[j + 1] = readCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 1).ToString() + " = " + _vertex[j + 1].ToString());
                    _vertex[j + 2] = readCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + _vertex[j + 2].ToString());
                }
            }
            else
            {
                //              len = Math.Abs(_compressedDataSize);
                len = _data.Length - _filePosCount;
                _texture = new double[len];
                _rgb = new double[len];
                _normal = new float[len];
                _vertex = new float[len];

                // Loop through the uncompressed vertex data collection
                for (int i = 0; i < len / _stride; i++)
                {
                    int j = i * 3;
                    if (textureCoordBinding == 1)
                    {
                        _texture[j + 0] = readUnCompressedFloat();
                        _texture[j + 1] = readUnCompressedFloat();
                    }
                    if (colorBinding == 1)
                    {
                        _rgb[j + 0] = readUnCompressedFloat();
                        _rgb[j + 1] = readUnCompressedFloat();
                        _rgb[j + 2] = readUnCompressedFloat();
                    }
                    if (normalBinding == 1)
                    {
                        _normal[j + 0] = readUnCompressedFloat();
                        _normal[j + 1] = readUnCompressedFloat();
                        _normal[j + 2] = readUnCompressedFloat();
                    }
                    _vertex[j + 0] = readUnCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + _vertex[j + 0].ToString());
                    _vertex[j + 1] = readUnCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 1).ToString() + " = " + _vertex[j + 1].ToString());
                    _vertex[j + 2] = readUnCompressedFloat();
                    this._richTextBox.Add("Vertex Value " + (j + 0).ToString() + " = " + _vertex[j + 2].ToString());
                }
            }





            int nbdVertices = 0;
            int nbdfaces = 0;

            for (int i = 0; i < _primitiveListIndices.Count() - 1; i++)
            {
                int start = _primitiveListIndices[i];
                int end = _primitiveListIndices[i + 1];
                nbdVertices += end - start;
                nbdfaces += end - start - 2;
            }

            //m_faceIndices.resize(nbdfaces*3);
            m_faceIndices = new List<int>();// (nbdfaces * 3);

            int k = 0;

            for (int i = 0; i < _primitiveListIndices.Count() - 1; i++)
            {
                int start = _primitiveListIndices[i];
                int end = _primitiveListIndices[i + 1];
                for (int f = start; f < end - 2; f++)
                {
                    if (f % 2 == 0)
                    {
                        //m_faceIndices[k + 0] = f;
                        //m_faceIndices[k + 1] = f + 1;
                        //m_faceIndices[k + 2] = f + 2;
                        m_faceIndices.Add(f);
                        m_faceIndices.Add(f + 1);
                        m_faceIndices.Add(f + 2);
                    }
                    else
                    {
                        //m_faceIndices[k + 0] = f;
                        //m_faceIndices[k + 2] = f + 1;
                        //m_faceIndices[k + 1] = f + 2;

                        m_faceIndices.Add(f);
                        m_faceIndices.Add(f + 2);
                        m_faceIndices.Add(f + 1);
                    }
                    k += 3;
                }
            }



            this._richTextBox.Add("\n");
            this._richTextBox.Add("------ Indices ------");

            foreach (int integer in m_faceIndices)
            {
                this._richTextBox.Add(integer.ToString());
            }

            this._richTextBox.Add("\n");


        }


        private float readUnCompressedFloat()
        {
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            _filePosCount += sizeof(float);
            return DataTypes.getFloat32(fileBytes);
        }

        private float readCompressedFloat()
        {
            Buffer.BlockCopy(_geometricalData, _geometryFilePosCount, fileBytes, 0, 4);
            _geometryFilePosCount += sizeof(float);
            return DataTypes.getFloat32(fileBytes);
        }


        // Method to unzip the byte array using ZLib compression library
        private void decompressVertexData(byte[] segment, out byte[] outData)
        {
            using (MemoryStream output = new MemoryStream())
            using (Stream outZStream = new zlib.ZOutputStream(output))
            using (Stream input = new MemoryStream(segment))
            {
                CopyStream(input, outZStream);
                //               return output.ToArray();
                outData = output.ToArray();
            }
        }

        public static void CopyStream(System.IO.Stream input, System.IO.Stream output)
        {
            byte[] buffer = new byte[4000];//2000
            int len;
            while ((len = input.Read(buffer, 0, 4000)) > 0)//2000
            {
                output.Write(buffer, 0, len);
            }
            output.Flush();
        }


        #region JT Ver 9.5 decompression TopoMesh

        /// JT Ver 9.5 decompression
        // Figure 86
        private void TopoMeshLodDatacollection()
        {
            fileBytes = new byte[2];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 2);
            _versionNumber = DataTypes.getInt16(fileBytes);
            this._richTextBox.Add("Version number = " + _versionNumber.ToString());
            _filePosCount += sizeof(Int16);

            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            Int32 _vertexRecordsObjectID = DataTypes.getInt32(fileBytes);
            this._richTextBox.Add("Vertex Records Object ID = " + _vertexRecordsObjectID.ToString());
            _filePosCount += sizeof(Int32);

            TopoMeshTopologicallyCompressedLodDataCollection();
        }

        // Figure 89 page 115
        private void TopoMeshTopologicallyCompressedLodDataCollection()
        {

            fileBytes = new byte[2];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 2);
            _versionNumber = DataTypes.getInt16(fileBytes);
            this._richTextBox.Add("Version number = " + _versionNumber.ToString());
            _filePosCount += sizeof(Int16);


            DataTypes.VecI32[] faceDegrees = new DataTypes.VecI32[8];
            DataTypes.VecI32 vertexValences = new DataTypes.VecI32();
            DataTypes.VecI32 vertexGroups = new DataTypes.VecI32();
            DataTypes.VecI32 vertexFlags = new DataTypes.VecI32();
            DataTypes.VecI32[] faceAttributeMasks = new DataTypes.VecI32[8];
            DataTypes.VecI32 faceAttributeMask830MSB = new DataTypes.VecI32();
            DataTypes.VecI32 faceAttributeMask4MSB = new DataTypes.VecI32();
            DataTypes.VecU32 highDegreeFaceAttributeMasks = new DataTypes.VecU32();
            DataTypes.VecI32 splitFaceSyms = new DataTypes.VecI32();
            DataTypes.VecI32 splitFacePositions = new DataTypes.VecI32();
            //UInt32 compositeHash;

            // Pass the File position counter to the CDP2
        //    Int32CDP2.SetUpFilePosition(_filePosCount);

            // Populate the Face Degrees
            //for (Int32 a = 0; a < 8; a++)
            //{
            //    //Int32CDP2.Int32CDPtwo();
            //    //faceDegrees[a].count = Int32CDP2.GetValueCount();
            //    //faceDegrees[a].data = Int32CDP2.GetCodeTextWord();
            //}

            //// Populate the Vertex Valences
            //Int32CDP2.Int32CDPtwo();
            //vertexValences.count = Int32CDP2.GetValueCount();
            ////vertexValences.data = Int32CDP2.GetCodeTextWord();

            //// Populate the Vertex Groups
            //Int32CDP2.Int32CDPtwo();
            //vertexGroups.count = Int32CDP2.GetValueCount();
            ////vertexGroups.data = Int32CDP2.GetCodeTextWord();

            //// Populate the Vertex Flags
            //Int32CDP2.Int32CDPtwo();
            //vertexFlags.count = Int32CDP2.GetValueCount();
            ////vertexFlags.data = Int32CDP2.GetCodeTextWord();

            //// Populate the Face Attribute Masks
            //for (Int32 a = 0; a < 8; a++)
            //{
            //    Int32CDP2.Int32CDPtwo();
            //    faceAttributeMasks[a].count = Int32CDP2.GetValueCount();
            //    //faceAttributeMasks[a].data = Int32CDP2.GetCodeTextWord();
            //}

            //// Populate the Face Attribute Mask 8 30 MSB
            //Int32CDP2.Int32CDPtwo();
            //faceAttributeMask830MSB.count = Int32CDP2.GetValueCount();
            ////faceAttributeMask830MSB.data = Int32CDP2.GetCodeTextWord();

            //// Populate the Face Attribute Mask 4 MSB
            //Int32CDP2.Int32CDPtwo();
            //faceAttributeMask4MSB.count = Int32CDP2.GetValueCount();
            ////faceAttributeMask4MSB.data = Int32CDP2.GetCodeTextWord();

            //// Populate the High-Degree Face Attribute Masks
            //highDegreeFaceAttributeMasks.count = (uint)Int32CDP2.GetValueCount();
            ////highDegreeFaceAttributeMasks.count = (uint)Int32CDP2.GetValueCount();

            //// Populate the Split Face Syms
            //Int32CDP2.Int32CDPtwo();
            //splitFaceSyms.count = Int32CDP2.GetValueCount();
            ////splitFaceSyms.data = Int32CDP2.GetCodeTextWord();

            //// Populate the Split Face Positions splitFacePositions
            //Int32CDP2.Int32CDPtwo();
            //splitFacePositions.count = Int32CDP2.GetValueCount();
            ////splitFacePositions.data = Int32CDP2.GetCodeTextWord();

            ////            UInt32 compositeHash;

            //// Retrieve the File position counter to the CDP2
            //_filePosCount = Int32CDP2.GetFilePos();


            ////          Topologically Compressed Vertex Records         /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //fileBytes = new byte[2];
            //Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 2);
            //_versionNumber = DataTypes.getInt16(fileBytes);
            //this._richTextBox.Add("Version number = " + _versionNumber.ToString());
            //_filePosCount += sizeof(Int16);

            //TopoMesh Compressed Rep Data v1 page 119

            if (PolylineShape)
            {
                fileBytes = new byte[4];
                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                Int32 _numFaceGroupListIndices = DataTypes.getInt32(fileBytes);
                this._richTextBox.Add("Number of Auxiliary Fields = " + _numFaceGroupListIndices.ToString());
                _filePosCount += sizeof(Int32);
            }
            else
            {
                fileBytes = new byte[4];
                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                Int32 _numPrimitiveListIndices = DataTypes.getInt32(fileBytes);
                this._richTextBox.Add("Number of Primitive List Indices = " + _numPrimitiveListIndices.ToString());
                _filePosCount += sizeof(Int32);

                fileBytes = new byte[4];
                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                Int32 _numVertexListIndices = DataTypes.getInt32(fileBytes);
                this._richTextBox.Add("Number of Vertex List Indices = " + _numVertexListIndices.ToString());
                _filePosCount += sizeof(Int32);

                if (PolylineShape)
                {
                    //// VecI32{Int32CDP2} : Face Group List Indices
                    //DataTypes.VecI32 _faceGroupListIndices = new DataTypes.VecI32();
                    //Int32CDP2.Int32CDPtwo();
                    //_faceGroupListIndices.count = Int32CDP2.GetValueCount();
                    ////_faceGroupListIndices.data = Int32CDP2.GetCodeTextWord();
                }
                else
                {
                    // VecI32{Int32CDP2} : Primitive List Indices
                    //DataTypes.VecI32 _primitiveListIndices = new DataTypes.VecI32();
                    //Int32CDP2.Int32CDPtwo();
                    //_primitiveListIndices.count = Int32CDP2.GetValueCount();
                    ////_primitiveListIndices.data = Int32CDP2.GetCodeTextWord();

                    //// VecI32{Int32CDP2} : Vertex List Indices
                    //DataTypes.VecI32 _vertexListIndices = new DataTypes.VecI32();
                    //Int32CDP2.Int32CDPtwo();
                    //_vertexListIndices.count = Int32CDP2.GetValueCount();
                    ////_vertexListIndices.data = Int32CDP2.GetCodeTextWord();

                    // I32: FGPV List Indices Hash
                    fileBytes = new byte[4];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    Int32 _fgpvListIndicesHash = DataTypes.getInt32(fileBytes);
                    this._richTextBox.Add("Number of Vertex Records = " + _fgpvListIndicesHash.ToString());
                    _filePosCount += sizeof(Int32);

                    // U64: Vertex Bindings
                    fileBytes = new byte[8];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 8);
                    UInt64 _vertexBindings = DataTypes.getUInt64(fileBytes);
                    this._richTextBox.Add("Vertex Bindings = " + _vertexBindings.ToString());
                    _filePosCount += sizeof(UInt64);


                    // Quantization Parameters Figure 31 page 49
                    byte _bitsPerVertex = _data[_filePosCount];
                    this._richTextBox.Add("Bits Per Vertex = " + _bitsPerVertex.ToString());
                    _filePosCount += sizeof(byte);

                    byte _normalBitsFactor = _data[_filePosCount];
                    this._richTextBox.Add("Normal Bits Factor = " + _normalBitsFactor.ToString());
                    _filePosCount += sizeof(byte);

                    byte _bitsPerTextureCoord = _data[_filePosCount];
                    this._richTextBox.Add("Bits Per Texture Coord = " + _bitsPerTextureCoord.ToString());
                    _filePosCount += sizeof(byte);

                    byte _bitsPerColor = _data[_filePosCount];
                    this._richTextBox.Add("Bits Per Color = " + _bitsPerColor.ToString());
                    _filePosCount += sizeof(byte);

                    // I32: Number of Vertex Records
                    fileBytes = new byte[4];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    Int32 _numVertexRecords = DataTypes.getInt32(fileBytes);
                    this._richTextBox.Add("Number of Vertex Records = " + _numVertexRecords.ToString());
                    _filePosCount += sizeof(Int32);

                    // If number records > 0
                    //                    if (_numVertexRecords > 0)
                    {
                        // I32: Number of Unique Vertex Coordinates
                        fileBytes = new byte[4];
                        Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                        Int32 _numUniqueVertexCoords = DataTypes.getInt32(fileBytes);
                        this._richTextBox.Add("Number of Unique Vertex Coords = " + _numUniqueVertexCoords.ToString());
                        _filePosCount += sizeof(Int32);

                        //// VecI32{Int32CDP2} : Unique Vertex Coordinate Length List
                        //DataTypes.VecI32 _UniqueVertexCoordLengthList = new DataTypes.VecI32();
                        //Int32CDP2.Int32CDPtwo();
                        //_UniqueVertexCoordLengthList.count = Int32CDP2.GetValueCount();
                        //_UniqueVertexCoordLengthLists.data = Int32CDP2.GetCodeTextWord();

                        // I32: Unique Vertex List Map Hash
                        fileBytes = new byte[4];
                        Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                        Int32 _uniqueVertexListMapHash = DataTypes.getInt32(fileBytes);
                        this._richTextBox.Add("Unique Vertex List Map Hash = " + _uniqueVertexListMapHash.ToString());
                        _filePosCount += sizeof(Int32);

                        // if Coordinate Bindings
                        // Compressed Vertex Coordinate Array

                        // if Normal Bindings
                        //  Compressed Vertex Normal Array

                        // if Color Bindings
                        // Compressed Vertex Color Array

                        for (int i = 0; i < 8; i++)
                        {
                            // if Tex Coord n Bindings
                            // Compressed Vertex Texture Coordinate Array
                        }
                        // if vertex flag Bindings
                        // Compressed Vertex Flag Array
                    }
                }



                if (_versionNumber >= 2)
                {
                    //TopoMesh Compressed Rep Data v2 page 122

                    //Version number “0x0001” is currently the only valid value.
                    fileBytes = new byte[2];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 2);
                    _versionNumber = DataTypes.getInt16(fileBytes);
                    this._richTextBox.Add("Version number = " + _versionNumber.ToString());
                    _filePosCount += sizeof(Int16);

                    fileBytes = new byte[8];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 8);
                    UInt64 _vertexBindings = DataTypes.getUInt64(fileBytes);
                    this._richTextBox.Add("Vertex Bindings = " + _vertexBindings.ToString());
                    _filePosCount += sizeof(UInt64);

                    fileBytes = new byte[4];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    Int32 _numAuxiliaryFields = DataTypes.getInt32(fileBytes);
                    this._richTextBox.Add("Number of Auxiliary Fields = " + _numAuxiliaryFields.ToString());
                    _filePosCount += sizeof(Int32);

                    Buffer.BlockCopy(_data, _filePosCount, _guidBytes, 0, 16);
                    Guid _uniqueFieldIdentifier = DataTypes.getGuid(_guidBytes);
                    this._richTextBox.Add("Object Type ID = {" + _uniqueFieldIdentifier.ToString() + "}");
                    _filePosCount += (16);

                    byte _fieldType = _data[_filePosCount];
                    this._richTextBox.Add("Object Base Type = " + _fieldType.ToString());
                    _filePosCount += sizeof(byte);
                    this._richTextBox.Add("---------------------------------- ????????? -------------------------------------");

                    if (_fieldType > 0 && _fieldType < 5)
                    {

                    }
                    // etc etc.......
                    // I32 : Auxiliary Data Hash
                }
            }
        }
        #endregion
    }
}
