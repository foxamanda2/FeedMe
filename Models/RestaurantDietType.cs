namespace FeedMe.Models
{
    public class RestaurantDietType
    {
        public int Id { get; set; }
        
        public int RestaurantId { get; set; }
        
        // public Restaurant Restaurants { get; set; }
        
        public int DietTypeId { get; set; }
        
        public DietType DietType { get; set; }
              
    }
}