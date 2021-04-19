import { Commands } from "../common/commands.ts";
import { Driver } from "../lib/driver.ts";

export class Alert {
    constructor(private _driver: Driver, private _text: string) {}
  
    public get text(): string {
      return this._text
    }

    public accept(): Promise<void> {
      return this._driver.execute(Commands.ACCEPT_ALERT)
    }

    public dismiss(): Promise<void> {
      return this._driver.execute(Commands.DISMISS_ALERT)
    }

    public sendKeys(text: string): Promise<void> {
      return this._driver.execute(Commands.SET_ALERT_TEXT, {
         'text': text
      })
    }
  }