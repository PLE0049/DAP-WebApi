using System;

namespace Common.Structures
{
    public class ClassificationResult
    {
        public string Expected { get; set; }
        public string Assigned { get; set; }
        public double Support { get; set; }
    }
}    