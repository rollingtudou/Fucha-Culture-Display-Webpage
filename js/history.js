/**
 * 历史页面特定脚本
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化时间轴动画
  initTimelineAnimation();
  
  // 初始化文献模态框
  initDocumentModals();
  
  // 初始化地图标记交互
  initMapMarkers();
});

/**
 * 初始化时间轴动画
 */
function initTimelineAnimation() {
  const timelineNodes = document.querySelectorAll('.timeline-node');
  
  function checkNodeVisibility() {
    timelineNodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // 当节点进入视口时添加延迟动画
      if (rect.top <= windowHeight * 0.8) {
        setTimeout(() => {
          node.classList.add('visible');
        }, index * 300); // 每个节点延迟300ms
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

/**
 * 初始化文献模态框
 */
function initDocumentModals() {
  const modalButtons = document.querySelectorAll('.view-document');
  const modalContainers = document.querySelectorAll('.modal-container');
  const closeButtons = document.querySelectorAll('.close-modal');
  
  // 打开模态框
  modalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
      }
    });
  });
  
  // 关闭模态框
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  
  // 点击模态框背景关闭
  modalContainers.forEach(container => {
    container.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  });
  
  // 关闭模态框函数
  function closeModal() {
    modalContainers.forEach(modal => {
      modal.style.display = 'none';
    });
    document.body.style.overflow = ''; // 恢复背景滚动
  }
  
  // ESC键关闭模态框
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/**
 * 初始化地图标记交互
 */
function initMapMarkers() {
  const mapMarkers = document.querySelectorAll('.map-marker');
  
  mapMarkers.forEach(marker => {
    // 悬停时展示信息
    marker.addEventListener('mouseenter', function() {
      this.querySelector('.marker-info').style.opacity = '1';
    });
    
    marker.addEventListener('mouseleave', function() {
      this.querySelector('.marker-info').style.opacity = '0';
    });
    
    // 点击时缩放效果
    marker.addEventListener('click', function() {
      const dot = this.querySelector('.marker-dot');
      dot.style.transform = 'scale(1.3)';
      setTimeout(() => {
        dot.style.transform = '';
      }, 300);
    });
  });
} 