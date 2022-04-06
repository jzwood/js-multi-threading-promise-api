export function createThreadPool(scriptName) {
  const numCPUs = navigator.hardwareConcurrency
  const workerPool = Array(numCPUs).fill(0).map(() => new Worker(scriptName))
  let workerIndex = 0

  return {
    get worker() {
      workerIndex = (workerIndex + 1) % numCPUs
      return workerPool[workerIndex]
    }
  }
}

export function spawn(thread, fxn, ...args) {
  return new Promise((res, rej) => {
    const uuid = crypto.randomUUID()
    const channel = new BroadcastChannel(uuid)
    channel.onmessage = ({data}) => {
      res(data)
      channel.close()
    }
    thread.postMessage({fxn, args, id: uuid})
  })
}
