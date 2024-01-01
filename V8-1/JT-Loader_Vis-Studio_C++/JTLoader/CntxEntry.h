#pragma once

#include <Windows.h>
# include "vector"

class CntxEntry
{
public:
	CntxEntry(void);
	CntxEntry(INT32 symbol, INT32 count, INT32 associatedVal, INT32 cumulativeCount, INT32 nextContext);
	~CntxEntry(void);
	long getCumCount(void);
	long getOccCount(void);
	long getSymbol(void);
	long getAssociatedValue(void);
	INT32 getNextContext(void);

private:
	INT32 m_iSym;
	INT32 m_cCount;
	INT32 m_cCumCount;
	INT32 m_iNextCntx;
	INT32 m_iAssociatedVal;
};

