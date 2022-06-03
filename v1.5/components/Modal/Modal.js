const Modal = ({ display, onClose, ...props }) => {
    if (!display) {
        return null;
    }

    return (
        <div className='flex fixed overflow-y-auto inset-0 bg-backdrop justify-center content-center z-[100]'>
            <div className='flex flex-col bg-white card my-36 w-2/5 h-2/4 max-h-128'>
                <button
                    className='self-end text-black pr-4 pt-2'
                    onClick={onClose}>
                    x
                </button>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;
