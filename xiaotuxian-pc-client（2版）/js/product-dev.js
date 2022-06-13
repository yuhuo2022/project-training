// 放大镜
(function () {
	const small = document.querySelector('.small');
	const middle = document.querySelector('.middle');
	const large = document.querySelector('.large');
	// 事件委托
	small.addEventListener('mouseover', function (e) {
		if (e.target.tagName === 'IMG') {
			// 排他
			this.querySelector('.active').classList.remove('active');
			// 当前元素的父元素添加active
			e.target.parentNode.classList.add('active');
			// middle盒子中的图片换成small的图片
			middle.querySelector('img').src = e.target.src;
			// large盒子更换背景图片
			large.style.backgroundImage = `url(${e.target.src})`;
		}
	});
	
	// 鼠标经过中盒子，显示大盒子，离开隐藏大盒子
	middle.addEventListener('mouseenter', show);
	middle.addEventListener('mouseleave', hide);
	
	let timerId = 0;
	
	function show() {
		clearTimeout(timerId);
		large.style.display = 'block';
	}
	
	function hide() {
		timerId = setTimeout(function () {
			large.style.display = 'none';
		}, 200);
	}
	
	// 鼠标经过大盒子，显示大盒子，离开隐藏大盒子
	large.addEventListener('mouseenter', show);
	large.addEventListener('mouseleave', hide);
	
	// 鼠标经过middle盒子，显示隐藏遮罩
	const layer = document.querySelector('.layer');
	middle.addEventListener('mouseenter', function () {
		layer.style.display = 'block';
	});
	middle.addEventListener('mouseleave', function () {
		layer.style.display = 'none';
	});
	
	// 遮罩移动
	middle.addEventListener('mousemove', function (e) {
		// 鼠标在middle盒子中的坐标=鼠标在页面中的坐标-middle盒子的坐标
		// 鼠标在middle盒子中的坐标
		let x = e.pageX - middle.getBoundingClientRect().left;
		// let y = e.pageY - middle.getBoundingClientRect().top;
		// 处理y坐标滚动条问题(减去页面卷曲的距离)
		let y = e.pageY - middle.getBoundingClientRect().top - document.documentElement.scrollTop;
		// 遮罩移动，限定在middle盒子中
		if (x >= 0 && x <= 400 && y >= 0 && y <= 400) {
			// 遮罩移动距离
			let mx = 0, my = 0;
			if (x < 100) mx = 0;
			// 遮罩移动从0开始，不是100，需要减去
			if (x >= 100 && x <= 300) mx = x - 100;
			if (x > 300) mx = 300 - 100;
			layer.style.left = mx + 'px';
			
			if (y < 100) my = 0;
			if (y >= 100 && y <= 300) my = y - 100;
			if (y > 300) my = 300 - 100;
			layer.style.top = my + 'px';
			
			// 大盒子的背景要跟随中盒子移动，2倍关系
			large.style.backgroundPositionX = -2 * mx + 'px';
			large.style.backgroundPositionY = -2 * my + 'px';
		}
	});
})();
