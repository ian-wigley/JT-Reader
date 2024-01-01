
#include "BitBuffer.h"

BitBuffer::BitBuffer(void)
{
	bitPos = 0;
	bitBuffer = 0x0000;
	nBits = 0;
	count = 0;
}

BitBuffer::~BitBuffer(void)
{
}

BitBuffer::BitBuffer(vector<UINT32> buffer)
{
	bitPos = 0;
	bitBuffer = 0x0000;
	nBits = 0;
	count = 0;
	m_buffer = buffer;
}

BitBuffer::BitBuffer(CodecDriver* pDriver)
{
	bitPos = 0;
	bitBuffer = 0x0000;
	nBits = 0;
	count = 0;
	_pDriver = pDriver;
}

int BitBuffer::getBitPos(void)
{
	int i = this->bitPos;
	return bitPos;
}

byte BitBuffer::readAsByte(int nbBits)
{
	return (byte)readAsLong(nbBits);
}

int BitBuffer::readAsInt(int nbBits)
{
	return (int)readAsLong(nbBits);
}

int BitBuffer::readAsInt(long bitPos, int nbBits)
{
	return (int)readAsLong(bitPos, nbBits);
}

long BitBuffer::readAsLong(int nbBits)
{
	return readAsLong(0, nbBits);
}

long BitBuffer::getBitBufBitSize(void)
{
    return m_buffer.size() * 8;
}

long BitBuffer::readAsLong(long bPos, int nbBits)
{
	long value = 0;
	long len = bPos + nbBits;

	// len = number of bits to read, we skip bPos bits and create a long
	// with nbBits bits
	while (len > 0)
	{
		// Not enough bits in the buffer => We read another byte
		if (nBits == 0)
		{
			if (m_buffer.size() == 0)
			{
				bitBuffer = _pDriver->getNextCodeText();

				nBits = 8;
				bitBuffer &= (int)0xFFL;

				count = (count + 1) % _pDriver->numContexts();
			}
			else
			{
				bitBuffer = m_buffer.at(count);

				nBits = 8;
				bitBuffer &= (int)0xFFL;

				count = (count + 1) % m_buffer.size();
			}
		}

		// This test skips the first bPos bits
		if (bPos == 0)
		{
			value <<= 1;
			// The value of the msb is added to the value result
			int test = bitBuffer >> 7;
			value |= (int)(bitBuffer >> 7);
		}
		else
		{
			bPos--;
		}
		// Remove the msb so the 2nd bit becomes the msb
		bitBuffer <<= 1;
		bitBuffer &= (int)0xFFL;
		nBits--;
		len--;
		bitPos++;

	}

	return value;
}

