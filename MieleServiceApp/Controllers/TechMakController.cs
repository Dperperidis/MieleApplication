using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MieleServiceApp.Data;
using MieleServiceApp.Dtos;
using MieleServiceApp.Helpers;
using MieleServiceApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MieleServiceApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class TechMakController : ControllerBase

    {

        private readonly IAuthRepository _repo;
        private SqlContext _ctx;
        private readonly IMapper _mapper;

        public TechMakController(SqlContext ctx, IAuthRepository repo, IMapper mapper)
        {
            _ctx = ctx;
            _repo = repo;
            _mapper = mapper;
        }

        [Route("externalOrderMak")]
        [HttpPost]
        public IActionResult Post([FromBody]ExternalMak techs)
        {


            var result = _ctx.ExternalMak.Add(techs);
            _ctx.SaveChanges();
            return Ok(result.Entity);

        }

        [Route("getTasksMak")]
        [HttpGet]

        public async Task<IActionResult> GetTasks([FromQuery]TaskParams taskParams)
        {
            try
            {
                var result = await _repo.GetTasksMak(taskParams);

                var taskToReturn = _mapper.Map<IEnumerable<TaskForListDto>>(result);

                Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);

                return Ok(taskToReturn);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("mak/{id}")]
        [HttpGet]
        public IActionResult GetTaskById(int id)
        {
            try
            {

                var result = _ctx.ExternalMak.Find(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("update/mak")]
        [HttpPost]
        public IActionResult Update([FromBody]ExternalMak techs)
        {

            try
            {
                var result = _ctx.ExternalMak.Update(techs);
                _ctx.SaveChanges();
                return Ok(result.Entity);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }


        }

        [Route("delete/mak/{id}")]
        [HttpPost]
        public IActionResult Delete(int id)
        {

            try
            {
                var original = _ctx.ExternalMak.Find(id);
                var result = _ctx.ExternalMak.Remove(original);

                _ctx.SaveChanges();

                return Ok(true);


            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }


        }


    }
}
