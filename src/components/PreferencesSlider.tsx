import { Box, Slider, Typography } from "@mui/material";

interface SliderHeaderBoxProps {
    label: string;
    value: number;
    onChange: (event: Event, newValue: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
}

const PreferencesSlider: React.FC<SliderHeaderBoxProps> = ({
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
}) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '8px'
        }}
    >
        <Typography>{label}</Typography>
        <Slider
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            marks={[{ value: min, label: '😐' }, { value: max, label: '😍' }]}
            size="small"
            sx={{ mb: 1, width: "100%" }}
            aria-labelledby={`slider-${label}`}
        />
    </Box>
);

export default PreferencesSlider;