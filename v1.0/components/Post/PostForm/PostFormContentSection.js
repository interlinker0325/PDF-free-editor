import Box from 'components/Box/Box';
import Text from 'components/Text/Text';
import Button from 'components/Button/Button';
import Flex from 'components/Flex/Flex';
import Input from 'components/Input/Input';
import File from 'components/Input/File';
import Textarea from 'components/Input/Textarea';
import Icon from 'components/Icon/Icon';

const PostFormContentSection = ({
    section,
    index,
    onChange,
    toggle,
    addSection,
    submit,
    ...props
}) => (
    <Box
        display='grid'
        gridTemplateRows='1fr'
        gridRowGap='2'
        {...props}>
        <Box
            display='grid'
            gridTemplateColumns='10fr 3rem'
            gridColumnGap='3'>
            <Text as='h2' variant='sectionTitle' children='Seccion de contenido' />
            <Button
                type='button'
                py='0'
                px='0'
                width='3rem'
                height='3rem'
                borderRadius='100%'
                alignSelf='center'
                onClick={(e) => toggle(index)}>
                {section.isOpen ?
                    <Icon.CaretUp />
                    : <Icon.CaretDown />
                }
            </Button>
        </Box>

        <Box
            display={section.isOpen ? 'grid' : 'none'}
            gridTemplateRows='1fr'
            gridRowGap='4'>
            <Input
                my='0'
                name='title'
                type='text'
                fontSize='h3'
                placeholder='Titular de seccion'
                width='fit-content'
                variant={section.title !== '' ? 'active' : ''}
                value={section.title}
                onChange={(e) =>
                    onChange(e, null, section, index)} />

            <Textarea
                width='100%'
                minHeight='10rem'
                placeholder='Description de contenido'
                name='description'
                value={section.description}
                onChange={(e) => onChange(e, null, section, index)} />

            <Box
                display='grid'
                gridTemplateColumns='1fr 1fr'>
                <Box
                    display='grid'
                    gridTemplateRows='1fr'
                    gridRowGap='4'>

                    <Box
                        display='grid'
                        gridTemplateColumns='3rem 1fr'
                        gridColumnGap='1rem'>
                        <Icon.Image active={section.image?.length > 0} />
                        <File
                            width='max-content'
                            ref={section.imageRef}
                            name={`imageSection${index.toString()}`}
                            label='Agregar imagen a la seccion >  '
                            onChange={(e) =>
                                onChange(e, 'image', section, index)
                            }
                            active={section.image?.length > 0} />
                    </Box>
                    <Box
                        display='grid'
                        gridTemplateColumns='3rem 1fr'
                        gridColumnGap='1rem'>
                        <Icon.Chart active={section.monograph?.length > 0} />
                        <File
                            width='max-content'
                            ref={section.monographRef}
                            name={`monographSection${index.toString()}`}
                            label='Agregar monografia a la seccion >'
                            onChange={(e) =>
                                onChange(e, 'monograph', section, index)
                            }
                            active={section.monograph?.length > 0} />
                    </Box>
                </Box>
                {submit &&
                    <Flex
                        justifyContent='flex-end'
                        alignItems='flex-start'>
                        <Button
                            mr='2'
                            type='button'
                            variant={['primary', 'small', 'rounded']}
                            onClick={e => submit(e, section, index)}
                            children='Guardar seccion' />
                    </Flex>
                }
            </Box>
        </Box>

        <Box
            py='3'
            variant='addSection'>
            <Button
                mr='2'
                type='button'
                variant={['primary', 'small', 'rounded']}
                onClick={e => addSection(index)}
                children='Agregar otra sección de contenido' />
        </Box>

    </Box>
);

export default PostFormContentSection;