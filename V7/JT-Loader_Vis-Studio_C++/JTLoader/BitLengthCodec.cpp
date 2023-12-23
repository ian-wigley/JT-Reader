
#include "BitLengthCodec.h"

BitLengthCodec::BitLengthCodec(void)
{
	cStepBits = 2;
}

BitLengthCodec::~BitLengthCodec(void)
{
}

BOOL BitLengthCodec::decode(CodecDriver* pDriver)
{
	INT32 nBits = 0;
	INT32 nTotalBits = 0;
	INT32 nValBits = 0;
	INT32 iContext = 0;
	UINT32 uVal = 0;
	UINT32 value = 0;
	UINT32 uLastIncBit = 0;
	INT32 cNumCurBits = 0;
	INT32 nAccBits = 0;
	INT32 iDecodeState = 0;

	// Get codetext from the driver and loop over it until it's gone!
	pDriver->getDecodeData(iContext, nTotalBits);

	int codeTextLength = nTotalBits;

	BitBuffer* encodedBits = new BitBuffer(pDriver);

	int bitFieldWith = 0;
	int position = 0;

	while (encodedBits->getBitPos() < codeTextLength)
	{
		if (encodedBits->readAsInt(1) == 0)
		{
			// Decode symbol with same bit field length
			int decodedSymbol = -1;
			if (bitFieldWith == 0)
			{
				decodedSymbol = 0;
			}
			else
			{
				//**** Decode the Symbols *****
				decodedSymbol = encodedBits->readAsInt(bitFieldWith);

				// Convert and sign-extend the symbol
				decodedSymbol <<= (32 - bitFieldWith);
				decodedSymbol >>= (32 - bitFieldWith);
			}
			pDriver->addOutputSymbol(decodedSymbol, iContext);
		}
		else
		{
			// Adjust bit field length
			int adjustmentBit = encodedBits->readAsInt(1);
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
			while (encodedBits->readAsInt(1) == adjustmentBit);

			// Decode symbol with new bit field length
			int decodedSymbol = -1;
			if (bitFieldWith == 0)
			{
				decodedSymbol = 0;
			}
			else
			{
				decodedSymbol = encodedBits->readAsInt(bitFieldWith);
				// Convert and sign-extend the symbol
				decodedSymbol <<= (32 - bitFieldWith);
				decodedSymbol >>= (32 - bitFieldWith);
			}
			pDriver->addOutputSymbol(decodedSymbol, iContext);
		}
	}
	return TRUE;
}