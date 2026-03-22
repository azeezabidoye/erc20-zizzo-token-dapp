// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ZizzoTokenModule = buildModule("ZizzoTokenModule", (m) => {
  // m.getAccount(0) resolves to the deployer at runtime — no hardcoded address needed.
  // This address receives the initial 1,000,000 ZTK mint defined in the constructor.
  const deployer = m.getAccount(0);

  const zizzoToken = m.contract("ZizzoToken", [deployer]);

  return { zizzoToken };
});

export default ZizzoTokenModule;
