import styled from 'styled-components';
import {Divider} from '@mui/material';

export const DividerHorizontal: any = styled(Divider)(({ theme }: any) => ({
    width: `100%`,
    position: `absolute`,
    left: `0px`,
    top: `64px`,
}));

// export const LeftContent: any = styled('div')({
//     display: `flex`,
//     position: `relative`,
//     isolation: `isolate`,
//     flexDirection: `column`,
//     justifyContent: `flex-start`,
//     alignItems: `flex-start`,
//     padding: `0px`,
//     boxSizing: `border-box`,
//     margin: `0px`,
// });

export const Container = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    padding: `8px 16px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
    overflow: `hidden`,
});

export const MainContainer = styled(Container)({
    backgroundColor: `rgba(255, 255, 255, 1)`,
});

export const ItemDetailsContainer = styled(Container)({
    flexDirection: `column`,
    alignItems: `flex-start`,
    padding: `0px`,
    flex: `1`,
});


export const CommonListItem = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
});


export const Drawer: any = styled('div')(({ theme }: any) => ({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `256px`,
    height: `768px`,
    margin: `0px`,
}));



export const Vector: any = styled('img')({
    height: `20px`,
    width: `18px`,
    position: `absolute`,
    left: `1px`,
    top: `-12px`,
});

export const DividerVertical: any = styled(Divider)(({ theme }: any) => ({
    height: `768px`,
    position: `absolute`,
    left: `255px`,
    top: `0px`,
}));


export const Main: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
});

export const Row: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
});



