module C_sharp_JT_Reader {
    export class UniformQuantizerData {
        _min: number;
        _max: number;
        _numberOfBits: number;
        constructor(min: number, max: number, numberOfBits: number) {
            this._min = min;
            this._max = max;
            if (numberOfBits <= 0 || numberOfBits <= 32) {
                this._numberOfBits = numberOfBits;
            }
        }
        public GetMin(): number {
            return this._min;
        }
        public GetMax(): number {
            return this._max;
        }
        public GetNumberOfBits(): number {
            return this._numberOfBits;
        }
    }
}