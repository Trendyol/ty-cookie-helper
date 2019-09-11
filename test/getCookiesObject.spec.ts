import { getCookiesObject, createCookie } from "../src/index";
import { random } from "faker";
import { ICookieData } from "./interfaces";
import { cookieDataFactory } from "./cookieDataFactory";

const { number } = random;

describe("getCookiesObject", () => {
  const numberOfCookies = number({ min: 1, max: 15 });
  const cookieDataArray: ICookieData[] = Array(numberOfCookies).fill(null).map(() => cookieDataFactory(true));
  for (const { name, value, days } of cookieDataArray) {
    createCookie(name, value, days);
  }

  test("should return object form of document.cookie", () => {
    // Arrange
    const mockCookieObject: any = {};
    for (const cookieObject of cookieDataArray) {
      mockCookieObject[cookieObject.name] = cookieObject.value;
    }

    // Act
    const cookiesObject = getCookiesObject();

    // Assert
    expect(cookiesObject).toBeDefined();
    expect(cookiesObject).toMatchObject(mockCookieObject);
  })

});