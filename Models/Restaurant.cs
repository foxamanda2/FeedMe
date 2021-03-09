namespace FeedMe.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public string Address { get; set; }
        
        public string PhoneNum { get; set; }
        
        public string TypeOfFood { get; set; }
        
        public string PriceRange { get; set; }
        
        public bool DietaryMenu { get; set; }
        
        public string Website { get; set; }
        
        public bool OpenLate { get; set; }
        
        public bool OpenEarly { get; set; }
        
    }
}