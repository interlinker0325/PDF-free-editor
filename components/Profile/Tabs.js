// Shadcn IU
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

// Styles
import styles from './styles'

/**
 * Component Tabs
 */
const ContentTabs = ({data}) => {
  if (data?.length <= 0) return null
  return (
      <nav className="bg-slate-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="profile" className={styles.contTabs}>
            <TabsList className={styles.contTabList}>
              {
                data?.map((tab, index) => (
                    <TabsTrigger className={styles.btnTitle} key={index} value={tab?.value}>{tab?.name}</TabsTrigger>
                ))
              }
            </TabsList>
            {
              data?.map((tab, index) => (
                  <TabsContent key={index} value={tab?.value}>
                    <div className="p-[20px] bg-slate-50 overflow-hidden">
                      {tab?.component}
                    </div>
                  </TabsContent>
              ))
            }
          </Tabs>
        </div>
      </nav>
  )
}
{/* <nav className="border-b bg-white">
<div className="container mx-auto px-4">
  <Tabs defaultValue="perfil" className="w-full">
    <TabsList className="h-16">
      <TabsTrigger value="perfil" className="data-[state=active]:bg-slate-100">
        Perfil
      </TabsTrigger>
      <TabsTrigger value="cursos">Cursos</TabsTrigger>
      <TabsTrigger value="publicaciones">Publicaciones</TabsTrigger>
      <TabsTrigger value="tutorias">Tutorías</TabsTrigger>
    </TabsList>
  </Tabs>
</div>
</nav> */
}

export default ContentTabs