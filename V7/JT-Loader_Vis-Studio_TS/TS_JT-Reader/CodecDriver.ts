module C_sharp_JT_Reader {
    export class CodecDriver {
        public static unpackResiduals(rvResidual: Int32[], rvVals: List<Int32>, ePredType: PredictorType): boolean {
            var iPredicted: Int32;
            var len: Int32 = rvResidual.Count();
            var aVals: List<Int32> = rvVals;
            var aResidual: Int32[] = rvResidual;
            for (var i: Int32 = 0; i < len; i++) {
                if (i < 4) {
                    aVals.Add(aResidual[i]);
                }
                else {
                    iPredicted = CodecDriver.predictValue(rvVals, i, ePredType);
                    if (ePredType == PredictorType.PredXor1 || ePredType == PredictorType.PredXor2) {
                        aVals.Add(aResidual[i] ^ iPredicted);
                    }
                    else {
                        aVals.Add(aResidual[i] + iPredicted);
                    }
                }
            }
            return true;
        }
        static unpackResiduals(rvResidual: List<number>, rvVals: List<number>, ePredType: PredictorType): boolean {
            if (ePredType == PredictorType.PredXor1 || ePredType == PredictorType.PredXor2) {
                return false;
            }
            if (ePredType == PredictorType.PredNULL) {
                rvVals = rvResidual;
                return true;
            }
            var iPredicted: number;
            var len: Int32 = rvResidual.Count();
            for (var i: Int32 = 0; i < len; i++) {
                if (i < 4) {
                    rvVals[i] = rvResidual[i];
                }
                else {
                    iPredicted = CodecDriver.predictValue(rvVals, i, ePredType);
                    rvVals[i] = rvResidual[i] + iPredicted;
                }
            }
            return true;
        }
        static predictValue(vVal: List<Int32>, iIndex: Int32, ePredType: PredictorType): Int32 {
            var aVals: List<Int32> = vVal;
            var iPredicted: Int32,
                v1 = aVals[iIndex - 1],
                v2 = aVals[iIndex - 2],
                v3 = aVals[iIndex - 3],
                v4 = aVals[iIndex - 4];
            switch (ePredType) {
                default:
                case PredictorType.PredLag1:
                case PredictorType.PredXor1:
                    iPredicted = v1;
                    break;
                case PredictorType.PredLag2:
                case PredictorType.PredXor2:
                    iPredicted = v2;
                    break;
                case PredictorType.PredStride1:
                    iPredicted = v1 + (v1 - v2);
                    break;
                case PredictorType.PredStride2:
                    iPredicted = v2 + (v2 - v4);
                    break;
                case PredictorType.PredStripIndex:
                    if (v2 - v4 < 8 && v2 - v4 > -8)
                        iPredicted = v2 + (v2 - v4);
                    else iPredicted = v2 + 2;
                    break;
                case PredictorType.PredRamp:
                    iPredicted = iIndex;
                    break;
            }
            return iPredicted;
        }
        static predictValue(vVal: List<number>, iIndex: Int32, ePredType: PredictorType): number {
            var aVals: List<number> = vVal;
            var iPredicted: number,
                v1 = aVals[iIndex - 1],
                v2 = aVals[iIndex - 2],
                v3 = aVals[iIndex - 3],
                v4 = aVals[iIndex - 4];
            switch (ePredType) {
                default:
                case PredictorType.PredLag1:
                    iPredicted = v1;
                    break;
                case PredictorType.PredLag2:
                    iPredicted = v2;
                    break;
                case PredictorType.PredStride1:
                    iPredicted = v1 + (v1 - v2);
                    break;
                case PredictorType.PredStride2:
                    iPredicted = v2 + (v2 - v4);
                    break;
                case PredictorType.PredStripIndex:
                    if (v2 - v4 < 8 && v2 - v4 > -8)
                        iPredicted = v2 + (v2 - v4);
                    else iPredicted = v2 + 2;
                    break;
                case PredictorType.PredRamp:
                    iPredicted = iIndex;
                    break;
            }
            return iPredicted;
        }
    }
    export module CodecDriver {
        export enum PredictorType {
            PredLag1 = 0,

            PredLag2 = 1,

            PredStride1 = 2,

            PredStride2 = 3,

            PredStripIndex = 4,

            PredRamp = 5,

            PredXor1 = 6,

            PredXor2 = 7,

            PredNULL = 8
        }
    }
}