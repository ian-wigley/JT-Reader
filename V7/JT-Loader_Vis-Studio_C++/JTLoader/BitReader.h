#pragma once
#include <Windows.h>
#include "Reader.h"
#include <vector>
#include "BitBuffer.h"

class BitReader
{
public:
	BitReader(void);

	BitReader(Reader reader);

	~BitReader(void);
	int getNbBitsLeft(void);
	long readU32(int nbBits, int* _filePosCount);

private:
	BitBuffer* bitBuf;
	Reader m_reader;
	vector<int> encodedBytes;
	int* m_filePos;
};
