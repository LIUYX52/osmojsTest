import { osmosis } from 'osmojs';
import { getSigningOsmosisClient } from 'osmojs';
import { coins,Secp256k1HdWallet } from '@cosmjs/amino';

const {    
    swapExactAmountIn,
    swapExactAmountOut
} = osmosis.gamm.v1beta1.MessageComposer.withTypeUrl;

const mnemonic = ""

const signer = await Secp256k1HdWallet.fromMnemonic(
    mnemonic, { prefix: "osmo" }
);

const [account] = await signer.getAccounts();      
const fromAddress = account.address


/**
 * Use getSigningOsmosisClient to get your SigningStargateClient, 
 * with the Osmosis proto/amino messages full-loaded. No need to manually add amino types
 */
const client = await getSigningOsmosisClient({
    rpcEndpoint:"https://rpc.cosmos.directory/osmosis",
    signer:signer // OfflineSigner
});

const fee = {
    amount: coins(0, "uosmo"),
    gas: "500000",
};
const routes = [{
    poolId: "497",
    tokenOutDenom:"ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED"
}];

const msg = swapExactAmountIn({
    sender:fromAddress,
    routes:routes,
    tokenIn: coins("2400", "uosmo"),
    tokenOutMinAmount:"1558"
});

const response = await client.signAndBroadcast(fromAddress, [msg], fee);

console.log(response);




