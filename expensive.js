function expensive(a) {
  let x = 10000000
  while (--x) {
    Math.sin(Math.sqrt(2 + Math.random()) / ((x + 1 + Math.PI)))
  }
  return x
}
