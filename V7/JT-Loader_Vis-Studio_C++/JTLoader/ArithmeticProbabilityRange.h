#pragma once

#include <Windows.h>

class ArithmeticProbabilityRange
{
public:
	ArithmeticProbabilityRange(void);
	ArithmeticProbabilityRange(long low, long high, long scale);
	~ArithmeticProbabilityRange(void);
	
	long getLow(void);
	long getHigh(void);
	long getScale(void);

	long low_count;
	long high_count;
	long scale;

private:
    long m_low;
    long m_high;
    long m_scale;
};