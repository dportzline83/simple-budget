using System.Web.Optimization;

namespace BudgetTool
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/bower_components/jquery/dist/jquery.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Content/bower_components/jquery-ui/ui/jquery-ui.js",
                        "~/Content/bower_components/jquery-ui/ui/jquery-ui.draggable.js",
                        "~/Content/bower_components/jquery-ui/ui/jquery-ui.droppable.js",
                        "~/Content/bower_components/jquery-ui/ui/jquery-ui.sortable.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Content/bower_components/angular/angular.js",
                        "~/Content/bower_components/angular-route/angular-route.js",
                        "~/Content/bower_components/angular-ui-sortable/sortable.js",
                        "~/Content/bower_components/angular-ui-date/src/date.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/ajaxlogin").Include(
                "~/app/ajaxlogin.js"));

            bundles.Add(new ScriptBundle("~/bundles/breeze").Include(
                        "~/Scripts/q.js",
                        "~/Content/bower_components/breezejs/breeze.debug.js",
                        "~/Content/bower_components/breezejs/breeze.min.js",
                        "~/Content/bower_components/breezejs/labs/breeze.savequeuing.js"));

            bundles.Add(new ScriptBundle("~/bundles/budget").Include(
                    "~/app/main.js",
                    "~/app/model.js",
                    "~/app/datacontext.js",
                    "~/app/list-controller.js",
                    "~/app/detail-controller.js",
                    "~/app/category-controller.js",
                    "~/app/transaction-controller.js",
                    "~/app/budget-logger.js"
                ));

            // Use the development version of Modernizr t6o develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Content/bower_components/bootstrap/dist/js/bootstrap.js",
                "~/Content/datepicker/bootstrap-datepicker.js"));

            bundles.Add(new StyleBundle("~/styles/css").Include(
                "~/Content/Site.css"));
        }
    }
}