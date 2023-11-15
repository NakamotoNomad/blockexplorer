import {useEffect, useState} from "react";
import alchemy from 'utils/AlchemyClient';
import {formatHexString} from 'utils/Formatter';
const { Utils } = require("alchemy-sdk");

function TransactionPage({transactionHash}) {
    const [transactionData, setTransactionData] = useState();

    useEffect(() => {
        if (transactionHash) {
            async function getTransactionData() {
                setTransactionData(await alchemy.core.getTransaction(transactionHash));
            }

            getTransactionData();
        }
    }, [transactionHash]);

    if (!transactionData)
        return <div>
            <p>Transaction: <b>{transactionHash}</b></p>
            <div>Loading...</div>
        </div>;

    // console.log(JSON.stringify(transactionData));

    return <div>
        <p>Transaction: <b>{transactionHash}</b></p>
        <div className="container text-start">
            <div className="row">
                <div className="col">
                    From
                </div>
                <div className="col">
                    <a href={"/a/" + transactionData.from}>
                        {transactionData.from}
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    To
                </div>
                <div className="col">
                    <a href={"/a/" + transactionData.to}>
                        {transactionData.to}
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Value (Eth)
                </div>
                <div className="col">
                    {Utils.formatUnits(transactionData.value, "ether")}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Gas Price (Gwei)
                </div>
                <div className="col">
                    {Utils.formatUnits(transactionData.gasPrice, "gwei")}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Confirmations
                </div>
                <div className="col">
                    {transactionData.confirmations}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Nonce
                </div>
                <div className="col">
                    {transactionData.nonce}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Block
                </div>
                <div className="col">
                    <a href={"/b/" + transactionData.blockNumber}>
                        {`${transactionData.blockNumber} (${formatHexString(transactionData.blockHash)})`}
                    </a>
                </div>
            </div>
        </div>
        <br/>
        <p>Data:</p>
        <p>{transactionData.data}</p>
    </div>;
}

export default TransactionPage;