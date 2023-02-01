const fs = require("fs");
const Handlebars = require("handlebars");

const detailFolder = "posts";

Handlebars.registerHelper("ifEq", function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

const data = JSON.parse(fs.readFileSync("./public/data.json", "utf-8"));
const templateSrc = fs.readFileSync("./public/template.htm", "utf-8");
const template = Handlebars.compile(templateSrc);

data.pages.forEach((item) => {
  data.page = item.slug;
  fs.writeFileSync("./public/" + item.slug + ".html", template(data), "utf-8");
});

data.page = false;
data.entries.forEach((item) => {
  data.article = item;

  fs.writeFileSync(
    "./public/article/" + item.id + ".html",
    template(data),
    "utf-8"
  );
});