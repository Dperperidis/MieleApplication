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

    public class TechsController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private SqlContext _ctx;
        private readonly IMapper _mapper;

        public TechsController(SqlContext ctx, IAuthRepository repo, IMapper mapper)
        {
            _ctx = ctx;
            _repo = repo;
            _mapper = mapper;
        }


        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Tech techs)
        {
            try
            {
                techs.Email = techs.Email.ToLower();

                if (await _repo.UserExists(techs.Email))
                    return BadRequest("There is already an account with this email");

                var result = _ctx.Technicians.Add(techs);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("techlist")]
        [HttpGet]

        public IActionResult GetTechs()
        {
            try
            {
                var result =  _ctx.Technicians.ToList();
                return Ok(result);
                 
            } catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("externalOrder")]
        [HttpPost]
        public IActionResult Post([FromBody]ExternalTechs techs)
        {
               

                var result = _ctx.ExternalTechs.Add(techs);
                _ctx.SaveChanges();
                return Ok(result.Entity);
          
        }

        [Route("getTasks")]
        [HttpGet]

        public async Task<IActionResult> GetTasks([FromQuery]TaskParams taskParams)
        {
            try
            {
                var result = await _repo.GetTasks(taskParams);

                var taskToReturn = _mapper.Map<IEnumerable<TaskForListDto>>(result);

                Response.AddPagination(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
              
                return Ok(taskToReturn);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetTaskById(int id)
        {
            try
            {

                var result = _ctx.ExternalTechs.Find(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("update")]
        [HttpPost]
        public IActionResult Update([FromBody]ExternalTechs techs)
        {

            try
            {
                var result = _ctx.ExternalTechs.Update(techs);
                _ctx.SaveChanges();
                return Ok(result.Entity);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }


        }

        [Route("delete/{id}")]
        [HttpPost]
        public IActionResult Delete(int id)
        {

            try
            {
                var original = _ctx.ExternalTechs.Find(id);
                var result = _ctx.ExternalTechs.Remove(original);

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
