import { CssBaseline } from '@mui/material';
import Box from '@mui/system/Box';
import PrimaryAppBar from './templates/PrimaryAppBar';

const Home = () => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <PrimaryAppBar/>
            </Box>
        </>
    );
};

export default Home;
