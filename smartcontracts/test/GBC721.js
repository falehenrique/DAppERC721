var definition = artifacts.require('./GBC721.sol')

contract('GBC721', accounts => {
    var owner = accounts[0];
    var user = accounts[1];
    var contract;

    beforeEach(async function() {
        contract = await definition.new({form: owner})
    })

    it('mint', async function(){
        let tx = await contract.mint("image ipfs hash", web3.toWei(.001, "ether"), {from: owner})
        let tokenId = tx.logs[0].args._tokenId;
        assert.equal(await contract.ownerOf(tokenId), contract.address);
    })

    it('buy token', async function() {
        let tx = await contract.mint("image ipfs hash", web3.toWei(.001, "ether"), {from: owner})
        let tokenId = tx.logs[0].args._tokenId;
        let tx2 = await contract.buyCard(tokenId, {from: user, value: web3.toWei(.001, "ether")})
        assert.equal(await contract.ownerOf(tokenId), user)

    })
    

    it('get ipfs hash', async function() {
        let tx = await contract.mint("image ipfs", web3.toWei(.001, "ether"), {from: owner})
        let tokenId = tx.logs[0].args._tokenId;
        assert.equal(await contract.getIpfsHash(tokenId), "image ipfs")

    })

    it('get tokens of', async function() {
        await contract.mint("image ipfs", web3.toWei(.001, "ether"), {from: owner})
        await contract.mint("image ipfs !!", web3.toWei(.001, "ether"), {from: owner})
        assert.equal(await contract.tokensOf(contract.address).length, 2)
    })    

})