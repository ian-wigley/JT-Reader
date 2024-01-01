using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows.Forms;

namespace C_sharp_JT_Reader
{
    public class VecU32
    {
        private Int32 _counter = 0;
        private UInt32[] _data;

        // Method to set the length of the array
        public void setLength(int size)
        {
            _data = new UInt32[size];
        }

        // Method to return a pointer to the next available slot in the array
        public int ptr()
        {
            return _counter++;
        }
    }
}
