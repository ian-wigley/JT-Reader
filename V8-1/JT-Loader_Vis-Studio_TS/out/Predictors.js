export class Predictors {
    static unpackResiduals(residuals, predType) {
        let predicted;
        let len = residuals.length;
        let primals = new Array(len);
        for (let i = 0; i < len; i++)
            if (i < 4)
                primals[i] = residuals[i];
            else {
                predicted = Predictors.predictValue(primals, i, predType);
                if (predType == PredictorType.Xor1 || predType == PredictorType.Xor2)
                    primals[i] = residuals[i] ^ predicted;
                else
                    primals[i] = residuals[i] + predicted;
            }
        return primals;
    }
    static unpackResidualsOverwrite(residuals, predType) {
        let predicted;
        let len = residuals.length;
        for (let i = 0; i < len; i++) {
            if (i < 4) {
                residuals[i] = residuals[i];
            }
            else {
                predicted = Predictors.predictValue(residuals, i, predType);
                if (predType == PredictorType.Xor1 || predType == PredictorType.Xor2) {
                    residuals[i] = residuals[i] ^ predicted;
                }
                else {
                    residuals[i] = residuals[i] + predicted;
                }
            }
        }
        return residuals;
    }
    static predictValue(primals, index, predType) {
        let predicted;
        let v1 = primals[index - 1];
        let v2 = primals[index - 2];
        let v3 = primals[index - 3];
        let v4 = primals[index - 4];
        switch (predType) {
            default:
            case PredictorType.Lag1:
            case PredictorType.Xor1:
                predicted = v1;
                break;
            case PredictorType.Lag2:
            case PredictorType.Xor2:
                predicted = v2;
                break;
            case PredictorType.Stride1:
                predicted = v1 + (v1 - v2);
                break;
            case PredictorType.Stride2:
                predicted = v2 + (v2 - v4);
                break;
            case PredictorType.StripIndex:
                if (v2 - v4 < 8 && v2 - v4 > -8) {
                    predicted = v2 + (v2 - v4);
                }
                else {
                    predicted = v2 + 2;
                }
                break;
            case PredictorType.Ramp:
                predicted = index;
                break;
        }
        return predicted;
    }
}
export var PredictorType;
(function (PredictorType) {
    PredictorType[PredictorType["Lag1"] = 0] = "Lag1";
    PredictorType[PredictorType["Lag2"] = 1] = "Lag2";
    PredictorType[PredictorType["Stride1"] = 2] = "Stride1";
    PredictorType[PredictorType["Stride2"] = 3] = "Stride2";
    PredictorType[PredictorType["StripIndex"] = 4] = "StripIndex";
    PredictorType[PredictorType["Ramp"] = 5] = "Ramp";
    PredictorType[PredictorType["Xor1"] = 6] = "Xor1";
    PredictorType[PredictorType["Xor2"] = 7] = "Xor2";
    PredictorType[PredictorType["NULL"] = 8] = "NULL";
})(PredictorType || (PredictorType = {}));
//# sourceMappingURL=Predictors.js.map