namespace Dashboard.Library.Authentication
{
    using System;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;

    public static class Auth
    {
        public enum State
        {
            Success = 0,
            Failed = 1,
            Forbidden = 2
        }

        public static string Audience = "AngularAudience";
        public static string Issuer = "AngularIssuer";
        public static string TokenType = JwtBearerDefaults.AuthenticationScheme;

        public static RsaSecurityKey Key = new RsaSecurityKey(IdentityKeyGenerator.GenerateKey());
        public static SigningCredentials SigningCredentials  = new SigningCredentials(Auth.Key, SecurityAlgorithms.RsaSha256Signature);

        public static TimeSpan DefaultExpirationSpan  = TimeSpan.FromMinutes(40);
    }
}