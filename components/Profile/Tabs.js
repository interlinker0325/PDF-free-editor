// Shadcn IU
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

// Styles
import styles from './styles'

/**
 * Component Tabs
 */
const ContentTabs = ({ data }) => {
    if (data?.length <= 0) return null
    return (
     <Tabs defaultValue="profile" className={styles.contTabs}>
        <TabsList className={styles.contTabList}>
           {
             data?.map((tab,index) => (
               <TabsTrigger className={styles.btnTitle} key={index} value={tab?.value}>{tab?.name}</TabsTrigger>
             ))
           }
        </TabsList>
        {
             data?.map((tab, index) => (
               <TabsContent key={index} value={tab?.value}>
                  <Card>
                     <CardContent className="p-[20px] overflow-hidden">
                         {tab?.component}
                     </CardContent>
                  </Card>
               </TabsContent>
             ))
       }
     </Tabs>
    )
}

export default ContentTabs