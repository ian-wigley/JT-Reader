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
using System.Drawing.Printing;

namespace C_sharp_JT_Reader
{
    public partial class Form1 : Form
    {
        #region Fields

        float fileVersion;

        char[] version;			    // Version Identifier
        char byteOrder;			    // Defines the file byte order: 0 – Least Significant byte first (LsbFirst) 1 – Most Significant byte first (MsbFirst)
        Int32 reservedField;	    // Must have the value 0.
        Int32 tocOffset;		    // Defines the byte offset from the top of the file to the start of the TOC Segment.
        Guid lsgSegmentID;		    // LSG Segment ID specifies the globally unique identifier for the Logical Scene Graph Data Segment in the file.

        //Guid reserve_Field;		// Reserved Field is a data field reserved for future JT format expansion

        Int32 entryCount;		    // Entry Count is the number of entries in the TOC.

        Guid[] segmentID;			// Segment ID is the globally unique identifier for the segment.
        Int32[] segmentOffset;	    // Segment Offset defines the byte offset from the top of the file to start of the segment.
        Int32[] segmentLength;	    // Segment Length is the total size of the segment in bytes.
        UInt32[] segmentAttributes; // Segment Attributes is a collection of segment information encoded within a single U32 using the following bit allocation.

        Guid SegmentID;             //
        Int32 SegmentType;          //

        bool[] zlibApplied;         // Helper flag

        Int32[] compressionFlag;
        Int32[] compressedDataLength;
        byte[] compressionAlgorithmn;

        Int32[] segmentFilePos;
        Int32[] SegmentLength;
        string[] segmentType;

        byte[] segment;
        byte[] element;

        byte[] test;

        // List to store the Byte arrays of the file Segments that have been de-compressed using ZLib
        List<Byte[]> decompressedBytes = new List<byte[]>();

        // List to store the Byte arrays of the file Segments that have not been compressed using ZLib 
        List<Byte[]> notZLibBytes = new List<byte[]>();

        List<Shape_LOD_Segment> m_lodSegment = new List<Shape_LOD_Segment>();

        List<string> m_textBox = new List<string>();

        //string fileName = "AS12944-C(8-1).jt";//"model2(JT-v9-5).jt";//"washer.jt";//skylight_glass_prt.jt";//washer.jt";//model1.jt//NX_Speedboat.jt//skylight.jt
        #endregion

        //string fileName = "FW53485-A-BRACKET.jt";//AS20624_C_NUT.jt";
        //string fileName = "skylight_glass_prt.jt";//AS20624_C_NUT.jt";
        //string fileName = "washer.jt";//"model2(JT-v9-5).jt";
        string dataContents = string.Empty;
        #region Class Declarations
        MetaDataNode metaNode;
        LogicalSceneGraphNode lSG;
        XTB_RepNode xtB_Rep;
        Shape_LOD_Segment shapeLODSegment;
        #endregion

        public Form1()
        {
            InitializeComponent();
        }

        private void LoadJT(string fileName)
        {

            // Populate the list of GUID's
            JTObjectTypeIdentifiers.PopulateList();

            using (BinaryReader b = new BinaryReader(File.Open(fileName, FileMode.Open)))
            {
                #region FileHeader


                m_textBox.Add("--------------------------------- File Header ---------------------------------");
                m_textBox.Add("File Name = " + fileName);

                // Get the length of the file in bytes *** Note Helper Information not part of reader specification !!! ****
                int length = (int)b.BaseStream.Length;
                m_textBox.Add("File size = " + length.ToString() + " bytes");

                // Get the Version & extract version number from the char array
                version = b.ReadChars(80);
                string conversion = new string(version);
                string[] versionSplit = conversion.Split(new Char[] { ' ' });
                float.TryParse(versionSplit[1], out fileVersion);
                m_textBox.Add("JT File Version : " + fileVersion);

                // Get the Byte Order
                byteOrder = b.ReadChar();

                // 1 – Most Significant byte first (MSB First) "Big Endian"
                if (byteOrder != 0)
                {
                    // To-do Array.swap !
                }

                // 0 – Least Significant byte first (LSB First) "Little Endian"
                else if (byteOrder == 0)
                {
                    m_textBox.Add("Byte Order = 0");

                    // b.BaseStream.Position += sizeof(Int32);
                    int filePos = (int)b.BaseStream.Position;

                    reservedField = getInt32(b);
                    m_textBox.Add("ReservedField = " + reservedField.ToString());

                    tocOffset = getInt32(b);
                    m_textBox.Add("TOC Offset = " + tocOffset.ToString());

                    // Logical Scene Graph Identifier
                    lsgSegmentID = getGuid(b);
                    m_textBox.Add("LSG SegmentID = {" + lsgSegmentID.ToString() + "}");

                    // Update the base Stream position
                    b.BaseStream.Position = tocOffset;

                    // Read the Table of Contents data collection
                    // Get the Entry Count
                    entryCount = getInt32(b);
                    m_textBox.Add("Entry Count = " + entryCount.ToString());

                #endregion
                    #region TOC Segment

                    // Data Segments
                    segmentID = new System.Guid[entryCount];
                    segmentOffset = new Int32[entryCount];
                    segmentLength = new Int32[entryCount];
                    segmentAttributes = new UInt32[entryCount];
                    zlibApplied = new bool[entryCount];
                    segmentFilePos = new Int32[entryCount];
                    SegmentLength = new Int32[entryCount];
                    segmentType = new string[entryCount];
                    compressionFlag = new Int32[entryCount];
                    compressedDataLength = new Int32[entryCount];
                    compressionAlgorithmn = new byte[entryCount];

                    m_textBox.Add("\n--------------------------------- TOC Segment ---------------------------------");

                    // Collection the segment information
                    for (int i = 0; i < entryCount; i++)
                    {
                        m_textBox.Add("");

                        segmentID[i] = getGuid(b);
                        m_textBox.Add("SegmentID " + i + " = {" + segmentID[i].ToString() + "}");

                        segmentOffset[i] = getInt32(b);
                        m_textBox.Add("Segment Offset " + i + " = " + segmentOffset[i].ToString());

                        segmentLength[i] = getInt32(b);
                        m_textBox.Add("Segment Length " + i + " = " + segmentLength[i].ToString());

                        segmentAttributes[i] = getUInt32(b, i);
                        m_textBox.Add("Segment Attributes " + i + " = " + segmentAttributes[i].ToString());
                    }
                    #endregion
                    #region Segment Header

                    m_textBox.Add("\n------------------------------- Segment Header --------------------------------");

                    // Read each segment header & it's data collection of TOC segment information
                    for (int i = 0; i < entryCount; i++)
                    {
                        // Update the base Stream position to the offset of the segment
                        b.BaseStream.Position = segmentOffset[i];

                        SegmentID = getGuid(b);
                        m_textBox.Add("Segment ID = {" + SegmentID.ToString() + "}");

                        SegmentType = getInt32(b);
                        segmentType[i] = getSegmentType(SegmentType, i);
                        m_textBox.Add("Segment Type = " + segmentType[i]);

                        SegmentLength[i] = getInt32(b);
                        m_textBox.Add("Segment Length = " + SegmentLength[i].ToString());

                        // Record the reader position to allow continuation of reading from this point onwards
                        segmentFilePos[i] = (Int32)b.BaseStream.Position;

                        // Record the reader position
                        int basePos = (int)b.BaseStream.Position;

                        // Continue to the read the base LSG data
                        readBaseLSGData(i, basePos, b);
                    }
                    #endregion
                }
                #region OldCode
                #endregion
            }



            // Copy the contents of the collection onto the screen
            this.richTextBox.Lines = m_textBox.ToArray();


        }

        #region Byte Reading

        // Read the next 4 bytes, swap the order & increment the file position by 4 bytes
        Int32 getInt32(BinaryReader b)
        {
            byte[] fileBytes = new byte[4];
            fileBytes = b.ReadBytes(4);
            return BitConverter.ToInt32(fileBytes, 0); ;
        }

        UInt32 getUInt32(BinaryReader b, int i)
        {
            byte[] fileBytes = new byte[4];
            fileBytes = b.ReadBytes(4);

            // Zlib compression applied ?
            if (fileBytes[3] < 6)
            {
                zlibApplied[i] = true;
            }

            return BitConverter.ToUInt32(fileBytes, 0);
        }

        Guid getGuid(BinaryReader b)
        {
            byte[] guidBytes = new byte[16];
            for (int i = 0; i < 16; i++)
            {
                guidBytes[i] = b.ReadByte();
            }
            return new System.Guid(guidBytes);
        }

        #endregion

        // This method continues reading the Segment data (Base Logical Scene Graph)
        private void readBaseLSGData(int i, int basePos, BinaryReader b)
        {
            // Update the reader position
            b.BaseStream.Position = basePos;

            // Zlib compression applied to Segment Header
            if (zlibApplied[i] == true)
            {
                m_textBox.Add("");
                m_textBox.Add("Zlib Applied");



                compressionFlag[i] = getInt32(b);
                m_textBox.Add("Compression Flag  = " + compressionFlag[i].ToString());

                compressedDataLength[i] = getInt32(b);
                m_textBox.Add("Compressed Data Length = " + compressedDataLength[i].ToString());

                compressionAlgorithmn[i] = b.ReadByte();
                m_textBox.Add("Compression Algorithmn = " + compressionAlgorithmn[i].ToString());

                int testLength = compressedDataLength[i] - sizeof(Int32);

                // Copy the segment data to an array
                segment = new byte[testLength];

                for (int j = 0; j < testLength; j++)
                {
                    segment[j] = b.ReadByte();
                }

                test = new byte[10000];

                // Pass the segment to the ZLib decompression method
                decompressFile(segment, out test);
                decompressedBytes.Add(test);

                // write out the uncompressed data segments
                // writeZip(test, dataContents);
            }
            // No compression applied to Segment Header
            else
            {
                m_textBox.Add("");
                m_textBox.Add("No ZLib");

                // Collect the Segments worth of Bytes into a Byte array
                element = new byte[SegmentLength[i]];
                for (int j = 0; j < SegmentLength[i] - 24; j++)
                {
                    element[j] = b.ReadByte();
                }
                notZLibBytes.Add(element);

                // write out the uncompressed data segments
                // writeZip(element, dataContents);
            }

            // Populate the respective segment class with the Byte array
            if (segmentType[i] == "Logical Scene Graph - ZLib Applied")
            {
                //lSG = new LogicalSceneGraphNode(fileVersion, m_textBox);
                //lSG.setRTB(this.richTextBox);
                //lSG.populateData(test);
            }

            if (segmentType[i] == "Meta Data - ZLib Applied")
            {
                metaNode = new MetaDataNode(fileVersion, m_textBox);
                //               metaNode.populateData(test);
            }

            if (segmentType[i] == "XT B-Rep - ZLib Applied")
            {
                //              xtB_Rep.populateData(element);//decompressedBytes[count0++]);
            }

            if (segmentType[i] == "Shape LOD0")
            {
                shapeLODSegment = new Shape_LOD_Segment(fileVersion, m_textBox, element);
                m_lodSegment.Add(shapeLODSegment);
            }
            if (segmentType[i] == "Shape LOD1")
            {
                //               shapeLODSegment = new Shape_LOD_Segment(fileVersion, this.richTextBox, element);
                //               m_lodSegment.Add(shapeLODSegment);
            }
            if (segmentType[i] == "Shape LOD2")
            {
                //                shapeLODSegment = new Shape_LOD_Segment(fileVersion, this.richTextBox, element);
                //                m_lodSegment.Add(shapeLODSegment);
            }
        }

        // Method to return a String describing the Segment
        private string getSegmentType(int type, int count)
        {
            if (type < 6 || type > 16)
            {
                zlibApplied[count] = true;
            }
            else
            {
                zlibApplied[count] = false;
            }

            switch (type)
            {
                case 1:
                    dataContents = "Logical Scene Graph - ZLib Applied";
                    break;
                case 2:
                    dataContents = "JT B-Rep - ZLib Applied";
                    break;
                case 3:
                    dataContents = "PMI Data - ZLib Applied";
                    break;
                case 4:
                    dataContents = "Meta Data - ZLib Applied";
                    break;
                case 6:
                    dataContents = "Shape";
                    break;
                case 7:
                    dataContents = "Shape LOD0";
                    break;
                case 8:
                    dataContents = "Shape LOD1";
                    break;
                case 9:
                    dataContents = "Shape LOD2";
                    break;
                case 10:
                    dataContents = "Shape LOD3";
                    break;
                case 11:
                    dataContents = "Shape LOD4";
                    break;
                case 12:
                    dataContents = "Shape LOD5";
                    break;
                case 13:
                    dataContents = "Shape LOD6";
                    break;
                case 14:
                    dataContents = "Shape LOD7";
                    break;
                case 15:
                    dataContents = "Shape LOD8";
                    break;
                case 16:
                    dataContents = "Shape LOD9";
                    break;
                case 17:
                    dataContents = "XT B-Rep - ZLib Applied";
                    break;
                case 18:
                    dataContents = "Wireframe Representation - ZLib Applied";
                    break;
                case 20:
                    dataContents = "ULP - ZLib Applied";
                    break;
                case 24:
                    dataContents = "LWPA - ZLib Applied";
                    break;
            }
            return dataContents;
        }

        // Method to save the text displayed upon the Forms RTF Window
        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // Create a SaveFileDialog to request a path and file name to save to.
            SaveFileDialog saveFile1 = new SaveFileDialog();

            // Initialize the SaveFileDialog to specify the RTF extension for the file.
            saveFile1.DefaultExt = "*.rtf";
            saveFile1.Filter = "RTF Files|*.rtf";

            // Determine if the user selected a file name from the saveFileDialog.
            if (saveFile1.ShowDialog() == System.Windows.Forms.DialogResult.OK &&
               saveFile1.FileName.Length > 0)
            {
                // Save the contents of the RichTextBox into the file.
                richTextBox.SaveFile(saveFile1.FileName, RichTextBoxStreamType.PlainText);
            }
        }

        // Method to handle application close event
        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        // Method to unzip the byte array using ZLib compression library
        private void decompressFile(byte[] segment, out byte[] outData)
        {
            using (MemoryStream output = new MemoryStream())
            using (Stream outZStream = new zlib.ZOutputStream(output))
            using (Stream input = new MemoryStream(segment))
            {
                CopyStream(input, outZStream);
                outData = output.ToArray();
            }
        }
        public static void CopyStream(System.IO.Stream input, System.IO.Stream output)
        {
            byte[] buffer = new byte[input.Length];
            int len;
            while ((len = input.Read(buffer, 0, (int)input.Length)) > 0)
            {
                output.Write(buffer, 0, len);
            }
            output.Flush();
        }

        // Method to write out the memory to a file
        //        private void writeZip(int counter, int index, BinaryReader b, int zipLength)
        private void writeZip(byte[] decompressed, string fileName)//int index)
        {
            //            int segLength = zipLength - sizeof(Int32);

            //// Copy the segment data to an array
            //segment = new byte[segLength];
            //for (int i = 0; i < segLength; i++)
            //{
            //    segment[i] = b.ReadByte();
            //}

            string _fileName = fileName + ".bin";// "Segment" + index.ToString() + ".bin";

            // Write out the segment to a file
            using (BinaryWriter writer = new BinaryWriter(File.Open(_fileName, FileMode.Create)))
            {
                foreach (byte by in decompressed)//segment)
                {
                    writer.Write(by);
                }
            }
        }

        private void loadToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Title = "App Title";
            openFileDialog.InitialDirectory = @"*.*";
            openFileDialog.Filter = "All files (*.*)|*.*|All files (*.jt)|*.jt";
            openFileDialog.FilterIndex = 2;
            openFileDialog.RestoreDirectory = true;

            if (openFileDialog.ShowDialog() == DialogResult.OK)
            {
                string fileName = openFileDialog.FileName;

                LoadJT(fileName);

            }
        }

        // Print button Event Handler
        private void printToolStripMenuItem_Click(object sender, EventArgs e)
        {
            PrintDocument doc = new PrintDocument();
            PrintDialog pd = new PrintDialog();
            PrintPreviewDialog ppd = new PrintPreviewDialog();
            ppd.Document = doc;
            pd.Document = doc;
            doc.PrintPage += new PrintPageEventHandler(doc_PrintPage);
            if (ppd.ShowDialog() == DialogResult.OK)
            {

                if (pd.ShowDialog() == DialogResult.OK)
                {
                    doc.Print();
                }
            }
        }

        // Print Event Handler
        private void doc_PrintPage(object sender, PrintPageEventArgs e)
        {
            int x = 10;
            int y = 0;
            int charpos = 0;
            while (charpos < this.richTextBox.Text.Length)
            {
                if (this.richTextBox.Text[charpos] == '\n')
                {
                    charpos++;
                    y += 23;
                    x = 10;
                }
                else if (this.richTextBox.Text[charpos] == '\r')
                {
                    charpos++;
                }
                else
                {
                    this.richTextBox.Select(charpos, 1);
                    e.Graphics.DrawString(this.richTextBox.SelectedText, this.richTextBox.SelectionFont, new SolidBrush(this.richTextBox.SelectionColor), new PointF(x, y));
                    x = x + 8;
                    charpos++;
                }
            }
            // Ncte :You need to Set position cf X variable according to font you use in richtext box I used x÷8 because
            //            is appropriate for Courier New font.
        }
    }
}
