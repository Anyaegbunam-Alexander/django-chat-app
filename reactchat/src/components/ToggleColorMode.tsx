import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import { ColorModeContext } from "../contexts/DarkModeContext";
import createMuiTheme from "../theme/theme";

interface ToggleColorModeProps {
	children: React.ReactNode;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {
	const storeMode = Cookies.get("colorMode") as "light" | "dark";
	const preferredDarkMode = useMediaQuery("([prefers-color-scheme: dark])");
	const defaultMode = storeMode || (preferredDarkMode ? "dark" : "light");

	const [mode, setMode] = useState<"light" | "dark">(defaultMode);

	const toggleColorMode = React.useCallback(() => {
		setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	}, []);

	useEffect(() => {
		Cookies.set("colorMode", mode);
	}, [mode]);

	const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

	const theme = React.useMemo(() => createMuiTheme(mode || "light"), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};
export default ToggleColorMode;
