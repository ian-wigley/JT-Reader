using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.Codecs
{
    // This class stores Context table entries
    public class Int32ProbCtxtTable
    {
        private bool _probabiltyFirstPass;
        private byte[] fileBytes = new byte[4];
        private int m_filePosCount = 0;
        private int[] m_outOfBandValues;
        private List<string> m_richTextBox;
        private UInt32 _numberValueBits = 0;
        private Int32ProbCtxtEntry m_entry;
        private List<Int32ProbCtxtEntry> m_tableEntries = new List<Int32ProbCtxtEntry>();
        private int _minValue;

        private Int32ProbabilityContexts m_probContext;


        public Int32ProbCtxtTable(List<string> richTextBox, byte[] _data, int filePosCount, bool firstTable, BitReader bitReader, Int32ProbabilityContexts probCtxt)
        {
            m_richTextBox = richTextBox;
            m_filePosCount = filePosCount;

            _probabiltyFirstPass = firstTable;

            // Moved to Int32ProbabilityContexts //
            //// Instantiate the Bit reader
            //BitReader bitReader = new BitReader(_data);

            //*** Note - Increment the file reader along by the number of Bytes sent to the Bit Reader, rounded to the nearest Byte ***//
            UInt32 _probabilityContextTableEntryCount = (UInt32)bitReader.readU32(32, m_filePosCount);
            m_richTextBox.Add("Probability Context Table Entry Count = " + _probabilityContextTableEntryCount.ToString());
            m_filePosCount = bitReader.getFilePos();

            UInt32 _numberSymbolBit = (UInt32)bitReader.readU32(6, m_filePosCount);
            m_richTextBox.Add("Number Symbol Bits = " + _numberSymbolBit.ToString());
            m_filePosCount = bitReader.getFilePos();


            UInt32 _numberOccurrenceCountBits = (UInt32)bitReader.readU32(6, m_filePosCount);
            m_richTextBox.Add("Number Occurrence Count Bits = " + _numberOccurrenceCountBits.ToString());
            m_filePosCount = bitReader.getFilePos();

            //For First Probability Context Table in List
            if (_probabiltyFirstPass)
            {
                _numberValueBits = (UInt32)bitReader.readU32(6, m_filePosCount);
                m_richTextBox.Add("Number Value Bits = " + _numberValueBits.ToString());
                m_filePosCount = bitReader.getFilePos();
            }

            UInt32 _numberReservedFieldBits = (UInt32)bitReader.readU32(6, m_filePosCount);
            m_richTextBox.Add("Number Reserved Field Bits = " + _numberReservedFieldBits.ToString());
            m_filePosCount = bitReader.getFilePos();

            // Cumulative counter
            int m_cumCount = 0;

            //For First Probability Context Table in List
            if (_probabiltyFirstPass)
            {
                _minValue = (int)bitReader.readU32(32, m_filePosCount);
                m_richTextBox.Add("Min Value = " + _minValue.ToString());
                m_filePosCount = bitReader.getFilePos();
            }

            // Probability Context Table Entry Mk 2 page 262
            for (int i = 0; i < _probabilityContextTableEntryCount; i++)
            {
                int _symbol = (int)bitReader.readU32((int)_numberSymbolBit, m_filePosCount) -2;
                m_richTextBox.Add("Symbol = " + _symbol.ToString());
                m_filePosCount = bitReader.getFilePos();

                UInt32 _occurrenceCount = (UInt32)bitReader.readU32((int)_numberOccurrenceCountBits, m_filePosCount);
                m_richTextBox.Add("Occurence Count = " + _occurrenceCount.ToString());
                m_filePosCount = bitReader.getFilePos();

                //// Store this value into table.. & retrieve per pass
                //int _associatedValue = (int)bitReader.readU32((int)_numberValueBits, m_filePosCount) +_minValue;
                //m_richTextBox.Add("Associated Value = " + _associatedValue.ToString());
                //m_filePosCount = bitReader.getFilePos();

                int _associatedValue = 0;
                if (_probabiltyFirstPass)
                {
                    _associatedValue = (int)bitReader.readU32((int)_numberValueBits, m_filePosCount) + _minValue;
                    m_richTextBox.Add("Associated Value = " + _associatedValue.ToString());
                    m_filePosCount = bitReader.getFilePos();


                }
                else
                    /* Added 28/11/13 */
                // For the second table we take the associated value of the 
                // symbol in the first table
                {
                    _associatedValue = 0;// (int)probCtxt.m_tableEntries[0].getSymbol();
                }


                int _nextContext = (int)bitReader.readU32((int)_numberReservedFieldBits, m_filePosCount);
                m_richTextBox.Add("Associated Value = " + _associatedValue.ToString());
                m_filePosCount = bitReader.getFilePos();

                // Create a new entry into the Context table
                this.m_entry = new Int32ProbCtxtEntry((int)_symbol, (int)_occurrenceCount, (int)_associatedValue, (int)m_cumCount, (int)_nextContext);
                this.m_tableEntries.Add(m_entry);

                // add the values together
                m_cumCount += (int)_occurrenceCount;
            }
        }

        // Count up the Occurance values from all of the tables within the collection
        public int GetTotalCount()
        {
            int m_totalCount = 0;
            foreach (Int32ProbCtxtEntry m_entry in m_tableEntries)
            {
                m_totalCount += (int)m_entry.getOccCount();
            }
            return m_totalCount;
        }

        // Retrieve the respective table entry
        public Int32ProbCtxtEntry LookupEntryByCumCount(long count)
        {
            long sum = m_tableEntries[0].getOccCount();
            int idx = 0;
            while (count >= sum)
            {
                idx += 1;
                if (idx >= m_tableEntries.Count)
                {
                    idx--;
                }
                sum += m_tableEntries[idx].getOccCount();
            }
            return this.m_tableEntries[idx];
        }

        // Get the file position
        public int GetFilePosition()
        {
            return this.m_filePosCount;
        }
    }
}
