import { useState, useEffect } from "react";
import BouncingDotsLoader from "./BouncingDotsLoader";
import axios from "axios";
import {toast} from 'react-hot-toast';

const notifyError = (errorMessage) => {
  toast.error(errorMessage, {
    duration: 2000,
  });
}
const Suggestion = ({ changedContent, setEditorContent, section, allCharacterCount, aiContentRate, setAiContentRate }) => {
  const [suggestion, setSuggestion] = useState("");
  const [improvedText, setImprovedText] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const sectionCheck = async () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_WINDOWS_SERVER_URL}/sectionCheck`, null, {
        params: {
          content: changedContent,
          title: section
        },
      })
      .then(function (response) {
        setLoadingStatus(false);
        setSuggestion(response["data"].suggestion);
        setImprovedText(response["data"].improvedText);
      })
      .catch(function (error) {
        setSuggestion(error)
      });
  };

  const improveCheck = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(improvedText, "text/html");
    setAiContentRate(aiContentRate + improvedText.length/allCharacterCount*100);
    setEditorContent(doc.body);
  };

  const getSuggestion = () => {
    // if user press suggestion button without selection, warning is displayed
    if(changedContent){
      sectionCheck();
      setLoadingStatus(true);
    }
    else{
      notifyError('Por favor seleccione una sección')
    }
  };

  return (
    <>
      <div className="bg-zinc-100 p-5">
        <div className="">
          <div className="d-flex cursor-pointer absolute border p-1 rounded-md bg-lime-100 border-green-400 hover:bg-green-200" onClick={getSuggestion}>
            <div className="font-semibold text-[0.8rem] text-center text-amber-600">
              Iniciar Revisión
            </div>
          </div>
          <div className="font-semibold text-[2rem] text-center pt-5">
            Recomendación de escritura
          </div>
        </div>
        <div className="p-2">
          <div className="font-semibold text-[1.2rem]">Sugerencias</div>
          <div className="flex justify-center py-2 relative">
            <div
              id="suggestions"
              className="bg-white w-[100%] h-[26vh] p-2 rounded-lg overflow-y-auto"
            >
              {loadingStatus ? (
                <div className="pt-2">
                  <BouncingDotsLoader />
                </div>
              ) : (
                suggestion
              )}
            </div>
          </div>
        </div>
        <div className="p-2">
          <h2 className="font-semibold text-[1.2rem]">Contenido mejorado</h2>
          <div className="flex justify-center py-2 relative">
            <div
              id="improved-content"
              className="bg-white w-[100%] h-[26vh] p-2 rounded-lg overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: improvedText }}
            ></div>
            <img
              src="https://cdn-icons-png.freepik.com/256/3472/3472620.png"
              className="w-8 h-8 absolute right-1 bottom-3 cursor-pointer"
              onClick={improveCheck} title="Aplicar cambios"
            ></img>
          </div>
        </div>

      </div>
    </>
  );
};

export default Suggestion;
