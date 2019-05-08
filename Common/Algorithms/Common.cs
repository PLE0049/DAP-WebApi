using System;
using System.Linq;
using Common.Structures;

namespace Common.Algorithms
{
    public static class Common
    {
        public static double DotProduct(DataRow dataRow1, DataRow dataRow2)
        {
            if (dataRow1.Length != dataRow2.Length)
                throw new Exception("Vectors length must be same");

            var sum = 0.0;
            for (var i = 0; i < dataRow1.Length; i++)
            {
                sum += dataRow1[i] * dataRow2[i];
            }

            return sum;
        }

        public static double EuclideanNorm(DataRow dataRow)
        {
            var sum = dataRow.Attributes.Sum(element => Math.Pow(element, 2));
            return Math.Sqrt(sum);
        }
    }
}