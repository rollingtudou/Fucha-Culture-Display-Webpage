/**
 * 轮播图功能脚本
 */

document.addEventListener('DOMContentLoaded', function() {
  initSliders();
});

/**
 * 初始化所有轮播图
 */
function initSliders() {
  const sliders = document.querySelectorAll('.slider-container');
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    
    if (slides.length > 0) {
      let currentSlide = 0;
      let slideInterval;
      
      // 自动轮播
      startSlideInterval();
      
      // 设置自动轮播
      function startSlideInterval() {
        slideInterval = setInterval(function() {
          showSlide(currentSlide + 1);
        }, 5000);
      }
      
      // 切换轮播图
      function showSlide(index) {
        // 处理边界情况
        if (index >= slides.length) {
          index = 0;
        } else if (index < 0) {
          index = slides.length - 1;
        }
        
        // 移除当前活跃状态
        slides[currentSlide].classList.remove('active');
        if (dots.length > 0) {
          dots[currentSlide].classList.remove('active');
        }
        
        // 设置新的活跃状态
        slides[index].classList.add('active');
        if (dots.length > 0) {
          dots[index].classList.add('active');
        }
        
        // 更新当前索引
        currentSlide = index;
      }
      
      // 点控制器点击事件
      if (dots.length > 0) {
        dots.forEach((dot, index) => {
          dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideInterval();
          });
        });
      }
      
      // 前进/后退按钮
      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          clearInterval(slideInterval);
          showSlide(currentSlide - 1);
          startSlideInterval();
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          clearInterval(slideInterval);
          showSlide(currentSlide + 1);
          startSlideInterval();
        });
      }
      
      // 鼠标悬停时暂停轮播
      slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
      });
      
      slider.addEventListener('mouseleave', function() {
        startSlideInterval();
      });
    }
  });
} 