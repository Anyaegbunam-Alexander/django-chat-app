import { Box, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import DrawerToggle from "../../components/PrimaryDrawer/DrawerToggle";

const PrimaryDrawer = () => {
    const theme = useTheme();
    const below600 = useMediaQuery("(max-width: 599px)");
    const [open, setOpen] = useState(!below600);

    useEffect(() => {
        setOpen(!below600);
    }, [below600]);


    const toggleDrawerOpen = () => {
        setOpen(true);
    };

    const toggleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer open={open} variant={below600 ? "temporary" : "permanent"} PaperProps={{
                sx: {
                    mt: `${theme.PrimaryAppBar.height}px`,
                    height: `calc(100vh - ${theme.PrimaryAppBar.height}px)`,
                    width: theme.primaryDrawer.width,
                }
            }}>
                <Box>
                    <Box sx={{ position: "absolute", top: 0, right: 0, p: 0, width: open ? "auto" : "100%"}}>
                        <DrawerToggle />
                        {[...Array(50)].map((_, i) => (
                            <Typography key={i}>
                                {i + 1}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default PrimaryDrawer;
