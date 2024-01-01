/////////////////////////////////////////////////////////////////////
//
// This class contains all the Data Types used by the JT File Reader
//
// Refer to 6.2 Data Types page 22-25 (Ver 9.5 rev D)
//
/////////////////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace C_sharp_JT_Reader
{
    public static class DataTypes
    {

        //  Type	    Range	                                                    Size
        //  sbyte	    -128 to 127	                                                Signed 8-bit integer
        //  byte	    0 to 255	                                                Unsigned 8-bit integer
        //  char	    U+0000 to U+ffff	                                        Unicode 16-bit character
        //  short	    -32,768 to 32,767	                                        Signed 16-bit integer
        //  ushort	    0 to 65,535	                                                Unsigned 16-bit integer
        //  int	        -2,147,483,648 to 2,147,483,647	                            Signed 32-bit integer
        //  uint	    0 to 4,294,967,295	                                        Unsigned 32-bit integer
        //  long	    -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807	    Signed 64-bit integer
        //  ulong	    0 to 18,446,744,073,709,551,615	                            Unsigned 64-bit integer

        // Var          Bytes required
        // char         1
        // int          2 
        // short int    2
        // float        4
        // double       8

        public struct VecU32
        {
            public UInt32 count;
            public UInt32[] data;
        }

        public struct VecI32
        {
            public Int32 count;
            public Int32[] data;
        }
            
        // Vector Struct
        public struct Vector3
        {
            public float x;
            public float y;
            public float z;
        }

        // Bounding Box Float32 Type
        public struct BBoxF32
        {
            public Vector3 minCorner;
            public Vector3 maxCorner;
        };

        // 24 bytes required
        public static BBoxF32 getBBoxF32(byte[] bboxBytes)
        {
            BBoxF32 transformedBBox;
            transformedBBox.minCorner.x = (bboxBytes[0]);
            transformedBBox.minCorner.y = (bboxBytes[1]);
            transformedBBox.minCorner.z = (bboxBytes[2]);

            transformedBBox.maxCorner.x = (bboxBytes[3]);
            transformedBBox.maxCorner.y = (bboxBytes[4]);
            transformedBBox.maxCorner.z = (bboxBytes[5]);

            return transformedBBox;
        }

        // Read the next 8 bytes, and convert to UInt64
        public static UInt64 getUInt64(byte[] fileBytes)
        {
            return BitConverter.ToUInt64(fileBytes, 0);
        }

        // Read the next 4 bytes, and convert to Float
        public static float getFloat32(byte[] fileBytes)
        {
            return BitConverter.ToSingle(fileBytes, 0);
        }

        // Read the next 4 bytes, and convert to Int16
        public static Int16 getInt16(byte[] fileBytes)
        {
            return BitConverter.ToInt16(fileBytes, 0);
        }

        // Read the next 4 bytes, and convert to Int32
        public static Int32 getInt32(byte[] fileBytes)
        {
            return BitConverter.ToInt32(fileBytes, 0);
        }

        public static UInt32 getUInt32(byte[] fileBytes)
        {
            return BitConverter.ToUInt32(fileBytes, 0);
        }

        // Read the next 4 bytes, and convert to Int32
        public static Int32 getInt32(BinaryReader b)
        {
            byte[] fileBytes = new byte[4];
            fileBytes = b.ReadBytes(4);
            return BitConverter.ToInt32(fileBytes, 0); ;
        }

        // Read the next 4 bytes, and convert to an unsigned Int32
        public static UInt32 getUInt32(BinaryReader b, int i)
        {
            byte[] fileBytes = new byte[4];
            fileBytes = b.ReadBytes(4);
            return BitConverter.ToUInt32(fileBytes, 0); ;
        }

        // Read the next 16 bytes, and convert to a GUID
        public static Guid getGuid(BinaryReader b)
        {
            byte[] guidBytes = new byte[16];
            for (int i = 0; i < 16; i++)
            {
                guidBytes[i] = b.ReadByte();
            }
            return new System.Guid(guidBytes);
        }

        // Read the next 16 bytes, and convert to a GUID
        public static Guid getGuid(byte[] guidBytes)
        {
            return new System.Guid(guidBytes);
        }

        //The MbString type starts with an I32 that defines the number
        //of characters (NumChar) the string contains. The number of
        //bytes of character data is “2 * NumChar” (i.e. the strings are
        //written out as multi-byte characters where each character is
        //U16 size).
    }
}
