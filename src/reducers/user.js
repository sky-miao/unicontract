export default (state = {
  // isFetching: false,
  user: {
    id: '',
    name: ''
  },
  role: {
    id: '', // 1 MIS, 2 BIZ
    title: '',
  },
  menues: [
//{name: '首页',
//  key: 'home',
//  link: '/main/welcome',
//  icon: '',
//},
  {
    name: '账户管理',
    key: 'account-center',
    icon: '',
    subMenues: [
      {
        name: '账户审核',
        key: 'account-check',
        link: '/main/account/check',
        icon: '',
      },
      {
        name: '账户维护',
        key: 'account-preserve',
        link: '/main/account/preserve',
        show:"none",
        icon: '',
      },
      {
        name: '账户状态跟踪',
        key: 'account-track',
        link: '/main/account/track',
        icon: '',
      },
    ]
  },
    {
      name: '资产管理',
      key: 'asset-center',
      icon: '',
      subMenues: [
        {
          name: '资产创建',
          key: 'asset-create',
          link: '/main/asset/create',
          icon: '',
        },
        {
          name: '资产记录查询',
          key: 'asset-record',
          link: '/main/asset/record',
          show:"none",
          icon: '',
        },
      ]
    },
  {
    name: '权限管理',
    key: 'limit-center',
    icon: '',
    subMenues: [
      {
        name: '角色管理',
        key: 'limit-role',
        link: '/main/limit/role',
        icon: '',
      },
      {
        name: '菜单资源',
        key: 'limit-menu',
        link: '/main/limit/menu',
        show:"none",
        icon: '',
      },
      {
        name: '按钮资源',
        key: 'limit-btn',
        link: '/main/limit/btn',
        icon: '',
      },
      {
        name: '数据资源',
        key: 'limit-data',
        link: '/main/limit/data',
        icon: '',
      },
    ]
  },
  {
    name: '合约管理',
    key: 'order-center',
    icon: '',
    subMenues: [
    {
      name: '文件管理',
      key: 'contract-file',
      link: '/main/order/file',
      icon: '',
    },
    {
      name: '合约产品',
      key: 'contract-product',
      link: '/main/order/product',
    	show:"none",
      icon: '',
    },
    {
      name: '执行合约',
      key: 'contract-execute',
      link: '/main/order/execute',
      icon: '',
    },
    ]
  },
  {
    name: '合约应用',
    key: 'finance-manage',
    icon: '',
    subMenues: [
    {
      name: '转账合约',
      key: 'transfer',
      link: '/main/finance/transfer',
      icon: '',
    },
    ]
  }
  ],
  authes: [],
}, action) => {
  const {
    type,
    menues,
    user,
    role,
    authes,
    ...other,
  } = action
  switch(type) {
    case 'REQUEST_USER_INFO':
     return {
      ...state,
      isFetching: true,
     }
    case 'RECEIVE_USER_INFO_SUCCESS':
      return {
        ...state,
        isFetching: false,
        user,
        menues,
        role,
      }
    case 'RECEIVE_AUTH_INFO_SUEECESS':
      return {
        ...state,
        authes,
      }
    case 'RECEIVE_USER_INFO_FAIL':
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
