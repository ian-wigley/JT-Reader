using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using C_sharp_JT_Reader;

namespace C_sharp_JT_Reader.Codecs
{

    public class BitLengthCodec2
    {

        public BitLengthCodec2()
        {
            //#define GetSignedBits(iOut, n) \
            //GetUnsignedBits(iOut,n) \
            //iOut <<= (32 - n); \
            //iOut >>= (32 - n);
        }


//class BitLengthCodec2 : public Codec2
//{
//public:
//Bool decode( Int32 nValues,
//const Vecu &vCodeText,
//Int32 nBitsCodeText,
//Veci &ovValues );

//protected:
//Int32 _nBitsInSymbol(Int32 iSymbol) const;
//Bool getNextCodeText (UInt32 &uCodeText, Int32 &nBits);
//Vecu *_pvCodeText;
//Int32 *_pcCodeTextLen;
//Int32 _iCurCodeText;
//};

//#define GetSignedBits(iOut, n) \
//GetUnsignedBits(iOut,n) \
//iOut <<= (32 - n); \
//iOut >>= (32 - n);
//#define GetUnsignedBits(uOut, n) \
//if (n == 0) uOut = 0; \
//else if (nValBits >= n) { \
//uOut = uVal >> (32 - n); \
//uVal <<= n; \
//uVal &= (n==32)-1; \
//nValBits -= n; \
//nBits += n; \
//} \
//else { \
//Int32 _nLBits = nValBits; \
//uOut = uVal >> (32 - n); \
//nBits += _nLBits; \
//getNextCodeText (uVal, nValBits); \
//Int32 _nRBits = (n - _nLBits); \
//uOut |= uVal >> (32 - _nRBits); \
//uVal <<= _nRBits; \
//uVal &= (_nRBits==32)-1; \
//nValBits -= _nRBits; \
//nBits += _nRBits; \
//}

public bool decode( Int32 nValues, DataTypes.VecU32 vCodeText, Int32 nBitsCodeText, VecI32 ovValues )
{
    Int32 nBits = 0, // Number of codetext bits decoded so far
    nTotalBits = 0, // Total number of codetext bits expected
    //nValBits = 0, // Number of accumulated value bits
    iSymbol = 0; // Decoded symbol value
    //UInt32 uVal = 0; // Current chunk of codetext bits
    Int32 cNumCurBits = 0; // Current field width in bits
    Int32 cBitsInMinSymbol = 0; // Number of bits in the minimum symbol
    Int32 cBitsInMaxSymbol = 0; // Number of bits in the maximum symbol
    Int32 iMinSymbol = 0; // The minimum symbol value. Used as bias.
    Int32 iMaxSymbol = 0; // The maximum symbol value. Used as bias.
    Int32 nSyms = 0; // Number of symbols read so far
    Int32 paiValues = 0; // Pointer into ovValues where we write decoded values

    // Get codetext from the driver and loop over it until it's gone!
    ovValues.setLength(nValues);
    paiValues = ovValues.ptr();
    //_iCurCodeText = 0;
    //_pvCodeText = (DataTypes.VecU32) vCodeText;
    //_pcCodeTextLen = nBitsCodeText;
    /////
    // If the fixed-width total bits are better, then write out the values
    // in a single fixed-width format.
    /////
    // Read the variable-width tag
    Int32 iTmp = 0;
    GetUnsignedBits(iTmp, 1); // 0 = Fixed-width, 1 = Variable width
    if (iTmp == 0) 
    {

        // Read the min and max symbols from the stream
        GetUnsignedBits(cBitsInMinSymbol, 6);
        GetUnsignedBits(cBitsInMaxSymbol, 6);
        GetSignedBits (iMinSymbol, cBitsInMinSymbol);
        GetSignedBits (iMaxSymbol, cBitsInMaxSymbol);
        cNumCurBits = _nBitsInSymbol(iMaxSymbol - iMinSymbol);
        // Read each fixed-width field and output the value
        while (nBits < nTotalBits || nSyms < nValues) 
        {
            GetUnsignedBits(iSymbol, cNumCurBits);
            iSymbol += iMinSymbol;
            //paiValues++ = iSymbol;
            nSyms++;
        }
    }
    /////
    // Otherwise, encode with variable-length fields
    /////
    else 
    {
        // Write out the mean value
        Int32 iMean = 0;
        Int32 cBlkValBits = 0;
        Int32 cBlkLenBits = 0;

        GetSignedBits(iMean, 32);
        GetUnsignedBits(cBlkValBits, 3);
        GetUnsignedBits(cBlkLenBits, 3);

        // Set the initial field-width
        Int32 cMaxFieldDecr = -(1 << (cBlkValBits - 1)), // -ve number
        cMaxFieldIncr = (1 << (cBlkValBits - 1)) - 1; // +ve number
        Int32 cCurFieldWidth = 0;
        Int32 cDeltaFieldWidth = 0;
        Int32 cRunLen = 0;
        Int32 k = 0;

        for (Int32 ii = 0 ; ii < nValues ;) 
        {
            // Adjust the current field width to the target field width
            do 
            {
                GetSignedBits(cDeltaFieldWidth, cBlkValBits);
                cCurFieldWidth += cDeltaFieldWidth;
            } 
            while (cDeltaFieldWidth == cMaxFieldDecr || cDeltaFieldWidth == cMaxFieldIncr);

        // Read in the run length
        GetUnsignedBits(cRunLen, cBlkLenBits);

        // Read in the data bits for the run
        for (k = ii ; k < ii + cRunLen ; k++) 
        {
            GetSignedBits(iTmp, cCurFieldWidth);
            //paiValues++ = iTmp + iMean;
        }
        // Advance to the end of the run
        ii += cRunLen;
        }
    }
    // Assert that we have consumed exactly all of the bits
    //Assert(nValBits == 0);
    //Assert(uVal == 0);
    return true;
    }

    Int32 _nBitsInSymbol(Int32 iSymbol) 
    {
        // Zero is the only number that can be encoded in a
        // single bit with this scheme, so this method returns
        // 0 bits for a symbol value of zero!
        if (iSymbol == 0)
        return 0;
        // Note: This calculation assumes that iSymbol is
        // positive!
        Int32 cMaxCodeSpan = 0;//::abs(iSymbol);
        Int32 i, nBits;
        for (i = 1, nBits = 0 ; i <= cMaxCodeSpan && nBits < 31 ; i += i, nBits++);
        return nBits;
    }

    bool getNextCodeText (UInt32 uCodeText, Int32 nBits)
    {
        //uCodeText = _pvCodeText->value(_iCurCodeText);
        //nBits = ::min(32, *_pcCodeTextLen - 32 * _iCurCodeText);
        //_iCurCodeText++;
        return true;
    }


    void GetUnsignedBits(int val1, int val2)
    {

    }

    void GetSignedBits(int val1, int val2)
    {

    }
}
}