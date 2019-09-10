import { ICookieData } from "./interfaces";
import { lorem, random } from "faker";

const { word } = lorem;
const { number } = random;

export const cookieDataFactory = (includeDays: boolean = false): ICookieData => {
  const data: ICookieData = {
    name: word(),
    value: word()
  }
  if (includeDays) {
    data.days = number({ min: 1, max: 9 })
  }
  return data;
}