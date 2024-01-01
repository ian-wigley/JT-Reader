#pragma once
#include <Windows.h>
#include "CodecDriver.h"
#include "BitBuffer.h"

class BitLengthCodec
{
public:
	BitLengthCodec(void);
	~BitLengthCodec(void);
	BOOL decode(CodecDriver* pDriver);
	INT32 cStepBits;
};

