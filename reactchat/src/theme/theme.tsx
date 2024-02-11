import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
	interface Theme {
		PrimaryAppBar: {
			height: number;
		};

		primaryDrawer: {
			width: number;
			closed: number;
		};

		secondaryDrawer: {
			width: number;
		};
	}

	interface ThemeOptions {
		PrimaryAppBar: {
			height: number;
		};

		primaryDrawer: {
			width: number;
			closed: number;
		};

		secondaryDrawer: {
			width: number;
		};
	}
}

export const createMuiTheme = () => {
	let theme = createTheme({
		typography: {
			fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
			body1: {
				fontWeight: 500,
				letterSpacing: "-0.5px",
			},
			body2: {
				fontWeight: 500,
				letterSpacing: "-0.5px",
				fontSize: "15px"
			},
		},

		PrimaryAppBar: {
			height: 50,
		},

		primaryDrawer: {
			width: 240,
			closed: 70,
		},

		secondaryDrawer: {
			width: 240,
		},

		components: {
			MuiAppBar: {
				defaultProps: {
					color: "default",
					elevation: 0,
				},
			},
		},
	});
	theme = responsiveFontSizes(theme);
	return theme;
};

export default createMuiTheme;
