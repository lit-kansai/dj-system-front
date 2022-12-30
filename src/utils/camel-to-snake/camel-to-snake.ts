/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: anyやめる&テスト書く
export const camelToSnake = (obj: { [key: string]: any } | any[]): any => {
  if (typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  }
  if (obj === null) {
    return null;
  }
  return Object.keys(obj).reduce((acc: { [key: string]: any }, key: string) => {
    // 値がobjectの場合は再帰的にconvertを実行
    const type = Object.prototype.toString.call(obj[key]);
    if (type === "[object Object]" || type === "[object Array]") {
      acc[toSnake(key)] = camelToSnake(obj[key]);
      return acc;
    }
    acc[toSnake(key)] = obj[key];
    return acc;
  }, {});
};
const toSnake = (key: string) => {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
};
