const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const IBTToken = await hre.ethers.getContractFactory("IBTToken");
    const token = await IBTToken.deploy();

    // Use the contract address directly after deployment
    console.log("IBTToken deployed to:", token.target || token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
