import { useEffect, useRef, useState } from 'react';

const IFrame = ({ url, className = '', ...props }) => {
    const iFrameRef = useRef();

    // useEffect(() => {
    //     if (iFrameRef.current) {
    //         setFrameHeight(iFrameRef.current?.contentWindow?.document?.body?.scrollHeight)
    //     }
    // }, [iFrameRef]);
    return (
        <iframe
            ref={iFrameRef}
            src={url}
            className={`border-none w-full h-full my-4 overflow-unset h-full overflow-none ${className}`}
            {...props} />
    );
};

export default IFrame;