// 页面滚动，显示与隐藏电梯导航
(function () {
	const elevator = document.querySelector('.xtx-elevator')
	const backTop = document.querySelector('#backTop')
	const entry = document.querySelector('.xtx_entry')

	window.addEventListener('scroll', function () {
		// 页面滚动距离
		const roleDistance = document.documentElement.scrollTop
		// if (roleDistance >= 300) {
		//   elevator.style.opacity = 1;
		// } else {
		//   elevator.style.opacity = 0;
		// }
		elevator.style.opacity = roleDistance >= entry.offsetTop ? '1' : '0'
	})
	// 点击返回顶部
	backTop.addEventListener('click', function () {
		// document.documentElement.scrollTop = 0;
		window.scrollTo(0, 0)
	})
})();

// 通过电梯导航，页面滚动到指定位置
(function () {
	const list = document.querySelector('.xtx-elevator-list')
	// 点击电梯导航，滑动到对应位置
	list.addEventListener('click', function (e) {
		if (e.target.tagName === 'A' && e.target.dataset.name) {
			// 排他 ，移除active
			const old = document.querySelector('.xtx-elevator-list .active')
			// 判断，active不存在则不移除（防止报错）
			if (old) {
				old.classList.remove('active')
			}
			// 当前元素添加active
			e.target.classList.add('active')
			// 获取对应模块的offsetTop，并让页面滚动到对应位置
			document.documentElement.scrollTop = document.querySelector(`.xtx_goods_${e.target.dataset.name}`).offsetTop
		}
	})

	// 页面滚动到对应位置，电梯导航选中指定模块
	window.addEventListener('scroll', function () {
		// 移除active
		const old = document.querySelector('.xtx-elevator-list .active')
		if (old) old.classList.remove('active')

		// 判断页面当前位置，选中导航模块
		const news = document.querySelector('.xtx_goods_new')
		const popular = document.querySelector('.xtx_goods_popular')
		const brand = document.querySelector('.xtx_goods_brand')
		const topic = document.querySelector('.xtx_goods_topic')
		const ds = document.documentElement.scrollTop
		if (ds >= news.offsetTop && ds < popular.offsetTop) {
			document.querySelector('[data-name=new]').classList.add('active')
		} else if (ds >= popular.offsetTop && ds < brand.offsetTop) {
			document.querySelector('[data-name=popular]').classList.add('active')
		} else if (ds >= brand.offsetTop && ds < topic.offsetTop) {
			document.querySelector('[data-name=brand]').classList.add('active')
		} else if (ds >= topic.offsetTop) {
			document.querySelector('[data-name=topic]').classList.add('active')
		}
	})
})();

// 渲染用户或退出登录
(function () {
	const li1 = document.querySelector('.xtx_navs li:first-child')
	const li2 = document.querySelector('.xtx_navs li:nth-child(2)')
	render()

	// 渲染用户数据
	function render() {
		const uname = localStorage.getItem('xtx-uname')
		if (uname) {
			li1.innerHTML = `<a href="javascript:"><i class="iconfont icon-user"> ${uname}</i></a>`
			li2.innerHTML = `<a href="javascript:">退出登录</a>`
		} else {
			li1.innerHTML = `<a href="./login.html">请先登录</a>`
			li2.innerHTML = `<a href="./register.html">免费注册</a>`
		}
	}

	// 退出登录
	li2.addEventListener('click', function () {
		// 删除本地数据
		localStorage.removeItem('xtx-uname')
		render()
	})
})()


