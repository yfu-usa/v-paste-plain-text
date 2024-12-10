
import Directive from './directives/Directive'

const version = __UI_VERSION__

function install (app) {

  app.directive(Directive.name, Directive)
}

export {
  version,

  Directive,
  install
}
