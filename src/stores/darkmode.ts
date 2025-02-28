export const darkmode = () => ({
  darkmode: !window.localStorage.theme
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : window.localStorage.theme === 'dark',

  setDarkmode(value: boolean) {
    this.darkmode = value
    window.localStorage.setItem('theme', this.darkmode ? 'dark' : 'light')
  },
})
