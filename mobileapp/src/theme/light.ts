import { Colors, createTheme } from '@rneui/themed';

const colors: Partial<Colors> = {
  primary: '#CF0A2C',
  //secondary: '',
  background: '#FFFFFF',
  white: '#FFFFFF',
  black: '#000000',
  grey0: '#8C8C8C',
  grey1: '#A6A6A6',
}

const theme = createTheme({
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 10,
        backgroundColor: colors.primary
      }
    },
    Input: {
      inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 30,
        marginHorizontal: -10,
        backgroundColor: "white",
        height: 45
      },
      inputStyle: {
        paddingLeft: 20,
        height: 45
      },
      containerStyle: {
        height: 45,
      },
    },
    Text: {
      style: {
        fontSize: 12,
        //fontFamily: "sans-serif-condensed"
      },
      h1Style: {
        fontSize: 40
      },
      h2Style: {
        fontSize: 35,
        color: colors.primary
      },
      h3Style: {
        fontSize: 30
      },
      h4Style: {
        fontSize: 15
      }
    }
  },
});

export default theme