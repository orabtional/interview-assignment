import React, {useState} from 'react';
import Header from '../Header/Header';
import SearchBar from 'src/components/SearchBar/SearchBar';
import TaskList from "../TaskList/TaskList";
import ItemList from "../ItemList/ItemList";

import {
    Drawer,
    DividerHorizontal,
    MainContainer,
    ItemDetailsContainer,
    DividerVertical,
    Main,
    Row,
} from './Container.styles';

export interface ContainerProps {
    className?: string;
}

function Container(props: ContainerProps): JSX.Element {
    const [selectedTaskList, setSelectedTaskList] = useState({ id: '', name: '', predefined: false });

    return (
        <MainContainer className={props.className}>
            <Drawer>
                <SearchBar />
                <DividerHorizontal orientation="horizontal" />
                <TaskList setSelectedTaskList={setSelectedTaskList} />
                <DividerVertical orientation="vertical" />
            </Drawer>
            <ItemDetailsContainer>
                <Main>
                    <Row>
                        <Header title={selectedTaskList.name} />
                    </Row>
                    <ItemList taskListId={selectedTaskList.id} predefined={selectedTaskList.predefined}/>
                </Main>
            </ItemDetailsContainer>
        </MainContainer>
    );
}

export default Container;
