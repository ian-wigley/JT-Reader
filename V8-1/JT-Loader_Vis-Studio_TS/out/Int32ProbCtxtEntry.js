export class Int32ProbCtxtEntry {
    m_iSym;
    m_cCount;
    m_cCumCount;
    m_iNextCntx = 0;
    m_iAssociatedVal = 0;
    constructor(symbol, count, associatedVal, cumulativeCount, nextContext) {
        this.m_iSym = symbol;
        this.m_cCount = count;
        this.m_cCumCount = cumulativeCount;
        this.m_iAssociatedVal = associatedVal;
        this.m_iNextCntx = nextContext;
    }
    getCumCount() {
        return this.m_cCumCount;
    }
    getOccCount() {
        return this.m_cCount;
    }
    getSymbol() {
        return this.m_iSym;
    }
    getAssociatedValue() {
        return this.m_iAssociatedVal;
    }
    getNextContext() {
        return this.m_iNextCntx;
    }
}
//# sourceMappingURL=Int32ProbCtxtEntry.js.map