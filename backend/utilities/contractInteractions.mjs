import { ethers } from "ethers";
import { abi } from "../contract-abi.json"
import dotenv from "dotenv";

dotenv.config({path: "./config/config.env"});

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

export default contract;