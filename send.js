import { osmosis,cosmos } from 'osmojs';
import { getSigningOsmosisClient } from 'osmojs';
import { coins,Secp256k1HdWallet } from '@cosmjs/amino';

const { 
    send 
} = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

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

const msg = send({
    amount: [
    {
        denom: 'uosmo',
        amount: '1000'
    }
    ],
    toAddress: 'osmo1czvzp0f2l80tkhpr4swsrxs8l4hwpt2j5kcdnh',
    fromAddress: fromAddress
});

const response = await client.signAndBroadcast(fromAddress, [msg], fee);

console.log(response);




