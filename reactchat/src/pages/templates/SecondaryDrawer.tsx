import { Box, useTheme } from "@mui/material";
import React from "react";

type SecondaryDrawProps = { children: React.ReactNode };

const SecondaryDrawer = ({ children }: SecondaryDrawProps) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				minWidth: `${theme.secondaryDrawer.width}px`,
				height: `calc(100vh - ${theme.PrimaryAppBar.height}px)`,
				mt: `${theme.PrimaryAppBar.height}px`,
				borderRight: `1px solid ${theme.palette.divider}`,
				display: { xs: "none", sm: "block" },
				overflow: "auto",
			}}
		>
			{children}
		</Box>
	);
};

export default SecondaryDrawer;
