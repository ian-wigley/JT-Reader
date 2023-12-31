using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.Codecs
{
    public class BitReader
    {

        BitBuffer bitBuf;
        Int32[] encodedBytes;
        byte[] _data;
        private int m_filePos;

        public BitReader(byte[] data)
        {
            _data = data;
            encodedBytes = new Int32[0];
            bitBuf = new BitBuffer(encodedBytes);
            m_filePos = 0;
        }

        // Read an U32 encoded on nbBits bits 
        public long readU32(int nbBits, int _filePosCount)
        {

            if (nbBits == 0)
            {
                return 0;
            }

            m_filePos = _filePosCount;

            int nbLeft = getNbBitsLeft();

            // If there are not enough bits already read and stored in bitBuf we 
            // read additional bytes and update the bitBuffer
            if (nbLeft < nbBits)
            {
                int nbBytes = ((nbBits - nbLeft - 1) / 8) + 1;
                int sizeBytes = nbBytes;
                int cpt = 0;

                if (nbLeft != 0)
                {
                    sizeBytes += 1;
                }

                Int32[] byteBuf = new Int32[sizeBytes];

                if (nbLeft != 0)
                {
                    byte remainingByte = bitBuf.readAsByte(nbLeft);
                    byteBuf[cpt] = remainingByte;
                    cpt += 1;
                }

                byte[] tmpBytes = new byte[nbBytes];

                Buffer.BlockCopy(_data, m_filePos, tmpBytes, 0, nbBytes);
                m_filePos += nbBytes;

                for (int i = cpt; i < sizeBytes; i++)
                {
                    byteBuf[i] = tmpBytes[i - cpt];
                }
                bitBuf = new BitBuffer(byteBuf);
            }

            // Read the int
            if (nbLeft > 0)
            {
                if (nbLeft < nbBits)
                    return bitBuf.readAsInt(8 - nbLeft, nbBits);
                else
                    return bitBuf.readAsInt(nbBits);
            }
            else
            {
                long res = bitBuf.readAsInt(nbBits);
                return res;
            }
        }
        public int getNbBitsLeft()
        {
            return (int)(bitBuf.getBitBufBitSize() - bitBuf.getBitPos());
        }

        public int getFilePos()
        {
            return m_filePos;
        }
    }
}