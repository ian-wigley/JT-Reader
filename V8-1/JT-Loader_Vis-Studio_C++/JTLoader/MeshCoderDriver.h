#pragma once
#include "DualVFMesh.h"
#include "BitVec.h"
#include <windows.h>
#include <stdio.h>
#include <conio.h>
#include <algorithm>

class MeshCoderDriver
{
public:
	MeshCoderDriver(void);
	~MeshCoderDriver(void);

	enum Veci
	{
		count,
		data
	};

	void decode();

	// ========== Utility Methods ==========
	INT32 _nextDegSymbol(INT32 iCCntx);
	INT32 _nextValSymbol();
	INT32 _nextFGrpSymbol();
	UINT16 _nextVtxFlagSymbol();
	UINT64 _nextAttrMaskSymbol(INT32 iCCntx);
	void _nextAttrMaskSymbol(BitVec *iopvbAttrMask, INT32 cDegree);
	INT32 _nextSplitFaceSymbol();
	INT32 _nextSplitPosSymbol();
	INT32 _faceCntxt(INT32 iVtx, DualVFMesh *pVFM);

	// ========== Member Data ==========
protected:
	Veci _viOutSplitFaceSyms;
	Veci _viOutSplitPosSyms;

	// The next symbol to be consumed by _next*Symbol()
	INT32 _iValReadPos[8];
	INT32 _iDegReadPos;
	INT32 _iVGrpReadPos;
	INT32 _iFFlagReadPos;
	INT32 _iAttrMaskReadPos[8];
	INT32 _iAttrMaskLrgReadPos;
	INT32 _iSplitFaceReadPos;
	INT32 _iSplitPosReadPos;
};
