import { readCookie, getCookiesObject, createCookie, deleteCookie } from "../src/index";
import { lorem, random } from "faker";

const { word } = lorem;
const { number } = random;

interface ICookieData {
  name: string;
  value: string;
  days?: number;
}

const cookieDataFactory = (includeDays: boolean = false): ICookieData => {
  const data: ICookieData = {
    name: word(),
    value: word()
  }
  if (includeDays) {
    data.days = number({ min: 1, max: 9 })
  }
  return data;
}

describe("createCookie", () => {
  const mockDate = new Date();
  let dateSpy: any;

  beforeEach(() => {
    dateSpy = jest
      // @ts-ignore
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate)
  })

  afterEach(() => {
    dateSpy.mockClear();
  })

  test("should create document.cookie with name, value, path and expire date", () => {
    // Arrange
    const cookieDataArray: ICookieData[] = Array(1).fill(null).map(() => cookieDataFactory(true));
    const cookieData = cookieDataArray[0];

    // Act
    const cookieResult = createCookie(cookieData.name, cookieData.value, cookieData.days);

    // Assert
    expect(document.cookie).toBe(`${cookieData.name}=${cookieData.value}`);
    expect(cookieResult).toBe(`${cookieData.name}=${cookieData.value}; expires=${mockDate.toUTCString()}; path=/`)
  })

  test("should create document.cookie with name, value, path", () => {
    // Arrange
    const cookieDataArray: ICookieData[] = Array(1).fill(null).map(() => cookieDataFactory());
    const cookieData = cookieDataArray[0];
    const previousCookie = document.cookie;

    // Act
    const cookieResult = createCookie(cookieData.name, cookieData.value, cookieData.days);

    // Assert
    expect(document.cookie).toBe(`${previousCookie}; ${cookieData.name}=${cookieData.value}`);
    expect(cookieResult).toBe(`${cookieData.name}=${cookieData.value}; path=/`)
  })
});

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
    expect(Object.keys(cookiesObject).length).toBe(numberOfCookies);
    expect(cookiesObject).toMatchObject(mockCookieObject);
  })

});

describe("readCookie", () => {

});

describe("deleteCookie", () => {

});