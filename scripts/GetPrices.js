const ethers = require("ethers")
const { addressFactory, addressRouter, addressFrom, addressTo } = require("./AddressList")
const { erc20ABI, factoryABI, routerABI, pairABI } = require("./AbiList")

// Standard provider
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org")

// Connect to factory
const contractFactory = new ethers.Contract(addressFactory, factoryABI, provider)

// Connect to router
const contractRouter = new ethers.Contract(addressRouter, routerABI, provider)

// Call blockchain
const getPrices = async (amountInHuman) => {
    // Convert amount in
    const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider)
    const decimals = await contractToken.decimals()
    const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString()
    const amountOutArray = await contractRouter.getAmountsOut(amountIn, [addressFrom, addressTo])
    const amountOut = amountOutArray[1].toString()
    const price = amountIn / amountOut
    console.log(price)
}

amountInHuman = "500"
getPrices(amountInHuman)
