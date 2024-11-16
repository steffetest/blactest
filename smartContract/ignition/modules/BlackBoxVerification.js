const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BlackBoxVerificationModule", (m) => {
  const blackBoxVerification = m.contract("BlackBoxVerification");

  return { blackBoxVerification };
});