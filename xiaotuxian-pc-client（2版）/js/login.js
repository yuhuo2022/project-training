// tab栏切换
const tabNav = document.querySelector('.tab-nav');
const pane = document.querySelectorAll('.tab-pane');
// 事件委托实现切换
tabNav.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    tabNav.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');

    // 排他
    for (let i = 0; i < pane.length; i++) {
      pane[i].style.display = 'none';
      pane[e.target.dataset.id].style.display = 'block';
    }
  }
});


// 登录
const form = document.querySelector('form');
const agree = document.querySelector('[name=agree]');
const username = document.querySelector('[name=username]');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // 是否勾选协议
  if (!agree.checked) {
    return alert('请同意服务协议');
  }
  // 存储用户信息
  localStorage.setItem('xtx-uname', username.value);
  // 跳转页面
  location.href = './index.html';
});
