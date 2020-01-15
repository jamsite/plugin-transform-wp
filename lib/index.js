const normalize = require('./normalize')
const resolveReferences = require('./resolve-references')

module.exports.onAfterLoadRes = async function onAfterLoadRes (jamsite) {
  normalize(
    resolveReferences(jamsite.dataContext.static)
  )
}
