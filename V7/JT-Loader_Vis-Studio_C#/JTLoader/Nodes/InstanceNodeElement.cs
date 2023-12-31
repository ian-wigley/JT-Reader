using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.Nodes
{
    public class InstanceNodeElement : C_sharp_JT_Reader.GroupJTNode
    {
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
            _filePosCount = TraverseBaseNodeData();

            Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
            Int32 _childNodeObjectID = DataTypes.getInt32(fileBytes);
            this.m_textBox.Add("\nChild Count = " + _childNodeObjectID.ToString());
            _filePosCount += sizeof(Int32);
            return this._filePosCount;
        }
    }
}
