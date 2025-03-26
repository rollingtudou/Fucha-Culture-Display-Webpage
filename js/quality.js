/**
 * 品质评价页面特定脚本
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化雷达图
  initRadarChart();
  
  // 初始化对比滑块
  initComparisonSlider();
});

/**
 * 初始化雷达图
 */
function initRadarChart() {
  // 此处可以添加动态雷达图数据绘制
  // 当前使用CSS静态雷达图
  const radarChart = document.querySelector('.radar-chart');
  
  if (radarChart) {
    // 添加淡入动画
    radarChart.classList.add('fade-in');
    
    // 未来可以替换为Canvas绘制的动态雷达图
  }
}

/**
 * 初始化对比滑块
 */
function initComparisonSlider() {
  const comparisonContainer = document.querySelector('.comparison-container');
  
  if (comparisonContainer) {
    const leftCard = comparisonContainer.querySelector('.left');
    const rightCard = comparisonContainer.querySelector('.right');
    const compareLabel = comparisonContainer.querySelector('.compare-label');
    
    let isSliding = false;
    let startX = 0;
    let startLeft = 0;
    
    // 拖动开始
    compareLabel.addEventListener('mousedown', startSlide);
    compareLabel.addEventListener('touchstart', function(e) {
      const touch = e.touches[0];
      startSlide(touch);
    });
    
    function startSlide(e) {
      isSliding = true;
      startX = e.clientX;
      startLeft = parseInt(getComputedStyle(rightCard).flexBasis) || 50;
      
      // 添加移动和结束事件
      document.addEventListener('mousemove', moveSlide);
      document.addEventListener('touchmove', touchMoveSlide);
      document.addEventListener('mouseup', endSlide);
      document.addEventListener('touchend', endSlide);
    }
    
    // 触摸移动处理
    function touchMoveSlide(e) {
      const touch = e.touches[0];
      moveSlide(touch);
    }
    
    // 拖动过程
    function moveSlide(e) {
      if (!isSliding) return;
      
      // 计算移动距离
      const deltaX = e.clientX - startX;
      const containerWidth = comparisonContainer.offsetWidth;
      
      // 计算新的位置百分比
      let newLeft = startLeft + (deltaX / containerWidth * 100);
      
      // 限制范围
      newLeft = Math.max(20, Math.min(80, newLeft));
      
      // 更新卡片宽度
      leftCard.style.flexBasis = (100 - newLeft) + '%';
      rightCard.style.flexBasis = newLeft + '%';
      
      // 更新标签位置
      compareLabel.style.left = newLeft + '%';
    }
    
    // 拖动结束
    function endSlide() {
      isSliding = false;
      
      // 移除事件监听
      document.removeEventListener('mousemove', moveSlide);
      document.removeEventListener('touchmove', touchMoveSlide);
      document.removeEventListener('mouseup', endSlide);
      document.removeEventListener('touchend', endSlide);
    }
  }
} 