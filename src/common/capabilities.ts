import { Browsers } from "./browsers.ts";
import { Timeout } from "./common.ts";

/**
 * Strategies for waiting for [document readiness] after a navigation
 * event.
 *
 * [document readiness]: https://html.spec.whatwg.org/#current-document-readiness
 *
 * @enum {string}
 */
export enum PageLoadStrategy {
  /**
   * Indicates WebDriver should not wait on the document readiness state after a
   * navigation event.
   */
  NONE = 'none',

  /**
   * Indicates WebDriver should wait for the document readiness state to
   * become "interactive" after navigation.
   */
  EAGER = 'eager',

  /**
   * Indicates WebDriver should wait for the document readiness state to
   * be "complete" after navigation. This is the default page loading strategy.
   */
  NORMAL = 'normal',
}

/**
 * Common platform names. These platforms are not explicitly defined by the
 * WebDriver spec, however, their use is encouraged for interoperability.
 *
 * @enum {string}
 * @see <https://w3c.github.io/webdriver/webdriver-spec.html>
 */
export enum Platform {
  LINUX = 'linux',
  MAC = 'mac',
  WINDOWS = 'windows',
}

/**
 * Describes how a proxy should be configured for a WebDriver session.
 * @record
 */
export interface Config {
	/**
	* The proxy type.
	* @type {Type}
	*/
	proxyType: Type
}

/**
 * Supported {@linkplain Config proxy configuration} types.
 *
 * @enum {string}
 */
export enum Type  {
  AUTODETECT= 'autodetect',
  DIRECT= 'direct',
  MANUAL= 'manual',
  PAC= 'pac',
  SYSTEM= 'system',
}

/**
 * The possible default actions a WebDriver session can take to respond to
 * unhandled user prompts (`window.alert()`, `window.confirm()`, and
 * `window.prompt()`).
 *
 * @enum {string}
 */
export enum UserPromptHandler {
  /** All prompts should be silently accepted. */
  ACCEPT= 'accept',
  /** All prompts should be silently dismissed. */
  DISMISS= 'dismiss',
  /**
   * All prompts should be automatically accepted, but an error should be
   * returned to the next (or currently executing) WebDriver command.
   */
  ACCEPT_AND_NOTIFY= 'accept and notify',
  /**
   * All prompts should be automatically dismissed, but an error should be
   * returned to the next (or currently executing) WebDriver command.
   */
  DISMISS_AND_NOTIFY= 'dismiss and notify',
  /** All prompts should be left unhandled. */
  IGNORE= 'ignore',
}

export interface Capabilities {
	/**
	 * Indicates whether a WebDriver session implicitly trusts otherwise untrusted
	 * and self-signed TLS certificates during navigation.
	 */
	ACCEPT_INSECURE_TLS_CERTS?: boolean,

	/**
	 * The browser name. Common browser names are defined in the 
	 * {@link ./capabilities.Browser Browser} enum.
	 */
	BROWSER_NAME?: Browsers,

	/** Identifies the browser version. */
	BROWSER_VERSION?: string,

	/**
	 * Key for the logging driver logging preferences.
	 * The browser name. Common browser names are defined in the
	 * {@link ./browsers.Browsers Browsers} enum.
	 */
	LOGGING_PREFS?: Browsers,

	/**
	 * Defines the session's
	 * {@linkplain ./capabilities.PageLoadStrategy page loading strategy}.
	 */
	PAGE_LOAD_STRATEGY?: PageLoadStrategy,

	/**
	 * Identifies the operating system of the endpoint node. Common values
	 * recognized by the most WebDriver server implementations are predefined in
	 * the {@link ./capabilities.Platform Platform} enum.
	 */
	PLATFORM_NAME?: Platform,

	/**
	 * Describes the proxy configuration to use for a new WebDriver session.
	 */
	PROXY?: Config,

	/**
	 * Describes the {@linkplain ./capabilities.Timeouts timeouts} imposed on
	 * certain session operations.
	 */
	TIMEOUTS?: Timeout,

	/**
	 * Defines how a WebDriver session should
	 * {@linkplain ./capabilities.UserPromptHandler respond} to unhandled user
	 * prompts.
	 */
	UNHANDLED_PROMPT_BEHAVIOR?: UserPromptHandler,

	/**
	 * Defines the current session’s strict file interactability.
	 * Used to upload a file when strict file interactability is on
	 */
	STRICT_FILE_INTERACTABILITY?: boolean,
}