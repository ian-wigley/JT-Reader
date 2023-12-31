using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace C_sharp_JT_Reader.Codecs
{

    /* Arithmetic encoding is a lossless compression algorithm that replaces an 
 * input stream of symbols or bytes with a single fixed point output number 
 * (i.e. only the mantissa bits to the right of the binary point are output 
 * from MSB to LSB). The total number of bits needed in the output number 
 * is dependent upon the length/complexity of the input message (i.e. the 
 * longer the input message the more bits needed in the output number). 
 * This single fixed point number output from an arithmetic encoding 
 * process must be uniquely decodable to create the exact stream of input 
 * symbols that were used to create it.
 */

    public class ArithmeticCodec
    {
        private List<string> _richTextBox;
        
        private int code; // Present input code value, for decoding only
        private int low; // Start of the current code range
        private int high; // End of the current code range

        private long bitBuffer; // Temporary i/o buffer
        private int nBits; // Number of bits in _bitBuffer

        //BitBuffer_old encodedBits; // The bitbuffer 
        private BitBuffer encodedBits;

        public ArithmeticCodec(List<string> richTextBox)
        {
            _richTextBox = richTextBox;
        }

        public int[] DecodeArithmetic(Int32ProbabilityContexts probCtxt, Int32[] encodedBytes, int codeTextLength, int numSymbolsToRead, int valueElementCount)
        {
            code = 0x0000;
            low = 0x0000;
            high = 0xffff;
            bitBuffer = 0x00000000;
            nBits = 0;

            int[] result = new int[valueElementCount]; // numSymbolsToRead]; **- changed 3/12/13 -**
            int position = 0;
            ArithmeticProbabilityRange newSymbolRange;
            int currContext = 0;
            int dummyTotalBits;
            int symbolsCurrCtx;

            int cptOutOfBand = 0;
            int[] outofBandValues = probCtxt.GetOutOfBandValues();

            Int32ProbCtxtTable pCurrContext;

            int nBitsRead = -1;
            //            encodedBits = new BitBuffer_old(ByteBuffer.wrap(encodedBytes));
            encodedBits = new BitBuffer(encodedBytes);

            bitBuffer = encodedBits.readAsInt(32) & 0xFFFFFFFFL;

            low = 0x0000;
            high = 0xffff;

            code = (int)(bitBuffer >> 16);
            bitBuffer = (bitBuffer << 16) & 0xFFFFFFFFL;

            nBits = 16;

            // Begin decoding
            // Returns index of the first context entry and total number of bits
            // pDriver->getDecodeData(currContext, dummyTotalBits);

            for (int ii = 0; ii < numSymbolsToRead; ii++)
            {
                // Returns the probability context for a given index
                pCurrContext = probCtxt.GetContext(currContext);

                symbolsCurrCtx = pCurrContext.GetTotalCount();

                long rescaledCode = ((((long)(code - low) + 1) * symbolsCurrCtx - 1) / ((long)(high - low) + 1));

               
                // 8.1.1.1.1 Int32 Probability Context Table Entry - currently populated in Int32CDP
                Int32ProbCtxtEntry currEntry = pCurrContext.LookupEntryByCumCount(rescaledCode);
                
                newSymbolRange = new ArithmeticProbabilityRange(currEntry.getCumCount(), currEntry.getCumCount() + currEntry.getOccCount(), symbolsCurrCtx);

                removeSymbolFromStream(newSymbolRange);

                int symbol = (int)currEntry.getSymbol();
                int outValue = 0;

                if ((symbol == -2) && (currContext == 0))
                {
                    if (cptOutOfBand < outofBandValues.Length)
                    {
                        outValue = outofBandValues[cptOutOfBand];
                        cptOutOfBand++;
                    }
                }
                else
                {
                    outValue = (int)currEntry.getAssociatedValue();
                }
                if ((symbol != -2) || (currContext == 0))
                {
                    result[position++] = outValue;
                }
                currContext = currEntry.getNextContext();
               
            }
            return result;
        }

        private void removeSymbolFromStream(ArithmeticProbabilityRange sym)
        {
            // First, the range is expanded to account for the symbol removal.
            int range = high - low + 1;
            high = low + (int)((range * sym.getHigh()) / sym.getScale() - 1);
            low = low + (int)((range * sym.getLow()) / sym.getScale());

            // Next, any possible bits are shipped out.
            for (; ; )
            {
                // If the MSB match, the bits will be shifted out.
                if (((~(high ^ low)) & 0x8000) != 0) // Should be equal to 0x8000
                {
                }
                // 2nd MSB of high is 0 and 2nd MSB of low is 1
                else if ((low & 0x4000) == 0x4000 && (high & 0x4000) == 0)
                {
                    // Underflow is threatening, shift out 2nd most signif digit.
                    code ^= 0x4000;
                    low &= 0x3fff;
                    high |= 0x4000;
                }
                else
                {
                    // Nothing can be shifted out, so return.
                    return;
                }
                low <<= 1;
                low &= 0xFFFF; // int are on 32 bits, we want to get rid of the 1st
                // 2 bytes when we shift
                high <<= 1;
                high &= 0xFFFF; // int are on 32 bits, we want to get rid of the 1st
                // 2 bytes when we shift
                high |= 1;
                code <<= 1;
                code &= 0xFFFF; // int are on 32 bits, we want to get rid of the 1st
                // 2 bytes when we shift

                if (nBits == 0)
                {
                    bitBuffer = encodedBits.readAsInt(32) & 0xFFFFFFFFL;

                    nBits = 32;
                }
                // Add the msb of bitbuffer as the lsb of code
                code |= (int)(bitBuffer >> 31);
                // Get rid of the msb of bitbuffer;
                bitBuffer <<= 1;
                bitBuffer &= 0xFFFFFFFFL; // long are on 64 bits, we want UInt32
                nBits--;
            }
        }
     }
}
