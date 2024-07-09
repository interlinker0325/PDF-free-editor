import { useRef } from 'react';

const PublicIFrame = ({ url, className = '', ...props }) => {
    const iFrameRef = useRef();
    return (
        <iframe
            ref={iFrameRef}
            src={url}
            className={`border-none w-full h-full my-4 overflow-unset overflow-none ${className}`}
            {...props} />
    );
};

export default PublicIFrame;