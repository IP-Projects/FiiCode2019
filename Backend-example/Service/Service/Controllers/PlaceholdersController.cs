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
    public class PlaceholdersController : ControllerBase
    {
        private readonly MultimediaManagementContext _context;

        public PlaceholdersController(MultimediaManagementContext context)
        {
            _context = context;
        }

        // GET: api/Placeholders
        //[HttpGet]
        //public IEnumerable<Placeholder> GetPlaceholder()
        //{
        //    return _context.Placeholder;
        //}

        // GET: api/Placeholders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaceholder([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entityFile = _context.EntityFile.FirstOrDefault(r => r.PlaceholderId == id);
            if (entityFile == null)
            {
                return NotFound();
            }

            return Ok(entityFile);
        }

        // PUT: api/Placeholders/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutPlaceholder([FromRoute] Guid id, [FromBody] Placeholder placeholder)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != placeholder.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(placeholder).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PlaceholderExists(id))
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

        // POST: api/Placeholders
        [HttpPost]
        public async Task<IActionResult> PostPlaceholder([FromBody] List<Placeholder> placeholders)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (var placeholder in placeholders)
            {

                placeholder.Id = Guid.NewGuid();
                if (placeholder.EntityFile != null && placeholder.EntityFile.Count > 0)
                {
                    foreach (var entityFile in placeholder.EntityFile)
                    {
                        entityFile.Id = Guid.NewGuid();
                        entityFile.PlaceholderId = placeholder.Id;
                    }
                }


                _context.Placeholder.Add(placeholder);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                    throw;
            }

            foreach (var placeholder in placeholders)
            {
                placeholder.Data = null;
                placeholder.EntityFile = null;
            }
                

            return Ok(placeholders);
        }

        // DELETE: api/Placeholders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaceholder([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var placeholder = await _context.Placeholder.FindAsync(id);
            if (placeholder == null)
            {
                return NotFound();
            }

            _context.Placeholder.Remove(placeholder);
            await _context.SaveChangesAsync();

            return Ok(placeholder);
        }

        private bool PlaceholderExists(Guid id)
        {
            return _context.Placeholder.Any(e => e.Id == id);
        }
    }
}