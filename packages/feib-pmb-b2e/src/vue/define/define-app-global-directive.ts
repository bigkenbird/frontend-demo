import { vBindClick, vBindCreate, vInjectHtml } from '@twix/ix-lib-vue';
import { App } from 'vue';

/**
 * 定義app使用的global directive
 */
export default function (app: App) {
  // DOM元素建立時綁定事件
  app.directive('bind-create', vBindCreate);

  // 點擊綁定事件
  app.directive('bind-click', vBindClick);

  // 放入html
  app.directive('inject-html', vInjectHtml);
}
