using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.Codecs
{
    public class DeeringCode
    {
        long m_sextant = 0;
        long m_octant = 0;
        long m_theta = 0;
        long m_psi = 0;

        public DeeringCode(long sextant, long octant, long theta, long psi)
        {
            m_sextant = sextant;
            m_octant = octant;
            m_theta = theta;
            m_psi = psi;
        }
    }
}