/**
 * 制作工艺页面特定脚本
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化标签页切换
  initTabs();
  
  // 初始化工艺步骤动画
  initProcessSteps();
});

/**
 * 初始化标签页切换功能
 */
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // 获取当前标签页组
      const tabGroup = this.parentElement;
      const tabContent = tabGroup.parentElement;
      
      // 移除所有活跃状态
      tabGroup.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
      });
      
      tabContent.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // 设置当前标签为活跃
      this.classList.add('active');
      
      // 显示对应内容
      const tabId = this.getAttribute('data-tab');
      const activeContent = tabContent.querySelector(`#${tabId}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/**
 * 初始化工艺步骤滚动动画
 */
function initProcessSteps() {
  const timelineNodes = document.querySelectorAll('.timeline-node');
  
  function checkNodeVisibility() {
    timelineNodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // 当节点进入视口时添加延迟动画
      if (rect.top <= windowHeight * 0.8) {
        setTimeout(() => {
          node.classList.add('visible');
        }, index * 200); // 每个节点延迟200ms
      }
    });
  }
  
  // 初始检查
  setTimeout(checkNodeVisibility, 100);
  
  // 滚动时检查
  window.addEventListener('scroll', function() {
    requestAnimationFrame(checkNodeVisibility);
  });
} 