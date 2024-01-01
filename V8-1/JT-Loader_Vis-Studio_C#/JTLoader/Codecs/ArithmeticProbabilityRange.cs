using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace C_sharp_JT_Reader.Codecs
{
    public class ArithmeticProbabilityRange
    {
        private long m_low;
        private long m_high;
        private long m_scale;

        public ArithmeticProbabilityRange(long low, long high, long scale)
        {
            this.m_low = low;
            this.m_high = high;
            this.m_scale = scale;
        }

        public long getLow()
        {
            return this.m_low;
        }

        public long getHigh()
        {
            return this.m_high;
        }

        public long getScale()
        {
            return this.m_scale;
        }
    }
}
