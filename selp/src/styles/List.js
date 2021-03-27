import styled from "@emotion/styled";


export const List = styled.ul`
padding: 0px 25px 25px 25px;
margin: 0px;  
max-width: 100%;
  display: flex;
  font-size: 25px;
  flex-direction: column;
  text-align: center;
  list-style-position: inside;
  margin-left:auto;
    margin-right: auto;
`;

export const ListItem = styled.li`
  display: block;
  padding: 3rem 5rem;
  background-color: #fff;
  text-align: center;
  color: #06D6A0;
  font-weight: bold;
  font-size: 25px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-top-width: 0;
  &:first-of-type {
    border-top-width: 1px;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
  &:last-of-type {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
}
`;

export const ListItemWithLink = styled.li`
  display: block;
  > a {
    display: block;
    background-color: #fff;
    color: #06D6A0;
    text-decoration: none;
    padding: 3rem 5rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-top-width: 0;
    margin-left:auto;
    margin-right: auto;
  
    &:hover {
      color: #fff;
      background-color: #bababa;
      border-color: #bababa;
      cursor: pointer;
    }
  }
  &:first-of-type {
    a {
      border-top-width: 1px;
      border-top-left-radius: 0rem;
      border-top-right-radius: 0rem;
    }
  }
  &:last-of-type {
    a {
      border-bottom-right-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }
  }
`;