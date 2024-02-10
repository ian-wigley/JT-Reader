import { Guid } from "./GUID.js";
export class JTObjectTypeIdentifiers {
    static dictionary = new Map();
    static identifiers = [];
    static PopulateList() {
        this.dictionary.set(new Guid(0x10dd1035, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Base Node Element");
        this.identifiers.push(new Guid(0x10dd1035, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Base Node Element");
        let z = 0;
    }
}
//# sourceMappingURL=JTObjectTypeIdentifiers.js.map