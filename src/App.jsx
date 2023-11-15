import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import 'App.css';
import 'bootstrap/dist/css/bootstrap.css';
import BlockPage from "components/BlockPage";
import TransactionPage from "components/TransactionPage";
import BlockHashToNumberRedirect from "components/BlockHashToNumberRedirect";
import alchemy from 'utils/AlchemyClient';
import AddressPage from "components/AddressPage";
import NotFoundPage from "components/NotFoundPage";

function App() {
    const [blockNumber, setBlockNumber] = useState();

    useEffect(() => {
        async function getBlockNumber() {
            setBlockNumber(await alchemy.core.getBlockNumber());
        }

        getBlockNumber();
    }, []); // empty dependency array -> This code runs once after the initial render; acts like "componentDidMount"

    return (
        <Router>
            <div className="App">
                <h1>Nakamoto Block Explorer 3000</h1>
                <Routes>
                    <Route path="/" element={<BlockPage blockNumber={blockNumber} />} />
                    <Route path="/a/:address" element={<AddressPageWrapper />} />
                    <Route path="/b/:blockNumber" element={<BlockPageWrapper />} />
                    <Route path="/b/hash/:blockParam" element={<BlockHashToNumberRedirect />} />
                    <Route path="/t/:transactionHash" element={<TransactionPageWrapper />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

// Wrapper components to pass URL params as props
function AddressPageWrapper() {
    const { address } = useParams();
    return <AddressPage address={address} />;
}
function BlockPageWrapper() {
    const { blockNumber } = useParams();
    return <BlockPage blockNumber={parseInt(blockNumber)} />;
}
function TransactionPageWrapper() {
    const { transactionHash } = useParams();
    return <TransactionPage transactionHash={transactionHash} />;
}

export default App;
