
#include "Int32ProbCtxtTable.h"

Int32ProbCtxtTable::Int32ProbCtxtTable(void)
{
	_numberValueBits = 0;
}

Int32ProbCtxtTable::Int32ProbCtxtTable(Reader reader, INT32* filePointer, bool firstTable)
{
    // Instantiate the Bit reader
    _bitReader = new BitReader(reader);
	_probabiltyFirstPass = firstTable;
	_numberValueBits = 0;
	_minValue = 0;


	unsigned int _probabilityContextTableEntryCount = (unsigned int)_bitReader->readU32(32, filePointer);
	unsigned int _numberSymbolBit = (unsigned int)_bitReader->readU32(6, filePointer);
	unsigned int _numberOccurrenceCountBits = (unsigned int)_bitReader->readU32(6, filePointer);

    //For First Probability Context Table in List
    if (_probabiltyFirstPass)
    {
        _numberValueBits = (unsigned int)_bitReader->readU32(6, filePointer);
    }

    unsigned int _numberReservedFieldBits = (unsigned int)_bitReader->readU32(6, filePointer);

    // Cumulative counter
    int m_cumCount = 0;

    //For First Probability Context Table in List
    if (_probabiltyFirstPass)
    {
		_minValue = (int)_bitReader->readU32(32, filePointer);
   }

    // Probability Context Table Entry Mk 2
    for (unsigned int i = 0; i < _probabilityContextTableEntryCount; i++)
    {
        int _symbol = (int)_bitReader->readU32((int)_numberSymbolBit, filePointer) -2;

		int _occurrenceCount = (int)_bitReader->readU32((int)_numberOccurrenceCountBits, filePointer);

        // Store this value into table.. & retrieve per pass
		int _associatedValue = (int)_bitReader->readU32((int)_numberValueBits, filePointer) + _minValue;;
		int _nextContext = (int)_bitReader->readU32((int)_numberReservedFieldBits, filePointer);

        // Create a new entry into the Context table
		m_entry = new CntxEntry((int)_symbol, (int)_occurrenceCount, (int)_associatedValue, (int)m_cumCount, (int)_nextContext);
		m_tableEntries.push_back(m_entry);

        // add the values together
        m_cumCount += (int)_occurrenceCount;
    }
}


Int32ProbCtxtTable::~Int32ProbCtxtTable(void)
{
}

// Count up the Occurance values from all of the tables within the collection
int Int32ProbCtxtTable::GetTotalCount(void)
{
    int m_totalCount = 0;
	for (unsigned int i = 0; i < m_tableEntries.size(); i++)
    {
		m_totalCount += m_tableEntries.at(i)->getOccCount();
    }
    return m_totalCount;
}

// Retrieve the respective table entry
CntxEntry* Int32ProbCtxtTable::LookupEntryByCumCount(long count)
{
    long m_sum = m_tableEntries[0]->getOccCount();
    unsigned int m_idx = 0;

    while (count >= m_sum)
    {
        m_idx += 1;
		if (m_idx >= m_tableEntries.size())
        {
            m_idx--;
        }
        m_sum += m_tableEntries[m_idx]->getOccCount();
    }
    return this->m_tableEntries[m_idx];
}