const http = require('http')
const PORT = 3002
let users = [
    {
        id: "1",
        createdAt: "2021-05-31T10:59:02.663Z",
        name: "Don Hessel",
        avatar: "https://cdn.fakercloud.com/avatars/id835559_128.jpg",
    },
    {
        id: "2",
        createdAt: "2021-06-01T02:09:32.743Z",
        name: "Rudy McLaughlin",
        avatar: "https://cdn.fakercloud.com/avatars/naitanamoreno_128.jpg",
    },
    {
        id: "3",
        createdAt: "2021-05-31T07:10:14.018Z",
        name: "Dianne Beier",
        avatar: "https://cdn.fakercloud.com/avatars/theonlyzeke_128.jpg",
    },
    {
        id: "4",
        createdAt: "2021-05-31T23:52:35.521Z",
        name: "Natasha Schaden",
        avatar: "https://cdn.fakercloud.com/avatars/uxward_128.jpg",
    },
    {
        id: "5",
        createdAt: "2021-05-31T11:55:49.052Z",
        name: "Debbie Russel MD",
        avatar: "https://cdn.fakercloud.com/avatars/malgordon_128.jpg",
    },
    {
        id: "6",
        createdAt: "2021-05-31T16:23:08.597Z",
        name: "Gloria Douglas",
        avatar: "https://cdn.fakercloud.com/avatars/marcobarbosa_128.jpg",
    },
];

const server = http.createServer((req, res) => {
    if (req.url === '/users') {
        if (req.method === 'GET') {
            res.setHeader('Content-Type', 'json/application')
            res.statusCode = 200
            res.write(JSON.stringify(users))
            res.end()
        }
        if (['POST', 'DELETE'].includes(req.method)) {
            let data = ''
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', () => {
                data = JSON.parse(data)
                if (req.method === 'POST') {

                    users.push(data)
                } else if ('DELETE') {
                    users = users.filter(user => user.id !== data.id)
                }
                // res.writeHead(200, {'Content-Type': 'json/application'})
                res.setHeader('Content-Type', 'json/application')
                res.statusCode = 200
                res.write(JSON.stringify(users))
                res.end()
            })
        }
    }
})


server.listen(PORT, () => {
    console.log('server listening on ', PORT)
})