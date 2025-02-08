import {useState} from 'react';
import PublicIFrame from 'components/IFrame/PublicIFrame';
import {isAdmin as isUserAdmin, isPostDraftOrDeclined} from 'utils';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {deleteEntry} from "@/handlers/bll";
import {useRouter} from "next/router";
import {enqueueSnackbar} from "notistack";

// Shacn IU
import {Button} from "@/components/ui/button"
import {Edit2, Trash2} from "lucide-react"
import {Badge} from "@/components/ui/custom-badge"
import {ChevronRight} from "lucide-react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"

const cn = (...classes) => classes.filter(Boolean).join(" ")

const _ = require('lodash');

let options = {year: 'numeric', month: 'long', day: 'numeric'};

const PublicView = ({
                      user,
                      post,
                      courses,
                      editMode = false,
                      previewIframe
                    }) => {
  const router = useRouter();
  const [showFiles, setshowFiles] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleShowFiles = () => setshowFiles(!showFiles);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const author = post?.author;
  const isCurrentUserAuthor = author?.id === user?.id;
  console.log({user})
  const isAdmin = isUserAdmin(user?.role?.id);
  console.log(isAdmin,"user",user)
  const files = Array.isArray(post?.attachments) ? post?.attachments?.map(file =>
      <a
          href={`/api/download?uri=${file.url.replace('https://www.datocms-assets.com', '')}&mimeType=${file.mimeType}&filename=${file.filename}`}
          key={`Attachment_${file.url}`}
          className='!text-other hover:!text-primary !m-0 !no-underline'
          download={file.filename}>
        {file.title || file.filename}
      </a>
  ) : [];

  let course = post?.course;
  if (courses) course = courses.find(someCourse => someCourse.id === course);

  const postDraft = isPostDraftOrDeclined(post);
  let formattedDate = new Date(post.createdAt).toLocaleDateString('es-ES', options);

  return (
      <>
        <Dialog open={deletePrompt} onClose={() => setDeletePrompt(false)}>
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Si elimina este borrador no podrá recuperarlo. ¿Deseas continuar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={() => setDeletePrompt(false)}>No</Button>
            <Button disabled={loading} onClick={async () => {
              try {
                setLoading(true)
                await deleteEntry(_.pick(post, ["id", "attachments", "monograph", "coverimage"]));
                enqueueSnackbar('El Borrador ha sido eliminado correctamente',
                    {
                      variant: 'success',
                      preventDuplicate: true,
                      anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                      }
                    });
                await router.push("/profile/me");
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
                setDeletePrompt(false);
              }
            }} color='error'>{loading ? "Borrando..." : "Si"}</Button>
          </DialogActions>
        </Dialog>
        <Card className='flex p-3 flex-col gap-4 items-stretch justify-start content-start flex-nowrap'>
          <CardHeader className="flex flex-col space-y-">
            <div className="flex  max-[500px]:gap-[30px] flex-row flex-wrap items-center justify-between">
              <CardTitle className="max-[500px]:line-clamp-2 max-[500px]:leading-none max-[500px]: line-clamp-1 max-[500px]:text-[20px] text-4xl font-semibold pl-2">{post.title}</CardTitle>
              {
                user?.isLoggedIn && (
                  <div className="flex gap-2">
                    <Button onClick={() => router.push(`/posts/${post.id}/edit`)} variant="default" size="sm">
                      <Edit2 className="mr-2 h-4 w-4"/>
                      Editar
                    </Button>
                    {!isAdmin && (
                        <Button onClick={() => setDeletePrompt(true)} variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4"/>
                          Eliminar
                        </Button>
                    )}
                </div>
                )
              }
            </div>
            <CardDescription className="text-sm text-muted-foreground pl-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-muted-foreground">Autor(es):</span>
                <Badge variant="secondary" className="font-normal bg-transparent ">
                  {author?.fullname || user?.fullname}{post?.coauthors?.length ? ", " : ""}{post?.coauthors.map((coauthor) => coauthor.fullname).join(", ")}
                </Badge>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="ml-[10px] rounded-lg border bg-card text-card-foreground shadow-sm">
              <Button
                  variant="ghost"
                  onClick={toggleCollapse}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span>Información del Post</span>
                <ChevronRight
                    className={cn("h-4 w-4 shrink-0 transition-transform duration-200", !isCollapsed && "rotate-90")}
                />
              </Button>

              {!isCollapsed && (
                  <div className="space-y-3 border-t px-4 py-3">
                    {course && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-muted-foreground">Curso:</span>
                          <Badge variant="secondary" className="font-normal">
                            {course.name}
                          </Badge>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">Tutor(a):</span>
                      <span className="text-sm">{course?.professor?.fullname}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">Fecha publicación:</span>
                      <span>{formattedDate}</span>
                    </div>

                    <div className="space-y-2">
                      <Button
                          variant="ghost"
                          onClick={toggleShowFiles}
                          className="flex h-auto items-center gap-2 p-0 text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        <span>Contenido Adjunto</span>
                        <ChevronRight
                            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", showFiles && "rotate-90")}
                        />
                      </Button>

                      {showFiles && <div className="pl-4">{files}</div>}
                    </div>
                  </div>
              )}
            </div>
            <PublicIFrame className='min-h-[75vh]' srcDoc={previewIframe || post.monographView}/>
          </CardContent>
        </Card>
      </>
  );
};

export default PublicView;
