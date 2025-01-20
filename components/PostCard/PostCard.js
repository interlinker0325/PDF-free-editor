// Router
import { useRouter } from 'next/router';

// Styles 
import styles from './styles'

// Shadcn IU
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default ({
    id,
    title,
    description,
    course,
    coverimage
}) => {
    const router = useRouter();

    return (
        <Card className={styles.contCard} onClick={() => router.push(`/posts/${id}`)}>
        <CardHeader className={styles.contHead}>
            {coverimage &&
                 <figure><img className='rounded-t-[12px] h-[200px] w-full' src={coverimage.url} alt={coverimage.title} /></figure>
            }
        </CardHeader>
        <CardContent className="p-[10px] h-[70px]">
            <p className={styles.contTitle}>{title}</p>
        </CardContent>
        <CardFooter className="p-[10px]">
            <p className={styles.contDescription}>{description}</p>
        </CardFooter>
        </Card>
    );
}
