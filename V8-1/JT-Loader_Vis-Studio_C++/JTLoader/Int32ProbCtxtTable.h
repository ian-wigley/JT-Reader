#pragma once
#include <Windows.h>
#include "Reader.h"
#include "BitReader.h"
#include "CntxEntry.h"
#include <vector>

class Int32ProbCtxtTable
{
public:
	Int32ProbCtxtTable(void);
	Int32ProbCtxtTable(Reader reader, INT32* filePointer, bool firstTable);
	~Int32ProbCtxtTable(void);

	int GetTotalCount(void);
	CntxEntry* LookupEntryByCumCount(long count);

private:
	Reader _reader;
	BitReader* _bitReader;
	CntxEntry* m_entry;

	int* _filePosCount;
	unsigned int _numberValueBits;
	bool _probabiltyFirstPass;

	vector<CntxEntry*> m_tableEntries;
	int _minValue;
};
