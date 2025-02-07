// Router
import {useRouter} from 'next/router';

// Styles
import styles from './styles';

// Shadcn IU
import {Card, CardContent, CardFooter, CardHeader,} from "@/components/ui/card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export default ({
                  id,
                  title,
                  description,
                  coverimage
                }) => {
  const router = useRouter();

  return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card
                className={`${styles.contCard} hover:cursor-pointer`} // Added hover:cursor-pointer for the hover effect
                onClick={() => router.push(`/posts/${id}`)}
            >
              <CardHeader className={styles.contHead}>
                {coverimage && (
                    <figure>
                      <img
                          className="rounded-t-[12px] h-[200px] w-full"
                          src={coverimage.url}
                          alt={coverimage.title}
                      />
                    </figure>
                )}
              </CardHeader>
              <CardContent className="p-[10px] h-[70px]">
                <p className={styles.contTitle}>{title}</p>
              </CardContent>
              <CardFooter className="p-[10px]">
                <p className={styles.contDescription}>{description}</p>
              </CardFooter>
            </Card>
          </TooltipTrigger>
          <TooltipContent
              className="bg-black text-white p-2 rounded-md max-w-[250px]"
              side="bottom" // Ensures the tooltip always appears below
              align="center" // Aligns the tooltip to the center of the trigger
          >
            <p className="font-bold">{title}</p>
            <p className="text-sm">{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  );
};