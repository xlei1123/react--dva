

export default {
  getProduction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(100)
      }, 300)
    })
  }
}