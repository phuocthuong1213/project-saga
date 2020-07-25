import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  color: {
    primary: '#DE2F2F',
    secondary: '#00BCD4',
    error: '#E64A19',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 4,
    background: '#7B1FA2',
    textColor: 'white',
    border: '#cccccc',
  },
});

export default theme;
