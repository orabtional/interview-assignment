import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { SvgIcon } from '@mui/material';
import { SearchContainer, SearchBox, Search } from './SearchBar.styles';

function SearchBar(): JSX.Element {
    return (
        <SearchContainer>
            <SearchBox>
                <SvgIcon
                    component={SearchIcon}
                    htmlColor={`rgba(144, 144, 144, 0.56)`}
                ></SvgIcon>
                <Search>{`Search`}</Search>
            </SearchBox>
        </SearchContainer>
    );
}

export default SearchBar;
