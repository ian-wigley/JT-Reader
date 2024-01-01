/////////////////////////////////////////////////////////////////////////////
//
// This class contains the Uniform Quantizer Codec used by the JT File
//
// Refer to 8.2.1 Uniform Data Quantization page 292 - on (Ver 9.5 rev D)
// Refer to 8.2.1 Uniform Data Quantization page 259 - on (Ver 8.1 rev D)
//
/////////////////////////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows.Forms;

namespace C_sharp_JT_Reader
{
    public class UniformQuantizerCodec
    {
        //RichTextBox _richTextBox;
        Int32 _inputVal = 0;         // Input floating point data to quantize
        //Int32 _outputval = 0;        // Resulting quantized output integer value
        float _minInputRange = 0;    // Specified minimum value of input data range
        float _maxInputRange = 0;    // Specified maximum value of input data range
        Int32 _nBits = 0;            // Specified number of bits of precision (quantized size)
        List<string> m_textBox = new List<string>();

        public UniformQuantizerCodec(List<string> richTextBox)
        {
            m_textBox = richTextBox;
            //Uniform Data Quantization is a lossy encoding algorithm in which a continuous set of input values (floating point data) is approximated with integral multiples (i.e. integers) of a common factor. 
            //How close the quantization output approximates the original input data is dependent upon the quantization data range and the number of bits specified to hold the resulting integer value.
            //The quantization is considered “uniform” because the algorithm divides the data input range into levels of equal spacing (i.e. a uniform scale). The form of Uniform Data Quantization used by the 
            //JT format is also considered scalar in nature, in that each input value is treated separately in producing the output integer value.
            //Given the following definitions:
            //inputVal: Input floating point data to quantize
            //outputval: Resulting quantized output integer value
            //minInputRange: Specified minimum value of input data range
            //maxInputRange: Specified maximum value of input data range
            //nBits: Specified number of bits of precision (quantized size)
            //The basic algorithm (using C++ style syntax) for Uniform Data Quantization is as follows:

            UInt32 _iMaxCode = (_nBits < 32) ? (UInt32)(0x1 << _nBits) - 1 : 0xffffffff;
            float _encodeMultiplier = (float)_iMaxCode / (_maxInputRange - _minInputRange);
            UInt32 _outputVal = (UInt32)((_inputVal - _minInputRange) * _encodeMultiplier + 0.5 );

            m_textBox.Add("\n\nUniformQuantizerCodec Output = " + _outputVal.ToString());

            //Note: For reasons of robustness, “outputVal” must also be explicitly clamped to the range [0,iMaxCode]. This is because floating-point roundoff error in the calculation of “encodeMultiplier” 
            //can otherwise cause “outputVal” to sometimes come out equal to “iMaxCode + 1”.
            //Note that all compression algorithms in the following sections operate on quantized integer data.
        }

        public float[] GetValues(int[] Values, UniformQuantizerData Data)
        {
            float[] output = new float[Values.Length];
            _minInputRange = Data.GetMin();
            _maxInputRange = Data.GetMax();
            _nBits = Data.GetNumberOfBits();

            UInt32 _iMaxCode = (_nBits < 32) ? (UInt32)(0x1 << _nBits) - 1 : 0xffffffff;


            float _encodeMultiplier = (float)_iMaxCode / (_maxInputRange - _minInputRange);
            UInt32 _outputVal = (UInt32)((_inputVal - _minInputRange) * _encodeMultiplier + 0.5);

            for (int i = 0; i < Values.Length; i++)
            {
                output[i] = (float)((Values[i] - 0.5) / _encodeMultiplier + _minInputRange);
                //output[i] = (float)((_inputVal - _minInputRange) * _encodeMultiplier + 0.5);
            }


            return output;
        }

    }
}
