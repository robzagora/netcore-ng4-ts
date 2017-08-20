namespace Dashboard.Library.Attributes
{
    using Microsoft.AspNetCore.Authorization;

    public class BearerAuthorizationAttribute : AuthorizeAttribute
    {
        public const string BearerPolicyKey = "Bearer";

        public BearerAuthorizationAttribute() 
            : base(BearerAuthorizationAttribute.BearerPolicyKey)
        {
        }
    }
}