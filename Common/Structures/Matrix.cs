using System;
using System.Collections.Generic;
using System.Linq;
using static System.Linq.Enumerable;

namespace Common.Structures
{
    public class Matrix<T> where T : DataRow
    {
        public List<T> rows { get; set; }

        public Matrix()
        {
            rows = new List<T>();
        }

        public double this[int x, int y]
        {
            get => rows[x][y];
            set => rows[x][y] = value;
        }

        public void AddRow(T row)
        {
            rows.Add(row);
        }

        public double[] GetColumn(int columnNumber)
        {
            return Range(0, rows.Count).Select(x => rows[x][columnNumber]).ToArray();
        }
    }
}