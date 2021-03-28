import styled from "@emotion/styled";

export const Input = styled.input`
  padding: 6px;
  margin: 25px;
  margin-left: 100px !important;
  font-size: 2.4rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: block;
  width: 70%;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
`;

export const Button = styled.button`
padding: 0px 10px !important;
margin: 25px !important; 
border-radius: 0.3rem !important;
color: #fff;
background-color: #EF476F;
border-color: #EF476F;
display: inline-block;
text-align: center;
vertical-align: middle;
border: 1px solid transparent;
padding: 0.5rem 1rem;
font-size: 2rem;
line-height: 1.5;
height: calc(1.5em + 1rem + 8px);
border-radius: 0.25rem;
user-select: none;
&:hover {
  cursor: pointer;
  background-color: #FF6F97;
  border-color: #FF6F97;
}
&:active {
  background-color: #FF6F97;
  border-color: #FF6F97;
}
margin-right: auto;
`;
