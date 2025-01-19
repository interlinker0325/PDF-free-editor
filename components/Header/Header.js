'use-client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Logo from "../Logo/Logo";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Shadcn IU
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

// Components Local
import AvartarMenu from '../AvatarMenu/AvatarMenu'

// Styles
import styles from './styles'

export default function Header({ items, isSaved, setIsSaved, user }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [tempItem, setTempItem] = useState(null);

    // Event handler for navigation item clicks
    const handleClick = (item) => {
        setTempItem(item);
        if (!isSaved) {
            setOpen(true);
        }
    };

    useEffect(() => {
        if (tempItem && isSaved) {
            handleNavigate();
        }
    }, [tempItem, isSaved])

    const handleYes = () => {
        setOpen(false);
        setIsSaved(true);
    }

    // Event handler to close the dialog
    const handleClose = () => {
        setOpen(false);
        setTempItem(null);
    };

    // Event handler to proceed with navigation or action
    const handleNavigate = () => {
        setOpen(false);
        if (tempItem.onClick) {
            tempItem.onClick();
        }
        else {
            router.push(tempItem.action)
        }

    };

    return (
        <>
            <nav className={styles.contHeader}>
                {items?.length > 0 && <DrawerMobile {...{items,handleClick,user}} />}
                <div className={styles.contLogo}>
                    <Logo />
                </div>
                {items?.length > 0 && <AvartarMenu {...{items,handleClick,user}} />}
            </nav>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Si dejas el Creador de publicaciones, perderás la información no guardada. ¿Deseas continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleYes} color='error'>Si</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

/**
 * Mobile Drawer
 */
const DrawerMobile = ({ items, handleClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };
  
    const handleButtonClick = (item) => {
      handleClick(item);
      setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className={styles.contSheet}  onClick={toggleDrawer}>
                <svg width="30" height="30" viewBox="0 0 15 15" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="white"></path></svg>
            </SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader>
                <SheetTitle>Herramientas</SheetTitle>
                <SheetDescription className={styles.contSheetDescription}>
                    {
                        items.map((item, index) => {
                            if (item?.isAction) {
                                return (
                                    <Button key={index} onClick={() => handleButtonClick(item)} className={styles.contBtn} variant="outline">
                                        {item.name}
                                    </Button>
                                )
                            }
                        })
                    }
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}