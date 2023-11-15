import { formatHexString } from 'utils/Formatter';

function TransactionList({ blockData }) {
    if (!blockData)
        return <div>Loading...</div>;

    // console.log(JSON.stringify(blockData));

    return <div className="container text-start">
        <div className="row">
            <div className="col">
                Hash
            </div>
            <div className="col">
                From
            </div>
            <div className="col">
                To
            </div>
        </div>
        {blockData.transactions.slice(0, 20).map((transaction) => (
            <div key={transaction.hash} className="row">
                <div className="col">
                    <a href={"/t/" + transaction.hash}>{formatHexString(transaction.hash)}</a>
                </div>
                <div className="col">
                    <a href={"/a/" + transaction.from}>
                        {formatHexString(transaction.from)}
                    </a>
                </div>
                <div className="col">
                    <a href={"/a/" + transaction.to}>
                        {formatHexString(transaction.to)}
                    </a>
                </div>
            </div>
        ))}
    </div>;
}

export default TransactionList;