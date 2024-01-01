
#include "TriStripSetShapeLODElement.h"

TriStripSetShapeLODElement::TriStripSetShapeLODElement(void)
{
}

TriStripSetShapeLODElement::TriStripSetShapeLODElement(float fileVersion, HWND richTextBox, vector<UCHAR> segmentBytes, INT32* filePointer, Reader reader)
{
	_richTextBox = richTextBox;
	_fileVersion = fileVersion;
	_segmentBytes = segmentBytes;
	_filePosCount = filePointer;
	_reader = reader;
	traverseData();
}

TriStripSetShapeLODElement::~TriStripSetShapeLODElement(void)
{
}

void TriStripSetShapeLODElement::traverseData()
{
	// 7.1.3.2.1 Logical Element Header
	VertexShapeLodDataCollection();
}

void TriStripSetShapeLODElement::VertexShapeLodDataCollection(void)
{
	// Increment the reader position
	*_filePosCount += 4;

	INT32 _elementLength = _reader.getInt32(_filePosCount);
	GUID _objectTypeID = _reader.getGuid(_filePosCount);
	BYTE _objectBaseType = _reader.getBtye(_filePosCount);

	if (_fileVersion >= 9.5)
	{
		INT32 _objectID = _reader.getInt32(_filePosCount);
	}

	_versionNumber = _reader.getInt16(_filePosCount);

	// Version number 1 is currently the only valid value.
	if (_versionNumber == 1)
	{
		if (_fileVersion < 9.5)
		{
			_codecDriver1 = CodecDriver();
			INT32 _bindingAttributes =  _reader.getInt32(_filePosCount);
			QuantizationParameters();

			// Increment the reader position
			*_filePosCount += 2;

			// Vertex Based Shape Compressed Rep data Collection Fig 175 page 235
			_versionNumber = _reader.getInt16(_filePosCount);
			UCHAR _normalBinding = _reader.getBtye(_filePosCount);
			UCHAR _textureCoordBinding = _reader.getBtye(_filePosCount);
			UCHAR _colorBinding = _reader.getBtye(_filePosCount);

			QuantizationParameters();

			_int32CDP = Int32CDP(_filePosCount, _reader);
			_residualValues = _int32CDP.traverseData(PredictorType::PredStride1);

			_codecDriver1.unpackResiduals(_residualValues, _primitiveListIndices,PredictorType::PredStride1);

			if (_bitsPerVertex == 0)
			{
				// Lossless Compressed Raw Vetex Data
				readLosslessCompressedRawVertexData(_normalBinding, _textureCoordBinding, _colorBinding);
			}
			else
			{
				// Lossy Quantized Raw Vertex Data
				readLossyQuantizedRawVertexData();
			}
		}
	}
	else
	{
		// JT Ver 9.1 To-do
	}
}

// Quantization parameters
void TriStripSetShapeLODElement::QuantizationParameters(void)
{
	_bitsPerVertex =  _reader.getBtye(_filePosCount);
	UCHAR _normalBitsFactor = _reader.getBtye(_filePosCount);
	UCHAR _bitsPerTexCoord = _reader.getBtye(_filePosCount);
	UCHAR _bitsPerColor = _reader.getBtye(_filePosCount);
}


void TriStripSetShapeLODElement::readLossyQuantizedRawVertexData(void)
{
// To-do
}


// Method to read the ZLib compressed Vertex, Normal & Colour information
void TriStripSetShapeLODElement::readLosslessCompressedRawVertexData(int normalBinding, int textureCoordBinding, int colorBinding)
{
	INT32 _uncompressedDataSize = _reader.getInt32(_filePosCount);
	INT32 _compressedDataSize = _reader.getInt32(_filePosCount);
	int* _tempFilePos = 0;
	int len = 0;
	INT32 filePosition = 0;

	// ZLIB compression
	if (_compressedDataSize > 0)
	{
		// Allocate some memory to hold the compressed data bytes
		UCHAR* _compressedData = (UCHAR*)malloc( _compressedDataSize );

		for (int j = 0; j < _compressedDataSize; j++)
		{
			_compressedData[j] = _reader.getBtye(_filePosCount);
		}

		// Pass the segment to the ZLib decompression method
		BYTE* _geometricalData = (BYTE*)malloc(_uncompressedDataSize);
		_geometricalData = _reader.decompress(_compressedDataSize,_uncompressedDataSize, _compressedData);

		vector<char> _deCompressedData;
		_deCompressedData.resize(_uncompressedDataSize);

		for (int j = 0; j < _uncompressedDataSize; j++)
		{
			_deCompressedData[j] = _geometricalData[j];
		}

		//Update the Reader with the unzipped Geometrical data
		_reader.updateData(_deCompressedData);

		// store the file position count
		_tempFilePos = _filePosCount;

		// Set the _file position to zero at the start of the unzipped data
		_filePosCount = &filePosition;

		len = _uncompressedDataSize;
	}
	else
	{
		// To-do
		len = 0;
	}

	int _numFaces = _primitiveListIndices.size() - 1;
	int _numVertices = _primitiveListIndices[_numFaces];

	_normal.resize(_numVertices * 3);
	_vertex.resize(_numVertices * 3);

	int _count = _uncompressedDataSize / 24;

	for (int i = 0; i < _count; i++)
	{
		int j = i * 3;

		if (normalBinding == 1)
		{
			_normal.at(j + 0) = _reader.getFloat32(_filePosCount,i);
			_normal.at(j + 1) = _reader.getFloat32(_filePosCount,i);
			_normal.at(j + 2) = _reader.getFloat32(_filePosCount,i);
		}
		_vertex.at(j + 0) = _reader.getFloat32(_filePosCount,i);
		_vertex.at(j + 1) = _reader.getFloat32(_filePosCount,i);
		_vertex.at(j + 2) = _reader.getFloat32(_filePosCount,i);
	}

//	int _numVertices = 0;
//	int _numFaces = 0;

	for (unsigned int i = 0; i < _primitiveListIndices.size() - 1; i++)
	{
		int start = _primitiveListIndices[i];
		int end = _primitiveListIndices[i + 1];
		_numVertices += end - start;
		_numFaces += end - start -2;
	}

	_faceIndices.resize(_numFaces*3);

	int k = 0;
	for (unsigned int i = 0; i < _primitiveListIndices.size() - 1; i++)
	{
		int start = _primitiveListIndices[i];
		int end = _primitiveListIndices[i + 1];
		for (int f = start; f < end-2; f++)
		{
			if (f % 2 == 0)
			{
				_faceIndices[k + 0] = f;
				_faceIndices[k + 1] = f + 1;
				_faceIndices[k + 2] = f + 2;
			}
			else
			{
				_faceIndices[k + 0] = f;
				_faceIndices[k + 2] = f + 1;
				_faceIndices[k + 1] = f + 2;
			}
			k += 3;
		}
	}

	//Update the Reader with the unzipped Geometrical data
	_reader.restoreData();

	// Restore the file Position Counter
	_filePosCount = _tempFilePos;
}

std::vector<int> TriStripSetShapeLODElement::GetIndices(void)
{
	return _faceIndices;
}

std::vector<float> TriStripSetShapeLODElement::GetVertices(void)
{
	return _vertex;
}

std::vector<float> TriStripSetShapeLODElement::GetNormals(void)
{
	return _normal;
}