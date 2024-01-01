using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.Nodes
{
    public class GeometricTransformAttributeElement : C_sharp_JT_Reader.GroupJTNode
    {
        private List<string> m_textBox = new List<string>();
       // private double[] m_transformMatrix;// = new double[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

        public GeometricTransformAttributeElement(float fileVersion, List<string> richTextBox)
        {
            _fileVersion = fileVersion;
            m_textBox = richTextBox;

        }

        public int populateData(byte[] uncompressed, int filePosCount)
        {
            // 7.2.1.1.2.10

            this.m_textBox.Add("\n\n-----------------Geometric Transform Attribute Element Node Data ----------------");

            _uncompressed = uncompressed;
            _filePosCount = filePosCount;


            // Traverse the Group Node Data
            //_filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);
            //_filePosCount = TraverseBaseNodeData();



            //Base Attribute Data 7.2.1.1.2.1.1

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _objectID = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _objectID.ToString());
            _filePosCount += sizeof(Int32);

            //Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            //Int32 _stateFlags = DataTypes.getInt32(fileBytes);
            byte _stateFlags = _uncompressed[_filePosCount];
            this.m_textBox.Add("\nState Flags = " + _stateFlags.ToString());
            _filePosCount += sizeof(byte);

            //byte _normalBinding = _data[_filePosCount];
            //this._richTextBox.Add("Normal Binding = " + _normalBinding.ToString());
            //_filePosCount += sizeof(byte);


            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _fieldInhibitFlags = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _fieldInhibitFlags.ToString());
            _filePosCount += sizeof(Int32);



            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            UInt16 _storedValuesMask = (UInt16)DataTypes.getInt16(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _storedValuesMask.ToString());
            _filePosCount += sizeof(Int16);

            double[] m_transformMatrix = { 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 };

            //_storedValuesMask = (short)33824;

            int c = _storedValuesMask;// 33824;// _storedValuesMask;


            //_storedValuesMask = (short)c;

            for (int i = 0; i < 16; i++)
            {
                //if ((_storedValuesMask & 0x8000) != 0)
                if ((c & 0x8000) != 0)
                {
                    Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                    m_transformMatrix[i] = DataTypes.getFloat32(fileBytes);
                    _filePosCount += sizeof(float);
                }
                c = c << 1;
            }


            return this._filePosCount;

        }

    }
}


/*
        private List<string> m_textBox = new List<string>();

        public InstanceNodeElement(float fileVersion, List<string> richTextBox)
        {
            _fileVersion = fileVersion;
            m_textBox = richTextBox;
        }

        public int populateData(byte[] uncompressed, int filePosCount)
        {
            this.m_textBox.Add("\n\n---------------------------------- Instance Node Data ----------------------------------");

            _uncompressed = uncompressed;
            _filePosCount = filePosCount;


            // Traverse the Group Node Data
            //_filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);
            _filePosCount = TraverseBaseNodeData();

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _childNodeObjectID = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _childNodeObjectID.ToString());
            _filePosCount += sizeof(Int32);


            return this._filePosCount;

        }

*/