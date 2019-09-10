import { createCookie } from "../src/index";
import { cookieDataFactory } from "./cookieDataFactory";
import { ICookieData } from "./interfaces";

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