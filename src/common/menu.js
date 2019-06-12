import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '我的订单', icon: 'profile', path: 'orders',
    children: [
      { name: '商品订单', path: 'goods_order' },
      { name: '充值订单', path: 'recharge_order' },
    ],
  },
  {
    name: '我的商家', icon: 'profile', path: 'store', authority: ['vendors'],
    children: [
      { name: '添加商家', path: 'add_store' },
    ],
  },
  {
    name: '我的用户', icon: 'profile', path: 'user',
    children: [
      { name: '所有用户', path: 'user_all' },
      { name: 'vip用户', path: 'user_vip' },
    ],
  },
  {
    name: '我的代理', icon: 'profile', path: 'agent',
    children: [
      { name: '代理列表', path: 'agent_list' },
      { name: '代理钱包', path: 'agent_wallet' },
    ],
  },

  {
    name: '我的商品', icon: 'profile', path: 'goods',
    children: [
      { name: '商品列表', path: 'goods_list' },
      { name: '发布商品', path: 'publish_goods' },
      { name: '商品分类', path: 'goods_class' },
    ],
  },
  {
    name: '我的收益', icon: 'profile', path: 'profit',
    children: [
      { name: '商品收益', path: 'goods_profit' },
      { name: '充值收益', path: 'recharge_profit' },
    ],
  },
  {
    name: '我的钱包', icon: 'profile', path: 'wallet',
  },
  {
    name: '个人中心', icon: 'profile', path: 'info',
  },
  {
    name: '重置密码', icon: 'profile', path: 'pwd',
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
