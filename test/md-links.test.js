// import { options } from './md-links'
const options = require('./md-links')

test('Debería devolver verdadero para validar el link', () => {
  expect(options.validate(1)).toBeTruthy()
})
