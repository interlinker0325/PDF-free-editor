'use-client'
import PropTypes from 'prop-types';

const TopBar = ({className = 'justify-between', marginTop, ...props}) => {
  return (
      <div
          className={`${marginTop || "mt-[-48px]"} bg-neutral flex flex-row items-center h-[47px] px-14 mx-[-56px] w-screen mb-5 ${className}`}
          {...props} />
  )
};

export default TopBar;