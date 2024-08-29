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
