using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.Codecs
{
    public class DeeringNormalLookupTable
    {
        int nBits;
        double[] cosTheta;
        double[] sinTheta;
        double[] cosPsi;
        double[] sinPsi;

        public DeeringNormalLookupTable()
        {
            int numberbits = 8;
            nBits = Math.Min(numberbits, 31);
            int tableSize = (1 << nBits);
            cosTheta = new double[tableSize + 1];
            sinTheta = new double[tableSize + 1];
            cosPsi = new double[tableSize + 1];
            sinPsi = new double[tableSize + 1];

            double psiMax = 0.615479709;

            double fTableSize = tableSize;

            for (int ii = 0; ii <= tableSize; ii++)
            {
                double theta = Math.Asin(Math.Tan(psiMax * (tableSize - ii) / fTableSize));
                double psi = psiMax * ((ii) / fTableSize);
                cosTheta[ii] = Math.Cos(theta);
                sinTheta[ii] = Math.Sin(theta);
                cosPsi[ii] = Math.Cos(psi);
                sinPsi[ii] = Math.Sin(psi);
            }
        }

        public int numBitsPerAngle()
        {
            return nBits;
        }

        public DeeringLookupEntry lookupThetaPsi(long theta, long psi, int numberBits)
        {
            int offset = nBits - numberBits;

            long offTheta = (theta << offset) & 0xFFFFFFFFL;
            long offPsi = (psi << offset) & 0xFFFFFFFFL;

            return new DeeringLookupEntry(cosTheta[(int)offTheta],
                    sinTheta[(int)offTheta], cosPsi[(int)offPsi],
                    sinPsi[(int)offPsi]);
        }
    }
}


/*




*/
