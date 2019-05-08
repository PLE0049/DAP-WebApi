using System;
using Common.Structures;

namespace Common.Algorithms
{
    public static class Distance
    {
        public static double Euclidean(DataRow dataRow1, DataRow dataRow2)
        {
            var sum = 0.0;
            for (var i = 0; i < dataRow1.Length; i++)
            {
                sum += Math.Pow(dataRow1[i] - dataRow2[i], 2);
            }
            return Math.Sqrt(sum);
        }
    }
}