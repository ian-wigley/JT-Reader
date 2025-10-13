export class Convert {

    public static X2(i: number) {
        let result = "0x";
        if (i >= 0 && i <= 15) { result += "0" + i.toString(16); }
        else if (i >= 16 && i <= 255) { result += i.toString(16); }
        return result
    }

    public static X4(i: number) {
        let result = "0x";
        if (i >= 0 && i <= 15) { result += "000" + i.toString(16); }
        else if (i >= 16 && i <= 255) { result += "00" + i.toString(16); }
        else if (i >= 256 && i <= 4095) { result += "0" + i.toString(16); }
        else if (i >= 4096 && i <= 65535) { result += i.toString(16); }
        return result
    }
}