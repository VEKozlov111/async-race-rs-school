import { ICarCreate } from "../../types/types"

export function generateCars(count: number): ICarCreate[] {
  return new Array(count).fill(0).map((el) => ({ name: generateCarName(), color: generateCarColor() }));
}

function generateCarColor(): string {
  return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
}

function generateCarName(): string {
  const model = carBrands[Math.floor(Math.random() * carBrands.length)];
  const name = carModels[Math.floor(Math.random() * carModels.length)];
  return `${model} ${name}`;
}