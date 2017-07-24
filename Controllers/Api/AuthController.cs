namespace Dashboard.Controllers.Api
{
    using System.Threading;
    using Dashboard.Library.Attributes;
    using Dashboard.Library.Helpers;
    using Dashboard.Library.ViewModels;
    using Microsoft.AspNetCore.Mvc;

    [ControllerRoute]
    public class AuthController : Controller
    {
        [Route(nameof(Login))]
        [HttpPut]
        public ActionResult Login([FromBody] LoginViewModel viewModel)
        {
            if (this.TryValidateModel(viewModel))
            {
                Thread.Sleep(Randomizer.GetRandomInt(0, 3000));

                return this.Ok();
            }

            return this.BadRequest();
        }

        [Route(nameof(Logout))]
        [HttpPut]
        public ActionResult Logout()
        {
            return this.Ok();
        }
    }
}