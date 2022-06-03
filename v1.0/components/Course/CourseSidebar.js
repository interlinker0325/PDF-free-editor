import Text from 'components/Text/Text';
import Link from 'components/Link/Link';
import List from 'components/List/List';
import { fonts } from 'styles/theme';

const CourseSidebar = ({ activeSection, setActiveSection, ...props }) => (
    <>
        <Text
            as='h2'
            fontSize='3'
            my='0'
            mt='2'
            mx='0'
            borderBottom='none'
            textAlign='center'
            children='Contenido de curso:' />
        <List
            pl='4'>
            {props.course?.topics?.map((topic, index) =>
                <List.Item
                    key={`Topic_NavItem_${index}`}
                    isActive={topic.ref?.current?.id === activeSection?.current?.id}>
                    <Link
                        fontSize='a'
                        fontFamily={fonts.bigCaslon}
                        variant={topic.ref?.current?.id === activeSection?.current?.id ? 'primary' : 'text'}
                        onClick={() => {
                            setActiveSection(topic.ref)
                            topic.ref.current.scrollIntoView();
                        }}
                        children={topic.name} />
                </List.Item>
            )}
        </List>
    </>
);

export default CourseSidebar;