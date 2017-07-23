namespace Dashboard.Controllers.Api
{
    using System;
    using System.Linq;
    using System.Threading;
    using Dashboard.Library.Attributes;
    using Dashboard.Library.Formatters;
    using Dashboard.Library.Helpers;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    [ControllerRoute]
    public class VisualisationController : Controller
    {
        public VisualisationController()
        {
        }

        [Route(nameof(GetStocks))]
        public ActionResult GetStocks()
        {
            Thread.Sleep(Randomizer.GetRandomInt(1, 2000));

            int totalDays = Randomizer.GetRandomInt(1, 500);

            var stocks = Enumerable
                .Range(1, totalDays)
                .Select(i =>
                {
                    return new Stock
                    {
                        Value = Math.Round(Randomizer.GetRandomDouble(200, 600), 2),
                        Date = DateTime.Now.AddDays(i - totalDays)
                    };
                })
                .ToArray();

            return this.Json(stocks);
        }

        internal class Stock
        {
            [JsonConverter(typeof(StockDateConverter))]
            public DateTime Date { get; set; }

            public double Value { get; set; }
        }
    }
}