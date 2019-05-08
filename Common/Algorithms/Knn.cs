using System;
using System.Collections.Generic;
using System.Linq;
using Common.Structures;

namespace Common.Algorithms
{
    public class Knn
    {
        public int K { get; }
        private readonly Func<DataRow, DataRow, double> _distanceFunction;
        public ClassificationDataSet LabeledDataSet { get; set; }

        public Knn(int k, Func<DataRow, DataRow, double> distanceFunction)
        {
            K = k;
            _distanceFunction = distanceFunction;
        }

        public void Train(ClassificationDataSet trainDataSet)
        {
            LabeledDataSet = trainDataSet;
        }

        public List<ClassificationResult> Test(ClassificationDataSet testDataSet)
        {
            var result = new List<ClassificationResult>();
            foreach (var unlabeledEntry in testDataSet.rows)
            {
                var order = LabeledDataSet.rows.OrderBy(labeledEntry =>
                    Distance.Euclidean(labeledEntry, unlabeledEntry));

                var knearest = order.Take(K);

                result.Add(GetResult(knearest, unlabeledEntry));
            }

            return result;
        }

        private ClassificationResult GetResult(IEnumerable<ClassificationDataRow> knearest,
            ClassificationDataRow unlabeledEntry)
        {
            var classificationResult = new ClassificationResult();
            classificationResult.Expected = unlabeledEntry.Class;
            var res = knearest.GroupBy(entry => entry.Class)
                .Select((x) => new {x.Key, Count = x.Count()}).OrderByDescending(entriesGroup => entriesGroup.Count).First();
            classificationResult.Assigned = res.Key;
            classificationResult.Support = (double) res.Count / K;

            return classificationResult;
        }
    }
}