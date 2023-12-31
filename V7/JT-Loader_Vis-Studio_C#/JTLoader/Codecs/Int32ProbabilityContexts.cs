using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.Codecs
{

    /// <summary>
    ///     
    // Type used to build probability context tables.
    // Used by CodecDriver class. page 222 Fig 169
    //
    /// </summary>
    
    public class Int32ProbabilityContexts
    {
        private bool _probabiltyFirstPass;
        private byte[] fileBytes = new byte[4];
        private int m_filePosCount = 0;
        private int[] m_outOfBandValues;
        private Int32ProbCtxtTable m_ctxTable;
        private List<string> m_richTextBox;
        private UInt32 _numberValueBits = 0;
        private List<Int32ProbCtxtTable> m_ctxtTable;

        public Int32ProbabilityContexts(List<string> richTextBox, byte[] _data, int filePosCount)
        {
            m_richTextBox = richTextBox;
            m_filePosCount = filePosCount;

            //_probabiltyFirstPass = true;

            /** Moved from Int32ProbCtxtTable **/
            // Instantiate the Bit reader
            BitReader bitReader = new BitReader(_data);


            // Probability Context Table Count specifies the number of Probability Context Tables to follow and will always have a value of either “0” or “1”.
            byte probabilityContextTableCount = _data[m_filePosCount];
            string str81 = probabilityContextTableCount.ToString();
            m_richTextBox.Add("Probability Context Table Count = " + str81);
            m_filePosCount += sizeof(byte);

            //if (probabilityContextTableCount == 0 || probabilityContextTableCount == 1)
            //{
            //    // Create a new Table to hold the context 
            //    m_ctxTable = new Int32ProbCtxtTable(m_richTextBox, _data, m_filePosCount);

            //    // Retrieve the file position
            //    m_filePosCount = m_ctxTable.GetFilePosition();
            //}

            m_ctxtTable = new List<Int32ProbCtxtTable>();

            /** New 13/11/13 **/
            bool firstTable = true;
            for (int i = 0; i < probabilityContextTableCount; i++)
            {
                // Create a new Table to hold the context 
                m_ctxTable = new Int32ProbCtxtTable(m_richTextBox, _data, m_filePosCount, firstTable, bitReader, this);
                m_ctxtTable.Add(m_ctxTable);

                // Retrieve the file position
                m_filePosCount = m_ctxTable.GetFilePosition();
                firstTable = false;
            }
        }

        // Get the Out Of Band Values
        public int[] GetOutOfBandValues()
        {
            return m_outOfBandValues;
        }

        // Returns the probability context for a given index
        public Int32ProbCtxtTable GetContext(int currContext)
        {
            /** New 15/11/13 **/
            return m_ctxtTable[currContext];
            //return m_ctxTable;
        }

        // Initialise the out of band values
        public void SetOOBValues(int[] values)
        {
            m_outOfBandValues = values;
        }

        // Get the file position
        public int UpDateFilePos()
        {
            return this.m_filePosCount;
        }

        public int GetTableCount()
        {
            return m_ctxtTable.Count;
        }

        //public int GetSymbol()
        //{
        //    return m_ctxtTable[0].
        //}

    }
}
