import { DriverError } from "./common/error.ts";

export class Util {
    public static escapeCss(css: string) {
        let ret = ''
        const n = css.length
        for (let i = 0; i < n; i++) {
          const c = css.charCodeAt(i)
          if (c == 0x0) {
            throw new Error(DriverError.InvalidCharacterError)
          }
      
          if (
            (c >= 0x0001 && c <= 0x001f) ||
            c == 0x007f ||
            (i == 0 && c >= 0x0030 && c <= 0x0039) ||
            (i == 1 && c >= 0x0030 && c <= 0x0039 && css.charCodeAt(0) == 0x002d)
          ) {
            ret += '\\' + c.toString(16) + ' '
            continue
          }
      
          if (i == 0 && c == 0x002d && n == 1) {
            ret += '\\' + css.charAt(i)
            continue
          }
      
          if (
            c >= 0x0080 ||
            c == 0x002d || // -
            c == 0x005f || // _
            (c >= 0x0030 && c <= 0x0039) || // [0-9]
            (c >= 0x0041 && c <= 0x005a) || // [A-Z]
            (c >= 0x0061 && c <= 0x007a)
          ) {
            // [a-z]
            ret += css.charAt(i)
            continue
          }
      
          ret += '\\' + css.charAt(i)
        }
        return ret
      }
      
}