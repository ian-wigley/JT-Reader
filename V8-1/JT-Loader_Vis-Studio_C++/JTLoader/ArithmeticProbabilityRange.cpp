
#include "ArithmeticProbabilityRange.h"

ArithmeticProbabilityRange::ArithmeticProbabilityRange(void)
{
}

ArithmeticProbabilityRange::~ArithmeticProbabilityRange(void)
{
}

ArithmeticProbabilityRange::ArithmeticProbabilityRange(long low, long high, long scale)
{
    this->m_low = low;
    this->m_high = high;
    this->m_scale = scale;
}

long ArithmeticProbabilityRange::getLow(void)
{
	return this->m_low;
}

long ArithmeticProbabilityRange::getHigh(void)
{
	return this->m_high;
}

long ArithmeticProbabilityRange::getScale(void)
{
	return this->m_scale;
}