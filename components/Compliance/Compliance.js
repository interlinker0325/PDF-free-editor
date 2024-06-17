import React, { useEffect, useState } from 'react';

const Compliance = ({ form, check, sections, sectionCheckBadge }) => {






    return (
        <>
            <div className='text-red-500 text-center mt-2'>- Ante cualquier incumplimiento, revisa el documento por las secciones marcadas en rojo -</div>
            <div className="flex justify-around mt-5 leading-8 text-xl">
                <div className="w-7/12">
                    <div className="my-2 border border-blue-500 p-3 relative">
                        <div className="flex justify-between px-5">
                            <div className="absolute text-2xl -top-3 -left-1 bg-white px-2">
                                Formulario
                            </div>
                            <div>
                                <div>Seleccionar curso</div>
                                <div>Imagen de encabezado</div>
                                <div>Sinopsis</div>
                                <div>Palabras clave</div>
                                <div>Términos de publicación</div>
                            </div>
                            <div className="form-check">
                                {form.course ? check : <div className="text-red-600">Pendiente</div>}
                                {form.coverimage ? check : <div className="text-red-600">Pendiente</div>}
                                {form.description ? check : <div className="text-red-600">Pendiente</div>}
                                {form.tags ? check : <div className="text-red-600">Pendiente</div>}
                                {form.agreedterms ? check : <div className="text-red-600">Pendiente</div>}
                            </div>
                        </div>
                    </div>
                    <div className="my-2 border border-blue-500 mt-10 p-3 relative">
                        <div className="absolute text-2xl -top-3 -left-1 bg-white px-2">
                            Documento
                        </div>
                        <div className="flex justify-between px-5">
                            <div>
                                <div>Longitud del título</div>
                                <div>Lenguaje apropiado</div>
                                <div>Coherencia</div>
                            </div>
                            <div>
                                <div className="text-orange-400">Revisar</div>
                                <div className="text-red-600">Revisar</div>
                                <div className="text-red-600">Revisar</div>
                            </div>
                        </div>
                        <div className="flex p-5 justify-between">
                            <div>
                                <div>Secciones requeridas</div>
                                <div className="ps-5">
                                    {sections[form.type]?.map((section, index) => (
                                        <div key={index}>{section.toUpperCase()}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sky-500">
                                    {form.type ? form.type : <div className="text-red-600">Tipo de publicacion</div>}
                                </div>
                                {sectionCheckBadge[form.type]?.map((state) => state)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="my-2 border border-blue-500 p-3 relative">
                        <div className="flex">
                            <div className="absolute text-2xl -top-3 -left-1 bg-white px-2">
                                Numeración
                            </div>
                            <div>
                                <div>Tablas</div>
                                <div>Figuras</div>
                                <div>Anexos</div>
                            </div>
                            <div className="ps-3">
                                <div className="text-red-600 ps-5">Pendiente</div>
                                <div className="text-red-600 ps-5">Pendiente</div>
                                <div className="text-red-600 ps-5">Pendiente</div>
                            </div>
                        </div>
                    </div>
                    <div className="my-2 border border-blue-500 mt-10 p-3 relative">
                        <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                            Notas de Tabla o Figura
                        </div>
                        <div className="flex">
                            <div>
                                <div>Tablas</div>
                                <div>Figuras</div>
                            </div>
                            <div className="ps-3">
                                <div className="text-orange-400 ps-5">Revisar</div>
                                <div className="text-red-600 ps-5">Pendiente</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Compliance;