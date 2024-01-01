using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace C_sharp_JT_Reader
{
    public class BitBuffer
    {
        int bitBuffer;  // Temporary i/o buffer
        int nBits;      // Number of bits in bitBuffer
        int bitPos;
        int count;

        Int32[] buffer;

        public BitBuffer(Int32[] buffer)
        {
            this.buffer = buffer;
            this.bitPos = 0;
            this.bitBuffer = 0x0000;
            this.nBits = 0;
            this.count = 0;
        }

        public int getBitPos()
        {
            return bitPos;
        }

        public byte readAsByte(int nbBits)
        {
            return (byte)readAsLong(nbBits);
        }

        public int readAsInt(int nbBits)
        {
            return (int)readAsLong(nbBits);
        }

        public int readAsInt(long bitPos, int nbBits)
        {
            return (int)readAsLong(bitPos, nbBits);
        }
        
        public long getBitBufBitSize()
        {
            //return this.buffer.limit() * 8;

            int test = this.buffer.Length * 8;

            return this.buffer.Length * 8;//////////////////////////////////////////////////////////////////////////////////// Check !! //////////////////////////////////////
        }

        public long readAsLong(int nbBits)
        {
            return readAsLong(0, nbBits);
        }

        // Read specified number of bits (max 32) starting from the given bit position, return the value as long.
        public long readAsLong(long bPos, int nbBits)
        {
            long value = 0;
            long len = bPos + nbBits;

            // len = number of bits to read, we skip bPos bits and create a long
            // with nbBits bits
            while (len > 0)
            {
                // Not enough bits in the buffer => We read another byte
                if (this.nBits == 0)
                {
                    bitBuffer = (int)buffer[count];
                    this.nBits = 8;
                    bitBuffer &= (int)0xFFL;

                    this.count = (this.count + 1) % buffer.Length;
                }

                // This test skips the first bPos bits
                if (bPos == 0)
                {
                    value <<= 1;
                    // The value of the msb is added to the value result
                    int test = bitBuffer >> 7;
                    value |= (int)(bitBuffer >> 7);
                }
                else
                {
                    bPos--;
                }
                // Remove the msb so the 2nd bit becomes the msb
                bitBuffer <<= 1;
                bitBuffer &= (int)0xFFL;
                this.nBits--;
                len--;
                this.bitPos++;

            }

            return value;
        }
    }
}
