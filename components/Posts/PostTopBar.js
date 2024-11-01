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
    const rect = document.querySelector('.thumb-up').getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    const confettiConfig = {
      particleCount: 7,
      angle: randomInRange(55, 125),
      spread: randomInRange(30, 40),
      origin: { x, y },
      scalar: 0.7,     // Makes the confetti smaller
      gravity: 0.3,    // Reduces how far the confetti falls
      drift: 0.2,      // Adds some horizontal movement
      ticks: 150,      // Limits how long the particles render
      shapes: ['circle'], // Use only circular particles
      colors: ['#40C057', '#2B8A3E', '#69DB7C'], // Green colors to match the icon
    };

    confetti(confettiConfig);
    
    // Second burst after delay
    setTimeout(() => {
      confetti(confettiConfig);
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
          <div className="cursor-pointer ml-3 relative">
            <Tooltip
              title={allPass ? 'Tu documento ahora cumple...' : 'Consulte el panel...'}>
              {allPass ? (
                <div className="relative">
                  <img 
                    width="30" 
                    height="auto" 
                    className="thumb-up"
                    style={{
                      position: 'relative',
                      zIndex: 2
                    }}
                    src="https://img.icons8.com/ios-filled/50/40C057/good-quality--v1.png"
                    alt="good-quality--v1" 
                  />
                </div>
              ) : null}
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
