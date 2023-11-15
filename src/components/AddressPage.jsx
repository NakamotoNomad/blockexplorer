import {useEffect, useState} from "react";
import alchemy from 'utils/AlchemyClient';

const {Utils} = require("alchemy-sdk");

function AddressPage({address}) {
    const [balanceData, setBalanceData] = useState();
    const [tokenBalanceData, setTokenBalanceData] = useState();

    useEffect(() => {
        if (address) {
            async function getBalanceData() {
                setBalanceData(await alchemy.core.getBalance(address));
            }

            getBalanceData();
        }
    }, [address]);

    useEffect(() => {
        if (address) {
            async function getTokenBalanceData() {
                setTokenBalanceData(await alchemy.core.getTokenBalances(address));
            }

            getTokenBalanceData();
        }
    }, [address]);

    if (!balanceData || !tokenBalanceData)
        return <div>
            <p>Address: <b>{address}</b></p>
            <div>Loading...</div>
        </div>;

    // console.log(JSON.stringify(transactionData));

    return <div>
        <p>Address: <b>{address}</b></p>
        <p>Balance (Eth): {Utils.formatUnits(balanceData, "ether")}</p>
        <h2>Tokens</h2>
        <div className="container text-start">
            <div className="row">
                <div className="col">
                    Contract (token)
                </div>
                <div className="col">
                    Balance
                </div>
            </div>
            {tokenBalanceData.tokenBalances.slice(0, 20).map((tokenBalance) => (
                <div key={tokenBalance.contractAddress} className="row">
                    <div className="col">
                        {tokenBalance.contractAddress}
                    </div>
                    <div className="col">
                        {BigInt(tokenBalance.tokenBalance).toString()}
                    </div>
                </div>
            ))}
        </div>
    </div>;
}

export default AddressPage;