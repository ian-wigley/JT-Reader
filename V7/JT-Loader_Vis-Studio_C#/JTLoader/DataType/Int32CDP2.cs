/////////////////////////////////////////////////////////////////////
//
// This class is used to store a Vector(List<>) collection of
//
// Refer to 7.2.2.1.3 Tri-Strip Set Shape LOD Element page 124 - on (Ver 9.5 rev D)
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
    public static class Int32CDP2
    {
        static List<string> _richTextBox;
        static int _filePosCount;
        static Int32 _valueCount;
        static UInt32[] _codeTextWord;
        static byte[] _data;
        static BitLengthCodec bitLengthCodec;

        // Figure 221: Int32 Compressed Data Packet Mk. 2 data collection
        public static void Int32CDPtwo()
        {
            _richTextBox.Add("\n\n----------------------- Int32CDP2 Mk 2 data Collection ------------------------");

            byte[] fileBytes;
            byte[] endianSwapBytes;


            fileBytes = new byte[4];
            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
            _valueCount = DataTypes.getInt32(fileBytes);
            _richTextBox.Add("\nValue Count = " + _valueCount.ToString());
            _filePosCount += sizeof(Int32);

            if (_valueCount > 0)
            {
                byte codecType = _data[_filePosCount];
                string str8 = codecType.ToString();
                _richTextBox.Add("\nCodec Type = " + str8);
                _filePosCount += sizeof(byte);

                // Null Codec
                if (codecType == 0)
                {
                }

                #region Bitlength Codec
                // Bitlength Codec
                if (codecType == 1)
                {
                    fileBytes = new byte[4];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    Int32 _codeTextLength = DataTypes.getInt32(fileBytes);
                    _richTextBox.Add("\nCode Text Length = " + _codeTextLength.ToString());
                    _filePosCount += sizeof(Int32);

                    endianSwapBytes = new byte[4];
                    _codeTextWord = new UInt32[_codeTextLength / 32];

                    byte[] _codeTextWords = new byte[29];

                    int count = 0;
//                  for (int b = 0; b < (_codeTextLength / 32); b++) /////////////////////////////////////////////////////////////////////////////////////
                    for (int b = 0; b < 7; b++)
                    {
                        // Code Text Word
                        Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                        endianSwapBytes = fileBytes.Reverse().ToArray();

                        _codeTextWords[count++] = endianSwapBytes[0];
                        _codeTextWords[count++] = endianSwapBytes[1];
                        _codeTextWords[count++] = endianSwapBytes[2];
                        _codeTextWords[count++] = endianSwapBytes[3];

                        _richTextBox.Add("\nCode Text Word = " + _codeTextWords[b].ToString());
                        _filePosCount += sizeof(byte) * 4;
                    }
                    bitLengthCodec = new BitLengthCodec(_richTextBox);
                    // Todo 2 Bitlength Decoding Classes Page 320
                  //  bitLengthCodec.DecompressBitLength(_codeTextWords, _codeTextLength, _valueCount);
                }
                #endregion 

                #region Arithmetic Codec
                // Arithmetic Codec
                if (codecType == 3)
                {
                    // Int32 probabilityContextsMk2 Page 261

                    fileBytes = new byte[4];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    UInt32 _probabilityContextTableEntryCount = DataTypes.getUInt32(fileBytes);
                    _richTextBox.Add("\nProbability Context Table Entry Count = " + _probabilityContextTableEntryCount.ToString());
                    _filePosCount += sizeof(UInt32);

                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    UInt32 _numberSymbolBit = DataTypes.getUInt32(fileBytes);
                    _richTextBox.Add("\nNumber Symbol Bits = " + _numberSymbolBit.ToString());
                    _filePosCount += sizeof(UInt32);

                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    UInt32 _numberOccurrenceCountBits = DataTypes.getUInt32(fileBytes);
                    _richTextBox.Add("\nNumber Occurrence Count Bits = " + _numberOccurrenceCountBits.ToString());
                    _filePosCount += sizeof(UInt32);

                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    UInt32 _numberValueBits = DataTypes.getUInt32(fileBytes);
                    _richTextBox.Add("\nNumber Value Bits = " + _numberValueBits.ToString());
                    _filePosCount += sizeof(UInt32);

                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    UInt32 _minValue = DataTypes.getUInt32(fileBytes);
                    _richTextBox.Add("\nMin Value = " + _minValue.ToString());
                    _filePosCount += sizeof(UInt32);

                    // Probability Context Table Entry Mk 2 page 262
                    for (int i = 0; i < _probabilityContextTableEntryCount; i++)
                    {
                        Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                        UInt32 _symbol = DataTypes.getUInt32(fileBytes);
                        _richTextBox.Add("\nSymbol = " + _symbol.ToString());
                        _filePosCount += sizeof(UInt32);

                        Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                        UInt32 _occurrenceCount = DataTypes.getUInt32(fileBytes);
                        _richTextBox.Add("\nOccurence Count = " + _occurrenceCount.ToString());
                        _filePosCount += sizeof(UInt32);

                        Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                        UInt32 _associatedValue = DataTypes.getUInt32(fileBytes);
                        _richTextBox.Add("\nAssociated Value = " + _associatedValue.ToString());
                        _filePosCount += sizeof(UInt32);

                    }

                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    UInt32 _alignmentBits = DataTypes.getUInt32(fileBytes);
                    _richTextBox.Add("\nAlignment Bits = " + _alignmentBits.ToString());
                    _filePosCount += sizeof(UInt32);


 //                   Int32 CompressedDataPacketMk2OOBDataValues;
                }
                #endregion

                #region Chopper Codec
                // Chopper Codec
                if (codecType == 4)
                {

                    //                        for (int j = 0; j < VecI32Count0; j++)
                    {
                        byte _chopBits = _data[_filePosCount];
                        _richTextBox.Add("\nChop Bits = " + _chopBits.ToString());
                        _filePosCount += sizeof(byte);

                        if (_chopBits != 0)
                        {
                            Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                            Int32 _valueBias = DataTypes.getInt32(fileBytes);
                            _richTextBox.Add("\nValue Bias = " + _valueBias.ToString());
                            _filePosCount += sizeof(Int32);

                            byte _valueSpanBits = _data[_filePosCount];
                            _richTextBox.Add("\nValue Span Bits = " + _valueSpanBits.ToString());
                            _filePosCount += sizeof(byte);

                            byte[] LSBValue = new byte[_valueSpanBits];
                            byte[] MSBValue = new byte[_valueSpanBits];
                            // Int32[] OrigValue = new Int32[VecI32Count0];

                            byte _choppedMsbBeginning = (byte)(_valueSpanBits - _chopBits);
                            byte _choppedMsbEnd = (byte)(_valueSpanBits - 1);

                            byte _choppedLsbBeggining = 0;
                            byte _choppedLsbEnd = (byte)(_valueSpanBits - 1);

                            for (int i = 0; i < _valueSpanBits; i++)
                            {
                                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                                LSBValue[i] = fileBytes[_choppedLsbBeggining];
                                MSBValue[i] = fileBytes[_choppedMsbBeginning];

                                //Int32 Compressed Data Packet Mk 2: Chopped MSB data
                                //Int32 Compressed Data Packet Mk 2: Chopped LSB data
                                //OrigValue[i] = (LSBValue[i] | (MSBValue[i] << (ValSpanBits - ChopBits))) + ValueBias;
                                //OrigValue[i] = (LSBValue[i] | (MSBValue[i] << (_valueSpanBits - _chopBits))) + _valueBias;

                               _richTextBox.Add("\n");
                            }
                        }
                    }
                }
                #endregion
            }
            _richTextBox.Add("\n\n-------------------- End of Int32CDP2 Mk 2 data Collection ---------------------");
        }

        public static void SetUpFilePosition(int filePosCount)
        {
            _filePosCount = filePosCount;
        }

        public static void SetUpData(byte[] data)
        {
            _data = data;
        }

        public static void SetupRTF(List<string> richTextBox)
        {
            _richTextBox = richTextBox;
        }

        public static int GetFilePos()
        {
            return _filePosCount;
        }

        public static int GetValueCount()
        {
            return _valueCount;
        }

        public static UInt32[] GetCodeTextWord()
        {
            return _codeTextWord;
        }

    }
}
