import { BitConverter } from "./BitBuffer";
import { Guid } from "./GUID";

export class DataTypes {
    public static getBBoxF32(bboxBytes: number[]): BBoxF32 {
        var transformedBBox: BBoxF32;
        transformedBBox.minCorner.x = (bboxBytes[0]);
        transformedBBox.minCorner.y = (bboxBytes[1]);
        transformedBBox.minCorner.z = (bboxBytes[2]);
        transformedBBox.maxCorner.x = (bboxBytes[3]);
        transformedBBox.maxCorner.y = (bboxBytes[4]);
        transformedBBox.maxCorner.z = (bboxBytes[5]);
        return transformedBBox;
    }

    // public static getUInt64(fileBytes: number[]): UInt64 {
    //     return BitConverter.ToUInt64(fileBytes, 0);
    // }

    public static getFloat32(fileBytes: number[]): number {
        return BitConverter.ToSingle(fileBytes, 0);
    }

    public static getInt16(fileBytes: number[]): Int16 {
        return BitConverter.ToInt16(fileBytes, 0);
    }

    public static getInt32(fileBytes: number[]): Int32 {
        return BitConverter.ToInt32(fileBytes, 0);
    }

    public static getUInt32(fileBytes: number[]): UInt32 {
        return BitConverter.ToUInt32(fileBytes, 0);
    }

    // public static getInt32(): Int32 {
    //     var fileBytes: number[] = new Array(4);
    //     fileBytes = b.ReadBytes(4);
    //     return BitConverter.ToInt32(fileBytes, 0);
    //     ;
    // }

    // public static getUInt32(i: number): UInt32 {
    //     var fileBytes: number[] = new Array(4);
    //     fileBytes = b.ReadBytes(4);
    //     return BitConverter.ToUInt32(fileBytes, 0);
    //     ;
    // }

    // public static getGuid(b: BinaryReader): Guid {
    //     var guidBytes: number[] = new Array(16);
    //     for (var i: number = 0; i < 16; i++) {
    //         guidBytes[i] = b.ReadByte();
    //     }
    //     return new System.Guid(guidBytes);
    // }

    public static getGuid(guidBytes: number[]): Guid {
        return new Guid(guidBytes);
    }

    static VecU32 = class {
        public count: UInt32;
        public data: UInt32[];
    }

    static VecI32 = class {
        public count: Int32;
        public data: Int32[];
    }
}

export class BBoxF32 {
    public minCorner: Vector3 = new Vector3();
    public maxCorner: Vector3 = new Vector3();
}

export class Vector3 {
    public x: number;
    public y: number;
    public z: number;
}