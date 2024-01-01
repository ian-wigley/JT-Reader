
#include "Int32CDP.h"

Int32CDP::Int32CDP(void)
{
}

Int32CDP::~Int32CDP(void)
{
}

Int32CDP::Int32CDP(INT32* filePointer, Reader reader)
{
	_filePosCount = filePointer;
	_reader = reader;
}

// Mthod to Traverse the codecs
vector<INT32> Int32CDP::traverseData(PredictorType ePredType)
{
	return Int32CDPRead();
}


vector<INT32> Int32CDP::Int32CDPRead()
{
	_contextSwitch = false;

	UCHAR codecType = _reader.getBtye(_filePosCount);

	#pragma region Huffman Codec
		if (codecType == 2)
		{
			MessageBox(0, TEXT("***** Not Implemented *****"), TEXT("Huffman Codec"), 0);
		}
	#pragma endregion

	#pragma region Arithmetic Codec
		if (codecType == 3)
		{
			_codecDriver1 = new CodecDriver();

            _int32ProbabilityContexts = new Int32ProbabilityContexts(_filePosCount, _reader);

			_contextSwitch = true;

            // Get the number of Out Of Band Values
            INT32 _outOfBandValueCount = _reader.getInt32(_filePosCount);

            if (_outOfBandValueCount > 0)
            {
				vector<int> _oOOBValues = Int32CDPRead();

                // Pass the 'Out of Band' values to the Probability Contexts
                _int32ProbabilityContexts->SetOOBValues(_oOOBValues);
            }
		}
#pragma endregion

#pragma region Null Codec
	if (codecType == 0)
	{
	}
#pragma endregion

	if (codecType != 0)
	{
		// The total number of bits of CodeText Data
		INT32 _codeTextLength = _reader.getInt32(_filePosCount);

		// The number of values that the Codec is expected to decode
		INT32 _valueElementCount = _reader.getInt32(_filePosCount);

		if (!_contextSwitch || _int32ProbabilityContexts->GetTableCount() == 1)
		{
			_codeTextCount = _valueElementCount;
			_contextSwitch = true;
		}
		else
		{
			// VecU32 codeText
			_codeTextCount = _reader.getInt32(_filePosCount);
		}

		// Count the number of codetext words required
		int counter = _reader.getInt32(_filePosCount);

		vector<UINT32> _codeTextWords;

		_codeTextWords.resize(counter * 4);

		for (int i = 0; i < counter * 4; i+=4)
		{
			ReadCodeText(_codeTextWords, i);
		}

#pragma region Bitlength Codec
		if (codecType == 1)
		{
			_bitLengthCodec = BitLengthCodec();
			_codecDriver1 = new CodecDriver(_codeTextWords,_codeTextLength, _valueElementCount);
			_bitLengthCodec.decode(_codecDriver1);
			_primitiveListIndices = _codecDriver1->getIndices();
		}
#pragma endregion

#pragma region Arimetic Codec
        if (codecType == 3)
        {	_arithmeticCodec = ArithmeticCodec();
			_codecDriver1 = new CodecDriver(_codeTextWords,_codeTextLength, _valueElementCount);
			_primitiveListIndices = _arithmeticCodec.DecodeArithmetic(_int32ProbabilityContexts, _codeTextWords, _codeTextLength, _codeTextCount, _valueElementCount);
        }
#pragma endregion

	}
	return _primitiveListIndices;
}

// Method to extract the CodeText Words & re-order if necessary
void Int32CDP::ReadCodeText(vector<UINT32> &_codeTextWords, INT32 _count)
{
    UCHAR* _fileBytes = new UCHAR[4];

	// Code Text Word
	_fileBytes[0] = _reader.getBtye(_filePosCount);
	_fileBytes[1] = _reader.getBtye(_filePosCount);
	_fileBytes[2] = _reader.getBtye(_filePosCount);
	_fileBytes[3] = _reader.getBtye(_filePosCount);

    // if littleEndian swap byte order
	if (_reader.getByteOrder() == 0)
	{
		_codeTextWords[0 + _count] = _fileBytes[3];
		_codeTextWords[1 + _count] = _fileBytes[2];
		_codeTextWords[2 + _count] = _fileBytes[1];
		_codeTextWords[3 + _count] = _fileBytes[0];
	}
	else
	{
		_codeTextWords[0 + _count] = _fileBytes[0];
		_codeTextWords[1 + _count] = _fileBytes[1];
		_codeTextWords[2 + _count] = _fileBytes[2];
		_codeTextWords[3 + _count] = _fileBytes[3];
	}
}