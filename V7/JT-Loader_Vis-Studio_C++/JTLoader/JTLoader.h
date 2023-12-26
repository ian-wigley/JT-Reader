#include <windows.h>
#include <stdio.h>
#include <conio.h>
#include <vector>
#include <iterator>
#include <assert.h>
#include <string.h>

using namespace std;

namespace JTLoading
{
    class JTLoader
    {
    public:

		static __declspec(dllexport) bool LoadJT (LPCWSTR fileName);

		static __declspec(dllexport) std::vector<float> GetVertices(void);
		static __declspec(dllexport) std::vector<float> GetNormals(void);
		static __declspec(dllexport) std::vector<int> GetIndices(void);
    };
}