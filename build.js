const fs = require("fs");
const Handlebars = require("handlebars");

var dir = "./public/article/";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, 0744);
}

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
  if (item.slug == "home") {
    item.slug = "";
  }

  if (item.slug == "") {
    fs.writeFileSync("./public/index.html", template(data), "utf-8");
  } else {
    var dir = "./public/" + item.slug + "/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, 0744);
    }
    fs.writeFileSync(
      "./public/" + item.slug + "/index.html",
      template(data),
      "utf-8"
    );
  }
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
