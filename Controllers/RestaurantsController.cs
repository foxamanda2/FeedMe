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
    // All of these routes will be at the base URL:     /api/Restaurants
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case RestaurantsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public RestaurantsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Restaurants
        //
        // Returns a list of all your Restaurants
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants(string filter, int dietTypeId, bool openEarly, bool openLate, string typeOfFood)
        {
            var matchingDiet = await _context.Restaurants.
                                            Include(restaurant => restaurant.Reviews).
                                            Include(restaurant => restaurant.RestaurantDietTypes).
                                            ThenInclude(restaurantDietType => restaurantDietType.DietType).
                                            SelectMany(restaurant => _context.RestaurantDietTypes.Where(restaurantDietType => restaurantDietType.RestaurantId == restaurant.Id).DefaultIfEmpty(),
                                                                    (restaurant, restaurantDietType) => new { Id = restaurant.Id, Restaurant = restaurant, RestaurantDietType = restaurantDietType }).
                                            Where(restaurantAndRestaurantDietType => (
                                                (filter == null || restaurantAndRestaurantDietType.Restaurant.Name.ToLower().Contains(filter.ToLower()))
                                                &&
                                                (dietTypeId == 0 || restaurantAndRestaurantDietType.RestaurantDietType.DietTypeId == dietTypeId)
                                                &&
                                                (typeOfFood == null || restaurantAndRestaurantDietType.Restaurant.TypeOfFood.ToLower().Contains(typeOfFood.ToLower()))
                                                &&
                                                (openEarly == false || restaurantAndRestaurantDietType.Restaurant.OpenEarly == openEarly)
                                                &&
                                                (openLate == false || restaurantAndRestaurantDietType.Restaurant.OpenLate == openLate)


                                            )).
                                            Select(restaurantAndRestaurantDietType => restaurantAndRestaurantDietType.Restaurant).
                                            ToListAsync();

            return matchingDiet;
        }

        [HttpGet("random")]
        // Take in diet type. Where clause to limit restautants
        public async Task<ActionResult<Restaurant>> RandomRestaurant(string typeOfFood)
        {
            Random randomNumber = new Random();
            var restaurantCount = _context.Restaurants.Count();
            // Find the restaurant in the database using `FindAsync` to look it up by id
            var restaurants = await _context.Restaurants.
                        Include(restaurant => restaurant.Reviews).
                        Include(restaurant => restaurant.RestaurantDietTypes).
                        ThenInclude(restaurantDietType => restaurantDietType.DietType).
            //                                 SelectMany(restaurant => _context.RestaurantDietTypes.Where(restaurantDietType => restaurantDietType.RestaurantId == restaurant.Id).DefaultIfEmpty(),
            //                                                             (restaurant, restaurantDietType) => new { Id = restaurant.Id, Restaurant = restaurant, RestaurantDietType = restaurantDietType }).
            //                                 Where(restaurantAndRestaurantDietType => (
            //                                     (typeOfFood == null || restaurantAndRestaurantDietType.Restaurant.TypeOfFood.ToLower().Contains(typeOfFood.ToLower())))).
            // Select(restaurantAndRestaurantDietType => restaurantAndRestaurantDietType.Restaurant).
            Skip(randomNumber.Next(restaurantCount)).
            Take(1)
            .ToListAsync();




            // If we didn't find anything, we receive a `null` in return
            if (restaurants.Count() == 0)
            {
                // Return a `404` response to the client indicating we could not find a restaurant with this id
                return NotFound();
            }

            //  Return the restaurant as a JSON object.
            return restaurants[0];
        }

        // GET: api/Restaurants/5
        //
        // Fetches and returns a specific restaurant by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurant(int id)
        {
            // Find the restaurant in the database using `FindAsync` to look it up by id
            var restaurant = await _context.Restaurants.
                                                    Include(restaurant => restaurant.Reviews).
                                                    Include(restaurant => restaurant.RestaurantDietTypes).
                                                    ThenInclude(restaurantDietType => restaurantDietType.DietType).
                                                    Where(restaurant => restaurant.Id == id).FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (restaurant == null)
            {
                // Return a `404` response to the client indicating we could not find a restaurant with this id
                return NotFound();
            }

            //  Return the restaurant as a JSON object.
            return restaurant;
        }


        // PUT: api/Restaurants/5
        //
        // Update an individual restaurant with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Restaurant
        // variable named restaurant. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Restaurant POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestaurant(int id, Restaurant restaurant)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != restaurant.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in restaurant to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from restaurant
            _context.Entry(restaurant).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!RestaurantExists(id))
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
            return Ok(restaurant);
        }

        // POST: api/Restaurants
        //
        // Creates a new restaurant in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Restaurant
        // variable named restaurant. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Restaurant POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Restaurant>> PostRestaurant(Restaurant restaurant)
        {
            // Indicate to the database context we want to add this new record
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetRestaurant", new { id = restaurant.Id }, restaurant);
        }

        // DELETE: api/Restaurants/5
        //
        // Deletes an individual restaurant with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurant(int id)
        {
            // Find this restaurant by looking for the specific id
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
            {
                // There wasn't a restaurant with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Restaurants.Remove(restaurant);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(restaurant);
        }

        // Private helper method that looks up an existing restaurant by the supplied id
        private bool RestaurantExists(int id)
        {
            return _context.Restaurants.Any(restaurant => restaurant.Id == id);
        }
    }
}
