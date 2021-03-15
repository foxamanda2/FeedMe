using System;

namespace FeedMe.Models
{
    public class Review
    {
        public int Id { get; set; }
        
        public string Summary { get; set; }
        
        public string Body { get; set; }
        
        public int Stars { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public int RestaurantId { get; set; }
               
    }
}