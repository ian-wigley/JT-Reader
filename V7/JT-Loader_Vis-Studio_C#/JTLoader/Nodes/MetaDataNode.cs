/////////////////////////////////////////////////////////////////////
//
// This class contains all the Meta Data used by the JT File
//
// Refer to 7.2.6 Meta Data Segment page 162 - on (Ver 9.5 rev D)
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
    public class MetaDataNode : C_sharp_JT_Reader.GroupJTNode
    {
        protected System.Text.Encoding encoding = System.Text.Encoding.Unicode;
        protected Int32 elementLength;
        string compare;

        PropertyProxyMetaData _propertyProxyNode;
        List<string> m_textBox = new List<string>();

        public MetaDataNode()
        {
        }

        public MetaDataNode(float fileVersion, List<string> richTextBox)
        {
            _fileVersion = fileVersion;
            m_textBox = richTextBox;
        }

        public int populateData(byte[] uncompressed, int filePosCount)
        {
            this.m_textBox.Add("\n\n---------------------------------- Meta Data ----------------------------------");

            _uncompressed = uncompressed;
            _filePosCount = filePosCount;


            // Traverse the Group Node Data
            _filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);

            //_filePosCount -= 8;// 6;//9


            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            _versionNumber = DataTypes.getInt16(fileBytes);
            this.m_textBox.Add("\nVersion number = " + _versionNumber.ToString());
            _filePosCount += sizeof(Int16);

            return this._filePosCount;
        }
    }
}
