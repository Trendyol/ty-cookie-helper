import { readCookie, getCookiesObject, createCookie } from "../src/index";
import { lorem, random } from "faker";
import { cookieDataFactory } from "./cookieDataFactory";

const { word } = lorem;
const { number } = random;

interface ICookieData {
  name: string;
  value: string;
  days?: number;
}

describe("readCookie", () => {
  const numberOfCookies = number({ min: 1, max: 15 });
  const cookieDataArray: ICookieData[] = Array(numberOfCookies).fill(null).map(() => cookieDataFactory(true));
  for (const { name, value, days } of cookieDataArray) {
    createCookie(name, value, days);
  }

  test("should return value of cookie whose name is passed as parameter", () => {
    // Arrange
    const sampleCookie = cookieDataArray[0];

    // Act
    const value = readCookie(sampleCookie.name);

    // Assert
    expect(value).toBe(sampleCookie.value);
  })

});