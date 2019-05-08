using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Algorithms;
using Common.DataProviders;
using Common.Structures;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassificationController : ControllerBase
    {
        [HttpGet("knn")]
        public async Task<IActionResult> Knn([FromQuery] int? from, [FromQuery] int? to, [FromQuery] int k = 1)
        {
            var path = @"Data\Iris.csv";
            var trainSetSizePercents = 0.3;

            var data = CsvDataProvider.GetClassificationDataSet(path);
            var (train, test) = data.SplitToTrainAndTest(trainSetSizePercents, true);

            var resultList = new Dictionary<int, double>();

            if (from != null && to != null)
            {
                for (var i = from; i < to; i++)
                {
                    resultList.Add((int) i, RunKnn((int) i, train, test));
                }
            }
            else
            {
                resultList.Add(k, RunKnn(k, train, test));
            }

            return Ok(resultList);
        }

        private double RunKnn(int k, ClassificationDataSet train, ClassificationDataSet test)
        {
            var knn = new Knn(k, Distance.Euclidean);
            knn.Train(train);
            var classificationResults = knn.Test(test);
            var correct = classificationResults.Where(r => r.Assigned == r.Expected).ToList();
            var successRate = (double) correct.Count / classificationResults.Count;
            return successRate;
        }
    }
}