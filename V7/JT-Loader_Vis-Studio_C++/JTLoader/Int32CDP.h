#pragma once

#include <Windows.h>
#include "Reader.h"
#include "CodecDriver.h"
#include "BitLengthCodec.h"
#include "ArithmeticCodec.h"
#include "Int32ProbabilityContexts.h"

class Int32CDP
{
public:
	Int32CDP(void);
	~Int32CDP(void);
	Int32CDP(INT32* filePointer, Reader reader);

	void traverseData(void);
	vector<INT32>  traverseData(PredictorType ePredType);
	vector<INT32> Int32CDPRead(void);

private:
	Reader _reader;
	CodecDriver* _codecDriver1;
	BitLengthCodec _bitLengthCodec;
	ArithmeticCodec _arithmeticCodec;
	Int32ProbabilityContexts* _int32ProbabilityContexts;

	INT32 _codeTextCount;
    int _versionNumber;
    float _fileVersion;
	int* _filePosCount;
	vector<INT32> _primitiveListIndices;
	void ReadCodeText(vector<UINT32> &_codeTextWords, INT32 _count);
	bool _contextSwitch;
};