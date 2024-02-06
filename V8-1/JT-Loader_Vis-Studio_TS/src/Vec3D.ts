module C_sharp_JT_Reader.DataType {
    export class Vec3D {
        x: number , y , z;
        constructor(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        public getX(): number {
            return this.x;
        }
        public getY(): number {
            return this.y;
        }
        public getZ(): number {
            return this.z;
        }
        public getXf(): number {
            return <number>this.x;
        }
        public getYf(): number {
            return <number>this.y;
        }
        public getZf(): number {
            return <number>this.z;
        }
    }
}