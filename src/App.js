// @flow strict
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import FormRatings from "./components/FormRatings";
import Result from "./components/Result";

import { RATINGS } from "./domain/Rating";
import type { Ratings, Rating } from "./domain/Rating";

import * as marketplaceActions from "./services/marketplace/actions";
import * as marketplaceSelectors from "./services/marketplace/";

type Props = {|
  getLoans: typeof marketplaceActions.fetchLoans,
  areLoansEmpty: boolean,
  averageLoansAmount: number,
  isLoading: boolean,
  error: ?Error,
  classes: { [string]: string }
|};

type State = {| rating: Rating |};

class App extends React.Component<Props, State> {
  ratings: Ratings;

  constructor(props: Props) {
    super();

    this.ratings = RATINGS;
    this.state = {
      rating: null
    };
  }

  handleChangeRating = (event: SyntheticEvent<HTMLInputElement>) => {
    const { getLoans } = this.props;
    const rating: Rating = event.currentTarget.value;

    this.setState({ rating });
    getLoans(rating);
  };

  render() {
    const { isLoading, error, averageLoansAmount, classes } = this.props;
    const { rating } = this.state;

    return (
      <div className={`${classes.wrapper} ${classes.center}`}>
        <Typography className={classes.headline} variant="h1" color="inherit">
          Average amount calculator
        </Typography>

        <Typography className={classes.headline} variant="h3" color="inherit">
          Select the rating
        </Typography>

        <FormRatings
          onChange={this.handleChangeRating}
          ratings={this.ratings}
          rating={rating}
          isLoading={isLoading}
        />
        <div className={`${classes.content} ${classes.center}`}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Result
              error={error}
              averageLoansAmount={averageLoansAmount}
              rating={rating}
            />
          )}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  wrapper: {
    width: "100%",
    height: "100vh"
  },
  headline: {
    marginBottom: 20
  },
  content: {
    marginTop: 20,
    minHeight: 200
  },
  group: {
    flexDirection: "row"
  }
});

const connector = connect(
  state => ({
    areLoansEmpty: marketplaceSelectors.areLoansEmpty(state),
    averageLoansAmount: marketplaceSelectors.getAverageLoansAmount(state),
    isLoading: marketplaceSelectors.isLoading(state),
    error: marketplaceSelectors.getError(state)
  }),
  {
    getLoans: marketplaceActions.fetchLoans
  }
);

export default compose(
  connector,
  withStyles(styles)
)(App);
