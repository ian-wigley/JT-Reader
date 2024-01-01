
#include "BaseJTNode.h"

BaseJTNode::BaseJTNode(void)
{
}

BaseJTNode::~BaseJTNode(void)
{
}

INT32 BaseJTNode::TraverseBaseNodeData()
{
    if (_fileVersion >= 9.5)
    {
		INT16 _versionNumber = _reader.getInt16(filePointer);
    }
    else
    {
		INT32 _objectID = _reader.getInt32(filePointer);
    }

	INT32 _nodeFlags = _reader.getInt32(filePointer);

    if (_nodeFlags != 0)
    {
		INT32 _attributeCount = _reader.getInt32(filePointer);
		INT32* _attributeObjectID = new INT32[_attributeCount];
		_attributeObjectID[0] = _reader.getInt32(filePointer);
    }
    return 0;
}
