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
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const startAnimation = () => {
    const thumbUpButton = document.querySelector('.thumb-up');
    if (!thumbUpButton) return;

    const rect = thumbUpButton.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    const confettiConfig = {
      particleCount: 50,
      angle: randomInRange(55, 125),
      spread: randomInRange(30, 50),
      origin: { x, y },
      scalar: 0.5,
      gravity: 0.5,
      drift: 0.2,
      ticks: 200,
      shapes: ['square', 'circle'],
      colors: ['#40C057', '#2B8A3E', '#69DB7C', '#A9E34B'],
    };

    // Initial burst
    confetti(confettiConfig);

    setTimeout(() => {
      confetti({
        ...confettiConfig,
        angle: randomInRange(45, 135),
        spread: randomInRange(40, 60),
      });
    }, 100); // First additional burst
  }
  useEffect(() => {
    if (allPass) {
      const thumbUpButton = document.querySelector('.thumb-up');
      if (thumbUpButton) {
        const rect = thumbUpButton.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          startAnimation();
        }
      }
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
                      zIndex: 2,
                      cursor: 'pointer'
                    }}
                    src="https://img.icons8.com/ios-filled/50/40C057/good-quality--v1.png"
                    alt="good-quality--v1"
                  />
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
