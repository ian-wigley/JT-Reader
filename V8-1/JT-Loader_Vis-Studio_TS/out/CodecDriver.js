var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class CodecDriver {
        static unpackResiduals(rvResidual, rvVals, ePredType) {
            var iPredicted;
            var len = rvResidual.Count();
            var aVals = rvVals;
            var aResidual = rvResidual;
            for (var i = 0; i < len; i++) {
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
        static unpackResiduals(rvResidual, rvVals, ePredType) {
            if (ePredType == PredictorType.PredXor1 || ePredType == PredictorType.PredXor2) {
                return false;
            }
            if (ePredType == PredictorType.PredNULL) {
                rvVals = rvResidual;
                return true;
            }
            var iPredicted;
            var len = rvResidual.Count();
            for (var i = 0; i < len; i++) {
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
        static predictValue(vVal, iIndex, ePredType) {
            var aVals = vVal;
            var iPredicted, v1 = aVals[iIndex - 1], v2 = aVals[iIndex - 2], v3 = aVals[iIndex - 3], v4 = aVals[iIndex - 4];
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
                    else
                        iPredicted = v2 + 2;
                    break;
                case PredictorType.PredRamp:
                    iPredicted = iIndex;
                    break;
            }
            return iPredicted;
        }
        static predictValue(vVal, iIndex, ePredType) {
            var aVals = vVal;
            var iPredicted, v1 = aVals[iIndex - 1], v2 = aVals[iIndex - 2], v3 = aVals[iIndex - 3], v4 = aVals[iIndex - 4];
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
                    else
                        iPredicted = v2 + 2;
                    break;
                case PredictorType.PredRamp:
                    iPredicted = iIndex;
                    break;
            }
            return iPredicted;
        }
    }
    C_sharp_JT_Reader.CodecDriver = CodecDriver;
    (function (CodecDriver) {
        let PredictorType;
        (function (PredictorType) {
            PredictorType[PredictorType["PredLag1"] = 0] = "PredLag1";
            PredictorType[PredictorType["PredLag2"] = 1] = "PredLag2";
            PredictorType[PredictorType["PredStride1"] = 2] = "PredStride1";
            PredictorType[PredictorType["PredStride2"] = 3] = "PredStride2";
            PredictorType[PredictorType["PredStripIndex"] = 4] = "PredStripIndex";
            PredictorType[PredictorType["PredRamp"] = 5] = "PredRamp";
            PredictorType[PredictorType["PredXor1"] = 6] = "PredXor1";
            PredictorType[PredictorType["PredXor2"] = 7] = "PredXor2";
            PredictorType[PredictorType["PredNULL"] = 8] = "PredNULL";
        })(PredictorType = CodecDriver.PredictorType || (CodecDriver.PredictorType = {}));
    })(CodecDriver = C_sharp_JT_Reader.CodecDriver || (C_sharp_JT_Reader.CodecDriver = {}));
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=CodecDriver.js.map