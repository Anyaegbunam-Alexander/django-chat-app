import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch";

const AccountButton = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			open={isMenuOpen}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			keepMounted
			onClose={handleMenuClose}
		>
			<MenuItem>
				<DarkModeSwitch />
			</MenuItem>
		</Menu>
	);
	return (
		<Box sx={{ display: { xs: "flex" } }}>
			<IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
				<AccountCircle />
			</IconButton>
			{renderMenu}
		</Box>
	);
};

export default AccountButton;
