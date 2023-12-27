#include "MeshCoderDriver.h"

MeshCoderDriver::MeshCoderDriver(void)
{
}

MeshCoderDriver::~MeshCoderDriver(void)
{
}

void MeshCoderDriver::decode()
{
	// Reset the symbol counters
	for (INT32 i = 0; i < 8; i++)
	{
		_iValReadPos[i] = 0;
		_iAttrMaskReadPos[i] = 0;
	}
	_iDegReadPos = 0;
	_iVGrpReadPos = 0;
	_iFFlagReadPos = 0;
	_iAttrMaskLrgReadPos = 0;
	_iSplitFaceReadPos = 0;
	_iSplitPosReadPos = 0;
}

INT32 MeshCoderDriver::_nextDegSymbol(INT32 iCCntx)
{
	INT32 eSym = -1;
	return eSym;
}

INT32 MeshCoderDriver::_nextValSymbol()
{
	INT32 eSym = -1;
	return eSym;
}

INT32 MeshCoderDriver::_nextFGrpSymbol()
{
	INT32 eSym = -1;
	return eSym;
}

UINT16 MeshCoderDriver::_nextVtxFlagSymbol()
{
	UINT16 eSym = 0;
	return eSym;
}

UINT64 MeshCoderDriver::_nextAttrMaskSymbol(INT32 iCCntx)
{
	UINT64 eSym = 0;
	return eSym;
}

void MeshCoderDriver::_nextAttrMaskSymbol(BitVec *iopvbAttrMask, INT32 cDegree)
{
}

INT32 MeshCoderDriver::_nextSplitFaceSymbol()
{
	INT32 eSym = -1;
	return eSym;
}

INT32 MeshCoderDriver::_nextSplitPosSymbol()
{
	INT32 eSym = -1;
	return eSym;
}

// Computes a "compression context" from 0 to 7 inclusive for
// faces on vertex iVtx. The context is based on the vertex's
// valence, and the total _known_ degree of already-coded
// faces on the vertex at the time of the call.
INT32 MeshCoderDriver::_faceCntxt(INT32 iVtx, DualVFMesh *pVFM)
{
	INT32 iCCntxt = 0;
	return iCCntxt;
}