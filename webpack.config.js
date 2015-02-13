var appPath = "./src/BudgetTool/app/";
var contentPath = "./src/BudgetTool/Content/";

module.exports = {
  entry: {
    site: [appPath + "webpack-main.js"]
  },
  output: {
    path: appPath + "public/",
    publicPath: "/app/public/",
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.eot$|\.ttf$|\.svg$/, loader: "file?name=[name].[ext]" },
      { test: /\.woff$/, loader: "file?name=[name].[ext]"}
    ]
  },
}
