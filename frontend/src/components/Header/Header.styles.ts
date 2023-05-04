import styled from 'styled-components';
import { Button } from '@mui/material';

export const StyledHeader: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `100%`,
    height: `194px`,
    margin: `0px`,
});

export const HeaderTitle: any = styled('div')({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(255, 255, 255, 1)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `40px`,
    letterSpacing: `0.15000000596046448px`,
    textDecoration: `none`,
    lineHeight: `150%`,
    textTransform: `none`,
    position: `absolute`,
    left: `40px`,
    top: `110px`,
});

export const HeaderBackgroundMask: any = styled('img')({
    height: `194px`,
    width: `100%`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
});


export const HeaderBackgroundImg: any = styled('img')({
    height: `194px`,
    width: `100%`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
});

export const ButtonsContainer: any = styled('div')({
    display: 'flex',
    position: 'absolute',
    right: '40px',
    top: '118px',
});

export const SortButton: any = styled(Button)(({ theme }: any) => ({
    color: `rgba(255, 255, 255, 1)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `500`,
    fontSize: `14px`,
    letterSpacing: `0.4000000059604645px`,
    textDecoration: `none`,
    lineHeight: `24px`,
    textTransform: `uppercase`,
}));

export const SettingsButton: any = styled(Button)(({ theme }: any) => ({
    color: `rgba(255, 255, 255, 1)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `500`,
    fontSize: `14px`,
    letterSpacing: `0.4000000059604645px`,
    textDecoration: `none`,
    lineHeight: `24px`,
    marginRight: '136px',
    textTransform: `uppercase`,
}));