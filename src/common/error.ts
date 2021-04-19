export enum DriverError {
    WebDriverError = 'unknown error',
    ElementClickInterceptedError = 'element click intercepted',
    ElementNotInteractableError = 'element not interactable',
    ElementNotSelectableError = 'element not selectable',
    InsecureCertificateError = 'insecure certificate',
    InvalidArgumentError = 'invalid argument',
    InvalidCookieDomainError = 'invalid cookie domain',
    InvalidCoordinatesError = 'invalid coordinates',
    InvalidElementStateError = 'invalid element state',
    InvalidSelectorError = 'invalid selector',
    NoSuchSessionError = 'invalid session id',
    JavascriptError = 'javascript error',
    MoveTargetOutOfBoundsError = 'move target out of bounds',
    NoSuchAlertError = 'no such alert',
    NoSuchCookieError = 'no such cookie',
    NoSuchElementError = 'no such element',
    NoSuchFrameError = 'no such frame',
    NoSuchWindowError = 'no such window',
    ScriptTimeoutError = 'script timeout',
    SessionNotCreatedError = 'session not created',
    StaleElementReferenceError = 'stale element reference',
    TimeoutError = 'timeout',
    UnableToSetCookieError = 'unable to set cookie',
    UnableToCaptureScreenError = 'unable to capture screen',
    UnexpectedAlertOpenError = 'unexpected alert open',
    UnknownCommandError = 'unknown command',
    UnknownMethodError = 'unknown method',
    UnsupportedOperationError = 'unsupported operation',
    
    InvalidCharacterError = 'invalid character',
    InvalidCookieName = 'invalid cookie name',
    InvalidCookieValue = 'invalid cookie value',
    InvalidCookieConfig = 'invalid cookie configuration, SameSite=None must be Secure'
}