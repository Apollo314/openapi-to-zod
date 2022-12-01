const fancyAlert = require("cli-alerts");

export default (info: any) => {
  fancyAlert({
    type: `warning`,
    name: `DEBUG LOG`,
    msg: ``,
  });

  console.log(info);
  console.log();
};
