const vorpal = require("vorpal")();
require("dotenv").config();
const chalk = require("chalk");
const _ = require("lodash");

const Service = require("./services");
const Constants = require("./constants");

vorpal
  .command("check-airtime", "Checks current Airtime balance")
  .action(async function(args, next) {
    try {
      const resp = await Service.getBalances();
      const airtimeBalance = _.last(resp.AccountInfo).productBalance;
      const balanceIndicator =
        airtimeBalance < "Ksh 1"
          ? chalk.red(airtimeBalance)
          : chalk.green(airtimeBalance);

      this.log(`Dear user your, your airtime balance is ${balanceIndicator}`);
    } catch (error) {
      this.log(`Check airtime Failed. Reason: ${chalk.red(error.message)}`);
    }
    next();
  });

vorpal
  .command("check-bundle-balances", "Checks subscribed bundles")
  .action(async function(args, next) {
    try {
      const resp = await Service.getBalances();
      this.log(resp.AccountInfo);
    } catch (error) {
      this.log(`Check airtime Failed. Reason: ${chalk.red(error.message)}`);
    }
    next();
  });

vorpal
  .command("purchase-bundle [bundles]")
  .option("--b", "Bundles to purchase", Constants)
  .action(async function(args, next) {
    try {
      const resp = await Service.buyBundle(args.bundles);
      this.log(resp.message);
    } catch (error) {
      throw new Error(error);
    }
    next();
  });

vorpal.delimiter("faiba_cli$").show();
