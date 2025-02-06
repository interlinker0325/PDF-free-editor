// React
import React from 'react'

// Shadcn IU
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const AlertMenssage = ({ type, text}) => {
    const [isVisible, setVisibled] = React.useState(true)
  
    setTimeout(() => {
      setVisibled(false)
    }, 10000);
  
    return (
      <React.Fragment>
      {
        isVisible && 
        <Alert variant={type? "" : "destructive"} className="max-md:max-w-[90%] md:max-w-[400px] p-[15px] mb-[30px]">
          <AlertDescription>
            {text}
          </AlertDescription>
        </Alert>
      }
      </React.Fragment>
    )
}

export default AlertMenssage