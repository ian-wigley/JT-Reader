module C_sharp_JT_Reader {
    export class VecI32 {
        private _counter: Int32 = 0;
        private _data: Int32[];
        public setLength(size: number): void {
            this._data = new Array(size);
        }
        public ptr(): number {
            return this._counter++;
        }
    }
}