import Box from 'components/Box/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faFileDownload, faCaretDown, faCaretUp, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { faChartBar, faImage, faImages } from '@fortawesome/free-regular-svg-icons'

const Icon = ({
    icon, active,
    color,
    ...props
}) => (
    <Box
        as='i'
        color={active ? 'primary' : (color || 'body')}
        {...props}>
        <FontAwesomeIcon icon={icon} />
    </Box>
);

Icon.defaultProps = {
    fontSize: '2.5rem',
    width: '3rem',
    height: '3rem'
}

Icon.Image = (props) => <Icon icon={faImage} {...props} />;
Icon.Images = (props) => <Icon icon={faImages} {...props} />;
Icon.Downloads = (props) => <Icon icon={faFileDownload} {...props} />;
Icon.Tags = (props) => <Icon icon={faTags} {...props} />;
Icon.CaretDown = (props) => <Icon icon={faCaretDown} {...props} />;
Icon.CaretUp = (props) => <Icon icon={faCaretUp} {...props} />;
Icon.Chart = (props) => <Icon icon={faChartBar} {...props} />;
Icon.Alert = (props) => <Icon icon={faExclamationCircle} {...props} />;

export default Icon;