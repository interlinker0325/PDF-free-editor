const Modal = ({ display, onClose, ...props }) => {
    if (!display) {
        return null;
    }

    return (
        <div id='defaultModal' tabIndex='-1' aria-hidden='true' className='flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-backdrop'>
            <div className='relative w-full max-w-2xl h-full md:h-auto flex justify-center items-center'>
                {/* <!-- Modal content --> */}
                <div className='flex flex-col relative bg-white rounded-none h-[387px] w-[395px] items-center'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='mt-[-1rem] mr-[-1rem] px-[9px] py-[3px] justify-center text-2xl bg-secondary text-other rounded-full  ml-auto inline-flex items-center h-[30px] w-[30px]' data-modal-toggle='defaultModal'>
                        X
                    </button>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
