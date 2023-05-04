import styled from 'styled-components';
import {Box, Divider, IconButton, SvgIcon, Typography} from "@mui/material";
import {Container} from "../Container/Container.styles";
import ListItem from "@mui/material/ListItem";

export const AddNewItemTitleInput = styled.input`
  width: 90%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  &:focus {
    border-bottom: 2px solid #2196f3;
  }
`;


export const AddNewItemContentInput = styled.input`
  width: 80%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  &:focus {
    border-bottom: 2px solid #2196f3;
  }
`;
export const CompleteWrapper: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `0px`,
});

export const CalendarText: any = styled('div')({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `16px`,
    height: `16px`,
    left: `-2px`,
    top: `30px`,
    overflow: `hidden`,
});


export const DividerHorizontal: any = styled(Divider)(({ theme }: any) => ({
    width: `100%`,
    position: `absolute`,
    left: `0px`,
    top: `74px`,
}));


export const DueDateText: any = styled('div')(({ theme }: any) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(75, 129, 247, 1)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `14px`,
    letterSpacing: `0.17000000178813934px`,
    textDecoration: `none`,
    lineHeight: `142.99999475479126%`,
    textTransform: `none`,
    alignSelf: `stretch`,
    width: `100%`,
    position: `absolute`,
    left: `24px`,
    top: `28px`,
}));

export const DetailsText: any = styled('div')(({ theme }: any) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgb(95, 92, 92)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `14px`,
    letterSpacing: `0.17000000178813934px`,
    textDecoration: `none`,
    lineHeight: `142.99999475479126%`,
    textTransform: `none`,
    alignSelf: `stretch`,
    width: `100%`,
    position: `absolute`,
    left: `114px`,
    top: `28px`,
}));


export const Icon1 = styled(SvgIcon)(({ color }: any) => ({
    color: color || `rgba(0, 0, 0, 0.56)`,
    margin: `0px`,
}));

export const Icon2: any = styled(Icon1)({
    color: `rgba(75, 129, 247, 1)`,
});


export const IconButtonStyled: any = styled(IconButton)(({ theme }: any) => ({
    margin: `0px`,
}));

export const ItemContainer = styled(Box)<{ isSelected?: boolean }>(
    ({ isSelected, theme }) => ({
        display: 'flex',
        position: 'relative',
        isolation: 'isolate',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '0px',
        boxSizing: 'border-box',
        alignSelf: 'stretch',
        margin: '0px',
        width: '100%',
        backgroundColor: isSelected ? "#f5f5f5" : 'transparent',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: "#f5f5f5",
        },
    })
);


// export const ItemContainer: any = styled('div')({
//     display: `flex`,
//     position: `relative`,
//     isolation: `isolate`,
//     flexDirection: `column`,
//     justifyContent: `flex-start`,
//     alignItems: `flex-start`,
//     padding: `0px`,
//     boxSizing: `border-box`,
//     alignSelf: `stretch`,
//     margin: `0px`,
//     width: '100%',
// });


export const List: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `8px 24px`,
    boxSizing: `border-box`,
    // width: `1184px`,
    margin: `10px 0px 0px 0px`,
    width: '100%',
});

export const ListItemContent: any = styled(ListItem)(({ theme }: any) => ({
    alignSelf: `stretch`,
    margin: `0px`,
}));


export const ItemText: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    boxSizing: `border-box`,
    flex: `1`,
    margin: `0px`,
});


export const ItemContents: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    flex: `1`,
    height: `52px`,
    margin: `0px`,
});



export const MinWidth: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `0px`,
    width: `56px`,
    margin: `0px`,
});

export const ItemDetails = styled(Container)({});

export const ItemTitle = styled(Typography)<{ isCompleted?: boolean }>(
    ({ theme, isCompleted }) => ({
        textAlign: 'left',
        whiteSpace: 'pre-wrap',
        fontSynthesis: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '16px',
        letterSpacing: '0.15000000596046448px',
        textDecoration: isCompleted ? 'line-through' : 'none',
        lineHeight: '150%',
        textTransform: 'none',
        alignSelf: 'stretch',
        width: '100%',
        position: 'absolute',
        left: '0px',
        top: '4px',
    })
);


// export const ItemTitle: any = styled('div')(({ theme }: any) => ({
//     textAlign: `left`,
//     whiteSpace: `pre-wrap`,
//     fontSynthesis: `none`,
//     color: `rgba(0, 0, 0, 0.87)`,
//     fontStyle: `normal`,
//     fontFamily: `Roboto`,
//     fontWeight: `400`,
//     fontSize: `16px`,
//     letterSpacing: `0.15000000596046448px`,
//     textDecoration: `none`,
//     lineHeight: `150%`,
//     textTransform: `none`,
//     alignSelf: `stretch`,
//     width: `1024px`,
//     position: `absolute`,
//     left: `0px`,
//     top: `4px`,
// }));


export const CompleteToggle: any = styled('img')({
    height: `20px`,
    width: `20px`,
    margin: `0px`,
});



export const CalendarImage: any = styled('img')({
    height: `13.33px`,
    width: `12px`,
    position: `absolute`,
    left: `2px`,
    top: `1px`,
});
