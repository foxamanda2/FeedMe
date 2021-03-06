using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FeedMe.Models;

namespace FeedMe.Controllers
{
    // All of these routes will be at the base URL:     /api/DietTypes
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case DietTypesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class DietTypesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public DietTypesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/DietTypes
        //
        // Returns a list of all your Diets
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DietType>>> GetDiets()
        {
            // Uses the database context in `_context` to request all of the Diets, sort
            // them by row id and return them as a JSON array.
            return await _context.Diets.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/DietTypes/5
        //
        // Fetches and returns a specific dietType by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<DietType>> GetDietType(int id)
        {
            // Find the dietType in the database using `FindAsync` to look it up by id
            var dietType = await _context.Diets.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (dietType == null)
            {
                // Return a `404` response to the client indicating we could not find a dietType with this id
                return NotFound();
            }

            //  Return the dietType as a JSON object.
            return dietType;
        }

        // PUT: api/DietTypes/5
        //
        // Update an individual dietType with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a DietType
        // variable named dietType. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our DietType POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDietType(int id, DietType dietType)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != dietType.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in dietType to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from dietType
            _context.Entry(dietType).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!DietTypeExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(dietType);
        }

        // POST: api/DietTypes
        //
        // Creates a new dietType in the database.
        //
        // The `body` of the request is parsed and then made available to us as a DietType
        // variable named dietType. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our DietType POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<DietType>> PostDietType(DietType dietType)
        {
            // Indicate to the database context we want to add this new record
            _context.Diets.Add(dietType);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetDietType", new { id = dietType.Id }, dietType);
        }

        // DELETE: api/DietTypes/5
        //
        // Deletes an individual dietType with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDietType(int id)
        {
            // Find this dietType by looking for the specific id
            var dietType = await _context.Diets.FindAsync(id);
            if (dietType == null)
            {
                // There wasn't a dietType with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Diets.Remove(dietType);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(dietType);
        }

        // Private helper method that looks up an existing dietType by the supplied id
        private bool DietTypeExists(int id)
        {
            return _context.Diets.Any(dietType => dietType.Id == id);
        }
    }
}
