import { useEffect, useRef, useState } from 'react';

const IFrame = ({ url, ...props }) => {
    const iFrameRef = useRef();
    const [frameHeight, setFrameHeight] = useState('100vh');

    useEffect(() => {
        if (iFrameRef.current) {
            setFrameHeight(iFrameRef.current?.contentWindow?.document?.body?.scrollHeight)
        }
    }, [iFrameRef]);
    return (
        <iframe
            ref={iFrameRef}
            src={url}
            className='border-none w-full my-4 overflow-unset'
            scrolling='no'
            height={frameHeight}
            {...props} />
    );
};

export default IFrame;