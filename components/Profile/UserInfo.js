let options = { year: 'numeric', month: 'long', day: 'numeric' };

// Shadcn IU
import { Input } from "@/components/ui/input"

// Styles
import styles from './styles'

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
    isCurrentUserProfile,
    avatarView
}) => {
    const activeView = false
    let formattedDate = new Date(updatedAt).toLocaleDateString('es-ES', options);
    return (
        <div className='flex flex-col gap-6'>
            <div className={styles.leftContainer}>
                <div className={styles.avatarCard}>
                {avatarView}
                </div>
                <div>
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                        {fullname}
                    </h2>
                </div>
            </div>
            <div className='flex pt-[20px] flex-col border-b-black border-b-2 pb-12 gap-2'>

                <div className="flex gap-[20px] max-md:justify-between items-end">
                    <h4 className={styles.label}> Correo: </h4>
                    <Input className="w-[30%] max-md:min-w-[160px]" type="email" placeholder="Correo" disabled="true" value={email} />
                </div>

                <div className="flex gap-[20px] max-md:justify-between items-end">
                    <h4 className={styles.label}>Número Telefónico:</h4>
                    <Input className="w-[30%] max-md:min-w-[160px]" type="tel" placeholder="Número Telefónico" disabled={true} value={phone} />
                </div>

                <div className="flex gap-[20px] max-md:justify-between items-end">
                    <h4 className={styles.label}>Fecha De Nacimiento:</h4>
                    <Input className="w-[30%] max-md:min-w-[160px]" type="text" placeholder="Fecha De Nacimiento" disabled={true} value={birthdate} />
                </div>

                <div className="flex gap-[20px] max-md:justify-between items-end">
                    <h4 className={styles.label}>Género:</h4>
                    <Input className="w-[30%] max-md:min-w-[160px]" type="text" placeholder="Género" disabled={true} value={gender} />
                </div>

                <div className="flex gap-[20px] max-md:justify-between items-end">
                    <h4 className={styles.label}>Residencia:</h4>
                    <Input className="w-[30%] max-md:min-w-[160px]" type="text" placeholder="Residencia" disabled={true} value={residence} />
                </div>

                <div className="flex gap-[20px] max-md:justify-between items-end">
                    <h4 className={styles.label}>Última Actualización:</h4>
                    <Input className="w-[30%] max-md:w-[160px]" type="text" placeholder="Última Actualización" disabled={true} value={formattedDate} />
                </div>
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

export default UserInfo;
