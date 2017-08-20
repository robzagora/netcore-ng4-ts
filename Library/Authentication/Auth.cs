namespace Dashboard.Library.Authentication
{
    using System;
    using Microsoft.IdentityModel.Tokens;

    public static class Auth
    {
        public enum State
        {
            Success = 0,
            Failed = 1,
            Forbidden = 2
        }

        public static string Audience = "ExampleAudience";
        public static string Issuer = "ExampleIssuer";
        public static string TokenType = "Bearer";

        public static RsaSecurityKey Key = new RsaSecurityKey(IdentityKeyGenerator.GenerateKey());
        public static SigningCredentials SigningCredentials  = new SigningCredentials(Auth.Key, SecurityAlgorithms.RsaSha256Signature);

        public static TimeSpan DefaultExpirationSpan  = TimeSpan.FromMinutes(40);
    }
}