import {
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../config";
import useCrud from "../../hooks/useCrud";

interface Category {
	id: number;
	name: string;
	description: string;
	icon: string;
}

const ExploreCategories = () => {
	const theme = useTheme();
	const { dataCRUD, error, isLoading, fetchData } = useCrud<Category>(
		[],
		"/categories/"
	);

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			<Box
				sx={{
					height: "50px",
					display: "flex",
					alignItems: "center",
					px: 2,
					borderBottom: `1px solid ${theme.palette.divider}`,
					position: "sticky",
					top: 0,
					backgroundColor: theme.palette.background.default,
				}}
			>
				Explore
			</Box>
			<List sx={{ py: 0 }}>
				{dataCRUD.map((item) => (
					<ListItem
						key={item.id}
						disablePadding
						sx={{ display: "block" }}
						dense={true}
					>
						<Link
							to={`/explore/${item.name}`}
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItemButton sx={{ minHeight: 48 }}>
								<ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
									<ListItemAvatar sx={{ minWidth: "0px" }}>
										<img
											alt="server icon"
											src={`${MEDIA_URL}${item.icon}`}
											style={{
												width: "25px",
												height: "25px",
												display: "block",
												margin: "auto",
											}}
										></img>
									</ListItemAvatar>
								</ListItemIcon>
								<ListItemText
									primary={
										<Typography variant="body1" textAlign="start" paddingLeft={1}>
											{item.name}
										</Typography>
									}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				))}
			</List>
		</>
	);
};

export default ExploreCategories;
