
#include "Int32ProbabilityContexts.h"

Int32ProbabilityContexts::Int32ProbabilityContexts(void)
{
}

Int32ProbabilityContexts::~Int32ProbabilityContexts(void)
{
}

Int32ProbabilityContexts::Int32ProbabilityContexts(INT32* filePointer, Reader reader)
{
	_filePosCount = filePointer;
	_reader = reader;

	UCHAR probabilityContextTableCount = _reader.getBtye(_filePosCount);
	bool _firstTable = true;

	for (int i = 0; i < probabilityContextTableCount; i++)
	{
		// Create a new Table to hold the context
		m_ctxTable = new Int32ProbCtxtTable(_reader, _filePosCount, _firstTable);
		m_ctxtTable.push_back(m_ctxTable);

		_firstTable = false;
	}
}

// Return the Out Of Band Values
vector<int> Int32ProbabilityContexts::GetOutOfBandValues(void)
{
    return this->m_OOBvalues;
}

// Returns the probability context for a given index
Int32ProbCtxtTable* Int32ProbabilityContexts::GetContext(int currContext)
{
	return this->m_ctxtTable[currContext];
}

// Initialise the out of band values
void Int32ProbabilityContexts::SetOOBValues(vector<int> values)
{
	m_OOBvalues = values;
}

int Int32ProbabilityContexts::GetTableCount()
{
	return this->m_ctxtTable.size();
}