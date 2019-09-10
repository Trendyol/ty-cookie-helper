import { deleteCookie, createCookie, readCookie } from "../src/index";
import { random } from "faker";
import { ICookieData } from "./interfaces";
import { cookieDataFactory } from "./cookieDataFactory";

const { number } = random;

describe("deleteCookie", () => {
  const numberOfCookies = number({ min: 1, max: 15 });
  const cookieDataArray: ICookieData[] = Array(numberOfCookies).fill(null).map(() => cookieDataFactory(true));
  for (const { name, value, days } of cookieDataArray) {
    createCookie(name, value, days);
  }

  test("should delete the cookie whose name is passed as parameter", () => {
    // Arrange
    const sampleCookie = cookieDataArray[0];

    // Act
    deleteCookie(sampleCookie.name);

    // Assert
    expect(readCookie(sampleCookie.name)).toBe(null);
  })

});