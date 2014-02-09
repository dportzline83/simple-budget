using System.Web.Optimization;

namespace BudgetTool
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-route.js"));

            bundles.Add(new ScriptBundle("~/bundles/ajaxlogin").Include(
                "~/app/ajaxlogin.js"));

            bundles.Add(new ScriptBundle("~/bundles/breeze").Include(
                        "~/Scripts/q.js",
                        "~/Scripts/breeze.debug.js",
                        "~/Scripts/breeze.min.js",
                        "~/Scripts/breeze.savequeuing.js"));

            bundles.Add(new ScriptBundle("~/bundles/todo").Include(
                "~/app/todo.main.js", // must be first
                "~/app/todo.model.js",
                "~/app/todo.datacontext.js",
                "~/app/todo.controller.js",
                "~/app/about.controller.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/budget").Include(
                    "~/app/budget-main.js",
                    "~/app/budget-model.js",
                    "~/app/budget-datacontext.js",
                    "~/app/budgets-controller.js",
                    "~/app/budget-controller.js",
                    "~/app/budget-logger.js"
                ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Content/bootstrap/js/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Site.css",
                "~/Content/TodoList.css"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
                "~/Content/bootstrap/bower_components/bootstrap/dist/css/bootstrap.css"));
        }
    }
}