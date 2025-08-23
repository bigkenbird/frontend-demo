import { vBindClick } from '../directive/v-bind-click.directive';
import { vBindCreate } from '../directive/v-bind-create.directive';
import { vInjectHtml } from '../directive/v-inject-html.directive';
export function defineGlobalDirective($app) {
    $app.directive('bind-create', vBindCreate);
    $app.directive('bind-click', vBindClick);
    $app.directive('inject-html', vInjectHtml);
}
