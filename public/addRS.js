const decoder = new TextDecoder('utf-8')
const encoder = new TextEncoder()

const randomString = length => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randomString = ''
    while (randomString.length < length) {
        const alphabetIndex = Math.floor(Math.random() * (alphabet.length - 1))
        randomString += alphabet[alphabetIndex]
    }
    return randomString
}

const text = decoder.decode(await Deno.readFile('contacts.json'))

const contacts = JSON.parse(text)

const newData = contacts.results.map(contact => {
    contact.uid = randomString(6)
    return contact
})

Deno.writeFile('newContats.json', encoder.encode(JSON.stringify(newData)))