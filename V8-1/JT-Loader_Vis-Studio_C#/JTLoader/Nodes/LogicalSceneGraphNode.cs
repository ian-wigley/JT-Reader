/////////////////////////////////////////////////////////////////////
//
// This class contains the Logical Scene Graph used by the JT File
//
// Refer to 7.2.1 Meta Data Segment page 33 - on (Ver 9.5 rev D)
//
/////////////////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows.Forms;
using C_sharp_JT_Reader.Nodes;

namespace C_sharp_JT_Reader
{
    class LogicalSceneGraphNode : C_sharp_JT_Reader.GroupJTNode
    {
        Int32 elementLength;
        Guid objectTypeID;
        string compare;
        bool finished = false;

        Partition_Node_Element m_partitionNode;
        PropertyProxyMetaData m_propertyProxyNode;
        MetaDataNode m_metaDataNode;
        InstanceNodeElement m_instanceNode;
        GeometricTransformAttributeElement m_geometricTransformAttributeElement;


        List<BaseJTNode> m_nodeCollection = new List<BaseJTNode>();

        List<string> m_textBox = new List<string>();
        //System.Text.Encoding encoding = System.Text.Encoding.Unicode;

        public LogicalSceneGraphNode(float fileVersion, List<string> textBox)
        {
            _fileVersion = fileVersion;
            m_textBox = textBox;
        }


        public void populateData(byte[] uncompressed)
        {
            #region Header

            this.m_textBox.Add("\n\n---------------------------- Logical Scene Graph ------------------------------");

            _uncompressed = uncompressed;
            _filePosCount = 0;



            // Collect the LSG segment header information 7.1.3.1 (JT 8.1)
            byte[] guidBytes = new byte[16];



            while (!finished)
            {


                Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                elementLength = DataTypes.getInt32(fileBytes);
                this.m_textBox.Add("\nElement Length = " + elementLength.ToString());
                _filePosCount += sizeof(Int32);



                // Add element length to start .....



                Buffer.BlockCopy(_uncompressed, _filePosCount, guidBytes, 0, 16);
                objectTypeID = DataTypes.getGuid(guidBytes);
                this.m_textBox.Add("\nObject Type ID = {" + objectTypeID.ToString() + "}");
                _filePosCount += (16);

                byte objectBaseType = _uncompressed[_filePosCount];
                this.m_textBox.Add("\nObject Base Type = " + objectBaseType.ToString());
                _filePosCount += sizeof(byte);

                if (_fileVersion >= 9.5)
                {
                    Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
                    Int32 objectID = DataTypes.getInt32(fileBytes);
                    this.m_textBox.Add("\nobject ID = " + objectID.ToString());
                    _filePosCount += sizeof(Int32);
                }

            #endregion

                // Traverse through the Base Node Data (7.2.1.1.1.1.1 Base Node Data Figure 13: Base Node Data collection ver 9.5)
                //              TraverseBaseNodeData();
                // What type of Element are we looking at 
                compare = JTObjectTypeIdentifiers.GetType(objectTypeID);
                this.m_textBox.Add("\nNode Type = " + compare);
                this.m_textBox.Add("\n");

                if (compare == "Property Proxy Meta Data Element")
                {
                    m_propertyProxyNode = new PropertyProxyMetaData(_fileVersion, _richTextBox, _filePosCount, _uncompressed, elementLength);
                    _filePosCount = m_propertyProxyNode.TraversePropertyProxyMetaData();
                   // m_nodeCollection.Add(m_propertyProxyNode);
                }

                if (compare == "Partition Node Element")
                {
                    /*
                    A Partition Node represents an external JT file reference and provides a means to partition a model into
                    multiple physical JT files (e.g. separate JT file per part in an assembly). When the referenced JT file is
                    opened, the Partition Node’s children are really the children of the LSG root node for the underlying JT
                    file. Usage of Partition Nodes in LSG also aids in supporting JT file loader/reader “best practice” of late
                    loading data (i.e. can delay opening and loading the externally referenced JT file until the data is needed).
                     */

                    m_partitionNode = new Partition_Node_Element(_fileVersion, m_textBox, _filePosCount, _uncompressed, elementLength);
                    _filePosCount = m_partitionNode.TraversePartitionNode(_filePosCount);
                    m_nodeCollection.Add(m_partitionNode);
                }


                if (compare == "Instance Node Element")
                {
                    m_instanceNode = new InstanceNodeElement(_fileVersion, m_textBox);
                    _filePosCount = m_instanceNode.populateData(_uncompressed, _filePosCount);
                    m_nodeCollection.Add(m_instanceNode);
                }

                if (compare == "Meta Data Node Element")
                {
                    m_metaDataNode = new MetaDataNode(_fileVersion, m_textBox);
                    _filePosCount = m_metaDataNode.populateData(_uncompressed, _filePosCount);
                    m_nodeCollection.Add(m_metaDataNode);
                }

                if (compare == "Geometric Transform Attribute Element")
                {
                    m_geometricTransformAttributeElement = new GeometricTransformAttributeElement(_fileVersion, m_textBox);
                    _filePosCount = m_geometricTransformAttributeElement.populateData(_uncompressed, _filePosCount);
                    m_nodeCollection.Add(m_geometricTransformAttributeElement);
                }

                if (compare == "EOF")
                {
                    finished = true;
                }
            }

  //          Loader SubJT FileStyleUriParser.....




        }

        public void setRTB(RichTextBox rTB)
        {
            this._richTextBox = rTB;
        }
    }

}
