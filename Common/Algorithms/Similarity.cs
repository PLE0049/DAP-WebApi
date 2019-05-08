using Common.Structures;
using static Common.Algorithms.Common;

namespace Common.Algorithms
{
    public class Similarity
    {
        public static double Euclidean(DataRow dataRow1, DataRow dataRow2)
        {
            return DotProduct(dataRow1, dataRow2) /
                   (EuclideanNorm(dataRow1) * EuclideanNorm(dataRow2));
        }
    }
}