using System;
using System.ComponentModel.DataAnnotations;

namespace BudgetTool.Models.Budget
{
    public enum TransactionType
    {
        Credit,
        Debit
    }

    public class Transaction
    {
        public int Id { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public string Description { get; set; }

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}