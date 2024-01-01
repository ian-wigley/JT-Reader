#pragma once

#include <Windows.h>
#include <vector>
#include "ProbabilityContext.h"

using namespace std;
	
// ---------- Predictor Type Residual Unpacking ----------
	typedef enum {
		PredLag1 = 0,
		PredLag2 = 1,
		PredStride1 = 2,
		PredStride2 = 3,
		PredStripIndex = 4,
		PredRamp = 5,
		PredXor1 = 6,
		PredXor2 = 7,
		PredNULL = 8
	} PredictorType;

class CodecDriver
{
public:
	CodecDriver(void);
	~CodecDriver(void);

	CodecDriver(vector<UINT32> codeTextWords, INT32 codeTextLength, INT32 valueElementCount);

	// ---------- Codec Decoding Interface ----------

	// Returns the number of symbols to be read
	INT32 numSymbolsToRead();

	// Returns index of the first context entry and total number of bits
	BOOL getDecodeData(INT32& iFirstContext, INT32& nTotalBits);

	// Returns the next 32 bits of CodeText
	BOOL getNextCodeText(UINT32& uCodeText, INT32& nBits);
	
	INT32 CodecDriver::getNextCodeText(void);

	// Adds the decoded symbol back to the driver
	BOOL addOutputSymbol(INT32 iSymbol, INT32& iNextContext);

	// ---------- Symbol Probability Context Interface ----------
	BOOL clearAllContexts();

	// Retrieves a new probability context
	BOOL getNewContext(ProbabilityContext& rpCntx);

	// Returns the total number of contexts
	INT32 numContexts();

	// Returns the probability context for a given index
	BOOL getContext(INT32 iSymContext, ProbabilityContext& rpCntx);


	#define Float64 double
	UINT32 getUINT32(UCHAR* codeTextWords);

	// Returns the original values from the predicted residual values.
	static BOOL unpackResiduals(vector<INT32>& rvResidual, vector<INT32>& rvVals, PredictorType ePredType);
	static BOOL unpackResiduals(vector<Float64>& rvResidual, vector<Float64>& rvVals,PredictorType ePredType);

	// Predict values
	static INT32 predictValue(vector<INT32>& aVals, INT32 iIndex, PredictorType ePredType);
	static Float64 predictValue(vector<Float64>& vVal, INT32 iIndex, PredictorType ePredType);

	// Grab the Indices
	vector<INT32> getIndices(void);

private:
	vector<UINT32> _codeTextWords;

	INT32 _codeTextLength;
	INT32 _valueElementCount;

	unsigned int _nextSymbolCount ;
	unsigned int _nextCodeTextCount;
	int _count;

	vector<INT32> _iSymbol;

};