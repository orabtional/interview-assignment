import React from 'react';
import {Grid, SvgIcon} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
    StyledHeader,
    HeaderTitle,
    HeaderBackgroundMask,
    ButtonsContainer,
    HeaderBackgroundImg,
    SortButton,
    SettingsButton,
} from './Header.styles';

import MaskGroupImage from 'src/assets/images/header_background.png';
import Rectangle1Image from 'src/assets/images/header_mask.png';

interface HeaderProps {
    title?: string;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ title = '', className }) => {
    return (
        <StyledHeader className={className}>
            <HeaderBackgroundMask
                src={MaskGroupImage}
                loading="lazy"
                alt={'Mask group'}
            />
            <HeaderBackgroundImg
                src={Rectangle1Image}
                loading="lazy"
                alt={'Rectangle 1'}
            />

            <HeaderTitle>{title}</HeaderTitle>
            <ButtonsContainer>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <SortButton
                            size={'medium'}
                            color={'primary'}
                            disabled={false}
                            variant={'contained'}
                            startIcon={
                                <SvgIcon
                                    component={FilterListIcon}
                                    htmlColor={`primary/contrast`}
                                ></SvgIcon>
                            }
                        >
                            {'Sort'}
                        </SortButton>

                    </Grid>
                    <Grid item xs={4}>

                        <SettingsButton
                            size={'medium'}
                            color={'primary'}
                            disabled={false}
                            variant={'contained'}
                        >
                            {'...'}
                        </SettingsButton>
                    </Grid>
                </Grid>

            </ButtonsContainer>
        </StyledHeader>
    );
};

export default Header;