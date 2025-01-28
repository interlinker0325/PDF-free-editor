"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { FileText, Upload, ImageIcon, Users, Tag } from "lucide-react"

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookAtlas, faFileArrowDown, faFileCode, faImages, faPeopleGroup, faTags } from '@fortawesome/free-solid-svg-icons';
import { TERMS_AND_CONDITIONS_TEXT } from 'utils/copy';
import Autocomplete from 'components/Autocomplete/Autocomplete';

// Shadcn IU
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const PostForm = ({
    form,
    courses,
    onChange,
    user,
    setAgreedTerms,
    setCoAuthors,
    removeCoAuthor,
    refs,
    formView,
    monograColor,
    showPreview
}) => {
    const selectedCourse = (courses || []).find(c => c?.id === form?.course);
    const courseStudents = (selectedCourse?.students || []).filter(student => student?.id !== user?.id);
    
    const [open, setOpen] = useState(false);
    const formGeneral = useForm({
        defaultValues: {
          title: "",
          synopsis: "",
          keywords: "",
          coauthors: "",
        },
    })

    const [monographChange, setMonographChange] = useState(false);

    const handleClick = (event) => {
        setMonographChange(!monographChange);
        if (!monographChange) {
            return;
        }

        event.preventDefault();
        setOpen(true);
        // if (form.monograph) {
        //     setMonographChange(true);
        // }
    };

    const handleYes = () => {
        setOpen(false);
        // form.monograph = null;
        setMonographChange(false);
        refs.monograph.current.click();
    };

    const handleNo = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <form className={!formView ? 'hidden' : 'font-roboto grid auto-rows-auto gap-8 p-6 bg-white shadow-lg rounded-lg h-screen'}>
                <section className='row-auto'>
                    <div className='form-control'>
                        <input
                            className={styles.titleInput(form.title)}
                            type='text'
                            name='title'
                            placeholder='Titular de publicación *'
                            value={form.title}
                            onChange={(e) => onChange(e, 'title')} />
                    </div>
                </section>
                <section className='row-span-3 grid lg:grid-cols-2 auto-rows-auto gap-6'>
                    <div className='flex flex-col form-control gap-6 pt-4'>
                        <div className={`${styles.formControl} flex jusfity-between`}>
                            <FontAwesomeIcon className={styles.icon} icon={faTags} size='lg' />
                            <label className={`${styles.label} ml-[6px]`}>
                                <select
                                    className={styles.select(form.course)}
                                    value={form.course || ''}
                                    onChange={(e) => onChange(e, 'course')}>
                                    <option value='' style={{ color: 'gray' }}>Curso de la publicación *</option>

                                    {courses?.map(course =>
                                        <option key={`select_course_${course.id}`} value={course.id}>{course.name}</option>
                                    )}
                                </select>
                            </label>
                        </div>
                        <div className={`${styles.formControl} flex jusfity-between`}>
                            <FontAwesomeIcon className={styles.icon} icon={faBookAtlas} size='lg' />
                            <label className={`${styles.label} ml-[4px]`}>
                                <select
                                    className={styles.type(form.post_type)}
                                    value={form.post_type || ''}
                                    onChange={(e) => onChange(e, 'post_type')}
                                >
                                    <option value='' style={{ color: 'gray' }}>
                                        Tipo de publicación *
                                    </option>
                                    <option value='Ensayo'>Ensayo</option>
                                    <option value='Doc. Académico'>Doc. Académico</option>
                                    <option value='Art. Científico'>Art. Científico</option>
                                </select>
                            </label>
                        </div>
                        <div className={`${styles.formControl} flex jusfity-between`}>
                            <FontAwesomeIcon className={styles.icon} icon={faFileCode} size='lg' />
                            <label className={`${styles.label} ml-[5px]`}>

                                <input
                                    className={styles.fileInput}
                                    type='file'
                                    name='monograph'
                                    id='monograph'
                                    ref={refs.monograph}
                                    onChange={(e) => onChange(e, 'monograph')}
                                    onClick={handleClick}
                                />
                                <span htmlFor='monograph' className={`${styles.fileLabel(form.monograph)} ${monograColor === true ? "text-[#88a9fe]" : ""}`}>Agregar documento(PDF, Word, Docx) *<span className='font-thin float-right'>{'  >'}</span></span>

                            </label>
                        </div>
                        <div className={`${styles.formControl} flex jusfity-between`}>
                            <FontAwesomeIcon className={styles.icon} icon={faImages} size='lg' />
                            <label className={styles.label}>
                                <input
                                    className={styles.fileInput}
                                    type='file'
                                    name='coverimage'
                                    id='coverimage'
                                    ref={refs.coverimage}
                                    onChange={(e) => onChange(e, 'coverimage')}
                                />
                                <span htmlFor='coverimage' className={styles.fileLabel(form.coverimage)}>Agregar imagen de encabezado * <span className='font-thin float-right'>{'>'}</span></span>
                            </label>
                        </div>

                        <div className={`${styles.formControl} flex jusfity-between`}>
                            <FontAwesomeIcon className={styles.icon} icon={faFileArrowDown} size='lg' />

                            <label className={`${styles.label} ml-[7px]`}>
                                <input
                                    className={styles.fileInput}
                                    type='file'
                                    name='attachments'
                                    id='attachments'
                                    multiple
                                    ref={refs.attachments}
                                    onChange={(e) => onChange(e, 'attachments')} />
                                <span className={styles.fileLabel(form.attachments)}>Agregar contenido adjunto <span className='font-thin float-right'>{'>'}</span></span>
                            </label>

                        </div>

                        <div className={`${styles.formControl} flex jusfity-between`}>
                            <FontAwesomeIcon className={styles.icon} icon={faPeopleGroup} size='lg' />
                            <Autocomplete
                                coAuthors={form.coauthors}
                                placeholder='Co-autores'
                                onClick={setCoAuthors}
                                suggestions={courseStudents} />
                        </div>

                        <div>
                            <h4 className='text-base font-normal font-roboto mb-2'>Autores: <span className='font-caslon text-base font-normal text-other'>{user?.fullname}</span></h4>
                            {' '}
                            {form.coauthors?.map(coauthor =>
                                <span key={`coAuthor_${coauthor.id}`} className='font-caslon text-base font-normal text-other gap-1 inline-flex flex-row'>
                                    {coauthor.fullname}
                                    <a
                                        className='underline cursor-pointer'
                                        id={coauthor.id}
                                        onClick={async (e) => removeCoAuthor(e, coauthor.id)}>
                                        (-)
                                    </a>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='form-control gap-6'>
                        <div>
                            <textarea
                                maxLength='200'
                                className={styles.textarea(form.description)}
                                placeholder='Agregar sinopsis de la publicación (resumen) *'
                                value={form.description}
                                onChange={(e) => onChange(e, 'description')} />
                            <p className='text-sm'>Máximo 200 caracteres*</p>
                        </div>

                        <div>
                            <textarea
                                maxLength='200'
                                className={styles.textarea(form.tags)}
                                placeholder='Palabras claves *'
                                value={form.tags}
                                onChange={(e) => onChange(e, 'tags')} />
                            <p className='text-sm'>Separadas por coma*</p>
                        </div>
                    </div>
                </section>
                <section className='row-auto'>
                    <div className='form-control'>
                        <label className={styles.labelNoCursor}>

                            <span className='label-text normal-case text-checkbox font-thin italic max-w-[97%]'>
                                <h4 className='not-italic text-black font-normal '>Los términos y condiciones deben ser aceptados para publicar una publicación*</h4>

                                <div className='w-full h-[300px] overflow-scroll border p-4 rounded-lg'>
                                    {TERMS_AND_CONDITIONS_TEXT}
                                    <div className='flex gap-5'>

                                        <a onClick={setAgreedTerms} htmlFor='agreedterms' className={styles.link} >Acepto</a>
                                        <div className='h-[23px] w-[23px] border-black border-[1px] flex flex-col justify-center items-center basis-6' onClick={setAgreedTerms}>
                                            {form.agreedterms &&
                                                <div className='h-[20px] w-[20px] rounded-full bg-other' />
                                            }
                                        </div>
                                    </div>
                                </div>

                            </span>
                        </label>
                    </div>
                </section>
            </form> */}
            <Dialog
                open={open}
                onClose={handleNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Si cargas un archivo nuevamente, perderás la versión anterior, ¿deseas continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo} color="primary">
                        No
                    </Button>
                    <Button onClick={handleYes} color="primary" autoFocus>
                        Si
                    </Button>
                </DialogActions>
            </Dialog>
        <Form {...formGeneral} className={`${showPreview ? 'hidden' : ''}`}>
          <form  className={`${showPreview ? 'hidden' : ''} space-y-6`}>
             <Card>
              <CardHeader>
                <CardTitle>Detalles de la Publicación</CardTitle>
                <CardDescription>Ingrese la información básica de su publicación.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <FormField /> */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titular de publicación *</FormLabel>
                      <FormControl>
                        <Input name='title' value={form.title} onChange={(e) => onChange(e, 'title')} placeholder="Ingrese el título"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Curso *</FormLabel>
                            <Select value={form.course || ''}
                                    onValueChange={(e) => onChange({ target: { value: e, }}, 'course')} defaultValue={form.cours}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Seleccione un curso" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {courses?.map(course =>
                                        <SelectItem key={`select_course_${course.id}`} value={course.id}>{course.name}</SelectItem>
                                )}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="publicationType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de publicación *</FormLabel>
                            <Select value={form.post_type || ''}
                                    onValueChange={(e) => onChange({ target: { value: e, }}, 'post_type')} defaultValue={form.post_type}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Seleccione un tipo" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Ensayo">Ensayo</SelectItem>
                                <SelectItem value="Doc. Académico">Doc. Académico</SelectItem>
                                <SelectItem value="Art. Científico">Art. Científico</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="coauthors"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Co-autores</FormLabel>
                            <FormControl>
                                {/* <Input placeholder="Nombres de co-autores" {...field} /> */}
                                <Autocomplete
                                    coAuthors={form.coauthors}
                                    placeholder='Co-autores'
                                    onClick={setCoAuthors}
                                    suggestions={courseStudents} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Palabras clave *</FormLabel>
                        <FormControl>
                          <Input                                 
                            value={form.tags}
                            onChange={(e) => onChange(e, 'tags')} 
                            placeholder="Separadas por coma" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                    control={form.control}
                    name="synopsis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sinopsis *</FormLabel>
                        <FormControl>
                          <Textarea 
                                value={form.description}
                                onChange={(e) => onChange(e, 'description')} 
                                placeholder="Agregue sinopsis de la publicación" 
                                className="h-32" />
                        </FormControl>
                        <FormDescription>Máximo 200 caracteres</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
              </CardContent >
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Archivos y Documentos</CardTitle>
                <CardDescription>Suba los archivos relacionados con su publicación.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="relative z-[99] h-32 flex-col gap-2">
                      <FileText className="h-8 w-8" />
                      <span className="relative z-[99]">Agregar documento/PDF, Word, Docx</span>
                      <Input
                        type='file'
                        name='monograph'
                        id='monograph'
                        ref={refs.monograph}
                        onChange={(e) => onChange(e, 'monograph')}
                        onClick={handleClick} 
                        className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-[999] opacity-[0] cursor-pointer"
                      />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="relative z-[99] h-32 flex-col gap-2">
                      <ImageIcon className="h-8 w-8" />
                      <span>Agregar imagen de encabezado</span>
                      <Input 
                        className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-[999] opacity-[0] cursor-pointer"
                        type='file'
                        name='coverimage'
                        id='coverimage'
                        ref={refs.coverimage}
                        onChange={(e) => onChange(e, 'coverimage')}/>
                    </Button>
                  </div>
                </div>
                <div className="flex mt-[20px] flex-col gap-2">
                    <Button variant="outline" className="relative z-[99] h-32 flex-col gap-2">
                      <FileText className="h-8 w-8" />
                      <span>Agregar Contenido Adjunto</span>
                      <Input 
                        className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-[999] opacity-[0] cursor-pointer"
                        type='file'
                        name='attachments'
                        id='attachments'
                        multiple
                        ref={refs.attachments}
                        onChange={(e) => onChange(e, 'attachments')} />
                    </Button>
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terminos y Condiciones</CardTitle>
                <CardDescription className="mx-[5px]">Los términos y condiciones deben ser aceptados para publicar una publicación*</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='form-control'>
                    <label className={styles.labelNoCursor}>
                        <span className='label-text normal-case text-checkbox font-thin italic max-w-[97%]'>
                            <div className='w-full h-[300px] overflow-scroll border p-4 rounded-lg'>
                                {TERMS_AND_CONDITIONS_TEXT}
                                <div className='flex gap-5'>

                                    <a onClick={setAgreedTerms} htmlFor='agreedterms' className={styles.link} >Acepto</a>
                                    <div className='h-[23px] w-[23px] border-black border-[1px] flex flex-col justify-center items-center basis-6' onClick={setAgreedTerms}>
                                        {form.agreedterms &&
                                            <div className='h-[20px] w-[20px] rounded-full bg-other' />
                                        }
                                    </div>
                                </div>
                            </div>

                        </span>
                    </label>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
        </>

    );
};

const STYLE_ACTIVE = 'text-other border-b-other';
const STYLE_INACTIVE = 'text-titleInput border-b-black';

const styles = {
    formControl: 'form-control flex-row gap-4 items-end',
    titleInput: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} bg-transparent input drop-shadow-lg font-normal text-4xl input-ghost border-transparent rounded-none w-full px-0`,
    label: 'cursor-pointer font-normal label justify-start gap-4 p-0 w-[380px]',
    labelNoCursor: 'font-normal label justify-start gap-4 p-0 mb-5',
    icon: 'w-[10px]',
    select: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} bg-transparent drop-shadow-lg font-normal text-lg h-8 min-h-8 w-[380px] pl-0 border-2 border-transparent rounded-none`,
    type: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} bg-transparent drop-shadow-lg font-normal text-lg h-8 min-h-8 w-[380px] pl-0 border-2 border-transparent rounded-none`,
    fileInput: 'input hidden input-ghost w-full',
    fileLabel: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} label-text drop-shadow-lg font-normal text-lg border-2 border-transparent py-2 rounded-none w-full`,
    textarea: val => `${val ? 'border-other' : ''} textarea font-normal drop-shadow-lg p-5 text-lg font-caslon h-36 rounded-none resize-none bg-secondary w-full`,
    checkbox: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} checkbox font-normal rounded-none checked:!bg-none checked:bg-other`,
    button: 'btn min-h-min h-min py-[10px] px-[20px] bg-other hover:btn-primary hover:text-white capitalize text-white rounded-full',
    link: 'text-other uppercase cursor-pointer hover:text-primary underline underline-offset-1'
};

export default PostForm;
