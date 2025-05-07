import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#06908F',
		},
		secondary: {
			main: '#D0F4EA',
		},
		background: {
			paper: '#EEFBF8',
		},
	},
	typography: {
		fontFamily: 'Roboto, sans-serif',
	},
});

export default theme;
