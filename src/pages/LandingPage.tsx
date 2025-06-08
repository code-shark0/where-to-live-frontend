import { Box, Button, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import ResultsList from "../components/ResultsList";
import theme from "../theme";
import { useCities } from "../hooks/useCities";
import Header from "../components/Header";
import { Preferences } from "../types/Preferences";

const defaultPreferences: Preferences = {
    costOfLivingIndex: 0,
    medianRent: 0,
    medianHomePrice: 0,
    medianIncome: 0,
    incomeToCostRatio: 0,
    crimeIndex: 0,
    violentCrimeIndex: 0,
    propertyCrimeRate: 0,
    walkabilityScore: 0,
    bikeabilityScore: 0,
    transitScore: 0,
    commuteTime: 0,
    trafficCongestionIndex: 0,
    averageAnnualTemperature: 0,
    airQualityIndex: 0,
    greenSpacePerCapita: 0,
    naturalDisasterRisk: 0,
    healthcareAccessScore: 0,
    educationIndex: 0,
    universityProximity: 0,
    diversityIndex: 0,
    politicalLeaning: 0,
    nightlifeIndex: 0,
    religiousInstitutionsPerCapita: 0,
    jobMarketIndex: 0,
    unemploymentRate: 0,
    startupEcosystemRank: 0,
}

const LandingPage: FC = () => {
    const [filteredData, setFilteredData] = useState<Array<any>>([]);
    const [searchValue, setSearchValue] = useState('');
    const cityData = useCities();
    const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

    useEffect(() => {
        const filteredData = cityData.filter(item => {
            return (
                item?.name?.toLowerCase().includes(searchValue?.toLowerCase())
            );
        });
        setFilteredData(filteredData);
    }, [searchValue, cityData]);

    const handleSetPreferences = (updater: (prevState: Preferences) => Preferences) => {
        setPreferences(prev => ({ ...prev, ...updater(prev) }));
    }

    const handleResetPreferences = () => {
        setPreferences(defaultPreferences);
    }

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
            <Header/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '1rem',
                width: '80vw', 
                height: '100%',
                backgroundColor: theme.palette.background.paper,
                padding: '2rem'
            }}>
                <TextField variant={"outlined"} label={'Search'} onChange={(e) => setSearchValue(e.target.value)}/>
                <Button variant="contained" onClick={handleResetPreferences} sx={{ mt: 1 }}>Reset Preferences</Button>
                <ResultsList cityData={filteredData} preferences={preferences} onSetPreferences={handleSetPreferences}/>
            </Box>
        </Box>
    )
}

export default LandingPage;