import Box from 'components/Box/Box';
import Input from 'components/Input/Input';
import File from 'components/Input/File';
import Select from 'components/Input/Select';
import Toggle from 'components/Input/Toggle';
import Textarea from 'components/Input/Textarea';
import { INPUT_TYPES } from 'utils/inputUtil';
import Icon from 'components/Icon/Icon';

const PostFormGeneral = ({
    values,
    onChange,
    categories,
    refs,
    ...props
}) => (
    <Box
        as='fieldset'
        border='none'
        p='0'
        mx='0'
        {...props}>
        <Input
            name='title'
            type='text'
            variant={values.title !== '' ? ['large', 'active'] : 'large'}
            placeholder='Titular de contenido...'
            value={values.title}
            onChange={onChange} />
        <Box
            display='grid'
            gridTemplateColumns='1fr 1fr'
            gridColumnGap='4'
            border='none'
            p='0'
            mx='0'
            mt='4'>
            <Box
                display='grid'
                gridTemplateRows='1fr'
                gridRowGap='4'>

                <Box
                    display='grid'
                    gridTemplateColumns='3rem 1fr'
                    gridColumnGap='1rem'>
                    <Icon.Tags active={values.category !== '' && values.category !== categories[0]} />
                    <Select
                        name='category'
                        label='Categoría de contenido'
                        icon={null}
                        items={categories}
                        value={values.category}
                        active={values.category !== '' && values.category !== categories[0]}
                        onChange={onChange}
                        disabled={props.disableCategory} />
                </Box>

                <Box
                    display='grid'
                    gridTemplateColumns='3rem 1fr'
                    gridColumnGap='1rem'>
                    <Icon.Downloads active={values.files?.length > 0} />
                    <File
                        ref={refs.files}
                        name='files'
                        label='Agregar descargables >'
                        onChange={(e) =>
                            onChange(e, INPUT_TYPES.FILE, { name: 'files' })
                        }
                        active={values.files?.length > 0}
                        multiple />
                </Box>

                <Box
                    display='grid'
                    gridTemplateColumns='3rem 1fr'
                    gridColumnGap='1rem'>
                    <Icon.Images active={values.coverimage?.length > 0} />
                    <File
                        ref={refs.coverimage}
                        name='image'
                        label='Agregar imagen de encabezado >'
                        onChange={(e) =>
                            onChange(e, INPUT_TYPES.FILE, { name: 'coverimage' })
                        }
                        active={values.coverimage} />
                </Box>

                <Toggle
                    label='Agregar la entrada como aviso >'
                    ref={refs.notice}
                    name='notice'
                    active={values.notice}
                    checked={values.notice}
                    onChange={(e) =>
                        onChange(e, INPUT_TYPES.CHECKBOX, { name: 'notice' })} />
            </Box>
            <Box
                display='grid'
                gridTemplateRows='5fr 1fr'
                gridRowGap='3'>
                <Textarea
                    placeholder='Description de contenido'
                    name='description'
                    value={values.description}
                    onChange={onChange} />
                <Toggle
                    label='Publicar en la página de inicio'
                    ref={refs.showathome}
                    name='showathome'
                    justifySelf='flex-end'
                    checked={values.showathome}
                    active={values.showathome}
                    onChange={(e) =>
                        onChange(e, INPUT_TYPES.CHECKBOX, { name: 'showathome' })} />
            </Box>
        </Box>
    </Box>
);

export default PostFormGeneral;