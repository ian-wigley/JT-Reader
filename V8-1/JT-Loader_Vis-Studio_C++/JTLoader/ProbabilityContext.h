#pragma once

#include <Windows.h>
#include "CntxEntry.h"

class ProbabilityContext
{
public:
	ProbabilityContext(void);
	~ProbabilityContext(void);

	// Returns total cumulative count for all context entries
	INT32 totalCount();
	// Returns number of context entries
	INT32 numEntries();
	// Returns context entry of index iEntry
	BOOL getEntry(INT32 iEntry, CntxEntry *rpEntry);
	// Looks up the next context field given by the context entry
	// with input symbol iSymbol
	BOOL lookupNextContext(INT32 iSymbol, INT32 &iNextContext);
	// Looks up the index of the context entry for the given
	// input symbol iSymbol
	BOOL lookupSymbol(INT32 iSymbol, INT32 &iOutEntry);
	// Looks up the index of the context entry that falls just above
	// the accumulated count.
	BOOL lookupEntryByCumCount(INT32 iCount, INT32 &iOutEntry);
};
