import React from 'react';

const Flex = ({
    direction = 'column',
    wrap = 'wrap',
    alignItems = 'center',
    justifyContent = 'center',
    fullWidth,
    isSection,
    fitContent,
    backgroundColor,
    backgroundImage,
    className,
    style,
    overwriteStyle,
    noPadding,
    noMargin,
    children,
    ...props
}) => {
    const styles = overwriteStyle ? {} : {
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        alignItems: alignItems,
        justifyContent: justifyContent,
        width: fullWidth ? '100%' : 'auto',
        margin: fitContent ? 'fit-content' : 'auto',
        padding: isSection ? '50px 0' : 'unset',
        backgroundColor: backgroundColor || 'transparent',
        backgroundImage: backgroundImage ? `url("${backgroundImage}")` : 'none',
        ...style
    };

    noPadding && delete styles.padding;
    noMargin && delete styles.margin;

    return (
        <React.Fragment>
            <div
                style={styles}
                className={className}
                {...props}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default Flex;