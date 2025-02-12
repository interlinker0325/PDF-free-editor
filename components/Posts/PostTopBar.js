import { Tooltip } from "@mui/material";
import TopBar from "../TopBar/TopBar";
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import { isAdmin as isUserAdmin } from "../../utils";

// Shadcn IU
import { Button } from "@/components/ui/button"
import SpeedButton from './SpeedButton'

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
      colors: [
        '#1E90FF', // DodgerBlue
        '#6B8E23', // OliveDrab
        '#FFD700', // Gold
        '#FFC0CB', // Pink
        '#6A5ACD', // SlateBlue
        '#ADD8E6', // LightBlue
        '#FFD700', // Gold
        '#EE82EE', // Violet
        '#98FB98', // PaleGreen
        '#4682B4', // SteelBlue
        '#F4A460', // SandyBrown
        '#D2691E', // Chocolate
        '#DC143C'  // Crimson
      ],
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
    <div className="container max-md:mx-auto py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => {
                  setFormView(true);
                  setShowPreview(false);
                  setEditView(false);
                  setComplianceView(false);
              }}
              disabled={formView}
              variant="outline">Formulario</Button>
            <Button
                onClick={() => {
                  setEditView(true);
                  setShowPreview(false);
                  setFormView(false);
                  setComplianceView(false);
                }}
            disabled={editView}
            variant="outline">Editor</Button>
            <Button 
                onClick={() => {
                  setComplianceView(true);
                  setEditView(false);
                  setShowPreview(false);
                  setFormView(false);
                }}
              disabled={complianceView}
              variant="outline">Cumplimiento</Button>
          <Button
              onClick={() => {
                setShowPreview(true);
                setFormView(false);
                setEditView(false);
                setComplianceView(false);
              }}
              disabled={showPreview}
              variant="outline">Vista previa</Button>
          {
            !isAdmin && allPass && (
              <Button onClick={handlePublication}>Publicar</Button>
            )
          }
          <SpeedButton {...{handleSave}}/>
        </div>
      </div>
    </div>
  );
}
