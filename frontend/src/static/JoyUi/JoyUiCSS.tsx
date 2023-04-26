import { deepmerge } from '@mui/utils';
import {
    experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles';
import colors from '@mui/joy/colors';
import {
    extendTheme as extendJoyTheme,

} from '@mui/joy/styles';

const { unstable_sxConfig: muiSxConfig, ...muiTheme } = extendMuiTheme();

const { unstable_sxConfig: joySxConfig, ...joyTheme } = extendJoyTheme({
    cssVarPrefix: 'mui',
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    solidBg: '#6F00B3',
                    solidHoverBg: '#58008a',
                    solidActiveBg: '#4a0075'
                }
            }
        }
    },
    components: {
        JoyFormLabel: {
            styleOverrides: {
                root: props => ({
                    fontSize: '16px'
                })
            }
        },
        JoyButton: {
            styleOverrides: {
                root: ({ownerState}) => ({
                    backgroundColor: '#8600da',
                    '&:hover': {
                        backgroundColor: '#6a00a8'
                    },
                    ...ownerState.color === 'danger' && {
                        backgroundColor: '#8c0606',
                        '&:hover': {
                            backgroundColor: '#790808'
                        },
                    }
                }),
            }
        },

        JoyLinearProgress: {
            styleOverrides: {
                root: ({ownerState}) => ({
                    width: 'initial',
                    color: "white",
                    backgroundColor: 'rgba(255, 255, 255, 0.54)',
                })
            }
        }
    }
});

const mergedTheme = ({
    ...muiTheme,
    ...joyTheme,
    colorSchemes: deepmerge(muiTheme.colorSchemes, joyTheme.colorSchemes),
    typography: {
        ...muiTheme.typography,
        ...joyTheme.typography
    }
} as unknown) as ReturnType<typeof extendJoyTheme>;

// @ts-ignore
mergedTheme.generateCssVars = (colorScheme) => ({
    css: {
        // @ts-ignore
        ...muiTheme.generateCssVars(colorScheme).css,
        // @ts-ignore
        ...joyTheme.generateCssVars(colorScheme).css
    },
    vars: deepmerge(
        // @ts-ignore
        muiTheme.generateCssVars(colorScheme).vars,
        // @ts-ignore
        joyTheme.generateCssVars(colorScheme).vars
    )
});

mergedTheme.unstable_sxConfig = {
    ...muiSxConfig,
    ...joySxConfig
};

export function getTheme() {
    return mergedTheme
}
