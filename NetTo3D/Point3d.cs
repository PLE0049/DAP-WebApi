using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Network3dGraph
{
    class Point3d
    {
        public readonly double X;
        public readonly double Y;
        public readonly double Z;
        private CubeGrid grid;

        public Point3d(double x, double y, double z, CubeGrid grid)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;

            this.grid = grid;
            double[] coordinates = this.GetGridCoordinates();

            this.grid.AddValue(Convert.ToInt32(coordinates[0]), Convert.ToInt32(coordinates[1]), coordinates[2]);
        }

        public double[] GetGroundCoordinates()
        {
            double[] coordinates = { this.X, this.Y };
            return coordinates;
        }

        public double[] GetCoordinates()
        {
            double[] coordinates = { this.X, this.Y, this.Z };
            return coordinates;
        }

        public double[] GetGridCoordinates()
        {
            double[] coordinates = new double[3];
            double x = Math.Round((this.grid.SizeX - 1) * (this.X - this.grid.MinX) / (this.grid.MaxX - this.grid.MinX));
            double y = Math.Round((this.grid.SizeY - 1) * (this.Y - this.grid.MinY) / (this.grid.MaxY - this.grid.MinY));
            double value = this.Z / this.grid.MaxValue;

            coordinates[0] = (int)(Math.Round(x));
            coordinates[1] = (int)(Math.Round(y));
            coordinates[2] = value;

            return coordinates;
        }

        public double GetValue()
        {
            double[] coordinates = this.GetGridCoordinates();
            return this.grid.GetValue(Convert.ToInt32(coordinates[0]), Convert.ToInt32(coordinates[1]));
        }

    }

}
