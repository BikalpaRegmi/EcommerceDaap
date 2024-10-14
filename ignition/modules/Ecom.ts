import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EcomModule = buildModule("EcommerceModule", (m) => {
  const ecommerce = m.contract("Ecommerce");

  return { ecommerce };
});

export default EcomModule;