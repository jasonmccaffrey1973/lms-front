/** -------------------------------------------------------------------------------
 * Maps the values of an object using a callback function.
 * @template T, U
 * @param obj The object to be mapped.
 * @param callback The function to apply to each key-value pair.
 * @returns A new object with the same keys but transformed values.
 ** ------------------------------------------------------------------------------- */
const mapObject = <T, U>(obj: Record<string, T>, callback: (key: string, value: T) => U): Record<string, U> => {
  const result: Record<string, U> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = callback(key, obj[key]);
    }
  }
  return result;
};

export default mapObject;