"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the best ${chalk.red("generator-minar-mobile")} generator!`
      )
    );

    var prompts = [
      {
        type: "input",
        name: "projectName",
        message: "Please input project name (minar-mobile):",
        default: "minar-mobile"
      },
      {
        type: "input",
        name: "projectDesc",
        message: "Please input project description:"
      },
      {
        type: "input",
        name: "projectAuthor",
        message: "Author (minar):",
        default: "minar"
      },
      {
        type: "list",
        name: "projectLicense",
        message: "Please choose license:",
        choices: ["MIT", "ISC", "Apache-2.0", "AGPL-3.0"]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var pkg = this.fs.readJSON(this.templatePath("package.json"), {});
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push("minar-mobile");
    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.author = this.props.projectAuthor;
    pkg.license = this.props.projectLicense;
    this.fs.writeJSON(this.destinationPath("package.json"), pkg);
    this.fs.copy(this.templatePath("assets"), this.destinationPath("assets"));
    this.fs.copy(
      this.templatePath("components"),
      this.destinationPath("components")
    );
    this.fs.copy(this.templatePath("layouts"), this.destinationPath("layouts"));
    this.fs.copy(
      this.templatePath("middleware"),
      this.destinationPath("middleware")
    );
    this.fs.copy(this.templatePath("pages"), this.destinationPath("pages"));
    this.fs.copy(this.templatePath("plugins"), this.destinationPath("plugins"));
    this.fs.copy(this.templatePath("server"), this.destinationPath("server"));
    this.fs.copy(
      this.templatePath("serverJs"),
      this.destinationPath("serverJs")
    );
    this.fs.copy(this.templatePath("static"), this.destinationPath("static"));
    this.fs.copy(this.templatePath("store"), this.destinationPath("store"));
    this.fs.copy(this.templatePath("utils"), this.destinationPath("utils"));
    this.fs.copy(
      this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("nuxt.config.ts"),
      this.destinationPath("nuxt.config.ts")
    );
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copy(
      this.templatePath("tsconfigNode.json"),
      this.destinationPath("tsconfigNode.json")
    );
  }

  install() {
    // this.installDependencies({
    //   bower: false,
    //   npm: true
    // });
  }
};
