const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    console.log(`You received ${waveCount} wave(s)!`)

    let waveTxn = await waveContract.wave("First wave!");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    console.log(`You received ${waveCount} wave(s)!`)

    waveTxn = await waveContract.connect(randomPerson).wave("Second wave!");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    console.log(`You received ${waveCount} wave(s)!`)

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