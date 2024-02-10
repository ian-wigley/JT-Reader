export declare class Int32ProbCtxtEntry {
    m_iSym: number;
    m_cCount: number;
    m_cCumCount: number;
    m_iNextCntx: number;
    m_iAssociatedVal: number;
    constructor(symbol: number, count: number, associatedVal: number, cumulativeCount: number, nextContext: number);
    getCumCount(): number;
    getOccCount(): number;
    getSymbol(): number;
    getAssociatedValue(): number;
    getNextContext(): number;
}
