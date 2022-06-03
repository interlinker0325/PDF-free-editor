import React, { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { createEntry, upload, newSection, publishEntry, updateEntry } from 'handlers/bll';
import useUser from 'utils/useUser';
import Box from 'components/Box/Box';
import PostFormGeneral from 'components/Post/PostForm/PostFormGeneral';
import PostFormContentSection from 'components/Post/PostForm/PostFormContentSection';
import PostFormFooter from 'components/Post/PostForm/PostFormFooter';
import { INPUT_TYPES } from 'utils/inputUtil';
import Loader from 'components/Loader/Loader';

const baseSection = {
    isOpen: true,
    title: '',
    description: '',
    image: '',
    monograph: ''
};

const NewPostContent = ({ formState, course, categories, clearForm, ...props }) => {
    const router = useRouter();
    const { user } = useUser({ redirectTo: '/' });
    const [formData, setFormData] = formState;
    const [recordId, setRecordId] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const refs = {
        files: useRef(),
        coverimage: useRef(),
        notice: useRef(),
        showathome: useRef()
    };

    const addSection = useCallback((index = 0) => {
        const { sections, ...restOfForm } = formData;
        const imageRef = React.createRef();
        const monographRef = React.createRef();

        if (sections.length > index + 1) {
            sections.splice(index + 1, 0, {
                ...baseSection,
                imageRef,
                monographRef
            })
        } else {
            sections.push({
                ...baseSection,
                imageRef,
                monographRef
            })
        }

        setFormData({ ...formData, sections });
    }, [formData]);

    const handleInputChange = useCallback(async (e, type = INPUT_TYPES.INPUT, vars = {}) => {
        setIsLoading(true);

        let value, name;
        const isCheckbox = type === INPUT_TYPES.CHECKBOX;
        const isFiles = type === INPUT_TYPES.FILE;

        if (isCheckbox) {
            value = !refs[vars.name]?.current?.checked;
            name = vars.name;
            refs[name].current.checked = value;
        } else if (isFiles) {
            const _files = refs[vars.name]?.current?.files;
            const files = await upload(_files);

            value = files;
            name = vars.name;
        } else {
            value = e.target?.value;
            name = e.target?.name;
        }

        delete formData[name];
        setFormData({ ...formData, [name]: value });
        setIsLoading(false);
    }, [formData]);

    const handleSectionInputChange = useCallback(async (e, refName, section, index) => {
        setIsLoading(true);
        const { sections } = formData;
        let value, name;

        if (refName) {
            const _files = section[`${refName}Ref`]?.current?.files;
            const files = await upload(_files);

            value = files;
            name = refName;
        } else {
            value = e.target?.value;
            name = e.target?.name;
        }

        sections[index][name] = value;

        setFormData({ ...formData, sections });
        setIsLoading(false);
    }, [formData]);

    const submitSection = useCallback(async (e, section, index) => {
        e.preventDefault();
        setIsLoading(true);

        const { title, monograph, description, image, ...rest } = section;
        const _section = await newSection(recordId, formData.sections);

        if (_section.error) {
            setFormData({ ...formData, error: _section.error });
            alert('No se pudo crear la sección');
        } else {
            let _sections = formData.sections.map((s, i) => {
                const sectionId = _section.record.content[i];

                if (index === i) {
                    s = {
                        ...s,
                        id: sectionId,
                        isOpen: false
                    };
                }

                return s;
            });

            setFormData({
                ...formData,
                error: false,
                sections: _sections
            });

            alert(`Se creó la sección`);
        }
        setIsLoading(false);
    }, [formData, recordId]);

    const doSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { author, error, isGeneralFilled, ...restOfForm } = formData;

        if (recordId) {
            await updateEntry(recordId, {
                ...restOfForm
            });
            await publishEntry(recordId);
            alert(`Se publico la entrada`);
            window.location.href = `/posts/${recordId}`;
        } else {
            const entry = await createEntry({
                author: user.id,
                ...restOfForm
            });

            if (entry.error) {
                setFormData({ ...formData, error: entry.error });
                alert('No se pudo crear la entrada');
            } else {
                setFormData({
                    ...formData,
                    error: false,
                    isGeneralFilled: true
                });
                setRecordId(entry.id);
                addSection();
                alert(`Se creó la entrada`);
            }
        }
        setIsLoading(false);
    }, [formData]);

    const toggleSection = useCallback((sectionIndex) => {
        const { sections } = formData;
        sections[sectionIndex].isOpen = !sections[sectionIndex].isOpen;
        setFormData({ ...formData, sections });
    }, [formData]);

    return (<>
        <Loader isLoading={isLoading} text="Espere un momento por favor ..." />
        <Box
            as='form'
            width='100%'
            display='grid'
            gridTemplateRows='1fr'
            gridRowGap='5'
            onSubmit={doSubmit}>
            <PostFormGeneral
                values={formData}
                onChange={handleInputChange}
                categories={categories}
                refs={refs} />

            {formData.sections && formData.sections.map((section, index) =>
                <PostFormContentSection
                    key={`Post_Content_Section_${index.toString()}`}
                    section={section}
                    index={index}
                    onChange={handleSectionInputChange}
                    toggle={toggleSection}
                    addSection={addSection}
                    submit={submitSection} />
            )}

            <PostFormFooter clearForm={clearForm} recordId={recordId} />
        </Box>
    </>);
}

export default NewPostContent;
