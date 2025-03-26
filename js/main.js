/**
 * 茯茶文化网站主JavaScript文件
 * 包含全局功能和交互效果
 */

// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
  // 初始化导航栏
  initNavigation();
  
  // 初始化滚动动画
  initScrollAnimations();
  
  // 初始化可折叠内容
  initCollapsibles();
});

/**
 * 导航栏功能初始化
 */
function initNavigation() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  
  // 汉堡菜单点击事件
  if (burgerMenu) {
    burgerMenu.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // 导航栏滚动效果
  const mainNav = document.getElementById('main-nav');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // 向下滚动且不在顶部
      mainNav.style.transform = 'translateY(-100%)';
    } else {
      // 向上滚动或在顶部
      mainNav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
}

/**
 * 滚动动画初始化
 */
function initScrollAnimations() {
  // 查找所有需要动画的元素
  const animatedElements = document.querySelectorAll('.card, .timeline-node, .section-title, .method-card');
  
  // 检查元素是否在视口中
  function checkInView() {
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // 元素进入视口底部
      if (rect.top <= windowHeight * 0.9) {
        element.classList.add('visible');
        
        // 为时间轴节点添加特定类
        if (element.classList.contains('timeline-node')) {
          element.classList.add('visible');
        }
      }
    });
  }
  
  // 首次加载检查
  setTimeout(checkInView, 100);
  
  // 滚动时检查
  window.addEventListener('scroll', function() {
    requestAnimationFrame(checkInView);
  });
}

/**
 * 可折叠内容初始化
 */
function initCollapsibles() {
  const collapsibles = document.querySelectorAll('.collapsible');
  
  collapsibles.forEach(collapsible => {
    const header = collapsible.querySelector('h4');
    const content = collapsible.querySelector('.collapsible-content');
    
    if (header && content) {
      header.addEventListener('click', function() {
        collapsible.classList.toggle('open');
        
        if (collapsible.classList.contains('open')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0';
        }
      });
    }
  });
} 