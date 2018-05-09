const fs = require('fs')
const path = require('path')

const dist = path.resolve(__dirname, 'public/data.json')
const users = []

for (let i = 1; i <= 10000; i++) {
  const user = {
    id: i,
    name: `Vuong ${i}`,
    email: `vuong.ta+${1}@ntq-solution.com.vn`
  }

  users.push(user)
}

fs.writeFile(dist, JSON.stringify(users), 'utf8', (err) => {
  console.log(err)
})
