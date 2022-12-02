const fancyAlert = require("cli-alerts");

export default (info: any) => {
  fancyAlert({
    type: `warning`,
    msg: info,
  });
};
