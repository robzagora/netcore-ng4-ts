namespace Dashboard.Library.Authentication
{
    using System;
    using Microsoft.IdentityModel.Tokens;

    public static class Auth
    {
        public static string Audience = "ExampleAudience";
        public static string Issuer = "ExampleIssuer";
        public static string TokenType = "Bearer";

        public static RsaSecurityKey Key = new RsaSecurityKey(IdentityKeyGenerator.GenerateKey());
        public static SigningCredentials SigningCredentials  = new SigningCredentials(Auth.Key, SecurityAlgorithms.RsaSha256Signature);

        public static TimeSpan ExpiresSpan  = TimeSpan.FromMinutes(40);
    }
}