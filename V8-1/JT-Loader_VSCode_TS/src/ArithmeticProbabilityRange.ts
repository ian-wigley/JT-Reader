export class ArithmeticProbabilityRange {
    private m_low: number;
    private m_high: number;
    private m_scale: number;
    constructor(low: number, high: number, scale: number) {
        this.m_low = low;
        this.m_high = high;
        this.m_scale = scale;
    }
    public getLow(): number {
        return this.m_low;
    }
    public getHigh(): number {
        return this.m_high;
    }
    public getScale(): number {
        return this.m_scale;
    }
}