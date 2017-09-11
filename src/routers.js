import React from 'react'
import {
	Route,
	IndexRoute,
	IndexRedirect,
} from 'react-router'

import App from './pages/app'
import Main from './pages/main'
import Portal from './pages/portal'
import Login from './pages/login'
import Register from './pages/register'

//const welcomePage = (location, callback) => {
//	require.ensure([], (require) => {
//		callback(null, require('./pages/welcome').default)
//	}, 'welcome-page')
//}
// 账户审核
const accountCheckPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/account-check').default)
	}, 'account-check-page')
}
// 账户维护
const accountPreservekPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/account-preserve').default)
	}, 'account-check-page')
}
// 账户状态跟踪
const accountTrackPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/account-track').default)
	}, 'account-check-page')
}
// 资产创建
const assetCreatePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/asset-create').default)
	}, 'asset-create-page')
}
// 资产记录查询
const assetRecordPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/asset-record').default)
	}, 'asset-record-page')
}
// 角色管理
const limitRolekPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/limit-role').default)
	}, 'limit-role-page')
}
// 菜单资源
const limitMenukPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/limit-menu').default)
	}, 'limit-menu-page')
}
// 按钮资源
const limitBtnkPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/limit-btn').default)
	}, 'limit-btn-page')
}
// 数据资源
const limitDatakPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/limit-data').default)
	}, 'limit-data-page')
}

// 合约产品
const contarctProductPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/contract-product').default)
	}, 'contract-product-page')
}
// 文件管理
const contarctFilePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/contract-file').default)
	}, 'contract-file-page')
}
// 执行合约
const contarctExecutePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/contract-execute').default)
	}, 'contract-execute-page')
}
// 转账合约
const transferPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/transfer').default)
	}, 'transfer-page')
}
// console.log(App, loginPage(), placeOrderPage())d

//    		<Route path="login" getComponent={LoginPage} />
//    		<Route path="register" getComponent={RegisterPage} />
//    <Route path="welcome" getComponent={welcomePage} />
//  <Route path="financebilldetail/:billId" getComponent={billDetailPage} />
//  <Route path="financesettlementdetail/:settlementId" getComponent={settlementDetailPage} />
export default(
	<Route path="/" component={App}>
		<IndexRoute component={Login}/>
		<IndexRedirect to="/portal" />
		<Route path="portal" component={ Portal } />
		<Route path="Login" component={ Login } />
		<Route path="Register" component={ Register } />

    <Route path="main" component={Main}>
      <Route path="account">
				<Route path='check' getComponent={accountCheckPage}/>
	    	<Route path='preserve' getComponent={accountPreservekPage}/>
				<Route path='track' getComponent={accountTrackPage}/>
      </Route>
      <Route path="asset">
				<Route path='create' getComponent={assetCreatePage}/>
				<Route path='record' getComponent={assetRecordPage}/>
      </Route>
      <Route path="limit">
				<Route path='role' getComponent={limitRolekPage}/>
				<Route path='menu' getComponent={limitMenukPage}/>
				<Route path='btn' getComponent={limitBtnkPage}/>
	    	<Route path='data' getComponent={limitDatakPage}/>
      </Route>
      <Route path="order">
      	<Route path='file' getComponent={contarctFilePage}/>
      	<Route path='product' getComponent={contarctProductPage}/>
      	<Route path='execute' getComponent={contarctExecutePage}/>
      </Route>
      <Route path="finance">
        <Route path="transfer" getComponent={transferPage} />
      </Route>
    </Route>
  </Route>
)
