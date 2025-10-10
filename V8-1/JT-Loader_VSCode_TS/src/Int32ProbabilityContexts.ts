export class Int32ProbabilityContexts {
    static _data: number[];
    static _filePosCount: number;
    static _oOOBValues: number[];
    static _oOOBValueCount: Int32;
    static _tableCount: Int32;
    static _tableSizes: Int32[];
    // static _probabilityTables: ProbabilityTable[];
    // static _predictorType: CodecDriver.PredictorType;

    constructor(data: number[], filePosCount: number) {
        Int32ProbabilityContexts._data = data;
        Int32ProbabilityContexts._filePosCount = filePosCount;
        this.readInt32ProbabilityContexts();
    }

    private readInt32ProbabilityContexts(): void {
    }

public UpDateFilePos(): number {
        return Int32ProbabilityContexts._filePosCount;
    }

    public GetTableCount(): Int32 {
        return Int32ProbabilityContexts._tableCount;
    }

    public SetOOBValues(oOOBValues: number[]): void {
        Int32ProbabilityContexts._oOOBValues = oOOBValues;
    }

    public GetOOBValues(): number[] {
        return Int32ProbabilityContexts._oOOBValues;
    }

    public GetOOBValueCount(): Int32 {
        return Int32ProbabilityContexts._oOOBValueCount;
    }

    public GetTableSizes(): Int32[] {
        return Int32ProbabilityContexts._tableSizes;
    }

    // public GetProbabilityTables(): ProbabilityTable[] {
    //     return Int32ProbabilityContexts._probabilityTables;
    // }

}