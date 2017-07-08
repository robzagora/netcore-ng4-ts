namespace Dashboard.Controllers.Api
{
    using System.Threading;
    using Dashboard.Library.Attributes;
    using Microsoft.AspNetCore.Mvc;

    [ControllerRoute]
    public class NewsController : Controller
    {
        [HttpGet]
        [Route(nameof(GetAll))]
        public ActionResult GetAll()
        {
            Thread.Sleep(2000);

            var values = new[]
            {
                new { Name = "Name 1", Value = 2 },
                new { Name = "Name 2", Value = 3 }
            };

            return this.Json(values);
        }
    }
}