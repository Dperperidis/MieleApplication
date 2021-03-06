﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MieleServiceApp.Helpers;
using MieleServiceApp.Model;

namespace MieleServiceApp.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly SqlContext _context;

        public AuthRepository(SqlContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {

                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }



        public async Task<bool> UserExists(string email)
        {
            if (await _context.Users.AnyAsync(x => x.Email == email))
                return true;
            if (await _context.Technicians.AnyAsync(x => x.Email == email))
                return true;

            return false;
        }

        public async Task<User> Register(User user, string password)
        {

            byte[] passwordHash, PasswordSalt;
            CreatePasswordHash(password, out passwordHash, out PasswordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = PasswordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<PagedList<ExternalFot>> GetTasksFot(TaskParams taskParams)
        {
            var fotTasks = _context.ExternalFot.OrderByDescending(x => x.Date).AsQueryable();

            return await PagedList<ExternalFot>.CreateAsync(fotTasks, taskParams.PageNumber, taskParams.PageSize);
        }

        public async Task<PagedList<ExternalMak>> GetTasksMak(TaskParams taskParams)
        {
            var makTasks = _context.ExternalMak.OrderByDescending(x => x.Date).AsQueryable();

            return await PagedList<ExternalMak>.CreateAsync(makTasks, taskParams.PageNumber, taskParams.PageSize);
        }
    }
}
