namespace FeedMe.Models
{
    public class RestaurantDietType
    {
        public int Id { get; set; }
        
        public string DietType { get; set; }
        
        public int RestaurantId { get; set; }
        
        public Restaurant Restaurants { get; set; }
        
        public int DietTypeId { get; set; }
        
        public DietType DietTypes { get; set; }
              
    }
}