let timeout: number

export function debounce(f: any, timer = 200) {
  clearTimeout(timeout)
  timeout = setTimeout(() => { f() }, timer);
}
