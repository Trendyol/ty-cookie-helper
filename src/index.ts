export function getCookiesObject(cookies: string = document.cookie): object {
  const cookiesObject: any = {};

  const decodedCookies: string = decodeURIComponent(cookies);
  decodedCookies.split("; ").forEach((cookie) => {
    const cookiePair: Array<string> = cookie.split("=");
    if (cookiePair.length > 1) {
      cookiesObject[cookiePair[0]] = cookiePair[1];
    }
  });

  return cookiesObject;
}

export function createCookie(
  name: string,
  value: string,
  days?: number,
  domain?: string,
  options?: { [key: string]: any }
): string {
  let expires = "";

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  let cookie = `${name}=${value + expires}; path=/`;
  if (domain) {
    cookie = `${cookie}; domain=${domain}`;
  }
  if (options) {
    Object.keys(options).forEach(
      (key) => (cookie += `; ${key}=${options[key]}`)
    );
  }
  document.cookie = cookie;
  return cookie;
}

export function readCookie(name: string): string {
  const cookies: any = getCookiesObject(document.cookie);
  return name in cookies ? cookies[name] : null;
}

export function deleteCookie(name: string): void {
  createCookie(name, "", -1);
}
