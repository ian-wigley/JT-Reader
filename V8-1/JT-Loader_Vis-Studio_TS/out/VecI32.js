var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class VecI32 {
        _counter = 0;
        _data;
        setLength(size) {
            this._data = new Array(size);
        }
        ptr() {
            return this._counter++;
        }
    }
    C_sharp_JT_Reader.VecI32 = VecI32;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=VecI32.js.map