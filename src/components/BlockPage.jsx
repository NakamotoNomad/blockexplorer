import BlockStats from "components/BlockStats";
import TransactionList from "components/TransactionList";
import {useEffect, useState} from "react";
import alchemy from 'utils/AlchemyClient';

function BlockPage({blockNumber}) {
    const [blockData, setBlockData] = useState();

    useEffect(() => {
        if (blockNumber) {
            async function getBlockData() {
                setBlockData(await alchemy.core.getBlockWithTransactions(blockNumber));
            }

            getBlockData();
        }
    }, [blockNumber]);

    if (!blockData)
        return <div>Loading...</div>;

    // console.log(JSON.stringify(blockData));

    return <div>
        <p>Block Number: <b>{blockNumber}</b></p>
        <BlockStats blockData={blockData}/>
        <h2>Transactions</h2>
        <TransactionList blockData={blockData}/>
    </div>;
}

export default BlockPage;