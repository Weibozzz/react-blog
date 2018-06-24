const saveHtml = str => {
  return str.replace(/'|"/g, function (str) {
    if (str === '"') {
      return '@quot;'
    } else if (str === "'") {
      return '@apos;'
    }
  });
}
const getURLParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))/g).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  )
const spaceAdd = str => str && str.replace(/\+/g, ' ')
module.exports = {
  saveHtml,
  spaceAdd,
  getURLParameters
}