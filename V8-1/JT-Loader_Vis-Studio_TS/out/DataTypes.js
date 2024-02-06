var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class DataTypes {
        static getBBoxF32(bboxBytes) {
            var transformedBBox;
            transformedBBox.minCorner.x = (bboxBytes[0]);
            transformedBBox.minCorner.y = (bboxBytes[1]);
            transformedBBox.minCorner.z = (bboxBytes[2]);
            transformedBBox.maxCorner.x = (bboxBytes[3]);
            transformedBBox.maxCorner.y = (bboxBytes[4]);
            transformedBBox.maxCorner.z = (bboxBytes[5]);
            return transformedBBox;
        }
        static getUInt64(fileBytes) {
            return BitConverter.ToUInt64(fileBytes, 0);
        }
        static getFloat32(fileBytes) {
            return BitConverter.ToSingle(fileBytes, 0);
        }
        static getInt16(fileBytes) {
            return BitConverter.ToInt16(fileBytes, 0);
        }
        static getInt32(fileBytes) {
            return BitConverter.ToInt32(fileBytes, 0);
        }
        static getUInt32(fileBytes) {
            return BitConverter.ToUInt32(fileBytes, 0);
        }
        static getInt32(b) {
            var fileBytes = new Array(4);
            fileBytes = b.ReadBytes(4);
            return BitConverter.ToInt32(fileBytes, 0);
            ;
        }
        static getUInt32(b, i) {
            var fileBytes = new Array(4);
            fileBytes = b.ReadBytes(4);
            return BitConverter.ToUInt32(fileBytes, 0);
            ;
        }
        static getGuid(b) {
            var guidBytes = new Array(16);
            for (var i = 0; i < 16; i++) {
                guidBytes[i] = b.ReadByte();
            }
            return new System.Guid(guidBytes);
        }
        static getGuid(guidBytes) {
            return new System.Guid(guidBytes);
        }
    }
    C_sharp_JT_Reader.DataTypes = DataTypes;
    (function (DataTypes) {
        class VecU32 {
            count;
            data;
        }
        DataTypes.VecU32 = VecU32;
    })(DataTypes = C_sharp_JT_Reader.DataTypes || (C_sharp_JT_Reader.DataTypes = {}));
    (function (DataTypes) {
        class VecI32 {
            count;
            data;
        }
        DataTypes.VecI32 = VecI32;
    })(DataTypes = C_sharp_JT_Reader.DataTypes || (C_sharp_JT_Reader.DataTypes = {}));
    (function (DataTypes) {
        class Vector3 {
            x;
            y;
            z;
        }
        DataTypes.Vector3 = Vector3;
    })(DataTypes = C_sharp_JT_Reader.DataTypes || (C_sharp_JT_Reader.DataTypes = {}));
    (function (DataTypes) {
        class BBoxF32 {
            minCorner;
            maxCorner;
        }
        DataTypes.BBoxF32 = BBoxF32;
    })(DataTypes = C_sharp_JT_Reader.DataTypes || (C_sharp_JT_Reader.DataTypes = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=DataTypes.js.map