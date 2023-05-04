import styled from 'styled-components';

// export const SearchContainer: any = styled('div')({
//     display: `flex`,
//     position: `relative`,
//     isolation: `isolate`,
//     flexDirection: `column`,
//     justifyContent: `flex-start`,
//     alignItems: `flex-start`,
//     padding: `16px 24px`,
//     boxSizing: `border-box`,
//     alignSelf: `stretch`,
//     margin: `0px`,
// });
//
// export const SearchBox: any = styled('div')(({ theme }: any) => ({
//     backgroundColor: `rgba(0, 0, 0, 0.04)`,
//     borderRadius: `4px`,
//     display: `flex`,
//     position: `relative`,
//     isolation: `isolate`,
//     flexDirection: `row`,
//     justifyContent: `flex-start`,
//     alignItems: `flex-start`,
//     padding: `0px`,
//     boxSizing: `border-box`,
//     height: `30px`,
//     width: `194px`,
//     margin: `0px`,
// }));
//
// export const Search: any = styled('div')({
//     textAlign: `left`,
//     whiteSpace: `pre-wrap`,
//     fontSynthesis: `none`,
//     color: `rgba(144, 144, 144, 1)`,
//     fontStyle: `normal`,
//     fontFamily: `Roboto`,
//     fontWeight: `400`,
//     fontSize: `14px`,
//     letterSpacing: `0.15000000596046448px`,
//     textDecoration: `none`,
//     lineHeight: `150%`,
//     textTransform: `none`,
//     position: `absolute`,
//     left: `31px`,
//     top: `5px`,
// });


export const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 16px;
    margin-bottom: 16px;
`;

export const SearchBox = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    padding: 8px;
    border-radius: 4px;
    background-color: rgba(144, 144, 144, 0.16);
`;

export const Search = styled.div`
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(144, 144, 144, 0.56);
`;
