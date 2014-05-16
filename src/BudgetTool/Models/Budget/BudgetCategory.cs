using System.ComponentModel.DataAnnotations;

namespace BudgetTool.Models.Budget
{
    public class BudgetCategory
    {
        public int Id { get; set; }
        [Required]
        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        public decimal BudgetedAmount { get; set; }
        [Required]
        public int Priority { get; set; }
    }
}