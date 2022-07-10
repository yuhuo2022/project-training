// 发送验证码
(function () {
	const code = document.querySelector('.code')
	// 节流阀，防止多次发送验证码
	let flag = true
	code.addEventListener('click', function () {
		if (flag) {
			flag = false
			// 重发验证码时间
			let i = 5
			code.innerHTML = `${i}后重新发送`
			let timerId = setInterval(function () {
				i--
				code.innerHTML = `${i}后重新发送`
				if (i === 0) {
					clearInterval(timerId)
					code.innerHTML = '发送验证码'
					flag = true
				}
			}, 1000)
		}
	})
})();

// 表单验证
(function () {
	// 验证用户名
	const username = document.querySelector('[name=username]')
	username.addEventListener('change', verifyName)

	// 用户名验证函数
	function verifyName() {
		const reg = /^[a-zA-Z\d-_]{6,10}$/
		// 获取下一个兄弟元素span
		const span = username.nextElementSibling
		if (!reg.test(username.value)) {
			span.innerText = '用户名不符合规则，请输入6-10位的用户名'
			return false
		}
		span.innerText = ''
		return true
	}

	// 验证手机号
	const phone = document.querySelector('[name=phone]')
	phone.addEventListener('change', verifyPhone)

	// 手机号验证函数
	function verifyPhone() {
		const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
		// 获取下一个兄弟元素span
		const span = phone.nextElementSibling
		if (!reg.test(phone.value)) {
			span.innerText = '手机号不符合规则'
			return false
		}
		span.innerText = ''
		return true
	}

	// 验证验证码
	const code = document.querySelector('[name=code]')
	code.addEventListener('change', verifyCode)

	// 验证码验证函数
	function verifyCode() {
		const reg = /^\d{6}$/
		// 获取下一个兄弟元素span
		const span = code.nextElementSibling
		if (!reg.test(code.value)) {
			span.innerText = '验证码错误'
			return false
		}
		span.innerText = ''
		return true
	}

	// 验证密码
	const password = document.querySelector('[name=password]')
	password.addEventListener('change', verifyPwd)

	// 密码验证函数
	function verifyPwd() {
		const reg = /^[a-zA-Z\d-_]{6,20}$/
		// 获取下一个兄弟元素span
		const span = password.nextElementSibling
		if (!reg.test(password.value)) {
			span.innerText = '密码不符合规则，请输入6-20位字母数字字符组合'
			return false
		}
		span.innerText = ''
		return true
	}

	// 确认密码
	const confirm = document.querySelector('[name=confirm]')
	confirm.addEventListener('change', verifyConfirm)

	function verifyConfirm() {
		// 获取下一个兄弟元素span
		const span = confirm.nextElementSibling
		// 两次密码不一样就报错
		if (confirm.value !== password.value) {
			span.innerText = '两次密码输入不符合'
			return false
		}
		span.innerText = ''
		return true
	}

	// 同意协议
	const queRen = document.querySelector('.icon-queren')
	queRen.addEventListener('click', function () {
		// 切换类，原来有就删除，没有就添加
		this.classList.toggle('icon-queren2')
	})

	// 提交
	const form = document.querySelector('form')
	form.addEventListener('submit', function (e) {
		// 判断协议是否同意,有queren2就是同意,否则提示勾选，阻止提交表单
		if (!queRen.classList.contains('icon-queren2')) {
			alert('请同意服务协议')
			e.preventDefault()
		}
		// 判断验证是否通过，只要有一个没通过，停止提交表单
		if (!verifyName()) e.preventDefault()
		if (!verifyPhone()) e.preventDefault()
		if (!verifyCode()) e.preventDefault()
		if (!verifyPwd()) e.preventDefault()
		if (!verifyConfirm()) e.preventDefault()
	})
})()
