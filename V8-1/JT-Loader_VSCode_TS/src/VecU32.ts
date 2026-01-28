export class VecU32 {
    private _counter: number = 0;
    // private _data: number[];

    // public setLength(size: number): void {
    //     this._data = new Array(size);
    // }

    public ptr(): number {
        return this._counter++;
    }
}
