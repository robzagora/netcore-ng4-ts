namespace Dashboard.Library.Resolvers
{
    using System;
    using System.Reflection;
    using Microsoft.AspNetCore.SignalR.Infrastructure;
    using Newtonsoft.Json.Serialization;

    public class JsonSerializationResolver : IContractResolver
    {
        private readonly Assembly assembly;
        private readonly IContractResolver camelCaseContractResolver;
        private readonly IContractResolver defaultContractSerializer;

        public JsonSerializationResolver()
        {
            this.defaultContractSerializer = new DefaultContractResolver();
            this.camelCaseContractResolver = new CamelCasePropertyNamesContractResolver();
            this.assembly = typeof(Connection).GetTypeInfo().Assembly;
        }


        public JsonContract ResolveContract(Type type)
        {
            if (type.GetTypeInfo().Assembly.Equals(assembly))
            {
                return this.defaultContractSerializer.ResolveContract(type);
            }

            return this.camelCaseContractResolver.ResolveContract(type);
        }
    }
}
