import { Commands } from "../common/commands.ts";
import { Alert } from "../element/alert.ts";
import { WebElement } from "../element/webElement.ts";
import { By } from "./by.ts";
import { Condition } from "./until.ts";
import { Cookie, Entry, Timeout, WindowRect } from "../common/common.ts";
import { Capabilities } from "../common/capabilities.ts";
import { DriverError } from "../common/error.ts";

export class Driver {
  private _capabilities: Capabilities
  private _sessionId: string | null
  constructor(sessionId: string, capabilities: Capabilities) {
    this._capabilities = capabilities
    this._sessionId = sessionId
  }

  public get sessionId(): string | null {
    return this._sessionId
  }

  // public actions(options): Actions { }

  public async alert() {
    const text = await this.execute(Commands.GET_ALERT_TEXT)
    return new Alert(this, text)
  }

  public close(): Promise<void> {
    return this.execute(Commands.CLOSE)
  }

  public createSession(capabilities: Capabilities) {
    return this.execute(Commands.NEW_SESSION, {
      'desiredCapabilities': capabilities,
      'capabilities': {
        'alwaysMatch': capabilities,
      }
    })
  }

  public executeScript(script: string, ...args: string[]) {
    return this.execute(Commands.EXECUTE_SCRIPT, {
      'script': script,
      'args': args
    })
  }

  // deno-lint-ignore no-explicit-any
  public execute(command: Commands, payload = {}): Promise<any> {
    return new Promise(() => {})
  }

  public async findElement(locator: By): Promise<WebElement> {
    const id = await this.execute(Commands.FIND_ELEMENT, {
      'using': locator.using,
      'value': locator.value
    })
    return new WebElement(this, id)
  }

  public async findElements(locator: By): Promise<WebElement[]> {
    const result = []
    const elements = await this.execute(Commands.FIND_ELEMENT, {
      'using': locator.using,
      'value': locator.value
    })
    for (const id of elements) {
      result.push(new WebElement(this, id))
    }
    return result
  }

  public getAllWindowHandles(): Promise<Array<string>> {
    return this.execute(Commands.GET_WINDOW_HANDLES)
  }

  public getCurrentUrl(): Promise<string> {
    return this.execute(Commands.GET_CURRENT_URL)
  }

  public getPageSource(): Promise<string> {
    return this.execute(Commands.GET_PAGE_SOURCE)
  }

  public getTitle(): Promise<string> {
    return this.execute(Commands.GET_TITLE)
  }

  public getWindowHandle(): Promise<string> {
    return this.execute(Commands.GET_CURRENT_WINDOW_HANDLE)
  }

  public async quit(): Promise<void> {
    await this.execute(Commands.QUIT)
    this._sessionId = null
  }

  // public setFileDetector(detector): void {}

  public sleep(ms = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  public takeScreenshot(scroll = false): Promise<string> {
    return this.execute(Commands.TAKE_ELEMENT_SCREENSHOT, {
      'scroll': scroll.toString()
    })
  }

  public wait(condition: Condition, timeout = 1000, interval = 0): Promise<void> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const executeWait = async () => {
        const result = await condition(this);
        if (result) {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Exceeded max attempts'));
        } else {
          setTimeout(executeWait, interval);
        }
      };
      executeWait();
    })
  }

  public get(url: string): Promise<void> {
    return this.execute(Commands.GET, { 'url': url })
  }

  public back() {
    return this.execute(Commands.GO_BACK)
  }

  public forward() {
    return this.execute(Commands.GO_FORWARD)
  }

  public refresh() {
    return this.execute(Commands.REFRESH)
  }

  public frame(id: string): Promise<void> {
    return this.execute(Commands.SWITCH_TO_FRAME, {
      'id': id
    })
  }

  public async getRect(): Promise<WindowRect> {
    try {
      return this.execute(Commands.GET_WINDOW_RECT)
    } catch (e) {
      if (e.message === DriverError.UnknownCommandError) {
        const { width, height } = await this.execute(
          Commands.GET_WINDOW_SIZE, {
          'windowHandle': 'current'
        })
        const { x, y } = await this.execute(
          Commands.GET_WINDOW_POSITION, {
          'windowHandle': 'current'
        })
        return { x, y, width, height }
      }
      throw e
    }
  }

  public async setRect(windowRect: WindowRect): Promise<WindowRect> {
    try {
      return await this.execute(Commands.SET_WINDOW_RECT, windowRect)
    } catch (e) {
      if (e.message === DriverError.UnknownCommandError) {
        const { x, y, width, height } = windowRect
        await this.execute(Commands.SET_WINDOW_POSITION, {
          'windowHandle': 'current',
          'x': x,
          'y': y
        })
        await this.execute(Commands.SET_WINDOW_SIZE, {
          'windowHandle': 'current',
          'width': width,
          'height': height
        })
        return this.getRect()
      }
      throw e
    }
  }

  public maximize(): Promise<void> {
    return this.execute(Commands.MAXIMIZE_WINDOW, {
      'windowHandle': 'current'
    })
  }

  public minimize(): Promise<void> {
    return this.execute(Commands.MINIMIZE_WINDOW)
  }

  public fullscreen(): Promise<void> {
    return this.execute(Commands.FULLSCREEN_WINDOW)
  }

  public getLogs(type: string): Promise<Entry> {
    return this.execute(Commands.GET_LOG, {'type': type})
  }

  public getAvailableLogTypes() {
    return this.execute(Commands.GET_AVAILABLE_LOG_TYPES)
  }

  public addCookie(cookie: Cookie): Promise<void> {
    // We do not allow '=' or ';' in the Commands.
    if (/[;=]/.test(cookie.name)) {
      throw new Error(DriverError.InvalidCookieName)
    }

    // We do not allow ';' in value.
    if (/;/.test(cookie.value)) {
      throw new Error(DriverError.InvalidCookieValue)
    }

    if (typeof cookie.expiry === 'number') {
      cookie.expiry = Math.floor(cookie.expiry)
    } else if (cookie.expiry instanceof Date) {
      cookie.expiry = Math.floor(cookie.expiry.getTime() / 1000)
    }


    if (cookie.sameSite === 'None' && !cookie.secure) {
      throw new Error(DriverError.InvalidCookieConfig)
    }

    return this.execute(Commands.ADD_COOKIE, {'cookie': cookie})
  }

  public deleteAllCookies(): Promise<void> {
    return this.execute(Commands.DELETE_ALL_COOKIES)
  }

  public deleteCookie(name: string): Promise<void> {
    return this.execute(Commands.DELETE_COOKIE, {'name': name})
  }

  public getCookies(): Promise<Cookie[]> {
    return this.execute(Commands.GET_ALL_COOKIES)
  }

  public async getCookie(name: string): Promise<Cookie> {
    try {
      return await this.execute(Commands.GET_COOKIE, {'name': name})
    } catch (e) {
      if (
        !(e.message === DriverError.UnknownCommandError) &&
        !(e.message === DriverError.UnsupportedOperationError)
      ) {
        throw e
      }

      const cookies = await this.getCookies()
      for (const cookie of cookies) {
        if (cookie && cookie['name'] === name) {
          return cookie
        }
      }
      throw new Error(DriverError.NoSuchCookieError)
    }
  }

  getTimeouts(): Promise<Timeout> {
    return this.execute(Commands.GET_TIMEOUT)
  }

  public async setImplicitTimeout(duration: number): Promise<void> {
    try {
      return this.execute(Commands.SET_TIMEOUT, {'implicit': duration});
    } catch {
      return await this.setLegacyTimeout('implicit', duration);
    }
  }

  public async setPageLoadTimeout(duration: number): Promise<void> {
    try {
      return this.execute(Commands.SET_TIMEOUT, {'pageLoad': duration})
    } catch {
      return await this.setLegacyTimeout('pageLoad', duration);
    }
  }

  public async setScriptTimeout(duration: number): Promise<void> {
    try {
      return this.execute(Commands.SET_TIMEOUT, {'script': duration});
    } catch {
      return await this.setLegacyTimeout('script', duration);
    }
  }

  public setLegacyTimeout(type: string, ms: number): Promise<void> {
    return this.execute(Commands.SET_TIMEOUT, {
    'type': type,
    'ms': ms
    })
  }

  public async activeElement(): Promise<WebElement> {
    const id = await this.execute(Commands.GET_ACTIVE_ELEMENT)
    return new WebElement(this, id)
  }

  public defaultContent(): Promise<void> {
    return this.execute(Commands.SWITCH_TO_FRAME, {'id': null})
  }

  public parentFrame(): Promise<void> {
    return this.execute(Commands.SWITCH_TO_FRAME_PARENT)
  }

  public window(nameOrHandle: string): Promise<void> {
    return this.execute(Commands.SWITCH_TO_WINDOW, {
      'name': nameOrHandle, 
      'handle': nameOrHandle
    })
  }

  public async newWindow(typeHint: string): Promise<void> {
    const window = await this.execute(Commands.SWITCH_TO_NEW_WINDOW, {
      'type': typeHint
    })
    return this.window(window.handle)
  }
}

