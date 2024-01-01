#pragma once
#include <Windows.h>
#include <stdio.h>
#include <conio.h>
#include <vector>
#include "zlib.h"

// link the static lib
#pragma comment (lib, "zlib1d.lib")

using namespace std;
	
// Vector Struct
struct Vector3
{
	float x;
	float y;
	float z;
};

// Bounding Box Float32 Type
struct BBoxF32
{
	Vector3 minCorner;
	Vector3 maxCorner;
};

class Reader
{
public:
	Reader(void);
	~Reader(void);
	Reader(std::vector<char> jt_file);

	std::vector<char> _jt_file;
	std::vector<char> _backUp;

	std::vector<byte> getBytes(INT32* filePointer, INT32 size);

	float getFloat32(INT32* filePointer, int i);
	UINT64 getUInt64(INT32* filePointer);
	UINT32 getUInt32(INT32* filePointer);
	INT16 getInt16(INT32* filePointer);
	INT32 getInt32(INT32* filePointer);
	short getShort(INT32* filePointer);
	UCHAR getBtye(INT32* filePointer);
	GUID getGuid(INT32* filePointer);

	BBoxF32 getBBoxF32(INT32* filePointer);

	// Zlib decompression
	BYTE* decompress(ULONG sizeDataCompressed,ULONG sizeDataUncompressed, BYTE* dataReadInCompressed);

	void updateData(std::vector<char> newData);
	void restoreData();
	void setByteOrder(TCHAR byteOrder);
	TCHAR getByteOrder(void);

private:
	TCHAR _byteOrder;

	#pragma region Byte Reading
	#pragma endregion
};