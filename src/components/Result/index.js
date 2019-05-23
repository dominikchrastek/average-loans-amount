// @flow strict
import * as React from "react";
import type { Rating } from "../../domain/Rating";
import Typography from "@material-ui/core/Typography";
type Props = {|
  rating: Rating,
  averageLoansAmount: number,
  error: ?Error
|};

const Result = (props: Props) => {
  if (props.error) {
    return (
      <Typography variant="h3" color="inherit">
        {props.error.toString()}
      </Typography>
    );
  }
  if (props.averageLoansAmount === 0) {
    return null;
  }
  return (
    <>
      <Typography variant="h3" color="inherit">
        The average amount for {props.rating} rating loans is:
      </Typography>
      <Typography variant="h1" color="inherit">
        {props.averageLoansAmount}CZK
      </Typography>
    </>
  );
};

export default Result;
