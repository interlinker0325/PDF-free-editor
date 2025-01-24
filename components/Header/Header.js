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
                <div className={styles.contLogo} onClick={() => router.push('/')}>
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
            <SheetTrigger className={styles.contSheet} onClick={toggleDrawer}>
                <img src="/icons/hamburger.svg" alt="hamburger"/>
            </SheetTrigger>
            <SheetContent className="z-[999]" side={'left'}>
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