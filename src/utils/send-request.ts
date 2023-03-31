export const sendRequest = async (
  url: string,
  method: string,
  token: string | null,
  body: BodyInit | undefined
) => {
  try {
    let headers = undefined;
    if (body && !token) {
      headers = { "Content-Type": "application/json;charset=utf-8" };
    }
    if (body && token) {
      headers = {
        "Content-Type": "application/json;charset=utf-8",
        "x-auth": token,
      };
    }
    if (token && !body) {
      headers = { "x-auth": token };
    }

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

    if (!response.ok) throw new Error("Ошибка сервера");
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
