import { Convert } from "./Convert.js";

export class Guid {

    _one: number = 0;
    _two: number = 0;
    _three: number = 0;
    _four: string = "00";
    _five: string = "00";
    _six: string = "00";
    _seven: string = "00";
    _eight: string = "00";
    _nine: string = "00";
    _ten: string = "00";
    _eleven: string = "00";
    guid: string = "";

    //Guid(0x10dd1035, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97)
    constructor(one: any, two: number = 0, three: number = 0,
        four: number = 0, five: number = 0, six: number = 0,
        seven: number = 0, eight: number = 0, nine: number = 0,
        ten: number = 0, eleven: number = 0) {
        this._one = one;
        this._two = two;
        this._three = three;
        this._four = Convert.X2(four);
        this._five = Convert.X2(five);
        this._six = Convert.X2(six);
        this._seven = Convert.X2(seven);
        this._eight = Convert.X2(eight);
        this._nine = Convert.X2(nine);
        this._ten = Convert.X2(ten);
        this._eleven = Convert.X2(eleven);
        this.guid = this._one + "-" + this._two + "-" + this._three + "-" + this._four + "-" + this._five + "-" +
            this._six + "-" + this._seven + "-" + this._eight + "-" + this._nine + "-" + this._ten + "-" + this._eleven;
    }

}