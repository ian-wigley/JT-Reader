using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace C_sharp_JT_Reader
{
    public class VecI32
    {
        private Int32 _counter = 0;
        //private Int32 _count = 0;
        private Int32[] _data;

        // Method to set the length of the array
        public void setLength(int size)
        {
            _data = new Int32[size];
        }

        // Method to reurn a pointer to the next avaible slot in the array
        public int ptr()
        {
            return _counter++;
        }
    }
}
