#pragma once

#include <Windows.h>
#include "ArithmeticProbabilityRange.h"
#include "BitBuffer.h"
#include "CodecDriver.h"
#include "CntxEntry.h"
#include "Int32ProbabilityContexts.h"
#include "vector"

class ArithmeticCodec
{
public:
	ArithmeticCodec(void);
	~ArithmeticCodec(void);
	BOOL decode( CodecDriver* pDriver );
	std::vector<int> DecodeArithmetic(Int32ProbabilityContexts* probCtxt, vector<UINT32> encodedBytes, int codeTextLength, int codeTextCount, int numSymbolsToRead);

private:

	// Remove the most recently decoded symbol from the front of the list of encoded symbols.
	BOOL removeSymbolFromStream( ArithmeticProbabilityRange& sym, CodecDriver* pDriver);
	void removeSymbolFromStream(ArithmeticProbabilityRange* sym);

    BitBuffer* encodedBits;
	CntxEntry* currEntry;

	//State variables used in decoding.
	UINT16 code;
	UINT16 low;
	UINT16 high;
	UINT32 bitBuffer;
	INT32 nBits;
};