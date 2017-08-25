namespace Dashboard.Controllers.Api
{
    using System.Security.Claims;
    using Dashboard.Library.Attributes;
    using Dashboard.Library.Authentication;
    using Dashboard.Library.Models;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    [ControllerRoute]
    public class ProfileController : Controller
    {
        protected readonly InMemoryUserDatabase UserDatabase;

        public ProfileController(InMemoryUserDatabase userDatabase)
        {
            this.UserDatabase = userDatabase;
        }

        [HttpGet]
        [Route(nameof(Get))]
        [BearerAuthorization]
        public ActionResult Get()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;

            User user = this.UserDatabase.Get(claimsIdentity.Name);

            return new JsonResult(new
            {
                State = Auth.State.Success,
                Data = new
                {
                    Id = user.Id,
                    Username = user.Username,
                    Name = user.Name,
                    Surname = user.Surname
                }
            });
        }
    }
}