namespace Dashboard.Controllers.Api
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Threading;
    using Dashboard.Library.Attributes;
    using Dashboard.Library.Authentication;
    using Dashboard.Library.Helpers;
    using Dashboard.Library.ViewModels;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;

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

        [Route(nameof(GetAuthToken))]
        [HttpPost]
        public string GetAuthToken([FromBody] LoginViewModel viewModel)
        {
            // Resources = https://code.msdn.microsoft.com/How-to-authorization-914d126b

            if (this.TryValidateModel(viewModel))
            {
                var requestAt = DateTime.Now;
                var expiresIn = requestAt + Auth.ExpiresSpan;
                var token = GenerateToken(viewModel, expiresIn);

                return JsonConvert.SerializeObject(new
                {
                    State = "Success",
                    Data = new
                    {
                        requertAt = requestAt,
                        expiresIn = Auth.ExpiresSpan.TotalSeconds,
                        tokeyType = Auth.TokenType,
                        accessToken = token
                    }
                });
            }
            else
            {
                return JsonConvert.SerializeObject(new
                {
                    State = "Failed",
                    Msg = "Username or password is invalid"
                });
            }
        }

        private string GenerateToken(LoginViewModel user, DateTime expires)
        {
            var handler = new JwtSecurityTokenHandler();

            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(user.Username, "TokenAuth"),
                new[] {
                    new Claim("ID", "1")
                }
            );

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = Auth.Issuer,
                Audience = Auth.Audience,
                SigningCredentials = Auth.SigningCredentials,
                Subject = identity,
                Expires = expires
            });

            return handler.WriteToken(securityToken);
        }
    }
}