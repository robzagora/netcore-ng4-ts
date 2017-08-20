namespace Dashboard.Library.Models
{
    using System.Collections.Generic;

    public class InMemoryUserDatabase
    {
        private IDictionary<string, User> UserDatabase;

        public InMemoryUserDatabase()
        {
            // TODO: create singleton 
            this.UserDatabase = new Dictionary<string, User>();

            this.UserDatabase.Add(
                "robzagora",
                new User(
                    "Rob",
                    "robzagora",
                    "Zagora",
                    "robzagora@zagora.com",
                    "12345"));

            this.UserDatabase.Add(
                "testUser1",
                new User(
                    "Test",
                    "User",
                    "testUser1",
                    "test@user.com",
                    "12345"));
        }

        public bool Add(User user)
        {
            if (this.Exists(user))
            {
                return false;
            }

            this.UserDatabase.Add(
                user.Username,
                new User(
                    user.Name,
                    user.Surname,
                    user.Username,
                    user.Email,
                    user.Password));

            return true;
        }

        public User Get(User user)
        {
            return this.Get(user.Username);
        }

        public User Get(string username)
        {
            if (this.UserDatabase.TryGetValue(username, out User found))
            {
                return found;
            }

            return null;
        }

        public bool Exists(User user)
        {
            return this.Exists(user.Username);
        }

        public bool Exists(string username)
        {
            if (this.UserDatabase.TryGetValue(username, out User found))
            {
                return true;
            }

            return false;
        }
    }
}
