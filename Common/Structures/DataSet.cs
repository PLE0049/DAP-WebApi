using System.Collections.Generic;

namespace Common.Structures
{
    public class DataSet<T> : Matrix<T> where T : DataRow
    {
        public List<string> ColumnNames { get; set; }

        public DataSet(List<string> columnNames)
        {
            ColumnNames = columnNames;
        }
        
    }
}