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
    // All of these routes will be at the base URL:     /api/RestaurantDietTypes
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantDietTypesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantDietTypesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public RestaurantDietTypesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/RestaurantDietTypes
        //
        // Returns a list of all your RestaurantDietTypes
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestaurantDietType>>> GetRestaurantDietTypes()
        {
            // Uses the database context in `_context` to request all of the RestaurantDietTypes, sort
            // them by row id and return them as a JSON array.
            return await _context.RestaurantDietTypes.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/RestaurantDietTypes/5
        //
        // Fetches and returns a specific restaurantDietType by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<RestaurantDietType>> GetRestaurantDietType(int id)
        {
            // Find the restaurantDietType in the database using `FindAsync` to look it up by id
            var restaurantDietType = await _context.RestaurantDietTypes.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (restaurantDietType == null)
            {
                // Return a `404` response to the client indicating we could not find a restaurantDietType with this id
                return NotFound();
            }

            //  Return the restaurantDietType as a JSON object.
            return restaurantDietType;
        }

        // PUT: api/RestaurantDietTypes/5
        //
        // Update an individual restaurantDietType with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a RestaurantDietType
        // variable named restaurantDietType. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our RestaurantDietType POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestaurantDietType(int id, RestaurantDietType restaurantDietType)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != restaurantDietType.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in restaurantDietType to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from restaurantDietType
            _context.Entry(restaurantDietType).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!RestaurantDietTypeExists(id))
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
            return Ok(restaurantDietType);
        }

        // POST: api/RestaurantDietTypes
        //
        // Creates a new restaurantDietType in the database.
        //
        // The `body` of the request is parsed and then made available to us as a RestaurantDietType
        // variable named restaurantDietType. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our RestaurantDietType POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<RestaurantDietType>> PostRestaurantDietType(RestaurantDietType restaurantDietType)
        {
            // Indicate to the database context we want to add this new record
            _context.RestaurantDietTypes.Add(restaurantDietType);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetRestaurantDietType", new { id = restaurantDietType.Id }, restaurantDietType);
        }

        // DELETE: api/RestaurantDietTypes/5
        //
        // Deletes an individual restaurantDietType with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurantDietType(int id)
        {
            // Find this restaurantDietType by looking for the specific id
            var restaurantDietType = await _context.RestaurantDietTypes.FindAsync(id);
            if (restaurantDietType == null)
            {
                // There wasn't a restaurantDietType with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.RestaurantDietTypes.Remove(restaurantDietType);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(restaurantDietType);
        }

        // Private helper method that looks up an existing restaurantDietType by the supplied id
        private bool RestaurantDietTypeExists(int id)
        {
            return _context.RestaurantDietTypes.Any(restaurantDietType => restaurantDietType.Id == id);
        }
    }
}
