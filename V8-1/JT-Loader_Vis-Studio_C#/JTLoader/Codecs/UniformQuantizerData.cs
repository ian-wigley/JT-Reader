/////////////////////////////////////////////////////////////////////
//
// This class contains the Uniform Quantizer Data used by the JT File
//
// Refer to 8.1.7 page 241 (ver 8.1)
//
/////////////////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows.Forms;

/*
 
    8.1.7 Uniform Quantizer Data
 
 */

namespace C_sharp_JT_Reader
{
    public class UniformQuantizerData
    {
        float _min;
        float _max;
        byte _numberOfBits;

        public UniformQuantizerData(float min, float max, byte numberOfBits)
        {
            _min = min;
            _max = max;
            if (numberOfBits <= 0 || numberOfBits <= 32)
            {
                _numberOfBits = numberOfBits;
            }
        }

        public float GetMin()
        {
            return _min;
        }

        public float GetMax()
        {
            return _max;
        }

        public byte GetNumberOfBits()
        {
            return _numberOfBits;
        }
    }
}
