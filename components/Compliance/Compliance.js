import React from 'react';

const Compliance = ({
    form,
    check,
    sections,
    sectionCheckBadge,
    numerationCheckBadge,
    noteCheckBadge,
    coherenceCheckBadge,
    titleLengthCheckBadge,
    wordCheckBadge
}) => {

    return (
        <div className=''>
            <div className='text-red-500 text-center mt-2 text-sm'>- Ante cualquier incumplimiento, revisa el documento por las secciones marcadas en rojo -</div>
            <div id='compliance' className="flex justify-around mt-5 leading-6 text-[14px] 2xl:text-xl 2xl:leading-8">
                <div className="w-7/12">
                    <div className="my-2 border border-blue-500 py-3 relative">
                        <div className="flex justify-between px-5">
                            <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                                Formulario
                            </div>
                            <div className='w-full'>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Seleccionar curso</div>
                                    {form.course ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Imagen de encabezado</div>
                                    {form.coverimage ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Sinopsis</div>
                                    {form.description ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Palabras clave</div>
                                    {form.tags ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Términos de publicación</div>
                                    {form.agreedterms ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-2 border border-blue-500 mt-10 p-3 relative">
                        <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                            Documento
                        </div>
                        <div className="flex flex-col px-2">
                            <div className='flex justify-between w-full items-center'>
                                <div>Longitud del título</div>
                                <div className="text-orange-400">{titleLengthCheckBadge}</div>
                            </div>
                            <div className='flex justify-between w-full items-center'>
                                <div>Lenguaje apropiado</div>
                                <div className="text-orange-400">{wordCheckBadge}</div>
                            </div>
                            <div className='flex justify-between w-full items-center'>
                                <div>Coherencia</div>
                                <div className="text-orange-400">{coherenceCheckBadge}</div>
                            </div>
                        </div>
                        <div className="flex py-5 px-2 justify-between">
                            <div>
                                <div>Secciones requeridas</div>
                                <div className="">
                                    {sections[form.post_type]?.map((section, index) => (
                                        <div key={index}>{section.toUpperCase()}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sky-500">
                                    {form.post_type ? form.post_type : <div className="text-red-600">Tipo de publicación</div>}
                                </div>
                                {sectionCheckBadge[form.post_type]?.map((state, index) => (
                                    <div key={index} className='2xl:h-8'>{state}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="my-2 border border-blue-500 p-3 relative">
                        <div className="flex">
                            <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                                Numeración
                            </div>
                            <div>
                                <div>Tablas</div>
                                <div>Figuras</div>
                                <div>Anexos</div>
                            </div>
                            <div className="ps-10">
                                {Object.values(numerationCheckBadge)?.map((state, index) => {
                                    return (
                                        <div key={index} className='2xl:h-8'>
                                            {state}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="border border-blue-500 mt-10 p-3 relative">
                        <div className="absolute text-[12px] 2xl:text-xl -top-3  -left-1 bg-white px-2">
                            Notas de Tabla o Figura
                        </div>
                        <div className="flex pt-3">
                            <div>
                                <div>Tablas</div>
                                <div>Figuras</div>
                            </div>
                            <div className="ps-10">
                                {Object.values(noteCheckBadge)?.map((state, index) => (
                                    <div key={index} className='2xl:h-8'>
                                        {state}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compliance;
