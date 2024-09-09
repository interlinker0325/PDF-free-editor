import { Tooltip } from "@mui/material";
import TopBar from "../TopBar/TopBar";
import { useEffect, useState } from "react";

export default function PostTopBar({
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
  const [time, setTime] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setTime(false)
    }, 3000);
  }, [time])

  useEffect(() => {
    if (allPass) setTime(true);
  }, [allPass])

  useEffect(() => {
    let W = window.innerWidth;
    let H = window.innerHeight;
    const canvas = document.getElementById("selebration");
    if (!canvas) {
      console.error("Canvas element with ID 'celebration' not found.");
      return;
    }
    const context = canvas.getContext("2d");
    const maxConfettis = 150;
    const particles = [];

    const possibleColors = [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "Pink",
      "SlateBlue",
      "LightBlue",
      "Gold",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson"
    ];

    function randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }
    function confettiParticle() {
      this.x = Math.random() * W; // x
      this.y = Math.random() * H - H; // y
      this.r = randomFromTo(11, 33); // radius
      this.d = Math.random() * maxConfettis + 11;
      this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
      this.tilt = Math.floor(Math.random() * 33) - 11;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;

      this.draw = function () {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
      };
    }
    function Draw() {
      const results = [];

      // Magical recursive functional love
      requestAnimationFrame(Draw);

      context.clearRect(0, 0, W, window.innerHeight);

      for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
      }

      let particle = {};
      let remainingFlakes = 0;
      for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }

      return results;
    }

    window.addEventListener(
      "resize",
      function () {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      },
      false
    );

    for (var i = 0; i < maxConfettis; i++) {
      particles.push(new confettiParticle());
    }

    canvas.width = W;
    canvas.height = H;
    Draw();
  });

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
              title={allPass ? 'Tu documento ahora cumple con todos los requerimientos, puedes enviarlo a publicar cuando gustes' : 'Consulte el panel de cumplimiento para cumplir con todos los requisitos de publicación.'}
              arrow>
              {allPass ? (
                <div className="sprinkle-container">
                  <img width="30" height="auto" className="thumb-up"
                    src="https://img.icons8.com/ios-filled/50/40C057/good-quality--v1.png"
                    alt="good-quality--v1" />
                  <div className="sprinkles">
                    {/* Creating multiple sprinkles */}
                    {Array.from({ length: 15 }).map((_, index) => (
                      <div key={index} className={`sprinkle sprinkle-${index + 1}`} />
                    ))}
                  </div>
                  {time && <div >
                    <canvas id="selebration" className=' absolute z-30 top-0 -translate-x-[50%]'></canvas>
                  </div>}
                </div>
              ) : (
                <img src='/warning.png' className="w-8"></img>
              )}
            </Tooltip>
          </div>
          <a
            className={`text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-3 text-2xl`}
            onClick={handleSave}
            children="Guardar"
          />
          {allPass && (<a
            className={`text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-3 text-2xl`}
            onClick={handlePublication}
            children="Publicar"
          />)}
        </div>
      </div>
    </TopBar >
  )
}
