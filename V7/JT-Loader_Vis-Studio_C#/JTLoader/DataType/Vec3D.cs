using System;
using System.Collections.Generic;
using System.Text;

namespace C_sharp_JT_Reader.DataType
{
    public class Vec3D
    {
        double x, y, z;

        public Vec3D(double x, double y, double z)
        {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public double getX()
        {
            return x;
        }

        public double getY()
        {
            return y;
        }

        public double getZ()
        {
            return z;
        }

        public float getXf()
        {
            return (float)x;
        }

        public float getYf()
        {
            return (float)y;
        }

        public float getZf()
        {
            return (float)z;
        }


    }
}
