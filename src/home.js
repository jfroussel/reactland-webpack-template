export default function () {
    let root = document.createElement('div')
    root.classList = "container"
    root.setAttribute('id', 'root')
    let message = document.createElement('h1')
    message.textContent = "welcome on reactland.com"
    root.append(message)
    document.body.append(root)
}