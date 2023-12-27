
#include "PartitionNodeElement.h"
#include <string>

PartitionNodeElement::PartitionNodeElement(void)
{
}

PartitionNodeElement::~PartitionNodeElement(void)
{
}

void PartitionNodeElement::TraversePartitionNode(INT32 filePosCount)
{
  INT32 _partitionFlags = _reader.getInt32(filePointer);
  INT32 _count = _reader.getInt32(filePointer);
  string *_MbString = new string[_count * 2];
  for (unsigned int i = 0; i < _MbString->size(); i++)
  {
    _MbString[i] = _reader.getBtye(filePointer);
  }
  string *_fileName = _MbString;
}
