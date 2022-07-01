const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("1"),
    })
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    /*
    * Get Contract Balance
    */

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log(
        "Contract Balance",
        hre.ethers.utils.formatEther(contractBalance)
    )

    /*
    * Send Wave
    */

    let waveTxn = await waveContract.wave("First wave!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomPerson).wave("Second wave!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomPerson).wave("Third wave!");
    await waveTxn.wait();

    /*
     * Get Contract Balance again
    */

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log(
        "Contract Balance",
        hre.ethers.utils.formatEther(contractBalance)
    )

    /*
    * Get All Waves
    */
    let allWaves = await waveContract.getAllWaves();
    console.log("All Waves: ", allWaves)
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1)
    }
}

runMain()