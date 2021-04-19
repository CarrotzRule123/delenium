import { DriverError } from "../common/error.ts";
import { WebElement } from "../element/webElement.ts";
import { By } from "./by.ts";
import { Driver } from "./driver.ts";

export type Condition = (driver: Driver) => Promise<boolean>

export class Until {
	public static ableToSwitchToFrame(frame: string): Condition {
		return async (driver: Driver): Promise<boolean> => {
			try {
				await driver.frame(frame)
				return true
			} catch(e) {
				if (!(e.message === DriverError.NoSuchFrameError)) {
					throw e
				}
				return false
			}
		}
	}

	public static alertIsPresent(): Condition {
		return async (driver: Driver): Promise<boolean> => {
			try {
				await driver.alert()
				return true
			} catch(e) {
				if (
					!(e.message === DriverError.NoSuchAlertError ||
						(e.message === DriverError.WebDriverError &&
							e.message === `can't convert null to object`)
					)
				) {
					throw e
				}
				return false
			}
		}
	}

	public static elementIsDisabled(element: WebElement): Condition {
		return async (): Promise<boolean> => !(await element.isEnabled())
	}
	
	public static elementIsEnabled(element: WebElement): Condition {
		return (): Promise<boolean> => element.isEnabled()
	}

	public static elementIsNotSelected(element: WebElement): Condition {
		return async (): Promise<boolean> => !(await element.isSelected())
	}
	public static elementIsNotVisible(element: WebElement): Condition {
		return async (): Promise<boolean> => !(await element.isDisplayed())
	}

	public static elementIsSelected(element: WebElement): Condition {
		return (): Promise<boolean> => element.isSelected()
	}

	public static elementIsVisible(element: WebElement): Condition {
		return (): Promise<boolean> => element.isDisplayed()
	}

	public static elementLocated(locator: By): Condition {
		return async (driver: Driver): Promise<boolean> => {
			return !!(await driver.findElement(locator))
		}
	}

	public static elementTextContains(element: WebElement, substr: string): Condition {
		return async (): Promise<boolean> => {
			const text = await element.getText()
			return text.indexOf(substr) !== -1
		}
	}

	public static elementTextIs(element: WebElement, text: string): Condition {
		return async (): Promise<boolean> => {
			return await element.getText() === text
		}
	}

	public static elementTextMatches(element: WebElement, regex: RegExp): Condition {
		return async (): Promise<boolean> => {
			return regex.test(await element.getText())
		}
	}

	public static elementsLocated(locator: By): Condition {
		return async (driver: Driver): Promise<boolean> => {
			return !!(await driver.findElements(locator))
		}
	}

	public static stalenessOf(element: WebElement): Condition {
		return async (): Promise<boolean> => {
			try {
				return !!(await element.getTagName())
			} catch (e) {
				if (e.message === DriverError.StaleElementReferenceError) {
					return true
				}
				throw e
			}
		}
	}

	public static titleContains(substr: string): Condition {
		return async (driver: Driver): Promise<boolean> => {
			const title = await driver.getTitle()
			return title.indexOf(substr) !== -1
		}
	}

	public static titleIs(title: string): Condition {
		return async (driver: Driver): Promise<boolean> => {
			return await driver.getTitle() === title
		}
	}

	public static titleMatches(regex: RegExp): Condition {
		return async (driver: Driver): Promise<boolean> => {
			return regex.test(await driver.getTitle())
		}
	}

	public static urlContains(substrUrl: string): Condition {
		return async (driver: Driver): Promise<boolean> => {
			const url = await driver.getCurrentUrl()
			return url.indexOf(substrUrl) !== -1
		}
	}

	public static urlIs(url: string): Condition {
		return async (driver: Driver): Promise<boolean> => {
			return await driver.getCurrentUrl() === url
		}
	}

	public static urlMatches(regex: RegExp): Condition {
		return async (driver: Driver): Promise<boolean> => {
			return regex.test(await driver.getCurrentUrl())
		}
	}
}