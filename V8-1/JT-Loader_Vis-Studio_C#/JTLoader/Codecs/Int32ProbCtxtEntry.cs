using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader
{
    // This class stores the individual context table entries
    //JT File Format Reference Version 8.1 Page 278 of 300

    /*
// Returns total cumulative count for all context entries
Int32 totalCount();
     
// Returns number of context entries
Int32 numEntries();
     
// Returns context entry of index iEntry
Bool getEntry(Int32 iEntry, CntxEntry& rpEntry);
     
// Looks up the next context field given by the context entry
// with input symbol ‘iSymbol’
Bool lookupNextContext(Int32 iSymbol, Int32& iNextContext);
     
// Looks up the index of the context entry for the given
// input symbol ‘iSymbol’
Bool lookupSymbol(Int32 iSymbol, Int32& iOutEntry);
     
// Looks up the index of the context entry that falls just above
// the accumulated count.
Bool lookupEntryByCumCount(Int32 iCount, Int32& iOutEntry);
*/  
    public class Int32ProbCtxtEntry
    {
        int m_iSym; // Symbol
        int m_cCount; // Number of occurrences
        int m_cCumCount; // Cumulative number of occurrences
        int m_iNextCntx = 0; // Next context if this symbol seen
        int m_iAssociatedVal = 0;

        public Int32ProbCtxtEntry(int symbol, int count, int associatedVal, int cumulativeCount, int nextContext)
        {
            m_iSym = symbol;
            m_cCount = count;
            m_cCumCount = cumulativeCount;
            m_iAssociatedVal = associatedVal;
            m_iNextCntx = nextContext;
        }

        // Get the Cumulative number of occurrences
        public long getCumCount()
        {
            return m_cCumCount;
        }

        // Get Number of occurrences
        public long getOccCount()
        {
            return m_cCount;
        }

        // Get the Symbol
        public long getSymbol()
        {
            return m_iSym;
        }

        // Get the Value asscoiated
        public long getAssociatedValue()
        {
            return m_iAssociatedVal;
        }

        // Get the next context value
        public int getNextContext()
        {
            return m_iNextCntx;
        }
    }
}
