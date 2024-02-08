import { CssBaseline } from '@mui/material';
import Box from '@mui/system/Box';
import PrimaryAppBar from './templates/PrimaryAppBar';
import PrimaryDrawer from './templates/PrimaryDrawer';

const Home = () => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <PrimaryAppBar />
                <PrimaryDrawer></PrimaryDrawer>
            </Box>
        </>
    );
};

export default Home;
