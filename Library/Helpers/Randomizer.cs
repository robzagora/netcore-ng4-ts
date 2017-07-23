namespace Dashboard.Library.Helpers
{
    using System;

    public static class Randomizer
    {
        private static Random Random;

        static Randomizer()
        {
            Random = new Random();
        }

        public static int GetRandomInt()
        {
            return Randomizer.Random.Next();
        }

        public static int GetRandomInt(int min, int max)
        {
            // min = 10, max = -2

            // guard against impossible ranges.
            min = Math.Max(0, min);
            max = Math.Max(min, max);

            return Randomizer.Random.Next(min, max + 1);
        }

        public static double GetRandomDouble()
        {
            double mantissa = (Randomizer.Random.NextDouble() * 2.0) - 1.0;
            double exponent = Math.Pow(2.0, Randomizer.Random.Next(-126, 128));

            return mantissa * exponent;
        }

        public static double GetRandomDouble(double min, double max)
        {
            return Randomizer.Random.NextDouble() * (max - min) + min;
        }
    }
}