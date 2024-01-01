using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.Codecs
{
    public class DeeringLookupEntry
    {
        double cosTheta;
        double sinTheta;
        double cosPsi;
        double sinPsi;

        public DeeringLookupEntry(double cosTheta, double sinTheta, double cosPsi, double sinPsi)
        {
            this.cosTheta = cosTheta;
            this.sinTheta = sinTheta;
            this.cosPsi = cosPsi;
            this.sinPsi = sinPsi;
        }

        public double getCosTheta()
        {
            return cosTheta;
        }

        public double getSinTheta()
        {
            return sinTheta;
        }

        public double getCosPsi()
        {
            return cosPsi;
        }

        public double getSinPsi()
        {
            return sinPsi;
        }

    }
}