class Clipboardier {
  public copyToClipboard(text: string): void {
    const textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
}

export default new Clipboardier()
