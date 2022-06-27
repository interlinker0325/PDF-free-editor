

const UserInfo = ({
    fullname,
    email,
    phone,
    birthdate,
    residence,
    gender,
    level,
    experience
}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col border-b-black border-b-2 pb-4">
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Nombre completo:</span> {fullname}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Correo:</span> {email}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Número Telefónico:</span> {phone}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Fecha de nacimiento:</span> {birthdate}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Género:</span> {gender}</h4>
                <h4 className='text-black text-md'><span className='text-primary text-lg'>Residencia:</span> {residence}</h4>
            </div>
            <div className="flex flex-col gap-0">
                <h4 className='text-md text-primary text-lg'>Carrera/Universidad/Nivel:</h4>
                <p>{level}</p>
            </div>
            <div className="flex flex-col gap-0">
                <h4 className='text-md text-primary text-lg'>Experiencia laboral:</h4>
                <p>{experience}</p>
            </div>
        </div>
    );
};

export default UserInfo;