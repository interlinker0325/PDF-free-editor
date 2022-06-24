

const UserInfo = ({
    name,
    email,
    lastname,
    phone,
    birthdate,
    residencia,
    genero,
    nivel,
    experiencia
}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col border-b-black border-b-2 pb-4">
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Nombre completo:</span> {name} {lastname}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Correo:</span> {email}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Número Telefónico:</span> {phone}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Fecha de nacimiento:</span> {birthdate}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Género:</span> {genero}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Residencia:</span> {residencia}</h4>
            </div>
            <div className="flex flex-col gap-0">
                <h4 className='text-md text-primary text-lg'>Carrera/Universidad/Nivel:</h4>
                <p>{nivel}</p>
            </div>
            <div className="flex flex-col gap-0">
                <h4 className='text-md text-primary text-lg'>Experiencia laboral:</h4>
                <p>{experiencia}</p>
            </div>
        </div>
    );
};

export default UserInfo;