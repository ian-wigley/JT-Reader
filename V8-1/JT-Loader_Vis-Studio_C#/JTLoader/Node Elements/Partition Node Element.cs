/////////////////////////////////////////////////////////////////////
//
// This class contains all the Partition Node Element data used by the JT File
//
// Refer to ? 7.2.6 Meta Data Segment page 162 - on (Ver 9.5 rev D)
//
/////////////////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows.Forms;

namespace C_sharp_JT_Reader
{
    class Partition_Node_Element : GroupJTNode
    {
        byte[] _MbString;
        Int32 _count;
        int _elementLength;
        List<string> m_textBox = new List<string>();

        System.Text.Encoding encoding = System.Text.Encoding.Unicode;

        public Partition_Node_Element()
        {
        }

        public Partition_Node_Element(float fileVersion, List<string> textBox, int fileCount, byte[] uncompressed, int elementLength)
        {
            _fileVersion = fileVersion;
            m_textBox = textBox;
            _filePosCount = fileCount;
            _uncompressed = uncompressed;
            _elementLength = elementLength;

            this.m_textBox.Add("\n\n---------------------------- Partition Node Data --------------------------------");
        }

        public int TraversePartitionNode(int filePosCount)
        {
            _filePosCount = filePosCount;

            _filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);

            //*** Temp Fudge **//
            if (_fileVersion >= 9.5)
            {
                _filePosCount -= 4;
            }
            else
            {
               // _filePosCount -= 4;
            }

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _partitionFlags = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nPartition Flags = " + _partitionFlags.ToString());
            _filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            _count = DataTypes.getInt32(fileBytes);
            _filePosCount += sizeof(Int32);

            _MbString = new byte[_count * 2];
            for (int i = 0; i < _MbString.Length; i++)
            {
                _MbString[i] = _uncompressed[_filePosCount];
                _filePosCount++;
            }
            string _fileName = encoding.GetString(_MbString);

            this.m_textBox.Add("\nFile Name = " + _fileName);

            byte[] bBoxBytes = new byte[24];
            // 24 bytes required///////////////////////////////////////////////////////////////////////////////////////////
            Buffer.BlockCopy(_uncompressed, _filePosCount, bBoxBytes, 0, 24);
            DataTypes.BBoxF32 _transformedBBox = DataTypes.getBBoxF32(bBoxBytes);
            this.m_textBox.Add("\nTransformed Bounding Box Min Corner x = " + _transformedBBox.minCorner.x.ToString());
            this.m_textBox.Add("Transformed Bounding Box Min Corner y = " + _transformedBBox.minCorner.y.ToString());
            this.m_textBox.Add("Transformed Bounding Box Min Corner z = " + _transformedBBox.minCorner.z.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner x = " + _transformedBBox.maxCorner.x.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner y = " + _transformedBBox.maxCorner.y.ToString());
            this.m_textBox.Add("Transformed Bounding Box Max Corner z = " + _transformedBBox.maxCorner.z.ToString());
            _filePosCount += (24);

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            float _area = DataTypes.getFloat32(fileBytes);
            this.m_textBox.Add("Area = " + _area.ToString());
            _filePosCount += sizeof(Int32);

            // Vertex Count Range
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _minCount = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Count = " + _minCount.ToString());
            _filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _maxCount = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Count = " + _maxCount.ToString());
            _filePosCount += sizeof(Int32);

            // Node Count Range
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _minNodeCount = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Node Count = " + _minNodeCount.ToString());
            _filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _maxNodeCount = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Node Count = " + _maxNodeCount.ToString());
            _filePosCount += sizeof(Int32);

            // Polygon Count Range
            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _minPolyCount = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Min Polygon Count = " + _minPolyCount.ToString());
            _filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _maxPolyCount = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("Max Polygon Count = " + _maxPolyCount.ToString());
            _filePosCount += sizeof(Int32);

            if (_partitionFlags != 0)
            {
                //byte[] bBoxBytes = new byte[24];
                // 24 bytes required///////////////////////////////////////////////////////////////////////////////////////////
                Buffer.BlockCopy(_uncompressed, _filePosCount, bBoxBytes, 0, 24);
                DataTypes.BBoxF32 _unTransformedBBox = DataTypes.getBBoxF32(bBoxBytes);
                this.m_textBox.Add("UnTransformed Bounding Box Min Corner x = " + _unTransformedBBox.minCorner.x.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Min Corner y = " + _unTransformedBBox.minCorner.y.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Min Corner z = " + _unTransformedBBox.minCorner.z.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Max Corner x = " + _unTransformedBBox.maxCorner.x.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Max Corner y = " + _unTransformedBBox.maxCorner.y.ToString());
                this.m_textBox.Add("UnTransformed Bounding Box Max Corner z = " + _unTransformedBBox.maxCorner.z.ToString());
                _filePosCount += (24);
            }

            this.m_textBox.Add("\n");

            return this._filePosCount;

        }






        public int GetFilePosition()
        {
            return this._filePosCount;
        }

    }
}
