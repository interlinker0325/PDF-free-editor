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

  const basic = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const randomDirection = () => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 }
    });
  };

  const makeItRain = () => {
    const button = document.getElementById("makeItRain");
    button.disabled = true;
    const end = Date.now() + (2 * 1000);
    const colors = ['#bb0000', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        button.disabled = false;
      }
    };
    frame();
  };

  const startAnimation = () => {
    // First animation - 2 seconds
    const firstEndTime = Date.now() + (2 * 1000);
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

    // Second animation after 2 second delay
    setTimeout(() => {
      const secondEndTime = Date.now() + (2 * 1000);
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
    }, 2000); // 2s (first animation) + 2s (gap) = 4s delay
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
          >
            children="Formulario"
          </a>
          <a
            className={`${showPreview ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-16 text-2xl`}
            onClick={() => {
              setShowPreview(true);
              setFormView(false);
              setEditView(false);
              setComplianceView(false);
            }}
          >
            children="Vista previa"
          </a>
          <a
            className={`${editView ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-8 text-2xl`}
            onClick={() => {
              setEditView(true);
              setShowPreview(false);
              setFormView(false);
              setComplianceView(false);
            }}
          >
            children="Editor"
          </a>
          <a
            className={`${complianceView ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-8 text-2xl`}
            onClick={() => {
              setComplianceView(true);
              setEditView(false);
              setShowPreview(false);
              setFormView(false);
            }}
          >
            children="Cumplimiento"
          </a>
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
                <>
                  {time && (
                    <div>
                      <canvas id="celebration" className="absolute z-30 top-0 -translate-x-[50%]"></canvas>
                    </div>
                  )}
                </>
              ) : (
                <img src="/warning.png" className="w-8" />
              )}
            </Tooltip>
          </div>
          <a
            className={`text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-3 text-2xl`}
            onClick={handleSave}
            children="Guardar"
          />
          {!isAdmin && allPass && (<a
            className={`text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-3 text-2xl`}
            onClick={handlePublication}
            children="Publicar"
          />)}
        </div>
      </div>
    </TopBar>
  );
}
