// @flow strict
import type { Rating } from "../Rating";

type InsuracneHistory = {|
  policyPeriodFrom: string,
  policyPeriodTo: string
|};

type Photo = {|
  name: string,
  url: string
|};

export type Loan = {|
  activeLoansCount: number,
  amount: number,
  annuity: number,
  annuityWithInsurance: number,
  borrowerRelatedInvestmentInfo: any,
  covered: boolean,
  currency: string,
  datePublished: string,
  deadline: string,
  fastcash: boolean,
  id: number,
  insuranceActive: boolean,
  insuranceHistory: InsuracneHistory[],
  interestRate: number,
  investmentRate: number,
  investmentsCount: number,
  mainIncomeType: string,
  multicash: true,
  myOtherInvestments: any,
  name: string,
  nickName: string,
  photos: Photo[],
  premium: number,
  published: boolean,
  purpose: string,
  questionsAllowed: boolean,
  questionsCount: number,
  rating: Rating,
  region: string,
  remainingInvestment: number,
  reservedAmount: number,
  revenueRate: number,
  story: ?string,
  termInMonths: number,
  topped: ?boolean,
  url: ?string,
  userId: number,
  zonkyPlusAmount: number
|};
