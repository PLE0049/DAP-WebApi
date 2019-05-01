using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Network3dGraph
{
    public class Network3dForm
    {
        private static bool DEGREE_INDEX = false; //TRUE pro Kubu
        private double Exonent;

        private string inputName;
        private string outputName;
        private string layoutOutputName;

        private string[] nodes;

        private CubeGrid grid;

        public string LoadNetwork(string nodes, double exp)
        {
             
            this.nodes = nodes.Split('\n');
            this.readData();
            return this.saveData(exp);
        }

        private void readData()
        {
            List<double[]> points = new List<double[]>();
            int pointsCount;

            double minX = double.MaxValue;
            double maxX = double.MinValue;
            double minY = double.MaxValue;
            double maxY = double.MinValue;
            double maxValue = double.MinValue;

            char[] sep = { ',' };
            pointsCount = 0;
            foreach(string line in this.nodes)
            {
                if(line.Length > 1)
                {
                    string[] values = line.Split(sep);

                    double[] coordinates = new double[3];
                    coordinates[0] = Convert.ToDouble(values[2]);
                    coordinates[1] = Convert.ToDouble(values[3]);
                    coordinates[2] = Convert.ToDouble(values[4]);

                    if (coordinates[0] < minX) minX = coordinates[0];
                    if (coordinates[0] > maxX) maxX = coordinates[0];
                    if (coordinates[1] < minY) minY = coordinates[1];
                    if (coordinates[1] > maxY) maxY = coordinates[1];
                    if (coordinates[2] > maxValue) maxValue = coordinates[2];

                    pointsCount += 1;
                    points.Add(coordinates);
                }

            }

            double x = maxX - minX;
            double y = maxY - minY;
            double q = x / y;
            int N = (int)Math.Log(pointsCount, 1.05);

            if (q > 0)
            {
                x = N;
                y = Math.Round(N / q);
            }
            else
            {
                x = Math.Round(N * q);
                y = N;
            }

            if (!DEGREE_INDEX)
            {
                this.grid = new CubeGrid(minX, maxX, (int)x, minY, maxY, (int)y, maxValue, true);
            }
            else
            {
                this.grid = new CubeGrid(-1152.871, 1412.4487, 109, -956.685, 984.1614, 82, 32, true);
                //this.grid = new CubeGrid(-759.0032, 783.5832, 109, -781.69055, 774.5611, 110, 32, true);
            }

            int id = 0;
            foreach (double[] cooordinates in points)
            {
                id += 1;
                Point3d p = new Point3d(cooordinates[0], cooordinates[1], cooordinates[2], this.grid);
            }
        }

        private string saveData(double exp = 2)
        {

            this.grid.WeightExponent = exp;

            double[][] valueGrid = new double[this.grid.SizeX][];
            for (int i = 0; i < this.grid.SizeX; i++)
            {
                valueGrid[i] = new double[this.grid.SizeY];
            }
            Parallel.For(0, this.grid.SizeX, i =>
            //for (int i = 0; i < this.grid.SizeX; i++)
           {
               for (int j = 0; j < this.grid.SizeY; j++)
               {
                   valueGrid[i][j] = this.grid.Get3dValue(i, j);
               }
           });

            string result = "";
            //System.IO.StreamWriter sw = new System.IO.StreamWriter(this.outputName);
            //System.IO.StreamWriter lsw = new System.IO.StreamWriter(this.layoutOutputName);
            for (int i = 0; i < this.grid.SizeX; i++)
            {
                for (int j = 0; j < this.grid.SizeY; j++)
                {
                    result += Convert.ToString(valueGrid[i][j].ToString()).Replace(",", ".")+",";
                }
                result += "\n";
            }

            return result;
        }
    }

}
