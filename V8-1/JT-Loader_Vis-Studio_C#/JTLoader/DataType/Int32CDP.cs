/////////////////////////////////////////////////////////////////////
//
// This class is used to store a Vector(List<>) collection of Int32's (pre version 9.5)
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
using C_sharp_JT_Reader.Codecs;

namespace C_sharp_JT_Reader
{
    public class Int32CDP
    {

        static byte[] _data;
        static int _filePosCount;
        static int[] result;
        static UInt32[] _codeTextWord;
        //static bool _probabiltyFirstPass;
        static List<string> _richTextBox;

        static Int32 _codeTextCount;
        static Int32[] _codeTextWords;

        static BitLengthCodec m_bitLengthCodec;
        static ArithmeticCodec m_arithmeticCodec;
        //Int32ProbabilityContexts _int32ProbabilityContexts;

        // Figure 169 : Int32 Compressed Data Packet data collection
        public static Int32[] Int32CDPone(CodecDriver.PredictorType value)
        {
//            _probabiltyFirstPass = true;
            return Int32CDPRead();
        }

        public static Int32[] Int32CDPRead()
        {
            Int32ProbabilityContexts _int32ProbabilityContexts = null;

            //_int32ProbabilityContexts = null;

            _richTextBox.Add("\n----------------------- Int32CDP data Collection ------------------------");

            byte[] fileBytes;
            Int32 _codeTextLength = 0;
            Int32 _valueElementCount = 0;

            byte codecType = _data[_filePosCount];
            string str8 = codecType.ToString();
            _richTextBox.Add("Codec Type = " + str8);
            _filePosCount += sizeof(byte);


            #region Huffman Codec
            // Huffman Codec
            if (codecType == 2)
            {
            }
            #endregion

            #region Arithmetic Codec
            // Arithmetic Codec
            if (codecType == 3)
            {
                fileBytes = new byte[4];
                // Int32 probabilityContextsMk2 Page 261
                //Figure 169 (Ver 8.1): Int32 Probability Contexts data collection

                _int32ProbabilityContexts = new Int32ProbabilityContexts(_richTextBox, _data, _filePosCount);

                // Retrieve the file position
                _filePosCount = _int32ProbabilityContexts.UpDateFilePos();


                // Get the number of Out Of Band Values
                fileBytes = new byte[4];
                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                Int32 _outOfBandValueCount = DataTypes.getInt32(fileBytes);
                _richTextBox.Add("Out Of Band Value Count = " + _outOfBandValueCount.ToString());
                _filePosCount += sizeof(Int32);



                if (_outOfBandValueCount > 0)
                {
                    // Int32 Compressed Data Packet -> Go back the start of this class..... (recursion see recursion ?)
                    int[] _oOOBValues = Int32CDPRead();

                    // Pass the 'Out of Band' values to the _int32ProbabilityContexts
                    _int32ProbabilityContexts.SetOOBValues(_oOOBValues);
                }
            }
            #endregion


            if (codecType != 0)
            {
                fileBytes = new byte[4];
                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                _codeTextLength = DataTypes.getInt32(fileBytes);
                _richTextBox.Add("Code Text Length = " + _codeTextLength.ToString());
                _filePosCount += sizeof(Int32);

                fileBytes = new byte[4];
                Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                _valueElementCount = DataTypes.getInt32(fileBytes);
                _richTextBox.Add("Value Element Count = " + _valueElementCount.ToString());
                _filePosCount += sizeof(Int32);


                if (_int32ProbabilityContexts == null || _int32ProbabilityContexts.GetTableCount()==1)
                {
                    _codeTextCount = _valueElementCount;
                }
                else
                {
                    // VecI32 codeText
                    fileBytes = new byte[4];
                    Buffer.BlockCopy(_data, _filePosCount, fileBytes, 0, 4);
                    _codeTextCount = DataTypes.getInt32(fileBytes);
                    _richTextBox.Add("Code Text Count = " + _codeTextCount.ToString());
                    _filePosCount += sizeof(Int32);


                }
                _codeTextWords = new Int32[_codeTextLength];//(4 * _codeTextCount)];
                _codeTextWords = ReadCodeText(_codeTextCount, _codeTextWords);

            }


            result = new int[2];

            // Different Codecs required for decoding the codeText, etc.
            #region Codec Decoding
            if (codecType == 1)
            {
                // Bitlength Decoding Class Page 320
                m_bitLengthCodec = new BitLengthCodec(_richTextBox);
                // Activate the codec
                result = m_bitLengthCodec.DecompressBitLength(_codeTextWords, _codeTextLength, _valueElementCount);
            }

            // Arimetic Decoding 
            if (codecType == 3)
            {
                m_arithmeticCodec = new ArithmeticCodec(_richTextBox);
                // Activate the codec
                result = m_arithmeticCodec.DecodeArithmetic(_int32ProbabilityContexts, _codeTextWords, _codeTextLength, _codeTextCount, _valueElementCount);
            }
            #endregion


            _richTextBox.Add("-------------------- End of Int32CDP data Collection ---------------------");
            return result;
        }


        private static Int32[] ReadCodeText(int _codeTextCount, Int32[] _codeTextWords)
        {
            int _count = 0;
            byte[] _fileBytes = new byte[4];

            int conter = 0;
            Buffer.BlockCopy(_data, _filePosCount, _fileBytes, 0, 4);
            int counter = DataTypes.getInt32(_fileBytes);
            _filePosCount += sizeof(byte) * 4;


            int[] codeText = new int[counter * 4];

            //for (int j = 0; j < _codeTextCount; j++)
            for (int j = 0; j < counter; j++)
            {

                byte[] _reversedCodeText = new byte[4];

                // *** To-do *** //
                // if (littleEndian)

                // Code Text Word
                Buffer.BlockCopy(_data, _filePosCount, _fileBytes, 0, 4);
                _reversedCodeText = _fileBytes.Reverse().ToArray();
                _filePosCount += sizeof(byte) * 4;
                for (int i = 0; i < 4; i++)
                {
                    codeText[i + _count] = _reversedCodeText[i];
                    //_codeTextWords[i + _count] = _reversedCodeText[i];
                }
                _count += 4;

            }
            return codeText;// _codeTextWords;
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
            return 0;// _valueCount;
        }

        public static UInt32[] GetCodeTextWord()
        {
            return _codeTextWord;
        }
    }
}
