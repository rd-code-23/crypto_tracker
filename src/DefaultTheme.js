import { createMuiTheme }  from '@material-ui/core/styles'

//// https://coolors.co/0d1b2a-1b263b-415a77-778da9-e0e1dd
//https://coolors.co/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
const defaultTheme = createMuiTheme({
  typography: {
    allVariants: {
      color: "#adb5bd"
    },
  },
    palette: {
      primary: {
        light: "#ffea00",
        main: "#e0e1dd",
        dark: "#ffea00",
        textPrimary: 'white',
        // textSecondary: '',
      },
      background: {
         paper: '#0d1b2a'
        //paper: '#000814'
      },
      
    }
    
  })

  export default defaultTheme