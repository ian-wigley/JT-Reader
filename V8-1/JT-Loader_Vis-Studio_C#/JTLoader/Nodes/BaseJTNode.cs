/////////////////////////////////////////////////////////////////////
//
// This class contains the Base Node Data used by the JT File
//
// Refer to ????????   7.2.6 Meta Data Segment page 162 - on (Ver 9.5 rev D)
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
    public class BaseJTNode
    {
        protected byte[] _uncompressed;
        protected float _fileVersion = 0;
        protected RichTextBox _richTextBox;
        protected int _filePosCount = 0;
        protected byte[] fileBytes = new byte[4];
        protected UInt32 _nodeFlags;
        protected Int32 _attributeCount;
        protected Int32[] _attributeObjectID;
        protected Int32 _objectID;
        protected Int16 _versionNumber;

        protected List<string> m_textBox = new List<string>();


        protected BaseJTNode()
        {

        }

        protected BaseJTNode(string name, string type)
        {

        }

        protected int TraverseBaseNodeData()
        {
            if (_fileVersion >= 9.5)
            {
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                _versionNumber = DataTypes.getInt16(fileBytes);
                this.m_textBox.Add("\nVersion number = " + _versionNumber.ToString());
                _filePosCount += sizeof(Int16);
            }
            else
            {
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                _objectID = DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nObject ID = " + _objectID.ToString());
                _filePosCount += sizeof(Int32);
            }

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            _nodeFlags = DataTypes.getUInt32(fileBytes);
            byte a = fileBytes[0];
            byte b = fileBytes[2];
            byte c = (byte)(b|a);//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            this.m_textBox.Add("\nNode Flags = " + _nodeFlags.ToString());
            _filePosCount += sizeof(UInt32);

            if (_nodeFlags == 0)
            {
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                _attributeCount = DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nAttribute Count = " + _attributeCount.ToString());
                _filePosCount += sizeof(Int32);

                _attributeObjectID = new Int32[_attributeCount];
                for (int i = 0; i < _attributeCount; i++)
                {
                    Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                    _attributeObjectID[i] = DataTypes.getInt32(fileBytes);
                    this.m_textBox.Add("\nAttribute Object ID = " + _attributeObjectID[i].ToString());
                    _filePosCount += sizeof(Int32);
                }
            }
            else
            {
                _filePosCount += sizeof(Int32) + sizeof(Int32);
            }
            return _filePosCount;
        }

    }
 }
