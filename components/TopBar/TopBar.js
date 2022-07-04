const TopBar = ({ className = 'justify-between', ...props }) => {
    return (
        <div
            className={`bg-neutral w-full flex flex-row items-center h-[47px] px-14 mt-[-48px] mx-[-56px] w-screen mb-5 ${className}`}
            {...props} />
    )
};

export default TopBar;