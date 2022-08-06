import { createTheme } from '@mui/material/styles';

const Colors = {
    primary: "",
    secondary: ""
}
const standardTheme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        }
    }
})

export default standardTheme

