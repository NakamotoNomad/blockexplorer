import {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import alchemy from 'utils/AlchemyClient';

function BlockHashToNumberRedirect() {
    const {blockParam} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlockNumber = async () => {
            if (/0x[0-9a-fA-F]+/.test(blockParam)) {
                try {
                    const blockData = await alchemy.core.getBlock(blockParam);
                    console.log(`Redirecting from hash ${blockParam} to block ${blockData.number}`);
                    navigate(`/b/${blockData.number}`);
                } catch (error) {
                    console.error("Error fetching block data:", error);
                }
            }
        };

        fetchBlockNumber();
    }, [blockParam]);

    return null; // This component does not render anything
}

export default BlockHashToNumberRedirect;