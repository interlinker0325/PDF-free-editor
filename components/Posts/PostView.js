import { useState, useRef, useEffect } from "react";
import IFrame from "components/IFrame/IFrame";
import { isPostApproved } from "utils";
import Editor from "components/Editor/Editor";
import Suggestion from "components/Suggestion/Suggestion";
let options = { year: "numeric", month: "long", day: "numeric" };

const PostView = ({
  user,
  post,
  courses,
  editMode = false,
  previewIframe,
  editView,
  suggestionView,
  setIsSaved,
}) => {
  const [editorContent, setEditorContent] = useState("Select the tag");
  const [changedContent, setChangedContent] = useState("");
  const [section, setSection] = useState("Sección Título");
  const [showFiles, setshowFiles] = useState(false);
  const toggleShowFiles = () => setshowFiles(!showFiles);
  const [allCharacterCount, setAllCharacterCount] = useState(0);
  const author = post?.author;
  const isCurrentUserAuthor = author?.id === user?.id;

  useEffect(() => {
    setAllCharacterCount(String(previewIframe).length);
  }, []);

  const files = Array.isArray(post?.attachments)
    ? post?.attachments?.map((file) => (
      <a
        href={`/api/download?uri=${file.url.replace(
          "https://www.datocms-assets.com",
          ""
        )}&mimeType=${file.mimeType}&filename=${file.filename}`}
        key={`Attachment_${file.url}`}
        className="!text-other hover:!text-primary !m-0 !no-underline"
        download={file.filename}
      >
        {file.title || file.filename}
      </a>
    ))
    : [];

  let course = post?.course;
  if (courses) course = courses.find((someCourse) => someCourse.id === course);

  const postApproved = isPostApproved(post);
  let formattedDate = new Date(post.createdAt).toLocaleDateString(
    "es-ES",
    options
  );

  return (
    <article className="flex flex-col gap-4 p-2 items-stretch justify-start content-start flex-nowrap">
      <div className="flex flex-row items-center justify-between border-[1px] border-transparent rounded-none border-b-black">
        <h2 id="title" className="col-span-4 text-4xl cursor-pointer">{post.title}</h2>
        {isCurrentUserAuthor && !editMode && !postApproved && (
          <a
            href={`/posts/${post.id}/edit`}
            className="align-self-end text-primary text-2xl"
          >
            {"Editar Publicación >"}
          </a>
        )}
      </div>
      <div className="grid grid-cols-10 gap-5 h-[75vh]">
        <aside
          className={`${suggestionView ? "hidden" : "block"
            } h-[76vh] col-span-6 pr-5 border-[1px] border-transparent border-r-black`}
        >
          <IFrame
            className=""
            srcDoc={previewIframe || post.monographView}
            editView={editView}
            setEditorContent={setEditorContent}
            setIsSaved={setIsSaved}
            changedContent={changedContent}
            setSection={setSection}
          />
        </aside>
        {editView ? (
          <aside className="col-span-4 flex flex-col gap-4 pl-5 rounded-none h-full">
            <Editor
              setChangedContent={setChangedContent}
              editorContent={editorContent}
              section={section}
              setSection={setSection}
            />
          </aside>
        ) : (
          <aside className="col-span-2 flex flex-col gap-4 pl-5">
            {course && (
              <h3 className="text-lg font-caslon">
                <span className="text-primary font-roboto text-xl pr-2">
                  Curso:
                </span>
                {course.name}
              </h3>
            )}
            <h4 className="text-lg font-caslon">
              <span className="text-primary font-roboto text-xl pr-2">
                Autor(es):
              </span>
              {author?.fullname || user?.fullname}
            </h4>
            {Array.isArray(post?.coauthors) && post?.coauthors.length > 0 && (
              <h4 className="text-lg font-caslon">
                {post?.coauthors
                  .map((coauthor) => coauthor.fullname)
                  .join(", ")}
              </h4>
            )}
            <h4 className="text-lg font-caslon">
              <span className="text-primary font-roboto text-xl pr-2">
                Tutor(a):
              </span>
              {course?.professor?.fullname}
            </h4>
            <h4 className="text-lg font-caslon">
              <span className="text-primary font-roboto text-xl pr-2">
                Fecha publicación:
              </span>
              {formattedDate}
            </h4>
            <a
              onClick={toggleShowFiles}
              className="text-other hover:text-primary underline underline-offset-2"
            >
              Contenido Adjunto &gt;
            </a>
            <div className="w-full pl-4 flex flex-col gap-0">
              {showFiles && files}
            </div>
          </aside>
        )}
        {suggestionView && (
          <aside className="col-span-6 flex flex-col gap-4 pl-5 border-[1px] border-transparent rounded-none border-l-black">
            <Suggestion
              changedContent={changedContent}
              setEditorContent={setEditorContent}
              allCharacterCount={allCharacterCount}
              section={section}
            />
          </aside>
        )}
      </div>
      <div className="p-2 mt-2 w-[100%] inline-block text-center">
        <span className="font-semibold text-[1.2rem] text-red-600">
          Límites de publicación
        </span>
        <span className="ps-2">(Incorrección política, Falta de coherencia, Exceder el nivel aceptable de contenido generado por IA, Longitud del título)</span>
      </div>
    </article>
  );
};

export default PostView;
