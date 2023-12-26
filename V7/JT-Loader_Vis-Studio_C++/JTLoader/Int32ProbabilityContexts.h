#pragma once
#include <Windows.h>
#include "Reader.h"
#include <vector>
#include "Int32ProbCtxtTable.h"

class Int32ProbabilityContexts
{
public:
	Int32ProbabilityContexts(void);

	Int32ProbabilityContexts(INT32* filePointer, Reader reader);

	~Int32ProbabilityContexts(void);

     vector<int> GetOutOfBandValues(void);

     // Returns the probability context for a given index
	Int32ProbCtxtTable* Int32ProbabilityContexts::GetContext(int currContext);

     // Initialise the out of band values
     void SetOOBValues(vector<int> values);

	 // Get the file position
     int UpDateFilePos(void);

	 int Int32ProbabilityContexts::GetTableCount();


private:
		Reader _reader;
		int* _filePosCount;
		Int32ProbCtxtTable* m_ctxTable;
		vector<int> m_OOBvalues;
		vector<Int32ProbCtxtTable*> m_ctxtTable;

};
