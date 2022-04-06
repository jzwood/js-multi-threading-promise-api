importScripts('./expensive.js')

const fxns = {
  expensive
}

onmessage = ({data}) => {
  const {fxn, args, id} = data
  const result = fxns[fxn](...args)
  const channel = new BroadcastChannel(id)
  channel.postMessage(result)
}
