const debug = process.env.NODE_ENV !== 'production';
// 开发环境和正式环境中都会显示的静态菜单
import menus from './static_menu/menu.json'
// 只在开发环境中显示的静态菜单
import devMenus from './static_menu/menu-dev.json'
var menusList = [];
if (debug && devMenus) {
  menusList = menus.concat(devMenus);
} else {
  menusList = menus;
}

export default menusList;
