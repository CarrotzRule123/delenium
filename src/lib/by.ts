import { Selectors } from "../common/commands.ts";
import { Util } from "../util.ts";
import { Driver } from "./driver.ts";

export interface By {
  using: Selectors,
  value: string
}

export type ByFunction = (driver: Driver) => void

export class By {
  constructor(using: Selectors, value: string) {
    this.using = using
    this.value = value
  }

  public static className(name: string): By {
    const names = name
      .split(/\s+/g)
      .filter((s) => s.length > 0)
      .map((s) => Util.escapeCss(s))
    return By.css(`.${names.join('.')}`)
  }

  public static css(selector: string): By {
    return new By(Selectors.CSS_SELECTOR, selector)
  }

  public static id(id: string): By {
    return By.css(`*[id="${Util.escapeCss(id)}"]`)
  }

  public static js(script: string, ...varArgs: string[]): ByFunction {
    return (driver: Driver) => {
      return driver.executeScript(script, ...varArgs)
    }
  }

  public static linkText(text: string): By {
    return new By(Selectors.LINK_TEXT, text)
  }

  public static names(name: string): By {
    return By.css(`*[name="${Util.escapeCss(name)}"]`)
  }

  public static partialLinkText(text: string): By {
    return new By(Selectors.PARTIAL_LINK_TEXT, text)
  }

  public static tagName(name: string): By {
    return By.css(name)
  }

  public static xpath(xpath: string): By {
    return new By(Selectors.XPATH, xpath)
  }
}
