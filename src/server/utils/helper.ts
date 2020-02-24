/*     const rblParsed = splitRbl.map((i: any): number => {
        if (!isNaN(i) && !(i.indexOf("e") > -1)) {
          const parse = parseInt(i);
          return parse; */

export function sanitizeNumber(unit: any): number {
  if (!isNaN(unit) && !(unit.indexOf("e") > -1)) {
    const parse = parseInt(unit);
    return parse;
  } else {
    throw "This value is not a valid number";
  }
}
