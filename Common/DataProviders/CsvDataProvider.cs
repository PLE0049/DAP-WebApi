using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Common.Structures;
using static System.Double;

namespace Common.DataProviders
{
    public static class CsvDataProvider
    {
        public static ClassificationDataSet GetClassificationDataSet(string filePath, bool hasHeader = true,
            string[] columnNames = null)
        {
            if (columnNames == null && hasHeader == false)
                throw new Exception("Dataset must have specified header");

            var rows = File.ReadAllLines(filePath).ToList();
            if (rows.Count < 2)
                throw new Exception("Dataset must contains at least 2 entries");

            var mColumnNames = columnNames;
            if (hasHeader)
            {
                mColumnNames = rows[0].Split(';');
                rows.RemoveAt(0);
            }

            var dataSet = new ClassificationDataSet(new List<string>(mColumnNames));

            foreach (var row in rows)
            {
                var attributeValues = row.Split(';');

                var dataRow = new ClassificationDataRow {Class = attributeValues.Last()};
                for (var j = 0; j < attributeValues.Length - 1; j++)
                {
                    dataRow[j] = Parse(attributeValues[j], CultureInfo.InvariantCulture.NumberFormat);
                }

                dataSet.AddRow(dataRow);
            }

            return dataSet;
        }
    }
}