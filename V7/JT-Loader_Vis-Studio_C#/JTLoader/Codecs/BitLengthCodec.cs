/////////////////////////////////////////////////////////////////////////////
//
// This class contains the LOD Shape Node used by the JT File
//
// Refer to ? page ? - on (Ver 9.5 rev D)
//
/////////////////////////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows.Forms;

namespace C_sharp_JT_Reader
{
    public class BitLengthCodec
    {
        List<string> _richTextBox;

        public BitLengthCodec(List<string> richTextBox)
        {
            _richTextBox = richTextBox;
        }

        public int[] DecompressBitLength(Int32[] encodedBytes, int codeTextLength, int numSymbolsToRead) 
        {
            BitBuffer encodedBits = new BitBuffer(encodedBytes);

            int bitFieldWith = 0;

            int[] result = new int[numSymbolsToRead];
            int position = 0;

            while (encodedBits.getBitPos() < codeTextLength)
            {
                if (encodedBits.readAsInt(1) == 0)
                {
                    // Decode symbol with same bit field length
                    int decodedSymbol = -1;
                    if (bitFieldWith == 0)
                    {
                        decodedSymbol = 0;
                    }
                    else
                    {
                        //**** Note !!! This is Where all the work is done !!! *****
                        decodedSymbol = encodedBits.readAsInt(bitFieldWith);

                        // Convert and sign-extend the symbol
                        decodedSymbol <<= (32 - bitFieldWith);
                        decodedSymbol >>= (32 - bitFieldWith);
                    }
                    result[position++] = decodedSymbol;
                    //decodedSymbols.add(decodedSymbol);
                }
                else
                {
                    // Adjust bit field length
                    int adjustmentBit = encodedBits.readAsInt(1);
                    do
                    {
                        if (adjustmentBit == 1)
                        {
                            bitFieldWith += 2;
                        }
                        else
                        {
                            bitFieldWith -= 2;
                        }
                    }
                    while (encodedBits.readAsInt(1) == adjustmentBit);

                    // Decode symbol with new bit field length
                    int decodedSymbol = -1;
                    if (bitFieldWith == 0)
                    {
                        decodedSymbol = 0;
                    }
                    else
                    {
                        decodedSymbol = encodedBits.readAsInt(bitFieldWith);
                        // Convert and sign-extend the symbol
                        decodedSymbol <<= (32 - bitFieldWith);
                        decodedSymbol >>= (32 - bitFieldWith);
                    }
                    result[position++] = decodedSymbol;
                }
            }
            return result;
        }
    }
}