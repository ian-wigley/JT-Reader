#pragma once

#include <Windows.h>
#include <richedit.h>
#include "Reader.h"
#include "Int32CDP.h"
#include "CodecDriver.h"

class TriStripSetShapeLODElement
{
public:
	TriStripSetShapeLODElement(void);
	~TriStripSetShapeLODElement(void);

	TriStripSetShapeLODElement(float fileVersion, HWND richTextBox, vector<UCHAR> segmentBytes, INT32* filePointer, Reader reader);
	void traverseData();

	std::vector<int> GetIndices(void);
	std::vector<float> GetVertices(void);
	std::vector<float> GetNormals(void);

    HWND _richTextBox;
    int _versionNumber;
    float _fileVersion;

    UCHAR _data;
    UCHAR _fileBytes;
    UCHAR _guidBytes;
    UCHAR _bitsPerVertex;

    bool PolylineShape;
    int _geometryFilePosCount;

private:
	vector<UCHAR> _segmentBytes;
	vector<float> _vertex;
	vector<float> _normal;

	vector<INT32> _residualValues;
	vector<INT32> _primitiveListIndices;

	vector<INT32> _faceIndices;

	int* _filePosCount;
	Reader _reader;
	CodecDriver _codecDriver1;

	Int32CDP _int32CDP;

	void VertexShapeLodDataCollection(void);
	void QuantizationParameters(void);
	void readLossyQuantizedRawVertexData(void);
	void readLosslessCompressedRawVertexData(int normalBinding, int textureCoordBinding, int colorBinding);
	float readFloat(void);
};