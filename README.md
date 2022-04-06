## Multi-threading in the browser with promise API

1. create a worker script that imports all the computationally intensive functions you want to run in their own threads (see _thread.js_).
2. setup worker to listen for payloads with function name, function args, and uuid. With such a payload, the worker can invoke the function (b/c it is already in scope from step 1) with the passed arguments. It then creates a broadcast channel with the uuid and sends the result of the computation.
3. in the main event-loop thread we create a promise that sends function name, args, and uuid to a worker and resolves when a channel identified by the uuid gets a message (see _spawn.js_).

Now all we need to do is initialize a thread pool and call our spawn function (see _benchmark.js_).s

## Run Benchmark

- start local server
    e.g. `python3 -m http.server`
- go to `http://localhost:8000/`  (or whichever port you set)
- open dev console
- see console log


```
STARTING WITHOUT WORKERS
FINISHED AFTER 5.2 s

STARTING WITH WORKERS

GET http://localhost:8000/thread.js
    [HTTP/1.0 200 OK 2ms]
GET http://localhost:8000/thread.js
    [HTTP/1.0 200 OK 2ms]
GET http://localhost:8000/thread.js
    [HTTP/1.0 200 OK 2ms]
GET http://localhost:8000/thread.js
    [HTTP/1.0 200 OK 2ms]
GET http://localhost:8000/thread.js
    [HTTP/1.0 200 OK 2ms]
GET http://localhost:8000/thread.js
    [HTTP/1.0 200 OK 2ms]

FINISHED AFTER 2.028 s
```

## Notes
- [web worker docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [broadcast channel docs](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
