﻿import { UniformQuantizerData } from "./UniformQuantizerData";

export class UniformQuantizerCodec {
    _inputVal: number = 0;
    _minInputRange: number = 0;
    _maxInputRange: number = 0;
    _nBits: number = 0;

    constructor() {
        let _iMaxCode: number = (this._nBits < 32) ? (0x1 << this._nBits) - 1 : 0xffffffff;
        let _encodeMultiplier: number = _iMaxCode / (this._maxInputRange - this._minInputRange);
        let _outputVal: number = (this._inputVal - this._minInputRange) * _encodeMultiplier + 0.5;
    }

    public GetValues(Values: number[], Data: UniformQuantizerData): number[] {
        let output: number[] = new Array(Values.length);
        this._minInputRange = Data.GetMin();
        this._maxInputRange = Data.GetMax();
        this._nBits = Data.GetNumberOfBits();
        let _iMaxCode: number = (this._nBits < 32) ? (0x1 << this._nBits) - 1 : 0xffffffff;
        let _encodeMultiplier: number = _iMaxCode / (this._maxInputRange - this._minInputRange);
        let _outputVal: number = ((this._inputVal - this._minInputRange) * _encodeMultiplier + 0.5);
        for (let i: number = 0; i < Values.length; i++) {
            output[i] = ((Values[i] - 0.5) / _encodeMultiplier + this._minInputRange);
        }
        return output;
    }
}