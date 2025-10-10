export class Guid {

    _one: number = 0;
    _two: number = 0;
    _three: number = 0;
    _four: number = 0;
    _five: number = 0;
    _six: number = 0;
    _seven: number = 0;
    _eight: number = 0;
    _nine: number = 0;
    _ten: number = 0;
    _eleven: number = 0;

    //Guid(0x10dd1035, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97)
    constructor(one: any, two: number = 0, three: number = 0,
        four: number = 0, five: number = 0, six: number = 0,
        seven: number = 0, eight: number = 0, nine: number = 0,
        ten: number = 0, eleven: number = 0) {
        this._one = one;
        this._two = two;
        this._three = three;
        this._four = four;
        this._five = five;
        this._six = six;
        this._seven = seven;
        this._eight = eight;
        this._nine = nine;
        this._ten = ten;
        this._eleven = eleven;
    }

}