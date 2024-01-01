
#include "ArithmeticCodec.h"

ArithmeticCodec::ArithmeticCodec(void)
{
	code = 0x0000,
	low = 0x0000,
	high = 0xffff,
	bitBuffer = 0x00000000,
	nBits = 0;
}

ArithmeticCodec::~ArithmeticCodec(void)
{
}

BOOL ArithmeticCodec::decode(CodecDriver* pDriver)
{
	ArithmeticProbabilityRange newSymbolRange;
	INT32 iCurrContext = 0;
	INT32 nDummyTotalBits = 0;
	INT32 nSymbols = pDriver->numSymbolsToRead();

	// Initialize decoding process
	INT32 nBitsRead = -1;
	pDriver->getNextCodeText(bitBuffer, nBitsRead);
	low = 0;
	high = 0xffff;
	code = (bitBuffer >> 16);
	bitBuffer <<= 16;
	nBits = 16;

	// Begin decoding
	pDriver->getDecodeData(iCurrContext, nDummyTotalBits);

	return TRUE;
}

BOOL ArithmeticCodec::removeSymbolFromStream( ArithmeticProbabilityRange &sym, CodecDriver *pDriver )
{
	// First, the range is expanded to account for the symbol removal.
	UINT32 range = UINT32(high - low) + 1;
	high = low + (UINT32)((range * sym.high_count) / sym.scale - 1);
	low = low + (UINT32)((range * sym.low_count ) / sym.scale);
	//Next, any possible bits are shipped out.
	for (;;)
	{
		// If the most signif digits match, the bits will be shifted out.
		if( (~(high^low)) & 0x8000 )
		{
			// Do nothing
		}
		else if( (low & 0x4000) && !(high & 0x4000) )
		{
			// Underflow is threatening, shift out 2nd most signif digit.
			code ^= 0x4000;
			low &= 0x3fff;
			high |= 0x4000;
		}
		else {
			// Nothing can be shifted out, so return.
			return TRUE;
		}
		low <<= 1;
		high <<= 1;
		high |= 1;
		code <<= 1;
		if( nBits == 0 )
		{
			// The returned nBits here will always be 32
			//			pDriver->getNextCodeText(bitBuffer, nBits);
		}
		code |= (UINT16)(bitBuffer >> 31);
		bitBuffer <<= 1;
		nBits--;
	}
}//Int32ProbabilityContexts


std::vector<int> ArithmeticCodec::DecodeArithmetic(Int32ProbabilityContexts* probCtxt, vector<UINT32> encodedBytes, int codeTextLength, int numSymbolsToRead, int codeTextCount)
{
	code = 0x0000;
	low = 0x0000;
	high = 0xffff;
	bitBuffer = 0x00000000;
	nBits = 0;

	vector<int> result;
	result.resize(numSymbolsToRead);

	int position = 0;
	int currContext = 0;
	int symbolsCurrCtx = 0;

	unsigned int cptOutOfBand = 0;
	vector<int> outofBandValues = probCtxt->GetOutOfBandValues();

	ArithmeticProbabilityRange* newSymbolRange;
	Int32ProbCtxtTable* pCurrContext;

	int nBitsRead = -1;
	encodedBits = new BitBuffer(encodedBytes);
	bitBuffer = encodedBits->readAsInt(32) & 0xFFFFFFFFL;

	code = (int)(bitBuffer >> 16);
	bitBuffer = (bitBuffer << 16) & 0xFFFFFFFFL;

	nBits = 16;

	// Begin decoding
	for (int ii = 0; ii < numSymbolsToRead; ii++)
	{
		// Returns the probability context for a given index
		pCurrContext = probCtxt->GetContext(currContext);

		symbolsCurrCtx = pCurrContext->GetTotalCount();

		long rescaledCode = ((((long)(code - low) + 1) * symbolsCurrCtx - 1) / ((long)(high - low) + 1));

		currEntry = pCurrContext->LookupEntryByCumCount(rescaledCode);

		newSymbolRange = new ArithmeticProbabilityRange(currEntry->getCumCount(), currEntry->getCumCount() + currEntry->getOccCount(), symbolsCurrCtx);

		removeSymbolFromStream(newSymbolRange);

		int symbol = (int)currEntry->getSymbol();
		int outValue = 0;

		if ((symbol == -2) && (currContext == 0))
		{
			if (cptOutOfBand < outofBandValues.size())
			{
				outValue = outofBandValues[cptOutOfBand];
				cptOutOfBand++;
			}
		}
		else
		{
			outValue = (int)currEntry->getAssociatedValue();
		}
		if ((symbol != -2) || (currContext == 0))
		{
			result[position++] = outValue;
		}
		currContext = currEntry->getNextContext();

	}
	return result;
}


void ArithmeticCodec::removeSymbolFromStream(ArithmeticProbabilityRange* sym)
{
	// First, the range is expanded to account for the symbol removal.
	int range = high - low + 1;
	high = low + (int)((range * sym->getHigh()) / sym->getScale() - 1);
	low = low + (int)((range * sym->getLow()) / sym->getScale());

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
			bitBuffer = encodedBits->readAsInt(32) & 0xFFFFFFFFL;

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
