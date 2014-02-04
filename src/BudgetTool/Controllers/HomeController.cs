using System.Web.Mvc;

namespace BudgetTool.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        public ActionResult Budgets()
        {
            return View();
        }
    }
}