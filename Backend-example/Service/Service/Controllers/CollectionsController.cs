using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service.Models;

namespace Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        private readonly MultimediaManagementContext _context;

        public CollectionsController(MultimediaManagementContext context)
        {
            _context = context;
        }

        // GET: api/Collections
        [HttpGet]
        public IEnumerable<Collection> GetCollection()
        {
            return _context.Collection;
        }


        // GET: api/Collections/5
        [HttpGet("{id}/{take}/{skip}")]
        public async Task<IActionResult> GetCollection([FromRoute] Guid id, [FromRoute] int take, [FromRoute] int skip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var collection = await _context.Collection.FindAsync(id);


            if (collection == null)
            {
                return NotFound();
            }

            var placeHolders = _context.Placeholder.Where(r => r.CollectionId == collection.Id).Skip(skip).Take(take)
                .ToList();

            foreach (var placeHolder in placeHolders)
            {
                placeHolder.Collection = null;
            }


            collection.Placeholder = placeHolders;

            return Ok(collection);
        }

        // GET: api/Collections/5
        [HttpGet("{id}/{take}/{skip}/{keywords}")]
        public async Task<IActionResult> GetCollection([FromRoute] Guid id, [FromRoute] int take, [FromRoute] int skip, [FromRoute] String keywords)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var keywordsArr = keywords.Split(',');

                var placeHolders = _context.Placeholder.Where(r => r.CollectionId != id && keywordsArr.Any(el => r.Keywords.Contains(el))).Skip(skip).Take(take)
                .ToList();
            

            foreach (var placeHolder in placeHolders)
            {
                placeHolder.Collection = null;
            }

            return Ok(placeHolders);
        }





        // PUT: api/Collections/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutCollection([FromRoute] Guid id, [FromBody] Collection collection)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != collection.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(collection).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!CollectionExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Collections
        [HttpPost]
        public async Task<IActionResult> PostCollection([FromBody] Collection collection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            collection.Id = Guid.NewGuid();

            _context.Collection.Add(collection);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CollectionExists(collection.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCollection", new { id = collection.Id }, collection);
        }

        // DELETE: api/Collections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollection([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var collection = await _context.Collection.FindAsync(id);
            if (collection == null)
            {
                return NotFound();
            }

            _context.Collection.Remove(collection);
            await _context.SaveChangesAsync();

            return Ok(collection);
        }

        private bool CollectionExists(Guid id)
        {
            return _context.Collection.Any(e => e.Id == id);
        }
    }
}