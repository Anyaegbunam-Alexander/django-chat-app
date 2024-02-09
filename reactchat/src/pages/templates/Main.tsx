import { Box, Typography, useTheme } from "@mui/material";

const Main = () => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				flexGrow: 1,
				mt: `${theme.PrimaryAppBar.height}px`,
				height: `calc(100vh - ${theme.PrimaryAppBar.height}px)`,
				overflow: "hidden",
			}}
		>
			{[...Array(50)].map((_, i) => (
				<Typography key={i}>{i + 1}</Typography>
			))}
		</Box>
	);
};

export default Main;
