import Text from 'components/Text/Text';
import Link from 'components/Link/Link';
import Flex from 'components/Flex/Flex';
import { fonts } from 'styles/theme';

const Title = ({
    borderBottom = '1px solid',
    borderColor = 'body',
    icon = null,
    href,
    ctaText,
    children,
    ml,
    ...props
}) => {
    const hasCTA = (!!href && !!ctaText);
    if (!icon && !hasCTA) {
        return (
            <Text
                { ...props }
                ml={ml || 0}
                borderBottom={borderBottom}
                borderColor={borderColor}
                children={children} />
        );
    } else {
        return (
            <Flex alignItems='center'>
                {icon}
                <Text
                    { ...props }
                    ml={ml || '2'}
                    width={hasCTA ? '100%' : 'fit-content'}
                    display='flex'
                    justifyContent='space-between'
                    borderBottom={borderBottom}
                    borderColor={borderColor}>
                    {children}
                    {hasCTA &&
                        <Link
                            fontWeight='lighter'
                            alignSelf='flex-end'
                            vatiant='active'
                            href={href}
                            children={ctaText} />
                    }
                </Text>
            </Flex>
        )
    }
};

export default Title;
