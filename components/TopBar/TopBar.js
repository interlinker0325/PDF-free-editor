const TopBar = ({ className, ...props }) => {
    return (
        <div
            className={`bg-neutral flex flex-row items-center h-[47px] px-14 mt-[-48px] mx-[-56px] w-screen mb-5 ${className}`}
            {...props} />
    )
};

TopBar.defaultProps = {
    className: "justify-between"
}

export default TopBar;