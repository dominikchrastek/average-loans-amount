// @flow strict
import type { Dispatch } from "redux";
import * as api from "./api";

import type { Rating } from "../../domain/Rating";
import type { Loan } from "../../domain/Loan";

type Get = {|
  type: "marketplace/GET"
|};

type GetSuccess = {|
  type: "marketplace/GET_SUCCESS",
  payload: Loan[]
|};

type GetError = {|
  type: "marketplace/GET_ERROR",
  payload: Error
|};

export const GET = "marketplace/GET";
export const GET_SUCCESS = "marketplace/GET_SUCCESS";
export const GET_ERROR = "marketplace/GET_ERROR";

export type Action = Get | GetSuccess;

type GetOutput = (
  dispatch: Dispatch<GetSuccess | GetError | Get>
) => Promise<Loan[]>;

export function fetchLoans(rating: Rating): GetOutput {
  return async (dispatch: Dispatch<GetSuccess | GetError | Get>) => {
    dispatch(get());
    try {
      const data = await api.get(rating);

      dispatch(getSuccess(data));

      return data;
    } catch (error) {
      dispatch(getError(error));

      return error;
    }
  };
}

function get(): Get {
  return {
    type: GET
  };
}
function getSuccess(payload): GetSuccess {
  return {
    type: GET_SUCCESS,
    payload
  };
}

function getError(payload): GetError {
  return {
    type: GET_ERROR,
    payload
  };
}
