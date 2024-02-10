export declare class UniformQuantizerData {
    _min: number;
    _max: number;
    _numberOfBits: number;
    constructor(min: number, max: number, numberOfBits: number);
    GetMin(): number;
    GetMax(): number;
    GetNumberOfBits(): number;
}
