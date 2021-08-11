export function loadScriptAsync(src) {
    const script = window.document.createElement('script')
    script.src = src
    script.async = true
    script.defer = true

    const promise = new Promise((resolve, reject) => {
        script.addEventListener('load', (event) => {
            resolve(event)
        }, false)

        script.addEventListener('error', (error) => reject(error))
    })
    window.document.body.appendChild(script)
    return promise
}