#pragma once
#include <Windows.h>
#include "CodecDriver.h"

class BitBuffer
{
public:
	BitBuffer(void);
	~BitBuffer(void);
	BitBuffer(INT32* buffer);
	BitBuffer(CodecDriver* pDriver);
	BitBuffer(vector<UINT32> buffer);

	byte readAsByte(int nbBits);
	int getBitPos(void);
	int readAsInt(int nbBits);
	int readAsInt(long bitPos, int nbBits);

	long getBitBufBitSize(void);

	long readAsLong(int nbBits);
	long readAsLong(long bPos, int nbBits);

	INT32* buffer;
	int bitBuffer;
    int nBits;
    int bitPos;
    int count;
	CodecDriver* _pDriver;

private:

	vector<UINT32> m_buffer;
};