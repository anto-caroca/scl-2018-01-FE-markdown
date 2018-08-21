const mdLinks = require('./md-links')

test('Debería devolver verdadero para validar el link', () => {
  expect(mdLinks.mdLinks(1)).toEqual({
    validate: true
  })
})

test('options debería ser objeto', () => {
  expect(mdLinks.mdLinks()).toEqual({
    validate: true
  })
})
