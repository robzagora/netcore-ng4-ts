namespace Dashboard.Library.Attributes
{
    using Microsoft.AspNetCore.Mvc;

    public class ControllerRouteAttribute : RouteAttribute
    {
        public const string ControllerPlaceholder = "api/[controller]";

        public ControllerRouteAttribute() : base(ControllerRouteAttribute.ControllerPlaceholder)
        {
        }
    }
}