import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "Lato",
        body: "Lato"
    },
    components: {
        Button: {
            baseStyle: {
                fontFamily: "Lato",
                borderRadius: "20px",
            }
        },
        Text: {
            baseStyle: {
                fontFamily: "Lato"
            }
        },
        Tag: {
            baseStyle: {
                fontFamily: "Lato",
                borderRadius:"20px",
                backgroundColor:"rgba(12, 108, 51, .7)",
                color:"rgba(255, 255, 255, 1)"
            },
            variants: {
                solid: {
                    fontFamily: "Lato",
                    borderRadius:"20px",
                    backgroundColor:"rgba(12, 108, 51, .7)",
                    color:"rgba(255, 255, 255, 1)"
                }
            }
        }
    }
    
});

export default theme;