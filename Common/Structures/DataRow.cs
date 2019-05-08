using System.Collections.Generic;

namespace Common.Structures
{
    public class DataRow
    {
        public List<double> Attributes { get; set; }

        public DataRow()
        {
            Attributes = new List<double>();
        }

        public double this[int index]
        {
            get => Attributes[index];
            set => Attributes.Add(value);
        }

        public int Length => Attributes.Count;
    }
}