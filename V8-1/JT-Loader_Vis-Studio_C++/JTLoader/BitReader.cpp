
#include "BitReader.h"

BitReader::BitReader(void)
{
	bitBuf = new BitBuffer();
}

BitReader::BitReader(Reader reader)
{
	bitBuf = new BitBuffer();
	m_reader = reader;
}

BitReader::~BitReader(void)
{
}

long BitReader::readU32(int nbBits, int* _filePosCount)
{
	if (nbBits == 0)
	{
		return 0;
	}

	int nbLeft = getNbBitsLeft();

	// If there are not enough bits already read and stored in bitBuf we
	// read additional bytes and update the bitBuffer
	if (nbLeft < nbBits)
	{
		int nbBytes = ((nbBits - nbLeft - 1) / 8) + 1;
		int sizeBytes = nbBytes;
		int cpt = 0;

		if (nbLeft != 0)
		{
			sizeBytes += 1;
		}

		vector<UINT> byteBuf;
		byteBuf.empty();
		byteBuf.resize(sizeBytes);

		if (nbLeft != 0)
		{
			byte remainingByte = bitBuf->readAsByte(nbLeft);
			byteBuf[cpt] = remainingByte;
			cpt += 1;
		}

		vector<byte> tmpBytes;
		tmpBytes.resize(nbBytes);

		tmpBytes = m_reader.getBytes(_filePosCount, nbBytes);

		for (int i = cpt; i < sizeBytes; i++)
		{
			byteBuf[i] = tmpBytes[i - cpt];
		}

		bitBuf = new BitBuffer(byteBuf);
	}

	// Read the int
	if (nbLeft > 0)
	{
		if (nbLeft < nbBits)
			return bitBuf->readAsInt(8 - nbLeft, nbBits);
		else
			return bitBuf->readAsInt(nbBits);
	}
	else
	{
		long res = bitBuf->readAsInt(nbBits);
		return res;
	}
}

int BitReader::getNbBitsLeft(void)
{
	return (int)(bitBuf->getBitBufBitSize() - bitBuf->getBitPos());
}