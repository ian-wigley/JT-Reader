module C_sharp_JT_Reader {
    export class XTB_RepNode {
        _richTextBox: RichTextBox;
        _uncompressed: number[];
        filePosCount: number;
        elementLength: Int32;
        objectTypeID: Guid;
        m_textBox: List<string> = new List<string>();
        encoding: System.Text.Encoding = System.Text.Encoding.Unicode;
        public setRTB(rTB: RichTextBox): void {
            this._richTextBox = rTB;
        }
        public populateData(uncompressed: number[]): void {
            this.m_textBox.Add("\n\n--------------------------- XT B-Rep Node Element -----------------------------");
            this.m_textBox.Add("\n\n---------------------------------- Header -------------------------------------");
            this._uncompressed = uncompressed;
            this.filePosCount = 0;
            var fileBytes: number[] = new Array(4);
            var guidBytes: number[] = new Array(16);
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            this.elementLength = DataTypes.getInt32(fileBytes);
            var str0: string = this.elementLength.ToString();
            this.m_textBox.Add("\nElement Length = " + str0);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, guidBytes, 0, 16);
            this.objectTypeID = DataTypes.getGuid(guidBytes);
            var str1: string = this.objectTypeID.ToString();
            this.m_textBox.Add("\nObject Type ID = {" + str1 + "}");
            this.filePosCount += (16);
            var objectBaseType: number = this._uncompressed[this.filePosCount];
            var str2: string = objectBaseType.ToString();
            this.m_textBox.Add("\nObject Base Type = " + str2);
            this.filePosCount += 1;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            var objectID: Int32 = DataTypes.getInt32(fileBytes);
            var str3: string = objectID.ToString();
            this.m_textBox.Add("\nobject ID = " + str3);
            this.filePosCount += 4;
            var versionNumber: Int32;
            var parasolidKernelMajorVersionNumber: Int32;
            var parasolidKernelMinorVersionNumber: Int32;
            var parasolidKernelBuildNumber: Int32;
            var xtBRepDataLength: Int32;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            versionNumber = DataTypes.getInt32(fileBytes);
            var str4: string = versionNumber.ToString();
            this.m_textBox.Add("\nVersion Number = " + str4);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            parasolidKernelMajorVersionNumber = DataTypes.getInt32(fileBytes);
            var str5: string = parasolidKernelMajorVersionNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Major Version Number = " + str5);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            parasolidKernelMinorVersionNumber = DataTypes.getInt32(fileBytes);
            var str6: string = parasolidKernelMinorVersionNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Minor Version Number = " + str6);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            parasolidKernelBuildNumber = DataTypes.getInt32(fileBytes);
            var str7: string = parasolidKernelBuildNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Build Number = " + str7);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            xtBRepDataLength = DataTypes.getInt32(fileBytes);
            var str8: string = xtBRepDataLength.ToString();
            this.m_textBox.Add("\nXT B-Rep Data Length = " + str8);
            this.filePosCount += 4;
            var version: string[] = new Array(80);
            var charBytes: number[] = new Array(80);
        }
    }
}