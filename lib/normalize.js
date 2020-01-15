module.exports = function normalize (content) {
  Object.keys(content).forEach(contentType => {
    const entities = content[contentType]
    if (!isWpSource(entities)) {
      return
    }

    entities.forEach(entity => {
      removeCruft(entity)
      normalizeTitle(entity)
      normalizeDate(entity)
      normalizeAcf(entity)
    })
  })
  return content
}

function isWpSource (data) {
  if (!Array.isArray(data) || data.length === 0) {
    return false
  }

  const entity = data[0]
  return (
    'id' in entity &&
    'date' in entity &&
    'date_gmt' in entity &&
    'guid' in entity &&
    'modified' in entity &&
    'modified_gmt' in entity &&
    'status' in entity &&
    'type' in entity &&
    'link' in entity &&
    'template' in entity
  )
}

function normalizeDate (entity) {
  if (entity.date) {
    entity.date = new Date(entity.date)
  }
}

function removeCruft (entity) {
  delete entity._links
  delete entity.link
  delete entity.modified_gmt
  delete entity.date_gmt
  delete entity.guid
}

function normalizeTitle (entity) {
  if (typeof entity.title !== 'object') return
  entity.title = entity.title.rendered
  delete entity.title.rendered
}

function normalizeAcf (entity) {
  if ('acf' in entity) {
    Object.keys(entity.acf).forEach(acfPropertyName => {
      if (acfPropertyName === '') return
      entity[acfPropertyName] = entity.acf[acfPropertyName]
    })
    delete entity.acf
  }
}
