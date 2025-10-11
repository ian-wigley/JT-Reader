export class Int32ProbCtxtEntry {
    m_iSym: number;
    m_cCount: number;
    m_cCumCount: number;
    m_iNextCntx: number = 0;
    m_iAssociatedVal: number = 0;

    constructor(symbol: number, count: number, associatedVal: number, cumulativeCount: number, nextContext: number) {
        this.m_iSym = symbol;
        this.m_cCount = count;
        this.m_cCumCount = cumulativeCount;
        this.m_iAssociatedVal = associatedVal;
        this.m_iNextCntx = nextContext;
    }

    public getCumCount(): number {
        return this.m_cCumCount;
    }

    public getOccCount(): number {
        return this.m_cCount;
    }

    public getSymbol(): number {
        return this.m_iSym;
    }

    public getAssociatedValue(): number {
        return this.m_iAssociatedVal;
    }

    public getNextContext(): number {
        return this.m_iNextCntx;
    }
}