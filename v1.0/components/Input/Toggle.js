import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled'
import { theme } from 'styles/theme';
import Box from 'components/Box/Box';
import Text from 'components/Text/Text';

const styles = props => css`
/* The switch - the box around the slider */
position: relative;
display: inline-block;
width: 3rem;
height: 2rem;

/* Hide default HTML checkbox */
input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
span {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: -1px;
  background-color: ${props.active ? theme.colors.primary : theme.colors.secondary};
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 4rem;
  box-shadow: ${props.active ? '0 0 1px ' + theme.colors.primary : ''};
}

span:before {
  position: absolute;
  content: "";
  height: 2rem;
  width: 2rem;
  left: 0;
  bottom: -1px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
  border: 1px solid #eee;
  -webkit-transform: ${props.active ? 'translateX(1.1rem)': ''};
  -ms-transform: ${props.active ? 'translateX(1.1rem)': ''};
  transform: ${props.active ? 'translateX(1.1rem)': ''};
}
`
const StyledToggle = styled(Box)`
    ${styles}
`;

const Toggle = React.forwardRef(({ active, label, name, onChange, justifySelf, ...props }, ref) => (
    <Box
      display='flex'
      alignItems='flex-end'
      justifySelf={justifySelf}>
        <StyledToggle id={name} onClick={(e) => onChange(e, name)} active={active}>
            <input readOnly ref={ref} {...props} type='checkbox' />
            <span></span>
        </StyledToggle>
        <Text as='label' fontSize='h3' ml={1} htmlFor={name} children={label} />
    </Box>
));

export default Toggle;