import Box from 'components/Box/Box';
import { useEffect, useRef, useState } from 'react';

const IFrame = ({ url, ...props }) => {
    const iFrameRef = useRef();
    const [frameHeight, setFrameHeight] = useState(0);

    useEffect(() => {
        if (iFrameRef.current) {
            setFrameHeight(iFrameRef.current?.contentWindow?.document?.body?.scrollHeight)
        }
    }, [iFrameRef]);
    return (<>
        <Box
            as="iframe"
            ref={iFrameRef}
            src={url}
            width="100%"
            border="0"
            height={frameHeight}
            overflow="unset"
            scrolling="no"
            {...props} />
    </ >);
};

export default IFrame;