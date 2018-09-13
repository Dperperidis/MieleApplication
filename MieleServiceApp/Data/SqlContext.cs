using Microsoft.EntityFrameworkCore;
using MieleServiceApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MieleServiceApp.Data
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Tech> Technicians { get; set; }
        public DbSet<Partners> Partners { get; set; }
        public DbSet<ExternalFot> ExternalFot { get; set; }
        public DbSet<ExternalMak> ExternalMak { get; set; }
        public DbSet<Agents> Agents { get; set; }
    }
}
