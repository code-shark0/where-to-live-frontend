import { Box, Slider, Typography } from "@mui/material";

interface SliderHeaderBoxProps {
    label: string;
    value: number;
    onChange: (event: Event, newValue: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
}

const SliderHeaderBox: React.FC<SliderHeaderBoxProps> = ({
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
}) => (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: 140, px: 1, gap: '1rem'}}>
        <Slider
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            marks={[{ value: min, label: 'Whatever' }, { value: max, label: 'Need it' }]}
            size="medium"
            sx={{ mb: 1, width: "100%" }}
            aria-labelledby={`slider-${label}`}
        />
        <Typography variant="subtitle1" fontWeight="bold" align="center">
        {label}
        </Typography>
    </Box>
);

export default SliderHeaderBox;