using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FeedMe.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string PhoneNum { get; set; }
        [Required]
        public string TypeOfFood { get; set; }
        [Required]
        public string PriceRange { get; set; }
        [Required]
        public bool DietaryMenu { get; set; }
        [Required]
        public string Website { get; set; }
        [Required]
        public bool OpenLate { get; set; }
        [Required]
        public bool OpenEarly { get; set; }

        public List<Review> Reviews { get; set; }

        public List<RestaurantDietType> RestaurantDietTypes { get; set; }
    }
}