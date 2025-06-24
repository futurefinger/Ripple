import { Client, Wallet } from 'xrpl'
import { User } from '../models/user.js';


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

    const user = await User.create(result);

    res.status(200).json({
        message: "Address generated successfully",
        user
    })
}

export const gettransaction = async(req, res) => {
    const {address1, seed1, address2} = req.body;
    try{
        const options = {
            ledger_index: 'validated',
            limit: '1'
        }
        
        const wallet = Wallet.fromSeed(seed1);

        if(wallet.classicAddress !== address1){
            return res.status(400).json({
                error: "Secret key is not valid"
            })
        }

        const balances1 = await client.getBalances(address1, options);
        const balances2 = await client.getBalances(address2, options);

        const xrp1ind = balances1.findIndex((b) => b.currency === 'XRP');
        const xrp2ind = balances2.findIndex((b) => b.currency === 'XRP');

        if(xrp1ind == -1 || xrp2ind == -1){
            return res.status(400).json({
                message: "Address not found either one of the client"
            })
        }

        let val1 = parseFloat(balances1[xrp1ind].value);
        let val2 = parseFloat(balances2[xrp2ind].value);

        if(val1 >= 5){
            val1 -= 5;
            val2 += 5;
        }
        else{
            val2 += val1;
            val1 = 0;
        }

        balances1[xrp1ind].value = val1.toString();
        balances2[xrp2ind].value = val2.toString();

        res.status(200).json({
            message: "Transaction succesfully completed",
            from: {
                address: address1,
                new_balance: balances1
              },
            to: {
                address: address2,
                new_balance: balances2
            }
        })
    }
    catch(err){
        console.error('Error retrieving account balances: ', err);
    }

}

