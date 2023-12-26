#include "Reader.h"

Reader::Reader(void)
{
}

Reader::Reader(std::vector<char> jt_file)
{
	_jt_file = jt_file;
}

Reader::~Reader(void)
{
}

#pragma region Byte Reading

float Reader::getFloat32(INT32* filePointer, int i)
{
	UCHAR fileBytes [4];

	fileBytes[0] = (UCHAR)_jt_file.at(*filePointer + 0);
	fileBytes[1] = (UCHAR)_jt_file.at(*filePointer + 1);
	fileBytes[2] = (UCHAR)_jt_file.at(*filePointer + 2);
	fileBytes[3] = (UCHAR)_jt_file.at(*filePointer + 3);


    float result;
    std::copy(reinterpret_cast<const char*>(&fileBytes[0]),
              reinterpret_cast<const char*>(&fileBytes[4]),
              reinterpret_cast<char*>(&result));

	*filePointer += sizeof(float);
	return result;
}


// Read the next 8 bytes, increment the file position by 4 bytes
UINT64 Reader::getUInt64(INT32* filePointer)
{
	UCHAR fileBytes [8];
	UINT64 num = 0;
	for (int i = 0; i < 8; i++)
	{
		fileBytes[i] = (UCHAR)_jt_file.at(*filePointer + i);
		num = (num << 8) + fileBytes[i];
	}
	// Increment the filePointer by the size of an Integer
	*filePointer += sizeof(UINT64);
	return num;
}


// Read the next 4 bytes & increment the file position by 4 bytes
UINT32 Reader::getUInt32(INT32* filePointer)
{
	UCHAR fileBytes [4];
	UINT32 num = 0;
	for (int i = 0; i < 4; i++)
	{
		fileBytes[i] = (UCHAR)_jt_file.at(*filePointer + i);
		num = fileBytes[i];
	}
	// Increment the filePointer by the size of an unsigned Int 32
	*filePointer += sizeof(UINT32);
	return num;
}

INT16 Reader::getInt16(INT32* filePointer)
{
	UCHAR fileBytes [4];
	int num = 0;
	for (int i = 3; i > -1; i--)
	{
		fileBytes[i] = (UCHAR)_jt_file.at(*filePointer + i);
		num = (num << 8) + fileBytes[i];
	}
	// Increment the filePointer by the size of an Int16
	*filePointer += sizeof(INT16);
	return num;
}

// Read the next 4 bytes & increment the file position by 4 bytes
INT32 Reader::getInt32(INT32* filePointer)
{
	UCHAR fileBytes [4];
	int num = 0;
	for (int i = 3; i > -1; i--)
	{
		fileBytes[i] = (UCHAR)_jt_file.at(*filePointer + i);
		num = (num << 8) + fileBytes[i];
	}
	// Increment the filePointer by the size of an Integer
	*filePointer += sizeof(int);
	return num;
}

// Read the next 2 bytes
short Reader::getShort(INT32* filePointer)
{
	UCHAR fileBytes [2];
	short num = 0;
	for (int i = 1; i > -1; i--)
	{
		fileBytes[i] = (UCHAR)_jt_file.at(*filePointer + i);
		num = (num << 8) + fileBytes[i];
	}
	*filePointer += sizeof(short);
	return num;
}

// Read the next byte (char)
UCHAR Reader::getBtye(INT32* filePointer)
{
	UCHAR num;
	num =  (UCHAR)_jt_file.at(*filePointer);
	*filePointer += sizeof(char);
	return num;
}

// Create a GUID
GUID Reader::getGuid(INT32* filePointer)
{
	GUID guid;
	guid.Data1 = getInt32(filePointer);
	guid.Data2 = getShort(filePointer);
	guid.Data3 = getShort(filePointer);

	for (int i = 0; i < 8; i++)
	{
		guid.Data4[i] = (UCHAR)_jt_file.at(*filePointer + i);
	}
	*filePointer += sizeof(guid.Data4);
	return guid;
}
#pragma endregion

// Method to get The Bounding Box information
BBoxF32 Reader::getBBoxF32(INT32* filePointer)
{
    BBoxF32 transformedBBox;
    transformedBBox.minCorner.x = getBtye(filePointer);
    transformedBBox.minCorner.y = getBtye(filePointer);
    transformedBBox.minCorner.z = getBtye(filePointer);

    transformedBBox.maxCorner.x = getBtye(filePointer);
    transformedBBox.maxCorner.y = getBtye(filePointer);
    transformedBBox.maxCorner.z = getBtye(filePointer);

	return transformedBBox;
}

// Method to decompress the Zlib'ed data
BYTE* Reader::decompress(ULONG sizeDataCompressed, ULONG sizeDataUncompressed, BYTE* dataReadInCompressed)
{
	int z_result = 0;
    BYTE* dataUncompressed = (BYTE*)malloc( sizeDataUncompressed );

    z_result = uncompress(

        dataUncompressed,       // destination for the uncompressed
                                // data.  This should be the size of
                                // the original data, which you should
                                // already know.

        &sizeDataUncompressed,  // length of destination (uncompressed)
                                // buffer

        dataReadInCompressed,   // source buffer - the compressed data

        sizeDataCompressed );   // length of compressed data in bytes

    switch( z_result )
    {
    case Z_OK:
        printf("***** Unzipped Successfully! *****\n");
        break;

    case Z_MEM_ERROR:
        printf("out of memory\n");
        exit(1);
        break;

    case Z_BUF_ERROR:
        printf("output buffer wasn't large enough!\n");
        exit(1);
        break;
    }
	return dataUncompressed;
}

// Method to change the data to be traversed, i.e. after unzipping
void Reader::updateData(std::vector<char> newData)
{
	// Store the original data into a backup for now
	_backUp = _jt_file;
	_jt_file = newData;
}

// Method to revert the data back to be orginal
void Reader::restoreData()
{
	_jt_file = _backUp;
}

// Method to record the file Byte Order (Big or Little Endian)
void Reader::setByteOrder(TCHAR byteOrder)
{
	_byteOrder = byteOrder;
}

// Method to record the file Byte Order (Big or Little Endian)
TCHAR Reader::getByteOrder(void)
{
	return _byteOrder;
}

// Method get an Vector of Bytes
std::vector<byte> Reader::getBytes(INT32* filePointer, INT32 size)
{
	vector<byte> m_bytes;
	for (int i = 0; i < size; i++)
	{
		byte m_temp = _jt_file.at(*filePointer);
		m_bytes.push_back(m_temp);
		*filePointer += 1;
	}
	return m_bytes;
}