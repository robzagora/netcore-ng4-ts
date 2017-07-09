namespace Dashboard.Controllers.Api
{
    using System;
    using System.Linq;
    using System.Threading;
    using Dashboard.Library.Attributes;
    using Microsoft.AspNetCore.Mvc;

    [ControllerRoute]
    public class NewsController : Controller
    {
        protected readonly Random Randomizer;

        public NewsController()
        {
            this.Randomizer = new Random();
        }

        [HttpGet]
        [Route(nameof(GetAll))]
        public ActionResult GetAll()
        {
            Thread.Sleep(this.Randomizer.Next(0, 2000));

            var values = Enumerable.Range(0, this.Randomizer.Next(10, 1000)).Select(i =>
            {
                return new { Name = "Name " + i, Value = i * 2 };
            });

            return this.Json(values);
        }
    }
}