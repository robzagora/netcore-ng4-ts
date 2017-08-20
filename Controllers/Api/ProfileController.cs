namespace Dashboard.Controllers.Api
{
    using Dashboard.Library.Attributes;
    using Microsoft.AspNetCore.Mvc;

    [ControllerRoute]
    public class ProfileController : Controller
    {
        [HttpGet]
        [BearerAuthorization]
        public void GetProfile()
        {

        }
    }
}