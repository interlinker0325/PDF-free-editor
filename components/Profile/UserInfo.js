let options = { year: 'numeric', month: 'long', day: 'numeric' };

const UserInfo = ({
                      fullname,
                      email,
                      phone,
                      birthdate,
                      residence,
                      updatedAt,
                      gender,
                      level,
                      experience,
                      isCurrentUserProfile
                  }) => {

    let formattedDate = new Date(updatedAt).toLocaleDateString('es-ES', options);
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col border-b-black border-b-2 pb-12 gap-2'>
                <h4 className={styles.label}>Nombre completo: <span className={styles.span}>{fullname}</span></h4>
                <h4 className={styles.label}>Correo: <span className={styles.span}>{email}</span></h4>
                <h4 className={styles.label}>Número Telefónico: <span className={styles.span}>{phone}</span></h4>
                {isCurrentUserProfile ?
                    <h4 className={styles.label}>Fecha de nacimiento: <span className={styles.span}>{birthdate}</span>
                    </h4> : null
                }
                <h4 className={styles.label}>Género: <span className={styles.span}>{gender}</span></h4>
                <h4 className={styles.label}>Residencia: <span className={styles.span}>{residence}</span></h4>
                <h4 className={styles.label}>Última actualización: <span className={styles.span}>{formattedDate}</span>
                </h4>
            </div>
            <div className='flex flex-col gap-1 mb-2'>
                <h4 className={styles.label}>Carrera/Universidad/Nivel:</h4>
                <p className={styles.span}>{level}</p>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <h4 className={styles.label}>Experiencia laboral:</h4>
                <p className={styles.span}>{experience}</p>
            </div>
        </div>
    );
};

const styles = {
    label: 'font-roboto text-primary text-2xl',
    span: 'font-caslon text-black text-lg'
}

export default UserInfo;
