// @flow strict
import * as R from "ramda";
import { createSelector } from "reselect";

import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import type { Action } from "./actions";
import type { Loan } from "../../domain/Loan";

type MarketplaceState = {
  loans: Loan[],
  loading: boolean,
  error: ?Error
};

const initialState: MarketplaceState = {
  loans: [],
  loading: false,
  error: null
};

function reducer(state: MarketplaceState = initialState, action: Action) {
  switch (action.type) {
    case GET: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case GET_SUCCESS: {
      return {
        ...state,
        loans: action.payload,
        loading: false
      };
    }
    case GET_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
}

export default reducer;

type State = { +marketplace: MarketplaceState };

const marketplaceState = state => state.marketplace;

const getLoans: State => Loan[] = createSelector(
  marketplaceState,
  R.prop("loans")
);

export const areLoansEmpty: State => boolean = createSelector(
  getLoans,
  R.isEmpty
);

export const getAverageLoansAmount: State => number = createSelector(
  [getLoans, areLoansEmpty],
  (loans, areLoansEmpty) => {
    if (areLoansEmpty) {
      return 0;
    }

    return R.compose(
      R.flip(R.divide)(loans.length),
      R.reduce((acc, loan) => acc + loan.amount, 0)
    )(loans);
  }
);

export const isLoading: State => boolean = createSelector(
  marketplaceState,
  R.prop("loading")
);

export const getError: State => ?Error = createSelector(
  marketplaceState,
  R.prop("error")
);
