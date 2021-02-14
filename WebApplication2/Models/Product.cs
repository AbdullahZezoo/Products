using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public String Name { get; set; }
        public String Photo { get; set; } // photo path
        public Double Price { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
