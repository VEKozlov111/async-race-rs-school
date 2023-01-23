import { IStorage } from "../../types/types";

export const storage: IStorage = {
  garagePage: constants.defaultGaragePage,
  winnersPage: constants.defaultWinnersPage,
  cars: [],
  winners: [],
  carsCount: 0,
  winnersCount: 0,
  view: "",
  sort: "time",
  sortOrder: "asc",
};