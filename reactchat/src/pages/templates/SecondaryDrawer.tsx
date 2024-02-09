import { Box, Typography, useTheme } from "@mui/material";

const SecondaryDrawer = () => {
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
			{[...Array(50)].map((_, i) => (
				<Typography key={i}>{i + 1}</Typography>
			))}
		</Box>
	);
};

export default SecondaryDrawer;
