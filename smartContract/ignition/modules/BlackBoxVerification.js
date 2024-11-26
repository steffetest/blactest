const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BBVerificationModule", (m) => {
  const BbVerification = m.contract("BBVerificationTest");

  return { BbVerification };
});