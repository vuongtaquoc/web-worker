let users

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60)
}

function startAnimation(data) {
  let x = 0
  let y = 0
  let reverse = false

  function executeFrame() {
    if (reverse) {
      x--
    } else {
      x++
    }

    if (x + data.squareSize > data.contextWidth) {
      reverse = true
    } else if (x === 0) {
      reverse = false
    }

    postMessage({
      command: 'animation:running',
      data: {
        x,
        y
      }
    })

    requestAnimationFrame(executeFrame)
  }

  executeFrame()
}

function getUsers() {
  return fetch('/assets/data.json')
    .then(res => res.json())
    .then(u => users = u)
}

getUsers()

this.addEventListener('message', (event) => {
  const message = event.data

  switch (message.command) {
    case 'animation:start':
      startAnimation(message.data)
      break
    case 'users:get':
      postMessage({
        command: 'users:list',
        data: users
      })
      break
  }
})
