const storage = new Map<string, string>()

export function createUrl(url: string): string {
  const token = generateToken()
  storage.set(token, url)
  return token
}

export function getUrl(token: string): string | undefined {
  return storage.get(token)
}

function generateToken(): string {
  return Math.random().toString(36).slice(2, 7);
}
