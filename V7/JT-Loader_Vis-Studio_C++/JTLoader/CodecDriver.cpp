
#include "CodecDriver.h"

CodecDriver::CodecDriver(void)
{
	_codeTextLength = 0;

	// Number of symbols to read
	_valueElementCount = 0;
	_nextCodeTextCount = 0;
	_nextSymbolCount = 0;
	_iSymbol.resize(_valueElementCount);
}

CodecDriver::CodecDriver(vector<UINT32> codeTextWords, INT32 codeTextLength, INT32 valueElementCount)
{
	_codeTextWords = codeTextWords;
	_codeTextLength = codeTextLength;

	// Number of symbols to read
	_valueElementCount = valueElementCount;
	_nextCodeTextCount = 0;
	_nextSymbolCount = 0;
	_iSymbol.resize(_valueElementCount);
}

CodecDriver::~CodecDriver(void)
{
}

BOOL CodecDriver::unpackResiduals(vector<INT32>& rvResidual, vector<INT32>& rvVals, PredictorType ePredType)
{
	INT32 iPredicted;
	INT32 len = rvResidual.size();
	rvVals.resize(len);
	vector<INT32> aVals = rvVals;
	vector<INT32> aResidual = rvResidual;

	for( INT32 i = 0; i < len; i++ )
	{
		if( i < 4 )
		{
			// The first four values are just primers
			rvVals[i] = rvResidual[i];
		}
		else
		{
			// Get a predicted value
			iPredicted = CodecDriver::predictValue(rvVals, i, ePredType);
			if( ePredType == PredXor1 || ePredType == PredXor2 )
			{
				// Decode the residual as the current value XOR predicted
				rvVals[i] = aResidual[i] ^ iPredicted;
			}
			else
			{
				// Decode the residual as the current value plus predicted
				rvVals[i] = aResidual[i] + iPredicted;
			}
		}
	}
	return TRUE;
}

INT32 CodecDriver::predictValue(vector<INT32>& aVals, INT32 iIndex, PredictorType ePredType)
{
	INT32 iPredicted,
		v1 = aVals[iIndex-1],
		v2 = aVals[iIndex-2],
		v3 = aVals[iIndex-3],
		v4 = aVals[iIndex-4];
	switch( ePredType )
	{
	default:
	case PredLag1:
	case PredXor1:
		iPredicted = v1;
		break;
	case PredLag2:
	case PredXor2:
		iPredicted = v2;
		break;
	case PredStride1:
		iPredicted = v1 + (v1 - v2);
		break;
	case PredStride2:
		iPredicted = v2 + (v2 - v4);
		break;
	case PredStripIndex:
		if( v2 - v4 < 8 && v2 - v4 > -8 )
			iPredicted = v2 + (v2 - v4);
		else
			iPredicted = v2 + 2;
		break;
	case PredRamp:
		iPredicted = iIndex;
		break;
	}
	return iPredicted;
}

INT32 CodecDriver::numSymbolsToRead()
{
	return 0;
}

// Returns index of the first context entry and total number of bits
BOOL CodecDriver::getDecodeData(INT32& iFirstContext, INT32& nTotalBits)
{
	iFirstContext = 0;
	nTotalBits = _codeTextLength;
	return TRUE;
}

// Returns the next 32 bits of CodeText
INT32 CodecDriver::getNextCodeText(void)
{
	if (_nextCodeTextCount < _codeTextWords.size())
	{
		INT32 uCodeText = _codeTextWords.at(_nextCodeTextCount);
		_nextCodeTextCount++;
		return uCodeText;
	}
	return 0;
}

// Returns the next 32 bits of CodeText
BOOL CodecDriver::getNextCodeText(UINT32& uCodeText, INT32& nValBits)
{
	if (_nextCodeTextCount < _codeTextWords.size())
	{
		uCodeText = _codeTextWords.at(_nextCodeTextCount);

		_nextCodeTextCount++;

		// Number of accumulated value bits
		nValBits = 8;

		return TRUE;
	}
	else
	{
		return false;
	}
}

// Adds the decoded symbol back to the driver
BOOL CodecDriver::addOutputSymbol(INT32 iSymbol, INT32& iNextContext)
{
	if (_nextSymbolCount < _iSymbol.size())
	{
		_iSymbol.at(_nextSymbolCount) = iSymbol;
		INT32 _iNextContext = iNextContext;
		_nextSymbolCount ++;
		return TRUE;
	}
	else
	{
		return false;
	}
}

// ---------- Symbol Probability Context Interface ----------
BOOL CodecDriver::clearAllContexts()
{
	return TRUE;
}

// Retrieves a new probability context
BOOL CodecDriver::getNewContext(ProbabilityContext& rpCntx)
{
	return TRUE;
}

// Returns the total number of contexts
INT32 CodecDriver::numContexts()
{
	return _codeTextWords.size();
}

// Returns the probability context for a given index
BOOL CodecDriver::getContext(INT32 iSymContext, ProbabilityContext& rpCntx)
{
	return TRUE;
}

// Method to convert BYTES (UCHAR) to UINT32
UINT32 CodecDriver::getUINT32(UCHAR* codeTextWords)
{
	UINT32 num = 0;
	for (int i = 0; i < 4; i++)
	{
		num = (num << 8) + codeTextWords[i];
	}
	return num;
}

vector<INT32> CodecDriver::getIndices(void)
{
	return _iSymbol;
}