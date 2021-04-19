export enum Commands {
  GET_SERVER_STATUS = "getStatus",

  NEW_SESSION = "newSession",
  GET_SESSIONS = "getSessions",

  CLOSE = "close",
  QUIT = "quit",

  GET_CURRENT_URL = "getCurrentUrl",
  GET = "get",
  GO_BACK = "goBack",
  GO_FORWARD = "goForward",
  REFRESH = "refresh",

  ADD_COOKIE = "addCookie",
  GET_COOKIE = "getCookie",
  GET_ALL_COOKIES = "getCookies",
  DELETE_COOKIE = "deleteCookie",
  DELETE_ALL_COOKIES = "deleteAllCookies",

  GET_ACTIVE_ELEMENT = "getActiveElement",
  FIND_ELEMENT = "findElement",
  FIND_ELEMENTS = "findElements",
  FIND_ELEMENTS_RELATIVE = "findElementsRelative",
  FIND_CHILD_ELEMENT = "findChildElement",
  FIND_CHILD_ELEMENTS = "findChildElements",

  CLEAR_ELEMENT = "clearElement",
  CLICK_ELEMENT = "clickElement",
  SEND_KEYS_TO_ELEMENT = "sendKeysToElement",
  SUBMIT_ELEMENT = "submitElement",

  GET_CURRENT_WINDOW_HANDLE = "getCurrentWindowHandle",
  GET_WINDOW_HANDLES = "getWindowHandles",
  GET_WINDOW_POSITION = "getWindowPosition",
  SET_WINDOW_POSITION = "setWindowPosition",
  GET_WINDOW_SIZE = "getWindowSize",
  SET_WINDOW_SIZE = "setWindowSize",
  GET_WINDOW_RECT = "getWindowRect",
  SET_WINDOW_RECT = "setWindowRect",
  MAXIMIZE_WINDOW = "maximizeWindow",
  MINIMIZE_WINDOW = "minimizeWindow",
  FULLSCREEN_WINDOW = "fullscreenWindow",

  SWITCH_TO_WINDOW = "switchToWindow",
  SWITCH_TO_NEW_WINDOW = "newWindow",
  SWITCH_TO_FRAME = "switchToFrame",
  SWITCH_TO_FRAME_PARENT = "switchToFrameParent",
  GET_PAGE_SOURCE = "getPageSource",
  GET_TITLE = "getTitle",

  EXECUTE_SCRIPT = "executeScript",
  EXECUTE_ASYNC_SCRIPT = "executeAsyncScript",

  GET_ELEMENT_TEXT = "getElementText",
  GET_COMPUTED_ROLE = "getAriaRole",
  GET_COMPUTED_LABEL = "getAccessibleName",
  GET_ELEMENT_TAG_NAME = "getElementTagName",
  IS_ELEMENT_SELECTED = "isElementSelected",
  IS_ELEMENT_ENABLED = "isElementEnabled",
  IS_ELEMENT_DISPLAYED = "isElementDisplayed",
  GET_ELEMENT_LOCATION = "getElementLocation",
  GET_ELEMENT_LOCATION_IN_VIEW = "getElementLocationOnceScrolledIntoView",
  GET_ELEMENT_RECT = "getElementRect",
  GET_ELEMENT_SIZE = "getElementSize",
  GET_ELEMENT_ATTRIBUTE = "getElementAttribute",
  GET_ELEMENT_VALUE_OF_CSS_PROPERTY = "getElementValueOfCssProperty",
  GET_ELEMENT_PROPERTY = "getElementProperty",

  SCREENSHOT = "screenshot",
  TAKE_ELEMENT_SCREENSHOT = "takeElementScreenshot",
  SET_SCRIPT_TIMEOUT = "setScriptTimeout",

  PRINT_PAGE = "printPage",

  GET_TIMEOUT = "getTimeout",
  SET_TIMEOUT = "setTimeout",

  ACCEPT_ALERT = "acceptAlert",
  DISMISS_ALERT = "dismissAlert",
  GET_ALERT_TEXT = "getAlertText",
  SET_ALERT_TEXT = "setAlertValue",

  GET_AVAILABLE_LOG_TYPES = "getAvailableLogTypes",
  GET_LOG = "getLog",
  GET_SESSION_LOGS = "getSessionLogs",

  // Non-standard commands used by the standalone Selenium server.
  UPLOAD_FILE = "uploadFile",

  ACTIONS = "actions",
  CLEAR_ACTIONS = "clearActions",

  LEGACY_ACTION_CLICK = "legacyAction:click",
  LEGACY_ACTION_DOUBLE_CLICK = "legacyAction:doubleclick",
  LEGACY_ACTION_MOUSE_DOWN = "legacyAction:mouseDown",
  LEGACY_ACTION_MOUSE_UP = "legacyAction:mouseUp",
  LEGACY_ACTION_MOUSE_MOVE = "legacyAction:mouseMove",
  LEGACY_ACTION_SEND_KEYS = "legacyAction:sendKeys",
  LEGACY_ACTION_TOUCH_DOWN = "legacyAction:touchDown",
  LEGACY_ACTION_TOUCH_UP = "legacyAction:touchUp",
  LEGACY_ACTION_TOUCH_MOVE = "legacyAction:touchMove",
  LEGACY_ACTION_TOUCH_SCROLL = "legacyAction:touchScroll",
  LEGACY_ACTION_TOUCH_LONG_PRESS = "legacyAction:touchLongPress",
  LEGACY_ACTION_TOUCH_FLICK = "legacyAction:touchFlick",
  LEGACY_ACTION_TOUCH_SINGLE_TAP = "legacyAction:singleTap",
  LEGACY_ACTION_TOUCH_DOUBLE_TAP = "legacyAction:doubleTap",
}

export enum Selectors {
  CSS_SELECTOR = "css selector",
  LINK_TEXT = "link text",
  PARTIAL_LINK_TEXT = "partial link text",
  TAGNAME = "tag name",
  XPATH = "xpath"
}
