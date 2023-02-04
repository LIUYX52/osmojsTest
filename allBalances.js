import{ osmosis } from 'osmojs'

const { createRPCQueryClient } = osmosis.ClientFactory;
const client = await createRPCQueryClient({ rpcEndpoint: "https://rpc.cosmos.directory/osmosis" });

// now you can query the cosmos modules
const balance = await client.cosmos.bank.v1beta1.allBalances({ 
    address: '' 
});

console.log(balance);


