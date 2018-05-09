const worker = new Worker('/assets/js/worker.js')

const canvas = document.getElementById('canvas')
const btnUsers = document.getElementById('btn-users')
const container = document.getElementById('container')
const context = canvas.getContext('2d')
let userClickTime

function drawing(x, y) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  context.fillRect(x, y, 50, 50)
}

function startAnimation() {
  worker.postMessage({
    command: 'animation:start',
    data: {
      contextWidth: context.canvas.width,
      squareSize: 50
    }
  })
}

function getUser(users, count, skip, next) {
  setTimeout(() => {
    for (let i = skip; i < next; i++) {
      const user = users[i]

      render(user, count)
    }
  }, 50)
}

function lazyLoad(users, count, skip, take) {
  const next = skip + take

  if (next <= users.length) {
    getUser(users, count, skip, next)

    lazyLoad(users, count, next, take)
  } else if (next - users.length <= take) {
    getUser(users, count, skip, users.length)
  }
}

function render(user, count) {
  const content = document.createElement('div')
  content.innerHTML = `${user.id} - ${user.name} - ${user.email}`

  container.appendChild(content)

  if (user.id === 1) {
    const firstLoaded = Date.now()

    console.log(`Load first div ${firstLoaded - userClickTime} ms`)
  }

  if (user.id === count) {
    const loadedAll = Date.now()

    console.log(`Loaded all ${loadedAll - userClickTime} ms`)
  }
}

startAnimation()

worker.addEventListener('message', (event) => {
  const message = event.data

  switch (message.command) {
    case 'animation:running':
      drawing(message.data.x, message.data.y)
      break
    case 'users:list':
      lazyLoad(message.data, message.data.length, 0, 10)
      break
  }
})

btnUsers.addEventListener('click', () => {
  userClickTime = Date.now()

  worker.postMessage({
    command: 'users:get'
  })
})

window.addEventListener('load', () => {
  const pageLoaded = Date.now()
  console.log(`Page ready: ${pageLoaded - pageLoading} ms`)
})

document.addEventListener('DOMContentLoaded', () => {
  const domloaded = Date.now()
  console.log(`DOM Loaded: ${domloaded - pageLoading} ms`)
})
