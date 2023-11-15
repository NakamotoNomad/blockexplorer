function BlockStats({ blockData }) {
    if (!blockData)
        return <div>Loading...</div>;

    // console.log(JSON.stringify(blockData));

    return <div className="container text-start">
        <div className="row">
            <div className="col">
                Timestamp
            </div>
            <div className="col">
                {new Date(blockData.timestamp * 1000).toLocaleString() + " (" + blockData.timestamp + ")"}
            </div>
        </div>
        <div className="row">
            <div className="col">
                Hash
            </div>
            <div className="col">
                {blockData.hash}
            </div>
        </div>
        <div className="row">
            <div className="col">
                Gas used
            </div>
            <div className="col">
                {blockData.gasUsed.toString()}
            </div>
        </div>
        <div className="row">
            <div className="col">
                Num Transactions
            </div>
            <div className="col">
                {blockData.transactions.length}
            </div>
        </div>
    </div>;
}

export default BlockStats;