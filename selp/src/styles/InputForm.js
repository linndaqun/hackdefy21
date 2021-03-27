import React from "react";
import styled from "@emotion/styled";
import { Input, Button } from "./Form";
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const Container = styled.div`
  display: flex;
  align-items: center;
  > button {
    margin-left: 1rem;
  }
`;

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: 20,
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    }
  }));

const InputForm = ({ inputVal, rating, onChange, onRatingChange, onChangeActive, onSubmit, buttonText }) => {
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <Container>
      <Input className={classes.text} value={inputVal} onChange={onChange} />
      <Box align="left"  component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="hover-feedback"
          value={rating}
          precision={0.5}
          onChange={ onRatingChange } 
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
      {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
      </Box>
      <Button onClick={onSubmit}>{buttonText}</Button>
    </Container>
  );
};

export default InputForm;