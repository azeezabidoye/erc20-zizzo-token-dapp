// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

// import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const JAN_1ST_2030 = 1893456000;
// const ONE_GWEI: bigint = 1_000_000_000n;

// const LockModule = buildModule("LockModule", (m) => {
//   const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
//   const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

//   const lock = m.contract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   return { lock };
// });

// export default LockModule;

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ZizzoTokenModule = buildModule("ZizzoTokenModule", (m) => {
  // m.getAccount(0) resolves to the deployer at runtime — no hardcoded address needed.
  // This address receives the initial 1,000,000 ZTK mint defined in the constructor.
  const deployer = m.getAccount(0);

  const zizzoToken = m.contract("ZizzoToken", [deployer]);

  return { zizzoToken };
});

export default ZizzoTokenModule;
