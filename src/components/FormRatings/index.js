// @flow strict
import * as React from "react";
import * as R from "ramda";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import type { Ratings, Rating } from "../../domain/Rating";

type OwnProps = {|
  onChange: (rating: Ratings) => any,
  isLoading: boolean,
  ratings: Ratings,
  rating: Rating
|};

type Props = {|
  ...OwnProps,
  classes: { [string]: string }
|};

class FormRatings extends React.PureComponent<Props> {
  render() {
    const { isLoading, classes, ratings, rating, onChange } = this.props;

    return (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="rate"
          name="rate"
          value={rating}
          className={classes.group}
          onChange={onChange}
        >
          {R.keys(ratings).map(rating => {
            return (
              <FormControlLabel
                disabled={isLoading}
                key={rating}
                value={rating}
                control={<Radio color="primary" />}
                label={`${ratings[rating]}%`}
                labelPlacement="start"
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  }
}

const styles = theme => ({
  group: {
    flexDirection: "row"
  }
});

export default withStyles(styles)(FormRatings);
