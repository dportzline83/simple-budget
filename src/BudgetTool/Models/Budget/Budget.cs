using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BudgetTool.Models.Budget
{
    public class Budget
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public virtual UserProfile UserProfile { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<BudgetCategory> Categories { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}