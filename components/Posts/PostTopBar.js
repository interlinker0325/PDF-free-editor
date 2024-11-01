import { Tooltip } from "@mui/material";
import TopBar from "../TopBar/TopBar";
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import { isAdmin as isUserAdmin } from "../../utils";

export default function PostTopBar({
  user,
  allPass,
  complianceView,
  showPreview,
  editView,
  formView,
  handleSave,
  handlePublication,
  setFormView,
  setShowPreview,
  setEditView,
  statusBarState,
  setComplianceView,
}) {
  const isAdmin = isUserAdmin(user?.role?.id);
  const [time, setTime] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const startAnimation = () => {
    // First animation - 2 seconds
    const firstEndTime = Date.now() + 2000; // 2 seconds
    (function firstFrame() {
      confetti({
        particleCount: 7,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.6 }
      });
      if (Date.now() < firstEndTime) {
        requestAnimationFrame(firstFrame);
      }
    })();

    // Second animation after 2-second delay
    setTimeout(() => {
      const secondEndTime = Date.now() + 2000;
      (function secondFrame() {
        confetti({
          particleCount: 7,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 }
        });
        if (Date.now() < secondEndTime) {
          requestAnimationFrame(secondFrame);
        }
      })();
    }, 3000);
  };

  useEffect(() => {
    if (allPass) {
      startAnimation();
    }
  }, [allPass]);

  return (
    <TopBar>
      <div className="flex flex-row justify-between w-full">
        <div>
          {(statusBarState.error || statusBarState.success) && (
            <h5
              className={
                statusBarState.error
                  ? "text-error text-2xl"
                  : "text-primary text-2xl"
              }
            >
              {statusBarState.error || statusBarState.success}
            </h5>
          )}
        </div>
        <div className="flex items-center">
          <a
            className={`${formView ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-8 text-2xl`}
            onClick={() => {
              setFormView(true);
              setShowPreview(false);
              setEditView(false);
              setComplianceView(false);
            }}
            children="Formulario"
          />
          <a
            className={`${showPreview ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-16 text-2xl`}
            onClick={() => {
              setShowPreview(true);
              setFormView(false);
              setEditView(false);
              setComplianceView(false);
            }}
            children="Vista previa"
          />
          <a
            className={`${editView ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-8 text-2xl`}
            onClick={() => {
              setEditView(true);
              setShowPreview(false);
              setFormView(false);
              setComplianceView(false);
            }}
            children="Editor"
          />
          <a
            className={`${complianceView ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-8 text-2xl`}
            onClick={() => {
              setComplianceView(true);
              setEditView(false);
              setShowPreview(false);
              setFormView(false);
            }}
            children="Cumplimiento"
          />
          <div className="cursor-pointer ml-3">
            <Tooltip
              title={
                allPass
                  ? 'Tu documento ahora cumple con todos los requerimientos, puedes enviarlo a publicar cuando gustes'
                  : 'Consulte el panel de cumplimiento para cumplir con todos los requisitos de publicación.'
              }
              arrow
            >
              {allPass ? (
                <div className="sprinkle-container">
                  {/* Creating multiple sprinkles */}
                  {Array.from({ length: 15 }).map((_, index) => (
                    <div key={index} className={`sprinkle sprinkle-${index + 1}`} />
                  ))}
                </div>
              ) : (
                <img src='/warning.png' className="w-8" />
              )}
            </Tooltip>
          </div>
        </div>
      </div>
      <a
        className={`text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1 ml-3 text-2xl`}
        onClick={handleSave}
        children="Guardar"
      />
      {!isAdmin && allPass && (
        <a
          className={`text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1 ml-3 text-2xl`}
          onClick={handlePublication}
          children="Publicar"
        />
      )}
    </TopBar>
  );
}
