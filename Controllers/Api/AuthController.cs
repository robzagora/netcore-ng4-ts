namespace Dashboard.Controllers.Api
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Threading;
    using Dashboard.Library.Attributes;
    using Dashboard.Library.Authentication;
    using Dashboard.Library.Helpers;
    using Dashboard.Library.Models;
    using Dashboard.Library.ViewModels;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;

    [ControllerRoute]
    public class AuthController : Controller
    {
        protected readonly InMemoryUserDatabase UserDatabase;

        public AuthController(InMemoryUserDatabase userDatabase)
        {
            this.UserDatabase = userDatabase;
        }

        [Route(nameof(Login))]
        [HttpPut]
        public ActionResult Login([FromBody] LoginViewModel viewModel)
        {
            if (this.TryValidateModel(viewModel))
            {
                Thread.Sleep(Randomizer.GetRandomInt(0, 2000));

                User user = this.UserDatabase.Get(viewModel.Username);

                if (user == null || user.Password != viewModel.Password)
                {
                    return this.BadRequest("Invalid credentials");
                }

                var requestedTimestamp = DateTime.Now;
                var expirationTimestamp = requestedTimestamp + Auth.DefaultExpirationSpan;
                var token = this.GenerateToken(user.Username, expirationTimestamp);

                return new JsonResult(new
                {
                    State = Auth.State.Success,
                    Data = new
                    {
                        RequestTimestamp = requestedTimestamp,
                        ExpirationTimespan = Auth.DefaultExpirationSpan.TotalSeconds,
                        TokenType = Auth.TokenType,
                        AccessToken = token
                    }
                });
            }

            return this.BadRequest("Invalid data");
        }

        [Route(nameof(Register))]
        [HttpPut]
        public ActionResult Register([FromBody] RegistrationViewModel request)
        {
            if (this.TryValidateModel(request))
            {
                if (this.UserDatabase.Exists(request.Username))
                {
                    return this.BadRequest("Username already exists");
                }

                this.UserDatabase.Add(
                    new User(
                        request.Name,
                        request.Surname,
                        request.Username,
                        request.Email,
                        request.Password));

                return this.Ok();
            }

            return this.BadRequest("Invalid data");
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
                var expiresIn = requestAt + Auth.DefaultExpirationSpan;
                var token = GenerateToken(viewModel.Username, expiresIn);

                return JsonConvert.SerializeObject(new
                {
                    State = "Success",
                    Data = new
                    {
                        requertAt = requestAt,
                        expiresIn = Auth.DefaultExpirationSpan.TotalSeconds,
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

        private string GenerateToken(string username, DateTime expires)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(username, "TokenAuth"),
                new[] { new Claim("ID", username) }
            );

            SecurityToken securityToken = handler.CreateToken(new SecurityTokenDescriptor
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