/**
 * 
 * Good model: wizard-vicuna-uncensored:7b
 */

const http = require('http')
const readline = require('readline')

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

io.question('[prompt] ', input => {

    const requestData = JSON.stringify({
        model: 'cas/daredevil-8b-abliterated-dpomix.i1',
        prompt: input
    })
    
    const options = {
        hostname: 'localhost',
        port: 11434,
        path: '/api/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log(`[INFO] Generating response for ${input}...`)

    const request = http.request(options, response => {
        
        let result = ''
    
        response.on('data', chunk => {
            const parsedChunk = JSON.parse(chunk.toString())

            if (parsedChunk.error) {
                console.error('\r\n\r\n[PANIC]', parsedChunk.error)
                io.close()
                throw parsedChunk.error
            }

            result += parsedChunk.response

        })
    
        response.on('end', () => {
            console.log(`\r\n\r\n${result}`)
            io.close()
        })
    
    })
    
    request.on('error', error => {
        console.error('\r\n\r\n[PANIC]', error)
        io.close()
    })
    
    request.write(requestData)
    request.end()

})

