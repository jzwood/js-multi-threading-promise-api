importScripts('./expensive.js')

onmessage = ({data}) => {
  const {fxn, args, id} = data
  const result = self[fxn](...args)
  const channel = new BroadcastChannel(id)
  channel.postMessage(result)
}
