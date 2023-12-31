/////////////////////////////////////////////////////////////////////
//
// This class contains all the XT B-Rep used by the JT File
//
// Refer to ???? XT B-Rep Segment page ?? - on (Ver 9.5 rev D)
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
    class XTB_RepNode
    {
        RichTextBox _richTextBox;
        byte[] _uncompressed;
        //Int16 _versionNumber;
        //Int32 _count;
        //byte[] _MbString;
        int filePosCount;
        Int32 elementLength;
        Guid objectTypeID;
        //string compare;

        //UInt32 _nodeFlags;
        //Int32 _attributeCount;
        //Int32[] _attributeObjectID;

        List<string> m_textBox = new List<string>();
        //Partition_Node_Element partitionNode;

        System.Text.Encoding encoding = System.Text.Encoding.Unicode;

        public void setRTB(RichTextBox rTB)
        {
            this._richTextBox = rTB;
        }
        public void populateData(byte[] uncompressed)
        {
            this.m_textBox.Add("\n\n--------------------------- XT B-Rep Node Element -----------------------------");
            this.m_textBox.Add("\n\n---------------------------------- Header -------------------------------------");
            _uncompressed = uncompressed;
            filePosCount = 0;

            byte[] fileBytes = new byte[4];
            byte[] guidBytes = new byte[16];

            Buffer.BlockCopy(_uncompressed, filePosCount, fileBytes, 0, 4);
            elementLength = DataTypes.getInt32(fileBytes);
            string str0 = elementLength.ToString();
            this.m_textBox.Add("\nElement Length = " + str0);

            filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, filePosCount, guidBytes, 0, 16);
            objectTypeID = DataTypes.getGuid(guidBytes);
            string str1 = objectTypeID.ToString();
            this.m_textBox.Add("\nObject Type ID = {" + str1 + "}");

            filePosCount += (16);

            byte objectBaseType = _uncompressed[filePosCount];
            string str2 = objectBaseType.ToString();
            this.m_textBox.Add("\nObject Base Type = " + str2);

            filePosCount += sizeof(byte);

            Buffer.BlockCopy(_uncompressed, filePosCount, fileBytes, 0, 4);
            Int32 objectID = DataTypes.getInt32(fileBytes);
            string str3 = objectID.ToString();
            this.m_textBox.Add("\nobject ID = " + str3);

            filePosCount += sizeof(Int32);
            //////////////////////////////////////////////////////////////// End of Header \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

            Int32 versionNumber;
            Int32 parasolidKernelMajorVersionNumber;
            Int32 parasolidKernelMinorVersionNumber;
            Int32 parasolidKernelBuildNumber;
            Int32 xtBRepDataLength;
            
            Buffer.BlockCopy(_uncompressed, filePosCount, fileBytes, 0, 4);
            versionNumber = DataTypes.getInt32(fileBytes);
            string str4 = versionNumber.ToString();
            this.m_textBox.Add("\nVersion Number = " + str4);

            filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, filePosCount, fileBytes, 0, 4);
            parasolidKernelMajorVersionNumber = DataTypes.getInt32(fileBytes);
            string str5 = parasolidKernelMajorVersionNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Major Version Number = " + str5);

            filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, filePosCount, fileBytes, 0, 4);
            parasolidKernelMinorVersionNumber = DataTypes.getInt32(fileBytes);
            string str6 = parasolidKernelMinorVersionNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Minor Version Number = " + str6);

            filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, filePosCount, fileBytes, 0, 4);
            parasolidKernelBuildNumber = DataTypes.getInt32(fileBytes);
            string str7 = parasolidKernelBuildNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Build Number = " + str7);

            filePosCount += sizeof(Int32);

            Buffer.BlockCopy(_uncompressed, filePosCount, fileBytes, 0, 4);
            xtBRepDataLength = DataTypes.getInt32(fileBytes);
            string str8 = xtBRepDataLength.ToString();
            this.m_textBox.Add("\nXT B-Rep Data Length = " + str8);

            filePosCount += sizeof(Int32);

            ////////////////////////////////////////////////////////////////// XT B-Rep Data \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
            char[] version = new char [80];			    // Version Identifier
            byte[] charBytes = new byte[80];
//            Buffer.BlockCopy(_uncompressed, filePosCount, version, 0, 80);
//            string str10 = new string(version);
//            this.m_textBox.Add("\n" + str10;
        }
    }
}
