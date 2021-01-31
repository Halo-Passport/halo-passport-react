var TestingCenter = artifacts.require("./TestingCenter.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
