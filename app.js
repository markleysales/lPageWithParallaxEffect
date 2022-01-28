let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let mountains_front = document.getElementById('mountains_front');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let header = document.querySelector('header');

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    stars.style.left = value * 0.25 + 'px';
    moon.style.top = value * 1.05 + 'px';
    mountains_behind.style.top = value * 0.5 + 'px';
    mountains_front.style.top = value * 0 + 'px';
    text.style.marginRight = value * 2 + 'px';
    text.style.marginTop = value * 0.8 + 'px';
    btn.style.marginTop = value * 1.5 + 'px';
    header.style.top = value * 0.5 + 'px';
})

const menuLinks = document.querySelectorAll('#btn');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function scrollToSection(event) {
    event.preventDefault();
    const distanceFromTheTop = getDistanceFromTheTop(event.target) + 90;
    smoothScrollTo(0, distanceFromTheTop);
  }
  
  menuLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });
  
  function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
  
    duration = typeof duration !== "undefined" ? duration : 1000;
  
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1)
        return (distance / 2) * time * time * time * time + from;
      return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };
  
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60);
  }