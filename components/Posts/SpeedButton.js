import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function SpeedButton({ handleSave }) {
  return (
    <div className="fixed z-[9999] bottom-6 right-6" onClick={handleSave}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center shadow-lg transition-transform hover:bg-primary/80"
            >
              <PlusIcon className="h-8 w-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="z-[999]">Guardar Publicacion</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

function PlusIcon(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        version="1.1"
        id="Capa_1"
        width="24"
        height="24"
        viewBox="0 0 407.096 407.096"
        xmlSpace="preserve"
        {...props}
      >
        <g>
          <g>
            <path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z"/>
            <path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z"/>
          </g>
        </g>
      </svg>
    );
}