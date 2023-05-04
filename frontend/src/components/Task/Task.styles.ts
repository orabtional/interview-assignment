import styled from 'styled-components';
import {CommonListItem, Container} from "../Container/Container.styles";
import {IconButton} from "@mui/material";

export const TaskContainer = styled(Container)({});

export const DeleteButton = styled(IconButton)`
  position: absolute;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s;

  &:hover {
    background-color: transparent;
  }
`;
export const TaskWrapper = styled.div<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#f5f5f5" : "transparent")};
  //&:hover {
  //  background-color: #e0e0e0;
  //}

  &:hover {
    background-color: #e0e0e0;

    ${DeleteButton} { 
      opacity: 1;
    }
  }
  
  transition: background-color 0.2s;
  width: 100%;
`;

export const TasksNumber = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-left: auto;
  padding: 0 8px;
`;

export const AddNewTaskInput = styled.input`
  width: 90%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  &:focus {
    border-bottom: 2px solid #2196f3;
  }
`;


export const IconContainer: any = styled('div')({
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

export const TaskText: any = styled('div')({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `4px 0px`,
    boxSizing: `border-box`,
    flex: `1`,
    margin: `0px`,
});

export const TaskTitle = styled(CommonListItem)({
    borderRadius: `4px`,
    overflow: `hidden`,
});

export const TaskIcon: any = styled('img')({
    height: `20px`,
    width: `17.31px`,
    position: `absolute`,
    left: `1px`,
    top: `-10px`,
});
