namespace Dashboard.Library.Authentication
{
    using System.Security.Cryptography;

    public static class IdentityKeyGenerator
    {
        public static RSAParameters GenerateKey()
        {
            using (RSACryptoServiceProvider key = new RSACryptoServiceProvider(2048))
            {
                return key.ExportParameters(true);
            }
        }
    }
}