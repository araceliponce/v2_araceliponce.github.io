var isMobile = navigator.userAgent &&
  navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
var isSmall = window.innerWidth < 1000;
const page = document.documentElement;
// const mainSvgs = document.querySelectorAll('.tools svg');


//toggles
const themeToggle = document.getElementById('themeToggle');
const animationToggle = document.getElementById("animationToggle");


window.addEventListener('load', () => {
  console.log('ive loaded again')
  if (['null', 'true'].includes(hasUsedDarkMode)) {
    themeToggle.checked = true; //theme toggle checked significa sí dark mode, no checked es day mode
  } else {
    themeToggle.checked = false
  }
  if (['null', 'true'].includes(hasBeenOkWithMotion)) {
    animationToggle.checked = true
  } else {
    animationToggle.checked = false
  }

})



/* const { matches: motionOK } = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
) */


/* This is to test if the person can use javascript, if not, the buttons will stay hidden */
const allHiddenBtns = document.querySelectorAll('button[hidden]');
// console.log(allHiddenBtns);
allHiddenBtns.forEach(btn => {
  btn.removeAttribute('hidden');
})


/* code from https://web.dev/building-split-text-animations/ 
found after seeing this https://codepen.io/alvarotrigo/pen/bGrXmwM  */
const byLetter = text =>
  [...text].map(span)

const byWord = text =>
  text.split(' ').map(span)

const span = (text, index) => {
  const node = document.createElement('span')

  node.textContent = text
  node.style.setProperty('--i', index) //the property i is equal to index, is not a string '--i:x'
  node.className = '--i:', index
  node.setAttribute('aria-hidden', true); //a11y https://css-irl.info/how-to-accessibly-split-text/

  return node
}

var isOkWithMotion = window.matchMedia('(prefers-reduced-motion: no-preference)')['matches'];

var hasBeenOkWithMotion = localStorage.getItem('hasBeenOkWithMotion');

if (hasBeenOkWithMotion) {
  // document split manipulations
  console.log('motion is ok')

  const splitTargets = document.querySelectorAll('[split-by]');
  splitTargets.forEach(node => {
    const type = node.getAttribute('split-by')
    let nodes = null

    if (type === 'letter') {
      nodes = byLetter(node.innerText)
    }
    else if (type === 'word') {
      nodes = byWord(node.innerText)
    }

    if (nodes) {
      node.firstChild.replaceWith(...nodes)
    }
  })
}







//TOGGLES ...10


/* themeToggle.addEventListener("click", () => {
  console.log('changed themes :D');

  if (page.dataset.dark == 'true') {
    page.dataset.dark = 'false';
  } else {
    page.dataset.dark = 'true';
  }
  hasUsedDarkMode = localStorage.setItem("hasUsedDarkMode", page.dataset.dark);

}); */  //set the local storage item to the same value of data-dark of html/body



// ni hasUsedDarkMode ni page.dataset.dark sirven aqui porque son strings y necesitamos un boolean parahacer y quitar check

themeToggle.addEventListener("click", () => {
  if (page.dataset.dark == 'true') {
    themeToggle.checked = false;
    page.dataset.dark = 'false';

  } else {
    themeToggle.checked = true;
    page.dataset.dark = 'true';
  }
  hasUsedDarkMode = localStorage.setItem("hasUsedDarkMode", page.dataset.dark);

  console.log('dark has been set to', page.dataset.dark)

});






/* 
animationToggle.addEventListener('click', () => {

  document.documentElement.dataset.motion === 'true' ? pauseAnimations() : playAnimations();

  console.log(localStorage.getItem('hasBeenOkWithMotion'))
  console.log(document.documentElement.dataset);

}); */


animationToggle.addEventListener('click', () => {
  page.dataset.motion === 'true' ? pauseAnimations() : playAnimations();
  console.log('motion has been set to', page.dataset.motion)

});

function playAnimations() {
  animationToggle.checked = true; //usa booleans para checked, no strings

  localStorage.setItem("hasBeenOkWithMotion", 'true');
  page.dataset.motion = 'true';

}

function pauseAnimations() {
  animationToggle.checked = false;

  localStorage.setItem("hasBeenOkWithMotion", 'false');
  page.dataset.motion = 'false';
}




/* To change center of radial gradient on mousemove if motion is ok. it works but not*/

/* document.documentElement.addEventListener('mousemove', (e) => {

  if (document.documentElement.dataset.motion == 'true') {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    mouseXpercentage = Math.round(e.pageX / windowWidth * 100);
    mouseYpercentage = Math.round(e.pageY / windowHeight * 100);

    document.body.style.setProperty('--cursorHPosition', mouseXpercentage + '%')
    document.body.style.setProperty('--cursorVPosition', mouseYpercentage + '%')

  }
  else {
    return
  }
});

 */

