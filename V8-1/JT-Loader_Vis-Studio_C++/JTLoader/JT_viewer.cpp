
#define ZLIB_WINAPI

#include "JTLoader.h"

#include <windows.h>
#include <stdio.h>
#include <conio.h>
#include <vector>
#include <iterator>
#include <assert.h>
#include <string.h>
#include "zlib.h"

#include "LogicalSceneGraphNode.h"
#include "TriStripSetShapeLODElement.h"
#include "Reader.h"

#include <richedit.h>
#include <Strsafe.h>

// File reading
#include <iostream>
#include <fstream>

#pragma region Fields

HWND hwnd;
TCHAR tc[1000];

using namespace std;

struct JT_Header
{
	UCHAR version[80];
	UCHAR byteOrder;
};
CHAR version[80];
INT32 reservedField;
INT32 tocOffset;
GUID lsgSegmentID;
GUID reserve_Field;

INT32 entryCount;
vector<GUID> segmentID;
vector<INT32> segmentOffset;
vector<INT32> segmentLength;
vector<UINT32> segmentAttributes;


vector<GUID> SegmentID;
vector<INT32> segmentType;
vector<INT32> segLength;


vector<INT32> elementLength;
vector<GUID> objectTypeID;
vector<UCHAR> objectBaseType;
vector<INT32> ObjectID;

vector<INT32> compressionFlag;
vector<INT32> compressedDataLength;
vector<char> compressionAlgorithmn;

INT16 versionNumber;
UINT64 vertexBindings;
TCHAR byteOrder;

vector<bool> zlibApplied;
vector<string> segmentTypeDesc;
vector<UCHAR> segment;

std::vector<char> jt_file;

vector<float> m_vertex;
vector<float> m_normal;
vector<int> m_indices;

LogicalSceneGraphNode* m_sceneGraphNode;
TriStripSetShapeLODElement* triStrip;
Reader reader;

#pragma endregion



namespace JTLoading
{
	// Accessor methods
	vector<float> JTLoading::JTLoader::GetVertices(void)
	{
		return m_vertex;
	}

	vector<float> JTLoading::JTLoader::GetNormals(void)
	{
		return m_normal;
	}

	vector<int> JTLoading::JTLoader::GetIndices(void)
	{
		return m_indices;
	}

	// Main entry point for the JTLoader
	bool JTLoading::JTLoader::LoadJT(LPCWSTR fileName)
	{
		ifstream file;
		INT32 length;
		INT32 filePosition = 0;
		INT32 *filePointer = &filePosition;

		// Try to open JT file
		file.open( fileName, ios::in | ios::binary );
		if(file.fail())
		{
			MessageBox(hwnd, L"Unable to Load JT model file", L"Model Details", MB_OK);
			return false;
		}

		// get length of file:
		file.seekg (0, ios::end);
		length = (int)file.tellg();
		file.seekg (0, ios::beg);

		jt_file.resize(length);

		// Store the contents of the JT file into the vector collection
		file.read(&jt_file[0], jt_file.size());


		//Pass the contents of the Vector collection to the Reader class
		reader =  Reader(jt_file);

		// Reset the read position back to the start of the file
		file.seekg (0, ios::beg);

		// Read the file header
		TCHAR fileVersion[80];

		// Read the file version
		for (int i = 0; i < 80; i++)
		{
			fileVersion[i] = reader.getBtye(filePointer);
		}

		byteOrder = (TCHAR)reader.getBtye(filePointer);

		// Store the Byte Order in the reader
		reader.setByteOrder(byteOrder);

		// Little Endian ?
		if (byteOrder == 0)
		{

			// Start reading the values from the Vector collection
			reservedField = reader.getInt32(filePointer);

			tocOffset = reader.getInt32(filePointer);
			lsgSegmentID = reader.getGuid(filePointer);

			// Read the Entry Count & then the segments TOC
			entryCount = reader.getInt32(filePointer);

			// Data Segments
			segmentID.resize(entryCount);
			segmentOffset.resize(entryCount);
			segmentLength.resize(entryCount);
			segmentAttributes.resize(entryCount);

			// Helper flag
			zlibApplied.resize(entryCount);

			// Collect the segment information
			for (int i = 0; i < entryCount; i++)
			{
				segmentID.at(i) = reader.getGuid(filePointer);
				segmentOffset.at(i) = reader.getInt32(filePointer);
				segmentLength.at(i) = reader.getInt32(filePointer);
				segmentAttributes.at(i) = reader.getUInt32(filePointer);
			}

			SegmentID.resize(entryCount);
			segmentType.resize(entryCount);
			segLength.resize(entryCount);

			compressionFlag.resize(entryCount);
			compressedDataLength.resize(entryCount);
			compressionAlgorithmn.resize(entryCount);

			elementLength.resize(entryCount);
			objectTypeID.resize(entryCount);
			objectBaseType.resize(entryCount);
			ObjectID.resize(entryCount);

			segmentTypeDesc.resize(entryCount);

			// Collect the segment information
			for (int i = 0; i < entryCount; i++)
			{
				// Update the base Stream position
				*filePointer = segmentOffset[i];
				SegmentID.at(i) = reader.getGuid(filePointer);
				segmentType.at(i) = reader.getInt32(filePointer);


				if (segmentType.at(i) < 6 || segmentType.at(i) > 17)
				{
					zlibApplied[i] = true;
				}
				else
				{
					zlibApplied[i] = false;
				}

				int m_count = 0;

				switch (segmentType.at(i))
				{
				case 1:
					segmentTypeDesc.at(i) = "Logical Scene Graph";
					m_sceneGraphNode = new LogicalSceneGraphNode();
					break;
				case 2:
					segmentTypeDesc.at(i) = "JT B-Rep";
					break;
				case 3:
					segmentTypeDesc.at(i) = "PMI Data";
					break;
				case 4:
					segmentTypeDesc.at(i) = "Meta Data";
					break;
				case 6:
					segmentTypeDesc.at(i) = "Shape";
					break;
				case 7:
					segmentTypeDesc.at(i) = "Shape LOD0";

					segment.resize(segmentLength.at(i));
					for (int j = segmentOffset.at(i); j < segmentOffset.at(i) + segmentLength.at(i); j++)
					{
						segment[m_count] = jt_file.at(j);
						m_count++;
					}
					triStrip = new TriStripSetShapeLODElement(8.1f, hwnd, segment, filePointer, reader);

					break;
				case 8:
					segmentTypeDesc.at(i) = "Shape LOD1";
					break;
				case 9:
					segmentTypeDesc.at(i) = "Shape LOD2";
					break;
				case 10:
					segmentTypeDesc.at(i) = "Shape LOD3";
					break;
				case 11:
					segmentTypeDesc.at(i) = "Shape LOD4";
					break;
				case 12:
					segmentTypeDesc.at(i) = "Shape LOD5";
					break;
				case 13:
					segmentTypeDesc.at(i) = "Shape LOD6";
					break;
				case 14:
					segmentTypeDesc.at(i) = "Shape LOD7";
					break;
				case 15:
					segmentTypeDesc.at(i) = "Shape LOD8";
					break;
				case 16:
					segmentTypeDesc.at(i) = "Shape LOD9";
					break;
				case 17:
					segmentTypeDesc.at(i) = "XT B-Rep";
					break;
				case 18:
					segmentTypeDesc.at(i) = "Wireframe Representation";
					break;
				case 20:
					segmentTypeDesc.at(i) = "ULP";
					break;
				case 24:
					segmentTypeDesc.at(i) = "LWPA";
					break;
				}

				// Read each segment header & it's data
				if (zlibApplied[i] == true)
				{
					// = 2 ZLIB on, ! = 2 ZLIB off
					compressionFlag[i] = reader.getInt32(filePointer);
					compressedDataLength[i] = reader.getInt32(filePointer);
					compressionAlgorithmn[i] = reader.getBtye(filePointer);

				}

				// Retrieve the Geometical data
				if (triStrip != NULL)
				{
					m_vertex = triStrip->GetVertices();
					m_normal = triStrip->GetNormals();
					m_indices = triStrip->GetIndices();
				}
			}
		}
		// Big Endian
		else
		{
			//To-do
		}

		return true;
	}
}

