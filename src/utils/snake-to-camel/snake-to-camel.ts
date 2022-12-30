/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: anyやめる&テスト書く
export const snakeToCamel = (obj: { [key: string]: any } | any[]): any => {
  if (typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  }
  if (obj === null) {
    return null;
  }
  return Object.keys(obj).reduce((acc: any, key: string) => {
    // 値がobjectの場合は再帰的にconvertを実行
    const type = Object.prototype.toString.call(obj[key]);
    if (type === "[object Object]" || type === "[object Array]") {
      acc[toCamel(key)] = snakeToCamel(obj[key]);
      return acc;
    }
    acc[toCamel(key)] = obj[key];
    return acc;
  }, {});
};

export const toCamel = (str: string) => {
  return str.replace(/_(\w)/g, (_match, capture) => {
    return capture.toUpperCase();
  });
};
