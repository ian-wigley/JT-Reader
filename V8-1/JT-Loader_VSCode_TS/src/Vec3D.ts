export class Vec3D {
    x: number;
    y: number;
    z: number;

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
        return this.x;
    }

    public getYf(): number {
        return this.y;
    }

    public getZf(): number {
        return this.z;
    }
}
