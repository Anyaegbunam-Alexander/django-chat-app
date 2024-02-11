import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	Link,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountButton from "../../components/PrimaryAppBar/AccountButton";

const PrimaryAppBar = () => {
	const [sideMenu, setSideMenu] = useState(false);
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

	useEffect(() => {
		if (isSmallScreen && sideMenu) {
			setSideMenu(false);
		}
	}, [isSmallScreen]);

	const toggleDrawer =
		() => (event: React.MouseEvent | React.KeyboardEvent) => {
			if (
				(event.type === "keydown" &&
					(event as React.KeyboardEvent).key === "Tab") ||
				(event as React.KeyboardEvent).key === "Shift"
			) {
				return;
			}
			let action: boolean;
			if (sideMenu) {
				action = false;
			} else {
				action = true;
			}
			setSideMenu(action);
		};
	return (
		<AppBar
			sx={{
				backgroundColor: theme.palette.background.default,
				borderBottom: `1px solid ${theme.palette.divider}`,
				zIndex: (theme) => theme.zIndex.drawer + 2,
			}}
		>
			<Toolbar
				variant="dense"
				sx={{
					height: theme.PrimaryAppBar.height,
					minHeight: theme.PrimaryAppBar.height,
				}}
			>
				<Box sx={{ display: { xs: "block", sm: "none" } }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						sx={{ mr: 2 }}
						onClick={toggleDrawer()}
					>
						<MenuIcon />
					</IconButton>
				</Box>
				<Drawer anchor="left" open={sideMenu} onClose={toggleDrawer()}>
					{[...Array(100)].map((_, i) => (
						<Typography key={i}>{i + 1}</Typography>
					))}
				</Drawer>
				<Link href="/" underline="none" color={"inherit"}>
					<Typography
						variant="h6"
						noWrap
						component={"div"}
						sx={{ display: { fontWeight: 700, letterSpacing: "-0.5px" } }}
					>
						Django Chat
					</Typography>
				</Link>
				<Box sx={{ flexGrow: 1 }}></Box>
				<AccountButton />
			</Toolbar>
		</AppBar>
	);
};

export default PrimaryAppBar;
