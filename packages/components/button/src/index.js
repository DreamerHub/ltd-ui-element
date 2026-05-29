import LtdButton from './button.vue'

LtdButton.install = function (app) {
  app.component(LtdButton.name, LtdButton)
}

export { LtdButton }
export default LtdButton
