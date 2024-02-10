export class VecU32 {
    _counter = 0;
    _data;
    setLength(size) {
        this._data = new Array(size);
    }
    ptr() {
        return this._counter++;
    }
}
//# sourceMappingURL=VecU32.js.map