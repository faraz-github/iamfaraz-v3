import { useState } from 'react';

import { HashLink } from "react-router-hash-link";

import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                size='large'
                color="secondary"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon fontSize='inherit' />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <HashLink smooth to="/#me">About Me</HashLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <HashLink smooth to="/#contact">Contact Me</HashLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <HashLink smooth to="/#tool">My Tools</HashLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <HashLink smooth to="/#portfolio">Portfolio</HashLink>
                </MenuItem>
            </Menu>
        </div>
    );
}