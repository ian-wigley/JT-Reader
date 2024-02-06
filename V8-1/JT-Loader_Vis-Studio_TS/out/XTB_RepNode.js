var C_sharp_JT_Reader;
(function (C_sharp_JT_Reader) {
    class XTB_RepNode {
        _richTextBox;
        _uncompressed;
        filePosCount;
        elementLength;
        objectTypeID;
        m_textBox = new List();
        encoding = System.Text.Encoding.Unicode;
        setRTB(rTB) {
            this._richTextBox = rTB;
        }
        populateData(uncompressed) {
            this.m_textBox.Add("\n\n--------------------------- XT B-Rep Node Element -----------------------------");
            this.m_textBox.Add("\n\n---------------------------------- Header -------------------------------------");
            this._uncompressed = uncompressed;
            this.filePosCount = 0;
            var fileBytes = new Array(4);
            var guidBytes = new Array(16);
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            this.elementLength = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            var str0 = this.elementLength.ToString();
            this.m_textBox.Add("\nElement Length = " + str0);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, guidBytes, 0, 16);
            this.objectTypeID = C_sharp_JT_Reader.DataTypes.getGuid(guidBytes);
            var str1 = this.objectTypeID.ToString();
            this.m_textBox.Add("\nObject Type ID = {" + str1 + "}");
            this.filePosCount += (16);
            var objectBaseType = this._uncompressed[this.filePosCount];
            var str2 = objectBaseType.ToString();
            this.m_textBox.Add("\nObject Base Type = " + str2);
            this.filePosCount += 1;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            var objectID = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            var str3 = objectID.ToString();
            this.m_textBox.Add("\nobject ID = " + str3);
            this.filePosCount += 4;
            var versionNumber;
            var parasolidKernelMajorVersionNumber;
            var parasolidKernelMinorVersionNumber;
            var parasolidKernelBuildNumber;
            var xtBRepDataLength;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            versionNumber = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            var str4 = versionNumber.ToString();
            this.m_textBox.Add("\nVersion Number = " + str4);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            parasolidKernelMajorVersionNumber = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            var str5 = parasolidKernelMajorVersionNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Major Version Number = " + str5);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            parasolidKernelMinorVersionNumber = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            var str6 = parasolidKernelMinorVersionNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Minor Version Number = " + str6);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            parasolidKernelBuildNumber = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            var str7 = parasolidKernelBuildNumber.ToString();
            this.m_textBox.Add("\nParasolid Kernel Build Number = " + str7);
            this.filePosCount += 4;
            Buffer.BlockCopy(this._uncompressed, this.filePosCount, fileBytes, 0, 4);
            xtBRepDataLength = C_sharp_JT_Reader.DataTypes.getInt32(fileBytes);
            var str8 = xtBRepDataLength.ToString();
            this.m_textBox.Add("\nXT B-Rep Data Length = " + str8);
            this.filePosCount += 4;
            var version = new Array(80);
            var charBytes = new Array(80);
        }
    }
    C_sharp_JT_Reader.XTB_RepNode = XTB_RepNode;
})(C_sharp_JT_Reader || (C_sharp_JT_Reader = {}));
//# sourceMappingURL=XTB_RepNode.js.map