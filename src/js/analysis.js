var all = type => data => {
  return data
    .filter(pkg => pkg.behavior === type)
    .filter(pkg => !!pkg.target)
    .reduce((result, pkg) => {
      result[pkg.target] = ++result[pkg.target] || 1
      return result
    }, {})
}

var getMaxKey = function(obj) {
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

var compose = (f, g) => x => f(g(x))
var mostClicked = compose(getMaxKey, all('click'))
var mostHover = compose(getMaxKey, all('mousemove'))
export {
  mostClicked,
  mostHover,
  all
}
