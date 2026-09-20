/** habit-hooks-disable non-essential-comment
 * Vitest runs in the default "node" environment, which has no Web Storage API.
 * zustand's persist middleware needs `localStorage`/`sessionStorage` to exist, otherwise
 * it logs "the given storage is currently unavailable" on every write.
 */
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  // eslint-disable-next-line coding-guide/max-params-project
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

if (typeof globalThis.localStorage === "undefined") {
  globalThis.localStorage = new MemoryStorage();
}

if (typeof globalThis.sessionStorage === "undefined") {
  globalThis.sessionStorage = new MemoryStorage();
}
