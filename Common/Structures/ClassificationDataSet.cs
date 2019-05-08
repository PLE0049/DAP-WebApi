using System;
using System.Collections.Generic;
using System.Linq;

namespace Common.Structures
{
    public class ClassificationDataSet : DataSet<ClassificationDataRow>
    {
        public ClassificationDataSet(List<string> columnNames) : base(columnNames)
        {
        }

        public ClassificationDataSet(List<ClassificationDataRow> dataRows, List<string> columnNames) :
            base(columnNames)
        {
            rows = dataRows;
        }
        
        

        public (ClassificationDataSet train, ClassificationDataSet test) SplitToTrainAndTest(double trainSetSizePercent,
            bool shuffle)
        {
            var shuffledDataSet = rows;
            if (shuffle)
            {
                var random = new Random();
                shuffledDataSet = rows.OrderBy(x => random.Next()).ToList();
            }

            var trainSetSize = (int) (trainSetSizePercent * rows.Count);
            var test = new ClassificationDataSet(shuffledDataSet.Skip(trainSetSize).ToList(), ColumnNames);
            var train = new ClassificationDataSet(shuffledDataSet.Take(trainSetSize).ToList(), ColumnNames);

            return (train, test);
        }
    }
}