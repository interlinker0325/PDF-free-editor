const Compliance = () => {
    return (
        <>
            <div className="flex justify-around mt-10 leading-8 text-xl">
                <div className="w-7/12">
                    <div className="my-2 border border-blue-500 p-3 relative">
                        <div className="flex justify-between px-5">
                            <div className="absolute text-2xl -top-3 -left-1 bg-white px-2">
                                Formulario
                            </div>
                            <div>
                                <div className="">
                                    Seleccionar curso
                                </div>
                                <div>
                                    Imagen de encabezado
                                </div>
                                <div>
                                    Sinopsis
                                </div>
                                <div>
                                    Palabras clave
                                </div>
                                <div>
                                    Términos de publicación
                                </div>
                            </div>
                            <div className="">
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-2 border border-blue-500 mt-10 p-3 relative">
                        <div className="absolute text-2xl -top-3 -left-1 bg-white px-2">
                            Documento
                        </div>
                        <div className="flex justify-between px-5">
                            <div>
                                <div className="">
                                    Longitud del título
                                </div>
                                <div>
                                    Lenguaje apropiado
                                </div>
                                <div>
                                    Coherencia
                                </div>
                            </div>
                            <div className="">
                                <div className="text-orange-400">
                                    Revisar
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                            </div>
                        </div>
                        <div className="flex p-5 justify-between">
                            <div>
                                <div className="">
                                    Secciones requeridas
                                </div>
                                <div className="ps-5">
                                    <div>
                                        Resumen
                                    </div>
                                    <div>
                                        Introducción
                                    </div>
                                    <div>
                                        Metodología
                                    </div>
                                    <div>
                                        Resultados
                                    </div>
                                    <div>
                                        Conclusiones
                                    </div>
                                    <div>
                                        Bibliografía
                                    </div>
                                    <div>
                                        Anexos
                                    </div>
                                </div>
                            </div>
                            <div className="text-end">
                                <div className="">
                                    Art. Científico
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
                                <div className="text-red-600">
                                    Pendiente
                                </div>
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
                                <div className="">
                                    Tablas
                                </div>
                                <div>
                                    Figuras
                                </div>
                                <div>
                                    Anexos
                                </div>
                            </div>
                            <div className="ps-3">
                                <div className="text-red-600 ps-5">
                                    Pendiente
                                </div>
                                <div className="text-red-600 ps-5">
                                    Pendiente
                                </div>
                                <div className="text-red-600 ps-5">
                                    Pendiente
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-2 border border-blue-500 mt-10 p-3 relative">
                        <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                            Notas de Tabla o Figura
                        </div>
                        <div className="flex">
                            <div>
                                <div className="">
                                    Tablas
                                </div>
                                <div>
                                    Figuras
                                </div>
                            </div>
                            <div className="ps-3">
                                <div className="text-orange-400 ps-5">
                                    Revisar
                                </div>
                                <div className="text-red-600 ps-5">
                                    Pendiente
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Compliance;