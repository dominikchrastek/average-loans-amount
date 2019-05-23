// @flow strict
import type { Rating } from "../../domain/Rating";
import type { Loan } from "../../domain/Loan";

export async function get(rating: Rating): Promise<Loan[]> {
  const data = await fetch(
    `https://api.allorigins.win/raw?url=https://app.zonky.cz/api/loans/marketplace?rating__in=[${rating}]`
  );

  return data.json();
}
