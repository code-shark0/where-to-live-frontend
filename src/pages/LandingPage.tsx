import { Box, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import ResultsList from "../components/ResultsList";
import theme from "../theme";
import { useCities } from "../hooks/useCities";

const LandingPage: FC = () => {
    const [filteredData, setFilteredData] = useState<Array<any>>([]);
    const [searchValue, setSearchValue] = useState('');
    const cityData = useCities();

    useEffect(() => {
        const filteredData = cityData.filter(item => {
            return (
                item?.name?.toLowerCase().includes(searchValue?.toLowerCase())
            );
        });
        setFilteredData(filteredData);
    }, [searchValue, cityData]);

    return (
        <Box
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start',
                alignItems: 'center', 
                minHeight: '100vh',
                height: '100%',
                width: '100vw',
                gap: '1rem',
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                width: '100vw', 
                height: '64px', 
                backgroundColor: theme.palette.primary.dark,
                padding: '2rem'
            }}>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '3rem',
                width: '80vw', 
                height: '100%',
                backgroundColor: theme.palette.grey[100],
                padding: '2rem'
            }}>
                <TextField variant={"outlined"} label={'Search'} onChange={(e) => setSearchValue(e.target.value)}/>
                <ResultsList data={filteredData}/>
            </Box>
        </Box>
    )
}

export default LandingPage;