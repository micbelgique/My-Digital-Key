export const boolOrObj = value => (typeof(value) === "object" || typeof(value) === "boolean") ? true : false;

export const boolOrStr = value => (typeof(value) === "string" || typeof(value) === "boolean") ? true : false;
