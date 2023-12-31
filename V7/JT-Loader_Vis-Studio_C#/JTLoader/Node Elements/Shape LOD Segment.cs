/////////////////////////////////////////////////////////////////////
//
// This class contains the Shape LOD Segment used by the JT File
//
// Refer to 7.2.2 Tri-Strip Set Shape LOD Element page 109(Ver 9.5 rev D)
// Refer to 7.2.2 Tri-Strip Set Shape LOD Element page 117(Ver 8.1 rev D) 
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
    /* Note !
     
       A Shape LOD Element is the holder/container of the geometric shape definition data (e.g. vertices,
       polygons, normals, etc.) for a single LOD. Much of the “heavyweight” data contained within a Shape
       LOD Element may be optionally compressed and/or encoded. The compression and/or encoding state is
       indicated through other data stored in each Shape LOD Element.
      
       There are several types of Shape LOD Elements which the JT format supports. The following sub-sections
       document the various Shape LOD Element types.
     */

    class Shape_LOD_Segment
    {
        List<string> _richTextBox;
        int _filePosCount;
//        int _versionNumber;
        float _fileVersion;
        byte[] _data;
        byte[] fileBytes;
        byte[] _guidBytes;
        Int32 elementLength;
        Guid objectTypeID;

        Tri_Strip_Set_Shape_LOD_Element triStripSetShape;

        public Shape_LOD_Segment()
        {
        }

        // Constructor
        public Shape_LOD_Segment(float fileVersion, List<string> richTextBox, byte[] data)
        {
            _richTextBox = richTextBox;
            _fileVersion = fileVersion;
            // Reset the file position counter to match the start of the element
            _filePosCount = 0;
            _data = data;

            if (_fileVersion < 9.5)
            {
                // Pass the RTF reference to the Int32CDP
                Int32CDP.SetupRTF(richTextBox);
                Int32CDP.SetUpData(data);
            }
            else
            {
                // Pass the RTF reference to the Int32CDP2
                //Int32CDP2.SetupRTF(richTextBox);
                //Int32CDP2.SetUpData(data);
            }
            readSegment();
        }

        // Method to parse the Segment
        private void readSegment()
        {
            #region Header

            this._richTextBox.Add("\n\n---------------------------- Shape LOD Element -------------------------");

            fileBytes = new byte[4];
            _guidBytes = new byte[16];

            // Get the Length of the element
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            elementLength = DataTypes.getInt32(fileBytes);
            this._richTextBox.Add("\nElement Length = " + elementLength.ToString());
            _filePosCount += sizeof(Int32);

            // Get the ID of the element object
            Buffer.BlockCopy(_data, _filePosCount, _guidBytes, 0, 16);
            objectTypeID = DataTypes.getGuid(_guidBytes);
            this._richTextBox.Add("\nObject Type ID = {" + objectTypeID.ToString() + "}");
            _filePosCount += (16);

            string _compare = JTObjectTypeIdentifiers.GetType(objectTypeID);
            this._richTextBox.Add("\nNode Type = " + _compare);

            byte objectBaseType = _data[_filePosCount];
            this._richTextBox.Add("\nObject Base Type = " + objectBaseType.ToString());
            _filePosCount += sizeof(byte);

            if (_fileVersion >= 9.5)
            {
                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                Int32 objectID = DataTypes.getInt32(fileBytes);
                this._richTextBox.Add("\nobject ID = " + objectID.ToString());
                _filePosCount += sizeof(Int32);
            }

            // 7.2.2.1.1 Vertex Shape LOD Element
            if (_compare == "Vertex Shape LOD Element")
            {
            }

            // 7.2.2.1.2 Tri-Strip Set Shape LOD Element
            if (_compare == "Tri-Strip Set Shape LOD Element")
            {
                triStripSetShape = new Tri_Strip_Set_Shape_LOD_Element(_fileVersion, this._richTextBox, _data, _filePosCount);
            }

            // 7.2.2.1.3 Polyline Set Shape LOD Element
            if (_compare == "Polyline Set Shape LOD Element")
            {
            }

            // 7.2.2.1.4 Point Set Shape LOD Element
            if (_compare == "Point Set Shape LOD Element")
            {
            }

            // 7.2.2.1.5 Polygon Set Shape LOD Element
            if (_compare == "Polygon Set Shape LOD Element")
            {
            }

            // 7.2.2.1.6 Null Shape LOD Element
            if (_compare == "Null Shape LOD Element")
            {
            }

            this._richTextBox.Add("\n");

            #endregion
        }
    }
}
