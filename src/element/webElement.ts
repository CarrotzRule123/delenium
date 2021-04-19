import { Commands } from "../common/commands.ts";
import { By } from "../lib/by.ts";
import { Driver } from "../lib/driver.ts";
import { DriverError } from "../common/error.ts";

export class WebElement {
  constructor(private _driver: Driver, private _id: string) {
  }

  public get driver(): Driver {
    return this._driver
  }

  public get id(): string {
    return this._id
  }

  private execute(command: Commands, payload = {}) {
    return this._driver.execute(command, {'id': this._id, ...payload})
  }

  public async findElement(locator: By): Promise<WebElement> {
    const id = await this.execute(Commands.FIND_CHILD_ELEMENT, {
      'using': locator.using,
      'value': locator.value
    })
    return new WebElement(this._driver, id)
  }

  public async findElements(locator: By): Promise<WebElement[]> {
    const result = []
    const elements = await this.execute(Commands.FIND_CHILD_ELEMENTS, {
      'using': locator.using,
      'value': locator.value
    })
    for (const id of elements) {
      result.push(new WebElement(this._driver, id))
    }
    return result
  }

  public click(): Promise<void> {
    return this.execute(Commands.CLICK_ELEMENT)
  }

  public sendKeys(...args: string[]): Promise<void> {
    const keys = [];
    for (const key of args) {
      keys.push(...key.split(''))
    }

    return this.execute(Commands.SEND_KEYS_TO_ELEMENT, {
        'text': keys.join(''),
        'value': keys.join('')
    })
  }

  public getTagName(): Promise<string> {
    return this.execute(Commands.GET_ELEMENT_TAG_NAME)
  }

  public getCssValue(cssStyleProperty: string): Promise<string> {
    return this.execute(Commands.GET_ELEMENT_VALUE_OF_CSS_PROPERTY, {
      'propertyName': cssStyleProperty
    })
  }

  public getAttribute(attributeName: string): Promise<string> {
    return this.execute(Commands.GET_ELEMENT_ATTRIBUTE, {
      'name': attributeName
    })
  }

  public getProperty(propertyName: string): Promise<string> {
    return this.execute(Commands.GET_ELEMENT_PROPERTY, {
      'name': propertyName
    })
  }

  public getText(): Promise<string> {
    return this.execute(Commands.GET_ELEMENT_TEXT)
  }

  public getAriaRole(): Promise<string> {
    return this.execute(Commands.GET_COMPUTED_ROLE)
  }

  public getAccessibleName() {
    return this.execute(Commands.GET_COMPUTED_LABEL)
  }

  public async getRect() {
    try {
      return await this.execute(Commands.GET_ELEMENT_RECT)
    } catch (e) {
      if (e.message == DriverError.UnknownCommandError) {
        const { width, height } = await this.execute(Commands.GET_ELEMENT_SIZE)
        const { x, y } = await this.execute(Commands.GET_ELEMENT_LOCATION)
        return { x, y, width, height }
      }
    }
  }

  public isEnabled(): Promise<boolean> {
    return this.execute(Commands.IS_ELEMENT_ENABLED)
  }

  public isSelected(): Promise<boolean> {
    return this.execute(Commands.IS_ELEMENT_SELECTED)
  }

  public submit(): Promise<void> {
    return this.execute(Commands.SUBMIT_ELEMENT)
  }

  public clear(): Promise<void> {
    return this.execute(Commands.CLEAR_ELEMENT)
  }

  public isDisplayed(): Promise<boolean> {
    return this.execute(Commands.IS_ELEMENT_DISPLAYED)
  }

  public takeScreenshot(scroll = false): Promise<string> {
    return this.execute(Commands.TAKE_ELEMENT_SCREENSHOT, {
      'scroll': scroll.toString()
    })
  }
}