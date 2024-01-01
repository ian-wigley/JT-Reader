//
// A class that deals with the conversions from SYMBOL to VALUE and
// provides end-consumer APIs for using the codecs.
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows.Forms;

namespace C_sharp_JT_Reader
{
    public static class CodecDriver
    {
        // ---------- Predictor Type Residual Unpacking ----------
        public enum PredictorType
        {
            PredLag1 = 0,
            PredLag2 = 1,
            PredStride1 = 2,
            PredStride2 = 3,
            PredStripIndex = 4,
            PredRamp = 5,
            PredXor1 = 6,
            PredXor2 = 7,
            PredNULL = 8
        } ;

        // Returns the original values from the predicted residual values.
        public static bool unpackResiduals(Int32[] rvResidual, List<Int32> rvVals, PredictorType ePredType)
        {
            Int32 iPredicted;
            Int32 len = rvResidual.Count();

            List<Int32> aVals = rvVals;
            Int32[] aResidual = rvResidual;
            for (Int32 i = 0; i < len; i++)
            {
                if (i < 4)
                {
                    // The first four values are just primers
                    aVals.Add(aResidual[i]);
                }
                else
                {
                    // Get a predicted value
                    iPredicted = predictValue(rvVals, i, ePredType);
                    if (ePredType == PredictorType.PredXor1 || ePredType == PredictorType.PredXor2)
                    {
                        // Decode the residual as the current value XOR predicted
                        aVals.Add(aResidual[i] ^ iPredicted);
                    }
                    else
                    {
                        // Decode the residual as the current value plus predicted
                        aVals.Add(aResidual[i] + iPredicted);
                    }
                }
            }
            return true;
        }

        static bool unpackResiduals(List<float> rvResidual, List<float> rvVals, PredictorType ePredType)
        {
            if (ePredType == PredictorType.PredXor1 || ePredType == PredictorType.PredXor2)
            {
                return false;
            }
            if (ePredType == PredictorType.PredNULL) 
            {
                rvVals = rvResidual;
                return true;
            }
            float iPredicted;
            Int32 len = rvResidual.Count();
            for (Int32 i = 0; i < len; i++)
            {
                if (i < 4)
                {
                    // The first four values are just primers
                    rvVals[i] = rvResidual[i];
                }
                else
                {
                    // Get a predicted value
                    iPredicted = predictValue(rvVals, i, ePredType);
                    // Decode the value as the residual plus predicted
                    rvVals[i] = rvResidual[i] + iPredicted;
                }
            }
            return true;
        }

        static Int32 predictValue(List<Int32> vVal, Int32 iIndex, PredictorType ePredType)
        {
            List<Int32> aVals = vVal;
            Int32 iPredicted,
            v1 = aVals[iIndex - 1],
            v2 = aVals[iIndex - 2],
            v3 = aVals[iIndex - 3],
            v4 = aVals[iIndex - 4];
            switch (ePredType)
            {
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

        static float predictValue(List<float> vVal, Int32 iIndex, PredictorType ePredType)
        {
            List<float> aVals = vVal;
            float iPredicted,
            v1 = aVals[iIndex - 1],
            v2 = aVals[iIndex - 2],
            v3 = aVals[iIndex - 3],
            v4 = aVals[iIndex - 4];
            switch (ePredType)
            {
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
}
