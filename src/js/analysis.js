function analysis(data, filter) {

}
function mostClicked(data) {
  return getMaxKey(allClicked(data))
}
function allClicked(data) {
  return data
    .filter(pkg => pkg.behavior === 'click')
    .reduce((result, pkg) => {
      if (!result[pkg.target])
        result[pkg.target] = 0
      ++result[pkg.target]
      return result
    }, {})
}
function getMaxKey(obj) {
  var max = 0
  var maxKey
  Object.keys(obj).forEach(idx => {
    if (max < obj[idx]) {
      max = obj[idx]
      maxKey = idx
    }
  })
  return maxKey
}
export {
  mostClicked
}
