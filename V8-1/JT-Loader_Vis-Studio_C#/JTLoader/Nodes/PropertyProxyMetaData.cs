/////////////////////////////////////////////////////////////////////
//
// This class contains the Property Proxy Meta Data used by the JT File
//
// Refer to Figure 132 page 178 - on (Ver 9.5 rev D)
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
    public class PropertyProxyMetaData// : MetaDataNode
    {
        byte[] _MbString;
        Int32 _count;
        Int32 _elementLength;
        Int32 _filePosCount;
        byte[] _uncompressed;
        byte[] _fileBytes;
        float _fileVersion = 0;
        RichTextBox _richTextBox;
        
        List<string> m_textBox = new List<string>();

        System.Text.Encoding encoding = System.Text.Encoding.Unicode;

        public PropertyProxyMetaData(float fileVersion, RichTextBox richTextBox, int fileCount, byte[] uncompressed, int elementLength)
        {
            _fileVersion = fileVersion;
            _richTextBox = richTextBox;
            _filePosCount = fileCount;
            _uncompressed = uncompressed;
            _elementLength = elementLength;

            this.m_textBox.Add("\n\n-------------------------- Property Proxy Meta Data ------------------------------");
        }

        public int TraversePropertyProxyMetaData()
        {
            _fileBytes = new byte[4];
            // Loop until all of the meta data has been read & displayed
            while (_filePosCount < _elementLength)
            {
                Buffer.BlockCopy(_uncompressed, _filePosCount, _fileBytes, 0, 4);

                // count is part of the MbString type
                _count = DataTypes.getInt32(_fileBytes);

                _filePosCount += sizeof(Int32);

                _MbString = new byte[_count * 2];
                for (int i = 0; i < _MbString.Length; i++)
                {
                    _MbString[i] = _uncompressed[_filePosCount];
                    _filePosCount++;
                }
                string _propertyKey = encoding.GetString(_MbString);

                this.m_textBox.Add("\nProperty Key = " + _propertyKey);

                if (_propertyKey != null)
                {
                    byte _propertyValueType = _uncompressed[_filePosCount];
                    this.m_textBox.Add("\nProperty Value Type = " + _propertyValueType);
                    _filePosCount += sizeof(byte);
                    if (_propertyValueType == 1)
                    {
                        Buffer.BlockCopy(_uncompressed, _filePosCount, _fileBytes, 0, 4);

                        _count = DataTypes.getInt32(_fileBytes);

                        _filePosCount += sizeof(Int32);

                        _MbString = new byte[_count * 2];
                        for (int i = 0; i < _MbString.Length; i++)
                        {
                            _MbString[i] = _uncompressed[_filePosCount];
                            _filePosCount++;
                        }

                        string _propertyValue = encoding.GetString(_MbString);
                        this.m_textBox.Add("\nProperty Value = " + _propertyValue);
                    }
                    if (_propertyValueType == 2)
                    {
                        //I32 : Integer Property Value /////////////////////////////////////////////////////// To do /////////////////////////////////////////////////////////////////
                        _filePosCount += sizeof(Int32);
                    }
                    if (_propertyValueType == 3)
                    {
                        //F32 : Float Property Value   /////////////////////////////////////////////////////// To do /////////////////////////////////////////////////////////////////
                        //_filePosCount += sizeof(Int32);
                    }

                    // Date Property Value
                    if (_propertyValueType == 4)
                    {
                        // Copy 4 Bytes into destination array
                        Buffer.BlockCopy(_uncompressed, _filePosCount, _fileBytes, 0, 4);
                        Int16 Year = DataTypes.getInt16(_fileBytes);
                        _filePosCount += sizeof(Int16);
                        Int16 Month = DataTypes.getInt16(_fileBytes);
                        _filePosCount += sizeof(Int16);
                        Int16 Day = DataTypes.getInt16(_fileBytes);
                        _filePosCount += sizeof(Int16);
                        Int16 Hour = DataTypes.getInt16(_fileBytes);
                        _filePosCount += sizeof(Int16);
                        Int16 Minute = DataTypes.getInt16(_fileBytes);
                        _filePosCount += sizeof(Int16);
                        Int16 Second = DataTypes.getInt16(_fileBytes);
                        _filePosCount += sizeof(Int16);

                        this.m_textBox.Add("\n" + Year.ToString() + Month.ToString() + Day.ToString() + Hour.ToString() + Minute.ToString() + Second.ToString());
                    }
                }

            }
            this.m_textBox.Add("\n");
            return this._filePosCount;
        }
    }
}
