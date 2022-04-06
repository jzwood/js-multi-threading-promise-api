import { createThreadPool, spawn } from './spawn.js'

const NUM_RUNS = 1000
console.log("BENCHMARKING")

const nums = Array(NUM_RUNS).fill(1).map((x, i) => x + i)

// ==============================================

console.log("STARTING WITHOUT WORKERS")
const timer = stopwatch()

const vals = nums.map(expensive)
console.log("FINISHED AFTER", timer.stop, 's')

// ==============================================

console.log("STARTING WITH WORKERS")
timer.reset()

const threadPool = createThreadPool('thread.js')
Promise.all(nums.map(num => spawn(threadPool.worker, 'expensive', num)))
  .then(vals => {
    console.log("FINISHED AFTER", timer.stop, 's')
  })


// ============ STOPWATCH UTIL =================

function stopwatch() {
  let now = performance.now()
  return {
    reset() {
      now = performance.now()
    },
    get stop() {
      return (performance.now() - now) / 1000
    }
  }
}
