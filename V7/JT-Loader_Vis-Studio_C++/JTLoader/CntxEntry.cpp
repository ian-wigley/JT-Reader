
#include "CntxEntry.h"

CntxEntry::CntxEntry(void)
{
	m_iNextCntx = 0;
}

CntxEntry::CntxEntry(INT32 symbol, INT32 count, INT32 associatedVal, INT32 cumulativeCount, INT32 nextContext)
{
	m_iSym = symbol;
	m_cCount = count;
	m_cCumCount = cumulativeCount;
	m_iAssociatedVal = associatedVal;
	m_iNextCntx = nextContext;
}

CntxEntry::~CntxEntry(void)
{
}

// Get the Cumulative number of occurrences
long CntxEntry::getCumCount(void)
{
	return m_cCumCount;
}

// Get Number of occurrences
long CntxEntry::getOccCount(void)
{
    return m_cCount;
}

// Get the Symbol
long CntxEntry::getSymbol(void)
{
    return m_iSym;
}

// Get the Value asscoiated
long CntxEntry::getAssociatedValue(void)
{
    return m_iAssociatedVal;
}

// Get the next context value
INT32 CntxEntry::getNextContext(void)
{
    return m_iNextCntx;
}