import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

type Props = {
	open: boolean;
	toggleDrawerOpen: () => void;
	toggleDrawerClose: () => void;
};

const DrawerToggle: React.FC<Props> = ({
	open,
	toggleDrawerOpen,
	toggleDrawerClose,
}) => {
	return (
		<Box
			sx={{
				height: "50px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<IconButton onClick={open ? toggleDrawerClose : toggleDrawerOpen}>
				{open ? <ChevronLeft /> : <ChevronRight />}
			</IconButton>
		</Box>
	);
};

export default DrawerToggle;
