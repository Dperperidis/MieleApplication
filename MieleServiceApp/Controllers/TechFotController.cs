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

    public class TechFotController : ControllerBase

    {

        private readonly IAuthRepository _repo;
        private SqlContext _ctx;
        private readonly IMapper _mapper;

        public TechFotController(SqlContext ctx, IAuthRepository repo, IMapper mapper)
        {
            _ctx = ctx;
            _repo = repo;
            _mapper = mapper;
        }

        [Route("externalOrderFot")]
        [HttpPost]
        public IActionResult Post([FromBody]ExternalFot techs)
        {


            var result = _ctx.ExternalFot.Add(techs);
            _ctx.SaveChanges();
            return Ok(result.Entity);

        }

        [Route("getTasksFot")]
        [HttpGet]

        public async Task<IActionResult> GetTasks([FromQuery]TaskParams taskParams)
        {
            try
            {
                var result = await _repo.GetTasksFot(taskParams);

                var taskToReturn = _mapper.Map<IEnumerable<TaskForListDto>>(result);

                Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);

                return Ok(taskToReturn);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("fot/{id}")]
        [HttpGet]
        public IActionResult GetTaskById(int id)
        {
            try
            {

                var result = _ctx.ExternalFot.Find(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("update/fot")]
        [HttpPost]
        public IActionResult Update([FromBody]ExternalFot techs)
        {

            try
            {
                var result = _ctx.ExternalFot.Update(techs);
                _ctx.SaveChanges();
                return Ok(result.Entity);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }


        }

        [Route("delete/fot/{id}")]
        [HttpPost]
        public IActionResult Delete(int id)
        {

            try
            {
                var original = _ctx.ExternalFot.Find(id);
                var result = _ctx.ExternalFot.Remove(original);

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
