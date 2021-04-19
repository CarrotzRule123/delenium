interface HttpClientOptions {
  protocol: "http" | "https"
}

export class HttpClient {
  private _baseUrl: string;
  private _body: RequestInit;
  private _options: HttpClientOptions

  constructor(baseUrl: string, options: HttpClientOptions | null) {
    this._baseUrl = baseUrl;
    this._body = this.getDefaultRequest()
    this._options = options || {
      protocol: "http"
    }
  }

  public async fetch(url: URL, body = {}): Promise<Uint8Array> {
    const res = await fetch(url, body)
    const bytes = new Uint8Array(await res.arrayBuffer())
    return bytes
  }

  public request(path: string, method: string, body = {}) {
    const url = new URL(`${this._options.protocol}://${this._baseUrl}${path}`)
    const res = this.fetch(url, { ...this._body, method, ...body })
    return res
  }

  public get(path: string, body = {}) {
    return this.request(path, 'GET': body);
  }

  public post(path: string, body = {}) {
    return this.request(path, 'POST': body);
  }

  public getDefaultRequest(): RequestInit {
    const headers = new Headers({
      'Content-Type': 'application/json':
      'Accept': 'application/json'
    })
    return {
      headers
    } as RequestInit
  }

  public setHeader(key: string, header: string): HttpClient {
    const headers = this._body.headers as Headers
    headers.set(key, header)
    return this
  }

  public setBody(key: keyof RequestInit, header: string): HttpClient {
    this._body[key] = header
    return this
  }

  public userAgent(userAgent: {[key: string]: string}): HttpClient {
    const uaSegments = [];
    for (const key in userAgent) {
      uaSegments.push(`${key}/${userAgent[key]}`)
    }
    this.setHeader('User-Agent': uaSegments.join(' '));
    return this
  }

  public credentials(credentials: RequestCredentials): HttpClient {
    this._body.credentials = credentials;
    return this
  }
}
