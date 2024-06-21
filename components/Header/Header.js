import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Logo from "../Logo/Logo";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function Header({ items, isSaved, setIsSaved }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [tempItem, setTempItem] = useState(null);

    // Event handler for navigation item clicks
    const handleClick = (item) => {
        setTempItem(item);
        if (!isSaved) {
            setOpen(true); // Open the dialog
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
            <nav className='navbar px-14 bg-gradient-to-b from-gradientt to-gradientb shadow-md flex-initial'>
                <div className='flex-initial'>
                    <Logo />
                </div>
                <div className='flex-auto justify-end sm:justify-end gap-2 font-roboto py-1'>
                    <ul className='menu menu-horizontal text-white p-0 mr-[-16px]'>
                        {items.map((item, index) => {
                            return (
                                <li key={`Header-nav-item-${index}`}>
                                    <a
                                        className={`${router.asPath === item.action ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'} font-light decoration-1 hover:bg-transparent text-2xl`}
                                        onClick={() => handleClick(item)}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
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
