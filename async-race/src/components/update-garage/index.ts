import {
  getCars,
} from "../../api/api";
import { storage } from "../storage/storage";

export async function garageUpdate(): Promise<void> {
  const carInfo = await getCars(storage.garagePage);
  storage.cars = carInfo.items;
  storage.carsCount = carInfo.count;
}