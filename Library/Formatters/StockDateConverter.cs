namespace Dashboard.Library.Formatters
{
    using Newtonsoft.Json.Converters;

    public class StockDateConverter : IsoDateTimeConverter
    {
        public StockDateConverter()
        {
            base.DateTimeFormat = "yyyy-MM-dd";
        }
    }
}