using System;

namespace Dashboard.Library.Models
{
    public class User
    {
        private Guid id;
        private readonly string name, surname, username, email, password; // TODO: would never store password like that so only using it to have in memory db property

        public User(string name, string surname, string username, string email, string password)
        {
            this.id = Guid.NewGuid();
            this.name = name;
            this.surname = surname;
            this.username = username;
            this.email = email;
            this.password = password;
        }

        public Guid Id
        {
            get { return this.id; }
        }

        public string Name
        {
            get { return this.name; }
        }

        public string Surname
        {
            get { return this.surname; }
        }

        public string Username
        {
            get { return this.username; }
        }

        public string Email
        {
            get { return this.email; }
        }

        public string Password
        {
            get { return this.password; }
        }
    }
}