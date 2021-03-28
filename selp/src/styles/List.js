import styled from "@emotion/styled";

// export const Body = styled.body`
//   background-color: #92B9BD;
// `;


export const List = styled.ul`
  padding: 10px;
  margin: auto;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  text-align: center;
  list-style-position: inside;
  margin-left:auto;
  margin-right: auto;
`;

export const ListItem = styled.li`
  display: block;
  padding: 3rem 5rem;
  background-color: #acadbc;

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
`;