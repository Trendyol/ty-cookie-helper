import { ICookieData } from "./interfaces";
import { random, lorem } from "faker";

const { number, word } = random;

export const cookieDataFactory = (includeDays: boolean = false, includeDomain: boolean = false): ICookieData => {
  const data: ICookieData = {
    name: word(),
    value: word()
  }
  if (includeDays) {
    data.days = number({ min: 1, max: 9 });
  }
  if (includeDomain) {
    data.domain = `${lorem.word()}.${lorem.word()}`;
  }
  return data;
}