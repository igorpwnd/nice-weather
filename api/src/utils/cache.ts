/**
 * Simple implementation of local cache
 * I'm not invalidating them, just storaging
 * 
 * Not only the implementation could be better, but also the usage.
 * Trying to keep simple
 */
export class Cache {
    static data: { [key: string]: any } = {}

    static get<T>(key: string) {
        return this.data[key] as T | undefined
    }

    static set<T>(key: string, data: T) {
        return this.data[key] = data
    }

    static purge() {
        this.data = {}
    }

}