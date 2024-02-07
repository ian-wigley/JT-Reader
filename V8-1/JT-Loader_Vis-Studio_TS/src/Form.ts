module C_sharp_JT_Reader {
    export class Form1 extends Form {
        fileVersion: number;
        version: string[];
        byteOrder: string;
        reservedField: Int32;
        tocOffset: Int32;
        lsgSegmentID: Guid;
        entryCount: Int32;
        segmentID: Guid[];
        segmentOffset: Int32[];
        segmentLength: Int32[];
        segmentAttributes: UInt32[];
        SegmentID: Guid;
        SegmentType: Int32;
        zlibApplied: boolean[];
        compressionFlag: Int32[];
        compressedDataLength: Int32[];
        compressionAlgorithmn: number[];
        segmentFilePos: Int32[];
        SegmentLength: Int32[];
        segmentType: string[];
        segment: number[];
        element: number[];
        test: number[];
        decompressedBytes: List<Byte[]> = new List<number[]>();
        notZLibBytes: List<Byte[]> = new List<number[]>();
        m_lodSegment: List<Shape_LOD_Segment> = new List<Shape_LOD_Segment>();
        m_textBox: List<string> = new List<string>();
        dataContents: string = string.Empty;
        metaNode: MetaDataNode;
        lSG: LogicalSceneGraphNode;
        xtB_Rep: XTB_RepNode;
        shapeLODSegment: Shape_LOD_Segment;
        constructor() {
            InitializeComponent();
        }
        private LoadJT(fileName: string): void {
            JTObjectTypeIdentifiers.PopulateList();
            var b: BinaryReader = new BinaryReader(File.Open(fileName, FileMode.Open))
            try {
                this.m_textBox.Add("--------------------------------- File Header ---------------------------------");
                this.m_textBox.Add("File Name = " + fileName);
                var length: number = <number>b.BaseStream.Length;
                this.m_textBox.Add("File size = " + length.ToString() + " bytes");
                this.version = b.ReadChars(80);
                var conversion: string = new string(this.version);
                var versionSplit: string[] = conversion.Split(' ');
                number.TryParse(versionSplit[1], this.fileVersion);
                this.m_textBox.Add("JT File Version : " + this.fileVersion);
                this.byteOrder = b.ReadChar();
                if (this.byteOrder != 0) {

                }
                else if (this.byteOrder == 0) {
                    this.m_textBox.Add("Byte Order = 0");
                    var filePos: number = <number>b.BaseStream.Position;
                    this.reservedField = this.getInt32(b);
                    this.m_textBox.Add("ReservedField = " + this.reservedField.ToString());
                    this.tocOffset = this.getInt32(b);
                    this.m_textBox.Add("TOC Offset = " + this.tocOffset.ToString());
                    this.lsgSegmentID = this.getGuid(b);
                    this.m_textBox.Add("LSG SegmentID = {" + this.lsgSegmentID.ToString() + "}");
                    b.BaseStream.Position = this.tocOffset;
                    this.entryCount = this.getInt32(b);
                    this.m_textBox.Add("Entry Count = " + this.entryCount.ToString());
                    this.segmentID = new Array(this.entryCount);
                    this.segmentOffset = new Array(this.entryCount);
                    this.segmentLength = new Array(this.entryCount);
                    this.segmentAttributes = new Array(this.entryCount);
                    this.zlibApplied = new Array(this.entryCount);
                    this.segmentFilePos = new Array(this.entryCount);
                    this.SegmentLength = new Array(this.entryCount);
                    this.segmentType = new Array(this.entryCount);
                    this.compressionFlag = new Array(this.entryCount);
                    this.compressedDataLength = new Array(this.entryCount);
                    this.compressionAlgorithmn = new Array(this.entryCount);
                    this.m_textBox.Add("\n--------------------------------- TOC Segment ---------------------------------");
                    for (var i: number = 0; i < this.entryCount; i++) {
                        this.m_textBox.Add("");
                        this.segmentID[i] = this.getGuid(b);
                        this.m_textBox.Add("SegmentID " + i + " = {" + this.segmentID[i].ToString() + "}");
                        this.segmentOffset[i] = this.getInt32(b);
                        this.m_textBox.Add("Segment Offset " + i + " = " + this.segmentOffset[i].ToString());
                        this.segmentLength[i] = this.getInt32(b);
                        this.m_textBox.Add("Segment Length " + i + " = " + this.segmentLength[i].ToString());
                        this.segmentAttributes[i] = this.getUInt32(b, i);
                        this.m_textBox.Add("Segment Attributes " + i + " = " + this.segmentAttributes[i].ToString());
                    }
                    this.m_textBox.Add("\n------------------------------- Segment Header --------------------------------");
                    for (var i: number = 0; i < this.entryCount; i++) {
                        b.BaseStream.Position = this.segmentOffset[i];
                        this.SegmentID = this.getGuid(b);
                        this.m_textBox.Add("Segment ID = {" + this.SegmentID.ToString() + "}");
                        this.SegmentType = this.getInt32(b);
                        this.segmentType[i] = this.getSegmentType(this.SegmentType, i);
                        this.m_textBox.Add("Segment Type = " + this.segmentType[i]);
                        this.SegmentLength[i] = this.getInt32(b);
                        this.m_textBox.Add("Segment Length = " + this.SegmentLength[i].ToString());
                        this.segmentFilePos[i] = <Int32>b.BaseStream.Position;
                        var basePos: number = <number>b.BaseStream.Position;
                        this.readBaseLSGData(i, basePos, b);
                    }
                }
            }
            finally {
                if (b != null) b.Dispose();
            }
            this.richTextBox.Lines = this.m_textBox.ToArray();
        }
        getInt32(b: BinaryReader): Int32 {
            var fileBytes: number[] = new Array(4);
            fileBytes = b.ReadBytes(4);
            return BitConverter.ToInt32(fileBytes, 0);
            ;
        }
        getUInt32(b: BinaryReader, i: number): UInt32 {
            var fileBytes: number[] = new Array(4);
            fileBytes = b.ReadBytes(4);
            if (fileBytes[3] < 6) {
                this.zlibApplied[i] = true;
            }
            return BitConverter.ToUInt32(fileBytes, 0);
        }
        getGuid(b: BinaryReader): Guid {
            var guidBytes: number[] = new Array(16);
            for (var i: number = 0; i < 16; i++) {
                guidBytes[i] = b.ReadByte();
            }
            return new System.Guid(guidBytes);
        }
        private readBaseLSGData(i: number, basePos: number, b: BinaryReader): void {
            b.BaseStream.Position = basePos;
            if (this.zlibApplied[i] == true) {
                this.m_textBox.Add("");
                this.m_textBox.Add("Zlib Applied");
                this.compressionFlag[i] = this.getInt32(b);
                this.m_textBox.Add("Compression Flag  = " + this.compressionFlag[i].ToString());
                this.compressedDataLength[i] = this.getInt32(b);
                this.m_textBox.Add("Compressed Data Length = " + this.compressedDataLength[i].ToString());
                this.compressionAlgorithmn[i] = b.ReadByte();
                this.m_textBox.Add("Compression Algorithmn = " + this.compressionAlgorithmn[i].ToString());
                var testLength: number = this.compressedDataLength[i] - 4;
                this.segment = new Array(testLength);
                for (var j: number = 0; j < testLength; j++) {
                    this.segment[j] = b.ReadByte();
                }
                this.test = new Array(10000);
                this.decompressFile(this.segment, this.test);
                this.decompressedBytes.Add(this.test);
            }
            else {
                this.m_textBox.Add("");
                this.m_textBox.Add("No ZLib");
                this.element = new Array(this.SegmentLength[i]);
                for (var j: number = 0; j < this.SegmentLength[i] - 24; j++) {
                    this.element[j] = b.ReadByte();
                }
                this.notZLibBytes.Add(this.element);
            }
            if (this.segmentType[i] == "Logical Scene Graph - ZLib Applied") {

            }
            if (this.segmentType[i] == "Meta Data - ZLib Applied") {
                this.metaNode = new MetaDataNode(this.fileVersion, this.m_textBox);
            }
            if (this.segmentType[i] == "XT B-Rep - ZLib Applied") {

            }
            if (this.segmentType[i] == "Shape LOD0") {
                this.shapeLODSegment = new Shape_LOD_Segment(this.fileVersion, this.m_textBox, this.element);
                this.m_lodSegment.Add(this.shapeLODSegment);
            }
            if (this.segmentType[i] == "Shape LOD1") {

            }
            if (this.segmentType[i] == "Shape LOD2") {

            }
        }
        private getSegmentType(type: number, count: number): string {
            if (type < 6 || type > 16) {
                this.zlibApplied[count] = true;
            }
            else {
                this.zlibApplied[count] = false;
            }
            switch (type) {
                case 1:
                    this.dataContents = "Logical Scene Graph - ZLib Applied";
                    break;
                case 2:
                    this.dataContents = "JT B-Rep - ZLib Applied";
                    break;
                case 3:
                    this.dataContents = "PMI Data - ZLib Applied";
                    break;
                case 4:
                    this.dataContents = "Meta Data - ZLib Applied";
                    break;
                case 6:
                    this.dataContents = "Shape";
                    break;
                case 7:
                    this.dataContents = "Shape LOD0";
                    break;
                case 8:
                    this.dataContents = "Shape LOD1";
                    break;
                case 9:
                    this.dataContents = "Shape LOD2";
                    break;
                case 10:
                    this.dataContents = "Shape LOD3";
                    break;
                case 11:
                    this.dataContents = "Shape LOD4";
                    break;
                case 12:
                    this.dataContents = "Shape LOD5";
                    break;
                case 13:
                    this.dataContents = "Shape LOD6";
                    break;
                case 14:
                    this.dataContents = "Shape LOD7";
                    break;
                case 15:
                    this.dataContents = "Shape LOD8";
                    break;
                case 16:
                    this.dataContents = "Shape LOD9";
                    break;
                case 17:
                    this.dataContents = "XT B-Rep - ZLib Applied";
                    break;
                case 18:
                    this.dataContents = "Wireframe Representation - ZLib Applied";
                    break;
                case 20:
                    this.dataContents = "ULP - ZLib Applied";
                    break;
                case 24:
                    this.dataContents = "LWPA - ZLib Applied";
                    break;
            }
            return this.dataContents;
        }
        private saveToolStripMenuItem_Click(sender: Object, e: EventArgs): void {
            var saveFile1: SaveFileDialog = new SaveFileDialog();
            saveFile1.DefaultExt = "*.rtf";
            saveFile1.Filter = "RTF Files|*.rtf";
            if (saveFile1.ShowDialog() == System.Windows.Forms.DialogResult.OK && saveFile1.FileName.Length > 0) {
                richTextBox.SaveFile(saveFile1.FileName, RichTextBoxStreamType.PlainText);
            }
        }
        private exitToolStripMenuItem_Click(sender: Object, e: EventArgs): void {
            Application.Exit();
        }
        private decompressFile(segment: number[], outData: number[]): void {
            var output: MemoryStream = new MemoryStream()
            try {
                var outZStream: Stream = new zlib.ZOutputStream(output)
                try {
                    var input: Stream = new MemoryStream(segment)
                    try {
                        Form1.CopyStream(input, outZStream);
                        outData = output.ToArray();
                    }
                    finally {
                        if (input != null) input.Dispose();
                    }
                }
                finally {
                    if (outZStream != null) outZStream.Dispose();
                }
            }
            finally {
                if (output != null) output.Dispose();
            }
        }
        public static CopyStream(input: System.IO.Stream, output: System.IO.Stream): void {
            var buffer: number[] = new Array(input.Length);
            var len: number;
            while ((len = input.Read(buffer, 0, <number>input.Length)) > 0) {
                output.Write(buffer, 0, len);
            }
            output.Flush();
        }
        private writeZip(decompressed: number[], fileName: string): void {
            var _fileName: string = fileName + ".bin";
            var writer: BinaryWriter = new BinaryWriter(File.Open(_fileName, FileMode.Create))
            try {
                decompressed.forEach(function (by) {
                    writer.Write(by);
                });
            }
            finally {
                if (writer != null) writer.Dispose();
            }
        }
        private loadToolStripMenuItem_Click(sender: Object, e: EventArgs): void {
            var openFileDialog: OpenFileDialog = new OpenFileDialog();
            openFileDialog.Title = "App Title";
            openFileDialog.InitialDirectory = @"*.*";
            openFileDialog.Filter = "All files (*.*)|*.*|All files (*.jt)|*.jt";
            openFileDialog.FilterIndex = 2;
            openFileDialog.RestoreDirectory = true;
            if (openFileDialog.ShowDialog() == DialogResult.OK) {
                var fileName: string = openFileDialog.FileName;
                this.LoadJT(fileName);
            }
        }
        private printToolStripMenuItem_Click(sender: Object, e: EventArgs): void {
            var doc: PrintDocument = new PrintDocument();
            var pd: PrintDialog = new PrintDialog();
            var ppd: PrintPreviewDialog = new PrintPreviewDialog();
            ppd.Document = doc;
            pd.Document = doc;
            doc.PrintPage += new PrintPageEventHandler(doc_PrintPage);
            if (ppd.ShowDialog() == DialogResult.OK) {
                if (pd.ShowDialog() == DialogResult.OK) {
                    doc.Print();
                }
            }
        }
        private doc_PrintPage(sender: Object, e: PrintPageEventArgs): void {
            var x: number = 10;
            var y: number = 0;
            var charpos: number = 0;
            while (charpos < this.richTextBox.Text.Length) {
                if (this.richTextBox.Text[charpos] == '\n') {
                    charpos++;
                    y += 23;
                    x = 10;
                }
                else if (this.richTextBox.Text[charpos] == '\r') {
                    charpos++;
                }
                else {
                    this.richTextBox.Select(charpos, 1);
                    e.Graphics.DrawString(this.richTextBox.SelectedText, this.richTextBox.SelectionFont, new SolidBrush(this.richTextBox.SelectionColor), new PointF(x, y));
                    x = x + 8;
                    charpos++;
                }
            }
        }
    }
}