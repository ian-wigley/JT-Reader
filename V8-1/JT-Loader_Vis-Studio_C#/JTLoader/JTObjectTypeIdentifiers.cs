﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;

namespace C_sharp_JT_Reader
{
    public static class JTObjectTypeIdentifiers
    {
        //List<Guid> identifiers = new List<Guid>();
        static Dictionary<Guid, string> identifiers = new Dictionary<Guid, string>();
        public static void PopulateList()
        {
            identifiers.Add(new System.Guid(0x10dd1035, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Base Node Element");
            identifiers.Add(new System.Guid(0x10dd101b, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Group Node Element");
            identifiers.Add(new System.Guid(0x10dd102a, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Instance Node Element");
            identifiers.Add(new System.Guid(0x10dd102c, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "LOD Node Element");
            identifiers.Add(new System.Guid(0xce357245, 0x38fb, 0x11d1, 0xa5, 0x6, 0x0, 0x60, 0x97, 0xbd, 0xc6, 0xe1),   "Meta Data Node Element");
            identifiers.Add(new System.Guid(0xd239e7b6, 0xdd77, 0x4289, 0xa0, 0x7d, 0xb0, 0xee, 0x79, 0xf7, 0x94, 0x94), "NULL Shape Node Element");
            identifiers.Add(new System.Guid(0xce357244, 0x38fb, 0x11d1, 0xa5, 0x6, 0x0, 0x60, 0x97, 0xbd, 0xc6, 0xe1),   "Part Node Element");
            identifiers.Add(new System.Guid(0x10dd103e, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Partition Node Element");
            identifiers.Add(new System.Guid(0x10dd104c, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Range LOD Node Element");
            identifiers.Add(new System.Guid(0x10dd10f3, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Switch Node Element");
            identifiers.Add(new System.Guid(0x10dd1059, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Base Shape Node Element");
            identifiers.Add(new System.Guid(0x98134716, 0x0010, 0x0818, 0x19, 0x98, 0x08, 0x00, 0x09, 0x83, 0x5d, 0x5a), "Point Set Shape Node Element");
            identifiers.Add(new System.Guid(0x10dd1048, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Polygon Set Shape Node Element");
            identifiers.Add(new System.Guid(0x10dd1046, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Polyline Set Shape Node Element");
            identifiers.Add(new System.Guid(0xe40373c1, 0x1ad9, 0x11d3, 0x9d, 0xaf, 0x0, 0xa0, 0xc9, 0xc7, 0xdd, 0xc2),  "Primitive Set Shape Node Element");
            identifiers.Add(new System.Guid(0x10dd1077, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Tri-Strip Set Shape Node Element");
            identifiers.Add(new System.Guid(0x10dd107f, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Vertex Shape Node Element");
            identifiers.Add(new System.Guid(0x10dd1001, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Base Attribute Data");
            identifiers.Add(new System.Guid(0x10dd1014, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Draw Style Attribute Element");
            identifiers.Add(new System.Guid(0xad8dccc2, 0x7a80, 0x456d, 0xb0, 0xd5, 0xdd, 0x3a, 0xb, 0x8d, 0x21, 0xe7),  "Fragment Shader Attribute Element");// duplicate of below
            identifiers.Add(new System.Guid(0x10dd1083, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Geometric Transform Attribute Element");
            identifiers.Add(new System.Guid(0x10dd1028, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Infinite Light Attribute Element");
            identifiers.Add(new System.Guid(0x10dd1096, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Light Set Attribute Element");
            identifiers.Add(new System.Guid(0x10dd10c4, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Linestyle Attribute Element");
            identifiers.Add(new System.Guid(0x10dd1030, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Material Attribute Element");
            identifiers.Add(new System.Guid(0x10dd1045, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Point Light Attribute Element");
            identifiers.Add(new System.Guid(0x8d57c010, 0xe5cb, 0x11d4, 0x84, 0xe, 0x00, 0xa0, 0xd2, 0x18, 0x2f, 0x9d),  "Pointstyle Attribute Element");
            identifiers.Add(new System.Guid(0xaa1b831d, 0x6e47, 0x4fee, 0xa8, 0x65, 0xcd, 0x7e, 0x1f, 0x2f, 0x39, 0xdb), "Shader Effects Attribute Element");
            identifiers.Add(new System.Guid(0x10dd1073, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Texture Image Attribute Element");
            identifiers.Add(new System.Guid(0x2798bcad, 0xe409, 0x47ad, 0xbd, 0x46, 0xb, 0x37, 0x1f, 0xd7, 0x5d, 0x61),  "Vertex Shader Attribute Element");
 //           identifiers.Add(new System.Guid(0xad8dccc2, 0x7a80, 0x456d, 0xb0, 0xd5, 0xdd, 0x3a, 0xb, 0x8d, 0x21, 0xe7),  "Fragment Shader Attribute Element");
            identifiers.Add(new System.Guid(0xaa1b831d, 0x6e47, 0x4fee, 0xa8, 0x65, 0xcd, 0x7e, 0x1f, 0x2f, 0x39, 0xdc), "Texture Coordinate Generator Attribute Element");
            identifiers.Add(new System.Guid(0xa3cfb921, 0xbdeb, 0x48d7, 0xb3, 0x96, 0x8b, 0x8d, 0xe, 0xf4, 0x85, 0xa0),  "Mapping Plane Element");
            identifiers.Add(new System.Guid(0x3e70739d, 0x8cb0, 0x41ef, 0x84, 0x5c, 0xa1, 0x98, 0xd4, 0x0, 0x3b, 0x3f),  "Mapping Cylinder Element");
            identifiers.Add(new System.Guid(0x72475fd1, 0x2823, 0x4219, 0xa0, 0x6c, 0xd9, 0xe6, 0xe3, 0x9a, 0x45, 0xc1), "Mapping Sphere Element");
            identifiers.Add(new System.Guid(0x92f5b094, 0x6499, 0x4d2d, 0x92, 0xaa, 0x60, 0xd0, 0x5a, 0x44, 0x32, 0xcf), "Mapping TriPlanar Element");
            identifiers.Add(new System.Guid(0x10dd104b, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Base Property Atom Element");
            identifiers.Add(new System.Guid(0xce357246, 0x38fb, 0x11d1, 0xa5, 0x6, 0x0, 0x60, 0x97, 0xbd, 0xc6, 0xe1),   "Date Property Atom Element");
            identifiers.Add(new System.Guid(0x10dd102b, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Integer Property Atom Element");
            identifiers.Add(new System.Guid(0x10dd1019, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Floating Point Property Atom Element");
            identifiers.Add(new System.Guid(0xe0b05be5, 0xfbbd, 0x11d1, 0xa3, 0xa7, 0x00, 0xaa, 0x00, 0xd1, 0x09, 0x54), "Late Loaded Property Atom ElementSecond specifies the date Second value. Valid values are [0, 59] inclusive. Late Loaded Property Atom Element");
            identifiers.Add(new System.Guid(0x10dd1004, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "JT Object Reference Property Atom Element");
            identifiers.Add(new System.Guid(0x10dd106e, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "String Property Atom Element");
              
            //Types Stored Within JT B-Rep Segment (Segment Type = 2)
            identifiers.Add(new System.Guid(0x873a70c0, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "JT B-Rep Element");
              
            //Types Stored Within Meta Data Segment (Segment Type = 4)
            identifiers.Add(new System.Guid(0xce357249, 0x38fb, 0x11d1, 0xa5, 0x6, 0x0, 0x60, 0x97, 0xbd, 0xc6, 0xe1), "PMI Manager Meta Data Element");
            identifiers.Add(new System.Guid(0xce357247, 0x38fb, 0x11d1, 0xa5, 0x6, 0x0, 0x60, 0x97, 0xbd, 0xc6, 0xe1), "Property Proxy Meta Data Element");

            //Types Stored Within Shape LOD Segment (Segment Type = 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
            identifiers.Add(new System.Guid(0x3e637aed, 0x2a89, 0x41f8, 0xa9, 0xfd, 0x55, 0x37, 0x37, 0x3, 0x96, 0x82), "Null Shape LOD Element");
            identifiers.Add(new System.Guid(0x98134716, 0x0011, 0x0818, 0x19, 0x98, 0x08, 0x00, 0x09, 0x83, 0x5d, 0x5a), "Point Set Shape LOD Element");
            identifiers.Add(new System.Guid(0x10dd10a1, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Polyline Set Shape LOD Element");
            identifiers.Add(new System.Guid(0xe40373c2, 0x1ad9, 0x11d3, 0x9d, 0xaf, 0x0, 0xa0, 0xc9, 0xc7, 0xdd, 0xc2),  "Primitive Set Shape Element");
            identifiers.Add(new System.Guid(0x10dd10ab, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Tri-Strip Set Shape LOD Element");
            identifiers.Add(new System.Guid(0x10dd10b0, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Vertex Shape LOD Element");
              
            //Types Stored Within XT B-Rep Segment (Segment Type = 17)
            identifiers.Add(new System.Guid(0x873a70e0, 0x2ac9, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "XT B-Rep Element");

            //Types Stored Within Wireframe Segment (Segment Type = 18)
            identifiers.Add(new System.Guid(0x873a70d0, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97), "Wireframe Rep Element");

            //Types Stored Within JT ULP Segment (Segment Type = 20)
            identifiers.Add(new System.Guid(0xf338a4af, 0xd7d2, 0x41c5, 0xbc, 0xf2, 0xc5, 0x5a, 0x88, 0xb2, 0x1e, 0x73), "JT ULP Element");

            //Types Stored Within JT LWPA Segment (Segment Type = 24)
            identifiers.Add(new System.Guid(0xd67f8ea8, 0xf524, 0x4879, 0x92, 0x8c, 0x4c, 0x3a, 0x56, 0x1f, 0xb9, 0x3a), "JT LWPA Element");

            // Read to the end of the file
            identifiers.Add(new System.Guid(0xffffffff,0xffff,0xffff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff), "EOF");


 //           Guid test = new System.Guid(0x10dd103e, 0x2ac8, 0x11d1, 0x9b, 0x6b, 0x00, 0x80, 0xc7, 0xbb, 0x59, 0x97);
 //           GetType(test);


        }



        // This method Iterates through the Dictionary & returns the respective value
        public static string GetType(Guid guid)
        {
            string value = string.Empty;
            if (identifiers.ContainsKey(guid))
            {
                identifiers.TryGetValue(guid, out value);
            }
            return value;
        }
    }
}