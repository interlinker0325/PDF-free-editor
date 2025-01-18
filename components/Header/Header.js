import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Logo from "../Logo/Logo";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

// Components Local
import AvartarMenu from '../AvatarMenu/AvatarMenu'

// Styles
import styles from './styles'

export default function Header({ items, isSaved, setIsSaved }) {
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
                <div className={styles.contLogo}>
                    <Logo />
                </div>
                {items?.length > 0 && <AvartarMenu {...{items}} />}
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
