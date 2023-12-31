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
    public class GroupJTNode : BaseJTNode
    {
        //float _fileVersion = 0;
        //RichTextBox _richTextBox;
        List<string> m_textBox = new List<string>();

        public GroupJTNode()
        {
        }

        public GroupJTNode(float fileVersion, RichTextBox richTextBox)
        {
            _fileVersion = fileVersion;
            _richTextBox = richTextBox;
        }

        public int TraverseGroupNode(RichTextBox richTextBox, int filePosCount)
        {
            _richTextBox = richTextBox;
            _filePosCount = filePosCount;

            // Traverse the Base Node Element
            _filePosCount = TraverseBaseNodeData();

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _childCount = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _childCount.ToString());
            _filePosCount += sizeof(Int32);

            // Todo While loop 
            Int32 []_childNodeObjectID = new Int32[_childCount];

            for (int i = 0; i < _childCount; i++)
            {
                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                _childNodeObjectID[i] = DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nChild Node Object ID = " + _childNodeObjectID[i].ToString());
                _filePosCount += sizeof(Int32);
            }

            return _filePosCount;
        }
    }
}
