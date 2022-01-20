export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export function toggleTheme() {
  const themeCSS = document.getElementById("layout-css") as HTMLLinkElement
  const urlTokens = themeCSS.href.split("/")

  if (!isDark.value) {
    urlTokens[urlTokens.length - 2] = "lara-dark-indigo"
    toggleDark(true)
  } else {
    urlTokens[urlTokens.length - 2] = "lara-light-indigo"
    toggleDark(false)
  }
  const newURL = urlTokens.join("/")
  setLayoutCSS(themeCSS, newURL)
}

export function setLayoutCSS(themeCSS: HTMLLinkElement, newURL: string) {
  // Note: this is used to toggle theme without slight blank CSS
  // source from primeflex website implementation
  const id = themeCSS.getAttribute("id")!
  const cloneLinkElement = themeCSS.cloneNode(true) as HTMLLinkElement

  cloneLinkElement.setAttribute("href", newURL)
  cloneLinkElement.setAttribute("id", `${id}-clone`)

  themeCSS.parentNode!.insertBefore(cloneLinkElement, themeCSS.nextSibling)
  cloneLinkElement.addEventListener("load", () => {
    themeCSS.remove()
    cloneLinkElement.setAttribute("id", id)
  })
}
