var GBC = artifacts.require("./GBC721.sol");

module.exports = function(deployer) {
    deployer.deploy(GBC).then( contract => {
        hashes = [
            "teste",
            "teste1"
        ]

        hashes.forEach(function (hash) {
            contract.mint(hash, web3.toWei(.0001, "ether"))
        });
    })
}