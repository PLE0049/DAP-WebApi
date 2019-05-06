using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Network3dGraph
{
    class CubeGrid
    {
        public readonly double MinX;
        public readonly double MaxX;
        public readonly double MinY;
        public readonly double MaxY;
        public readonly int SizeX;
        public readonly int SizeY;
        public readonly double MaxValue;

        public readonly bool LogScale;

        private readonly double[][] Grid;
        //private int[][] freqGrid;

        int test;
        private int pointsCount;
        private double radius;
        private double weightExponent = 1;
        private double[,] convolutionMatrix = null;

        public CubeGrid(double minX, double maxX, int sizeX, double minY, double maxY, int sizeY,
            double maxValue, bool logScale)
        {
            this.MinX = minX;
            this.MaxX = maxX;
            this.MinY = minY;
            this.MaxY = maxY;
            this.SizeX = sizeX;
            this.SizeY = sizeY;
            this.MaxValue = maxValue;

            this.LogScale = logScale;

            this.pointsCount = 0;
            this.Grid = new double[this.SizeX][];
            for (int i = 0; i < this.SizeX; i++)
            {
                this.Grid[i] = new double[this.SizeY];
            }

            //this.freqGrid = new int[this.SizeX][];
            //for (int i = 0; i < this.SizeX; i++)
            //{
            //    this.freqGrid[i] = new int[this.SizeY];
            //}
        }

        //public double Get3dValue(int row, int column, int weightExponent)
        //{
        //    double sum = 0;
        //    double weight = 0;
        //    double maxDistance = this.getDistance(0, 0, this.SizeX, this.SizeY);

        //    double X = Math.Min(this.SizeX, this.SizeY);
        //    double log = Math.Log(X);
        //    double sqrt = Math.Sqrt(X);
        //    int N = (int)Math.Round(log * sqrt);

        //    double radius = this.getRadius(row, column, N);
        //    int k = (int)Math.Round(radius);

        //    int dxLeft = row - k;
        //    int dxRight = row + k;
        //    int dyBottom = column - k;
        //    int dyTop = column + k;

        //    int exp = N;
        //    if (weightExponent > 0)
        //    {
        //        exp = weightExponent;
        //    }

        //    for (int i = dxLeft; i < dxRight; i++)
        //    {
        //        for (int j = dyBottom; j < dyTop; j++)
        //        {
        //            double d = this.getDistance(i, j, row, column);
        //            if (d <= radius)
        //            {
        //                double w = 1 - d / maxDistance;
        //                w = Math.Pow(w, exp);
        //                double z = 0;
        //                if (i >= 0 && j >= 0 && i < this.SizeX && j < this.SizeY)
        //                {
        //                    z = this.Grid[i][j];
        //                }
        //                sum += w * z;
        //                weight += w;
        //            }
        //        }
        //    }

        //    double value = sum / weight;
        //    return value;
        //}

        public double WeightExponent
        {
            get
            {
                return this.weightExponent;
            }
            set
            {
                this.convolutionMatrix = null;
                this.weightExponent = value;

                double ratio = (double)this.SizeX * this.SizeY / this.pointsCount;
                double sqrtRatio = Math.Sqrt(ratio);
                double log = Math.Log(Math.Min(this.SizeX, this.SizeY));

                this.radius = log * sqrtRatio / 2;
                //this.radius = Math.Log(this.SizeX * this.SizeY);
                //this.radius = 10;

                this.calculateConvolutionMatrix();
            }
        }

        public double Get3dValue(int row, int column)
        {

            int k = (int)this.radius;
            double sum = 0;

            for (int i = row - k; i < row + k; i++)
            {
                for (int j = column - k; j < column + k; j++)
                {
                    if (i >= 0 && j >= 0 && i < this.SizeX && j < this.SizeY)
                    {
                        double z = this.Grid[i][j];
                        double w = this.convolutionMatrix[i - row + k, j - column + k];
                        sum += w * z;
                    }
                }
            }

            return sum;
        }

        private void calculateConvolutionMatrix()
        {
            int k = (int)this.radius;

            this.convolutionMatrix = new double[2 * k, 2 * k];

            for (int i = 0; i < 2 * k; i++)
            {
                for (int j = 0; j < 2 * k; j++)
                {
                    double w = 0;
                    double d = this.getDistance(i, j, k, k);
                    if (d < this.radius)
                    {
                        if (this.LogScale)
                        {
                            d = Math.Log(Math.E + d);
                            w = 1 - d / Math.Log(Math.E + this.radius);
                            //w = (this.radius - d) / this.radius;
                        }
                        else
                        {
                            w = 1 - d / this.radius;
                        }
                    }

                    w = Math.Pow(w, this.weightExponent);

                    this.convolutionMatrix[i, j] = w;
                }
            }
        }

        //private double getRadius(int x, int y, int k)
        //{
        //    double[] distances = new double[k];
        //    int kk = 0;
        //    int delta = 0;
        //    while (delta < Math.Max(this.SizeX, this.SizeY))
        //    {
        //        delta += 1;
        //        int left = x - delta;
        //        int right = x + delta;
        //        int top = y + delta;
        //        int bottom = y - delta;
        //        double d;
        //        for (int i = left; i <= right; i++)
        //        {
        //            if (i >= 0 && i < this.SizeX)
        //            {
        //                if (top < this.SizeY && kk < k && this.Grid[i][top] > 0)
        //                {
        //                    d = this.getDistance(x, y, i, top);
        //                    distances[kk] = d;
        //                    kk += 1;
        //                }
        //                if (bottom >= 0 && kk < k && this.Grid[i][bottom] > 0)
        //                {
        //                    d = this.getDistance(x, y, i, bottom);
        //                    distances[kk] = d;
        //                    kk += 1;
        //                }
        //            }
        //        }

        //        if (kk == k)
        //        {
        //            break;
        //        }

        //        for (int j = bottom + 1; j <= top - 1; j++)
        //        {
        //            if (j >= 0 && j < this.SizeY)
        //            {
        //                if (left >= 0 && kk < k && this.Grid[left][j] > 0)
        //                {
        //                    d = this.getDistance(x, y, left, j);
        //                    distances[kk] = d;
        //                    kk += 1;
        //                }
        //                if (right < this.SizeX && kk < k && this.Grid[right][j] > 0)
        //                {
        //                    d = this.getDistance(x, y, right, j);
        //                    distances[kk] = d;
        //                    kk += 1;
        //                }
        //            }
        //        }

        //        if (kk == k)
        //        {
        //            break;
        //        }
        //    }

        //    Array.Sort(distances);
        //    return distances[distances.Length - 1];
        //}

        private double getDistance(int i, int j, int row, int column)
        {
            double d = Math.Sqrt(Math.Pow(i - row, 2) + Math.Pow(j - column, 2));
            return d;
        }

        public double GetValue(int row, int column)
        {
            return this.Grid[row][column];
        }

        public void AddValue(int row, int column, double value)
        {
            if (value > 0 && this.Grid[row][column] == 0)
            {
                this.pointsCount += 1;
                this.radius = -1;
                this.convolutionMatrix = null;
            }

            this.Grid[row][column] = Math.Max(this.Grid[row][column], value);

            //if (this.Grid[row][column] == 0)
            //{
            //    this.freqGrid[row][column] = 1;
            //    this.Grid[row][column] = value;
            //}
            //else
            //{
            //    double v = this.freqGrid[row][column] * this.Grid[row][column];
            //    this.freqGrid[row][column] += 1;
            //    this.Grid[row][column] = (v + value) / this.freqGrid[row][column];
            //}
        }

    }

    }
