import { useRef } from 'react';

const IFrame = ({ url, className = '', ...props }) => {
    const iFrameRef = useRef();
    return (
        <iframe
            ref={iFrameRef}
            src={url}
            className={`border-none w-full h-full my-4 overflow-unset h-full overflow-none ${className}`}
            {...props} />
    );
};

export default IFrame;