const Modal = ({ display, onClose, ...props }) => {
    if (!display) {
        return null;
    }

    return (
        <div id='defaultModal' tabindex='-1' aria-hidden='true' class='flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-backdrop'>
            <div class='relative w-full max-w-2xl h-full md:h-auto flex justify-center items-center'>
                {/* <!-- Modal content --> */}
                <div class='flex flex-col relative bg-white rounded-none h-[387px] w-[395px] items-center'>
                    <button
                        type='button'
                        onClick={onClose}
                        class='mt-[-1rem] mr-[-1rem] px-[9px] py-[3px] justify-center text-2xl bg-secondary text-other rounded-full  ml-auto inline-flex items-center h-[30px] w-[30px]' data-modal-toggle='defaultModal'>
                        X
                        {/* <svg class='w-3 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd'></path></svg>   */}
                    </button>
                    {props.children}
                </div>
            </div>
        </div>
            //  z-[100]<div className='flex font-roboto flex-col bg-white card my-36 h-[387px] w-[395px] rounded-none'>
            //     <button
            //         className='self-end text-black pr-4 pt-2'
            //         onClick={onClose}>
            //         x
            //     </button>
            //     {props.children}
            // </div>
    );
}

export default Modal;
