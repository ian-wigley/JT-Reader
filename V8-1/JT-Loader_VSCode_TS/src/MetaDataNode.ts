export class MetaDataNode extends GroupJTNode {

    protected elementLength: number;
    compare: string;
    _propertyProxyNode: PropertyProxyMetaData;

    constructor(fileVersion: number, richTextBox: List<string>) {
        _fileVersion = fileVersion;
        this.m_textBox = richTextBox;
    }

    public populateData(uncompressed: number[], filePosCount: number): number {
        _uncompressed = uncompressed;
        _filePosCount = filePosCount;
        _filePosCount = TraverseGroupNode(_richTextBox, _filePosCount);
        Buffer.BlockCopy(_uncompressed, _filePosCount, fileBytes, 0, 4);
        _versionNumber = DataTypes.getInt16(fileBytes);
        _filePosCount += 2;
        return this._filePosCount;
    }
}
