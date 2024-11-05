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

    const defaults = {
      particleCount: 50,
      spread: 55,
      origin: { x, y },
      colors: ['#40C057', '#2B8A3E', '#69DB7C', '#A9E34B'],
      startVelocity: 30,
      gravity: 0.6,
      ticks: 300,
      shapes: ['circle'],
      scalar: 1,
      disableForReducedMotion: true
    };

    confetti({
      ...defaults,
      particleCount: 40,
      spread: 60,
    });

    const intervals = [150, 300, 450, 600, 750];
    intervals.forEach(delay => {
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: 25 + Math.floor(Math.random() * 15),
          spread: 80 + Math.floor(Math.random() * 40),
        });
      }, delay);
    });
  }

  useEffect(() => {
    if (allPass) {
      setTimeout(() => {
        const thumbUpButton = document.querySelector('.thumb-up');
        if (thumbUpButton) {
          const rect = thumbUpButton.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            startAnimation();
          }
        }
      }, 100);
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
