import { Client } from 'xrpl'


const client = new Client('wss://s.altnet.rippletest.net:51233')
await client.connect()
export const getaccountbalance = async(req, res, next) => {
    const {address} = req.body;
    

    try {
        const options = {
          ledger_index: 'validated',
          limit: 10
        };
    
        const balances = await client.getBalances(address, options);
    
        res.status(200).json({
            message: "Account balances",
            balances
        })

    } catch (error) {
        console.error('Error retrieving account balances:', error);
    }
}

export const getaddress = async (req, res) => {
    const result = await client.fundWallet();

    res.status(200).json({
        message: "Address generated successfully",
        result
    })
}


