using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetTool.Models.Budget
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [ForeignKey("UserProfile")]
        public Nullable<int> UserId { get; set; }
        public virtual UserProfile UserProfile { get; set; }

        public virtual ICollection<BudgetCategory> BudgetCategories { get; set; } 
    }
}