using System;
using System.ComponentModel.DataAnnotations;

namespace FeedMe.Models
{
    public class Review
    {
        public int Id { get; set; }
        [Required]
        public string Summary { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public int Stars { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public int RestaurantId { get; set; }

    }
}