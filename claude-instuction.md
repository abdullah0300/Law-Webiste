<!--
Sections animate in and out on scroll. Scroll up or down and the sections will wrap around after hitting the start or end. Uses GSAP for the animations.
-->

<header>
  <div>Animated Sections</div>
  <div>Made By Brian</div>
</header>
<section class="first">
  <div class="outer">
    <div class="inner">
      <div class="bg one">
        <h2 class="section-heading">Scroll down</h2>
      </div>
    </div>
  </div>

</section>
<section class="second">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Animated with GSAP</h2>
      </div>
    </div>
  </div>
</section>
<section class="third">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">GreenSock</h2>
      </div>
    </div>
  </div>
</section>
<section class="fourth">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Animation platform</h2>
      </div>
    </div>
  </div>
</section>
<section class="fifth">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Keep scrolling</h2>
      </div>
    </div>
  </div>
</section>




"@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap");

$bg-gradient: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.6) 0%,
  rgba(0, 0, 0, 0.3) 100%
);

* {
  box-sizing: border-box;
  user-select: none;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  color: white;
  background: black;
  font-family: "Cormorant Garamond", serif;
  text-transform: uppercase;
}

h2 {
  font-size: clamp(1rem, 5vw, 5rem);
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.5em;
  margin-right: -0.5em;
  color: hsl(0, 0, 80%);
  width: 90vw;
  max-width: 1200px;
}

header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  width: 100%;
  z-index: 3;
  height: 7em;
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(0.66rem, 2vw, 1rem);
  letter-spacing: 0.5em;
}

section {
  height: 100%;
  width: 100%;
  top: 0;
  position: fixed;
  visibility: hidden;

  .outer,
  .inner {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }

  .bg {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    background-size: cover;
    background-position: center;

    h2 {
      z-index: 2;
    }

    .clip-text {
      overflow: hidden;
    }
  }
}

.first {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920);
  }
}

.second {
  .bg {
    background-image: $bg-gradient,
      url("https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920");
  }
}

.third {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920);
  }
}

.fourth {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920);
  }
}

.fifth {
  .bg {
    background-image: $bg-gradient,
      url("https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75w=1920");
    background-position: 50% 45%;
  }
}
"

"const sections = document.querySelectorAll("section");
const images = document.querySelectorAll(".bg");
const headings = gsap.utils.toArray(".section-heading");
const outerWrappers = gsap.utils.toArray(".outer");
const innerWrappers = gsap.utils.toArray(".inner");
const clamp = gsap.utils.clamp(0, sections.length - 1);

document.addEventListener("wheel", handleWheel);
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
document.addEventListener("touchend", handleTouchEnd);

let animating = false,
  currentIndex = -1;

const touch = {
  startX: 0,
  startY: 0,
  dx: 0,
  dy: 0,
  startTime: 0,
  dt: 0
};

const tlDefaults = {
  ease: "slow.inOut",
  duration: 1.25
};

const splitHeadings = headings.map((heading) => {
  return new SplitText(heading, {
    type: "chars, words, lines",
    linesClass: "clip-text"
  });
});

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
  index = clamp(index); // make sure it's valid

  // we're at the end, so exit
  if (currentIndex === index) {
    return;
  }

  animating = true;
  let fromTop = direction === -1,
    dFactor = fromTop ? -1 : 1,
    tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => (animating = false)
    });
  if (currentIndex >= 0) {
    // The first time this function runs, current is -1
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
      sections[currentIndex],
      { autoAlpha: 0 }
    );
  }
  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  tl.fromTo(
    [outerWrappers[index], innerWrappers[index]],
    { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
    { yPercent: 0 },
    0
  )
    .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
    .fromTo(
      splitHeadings[index].chars,
      { autoAlpha: 0, yPercent: 150 * dFactor },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
        stagger: {
          each: 0.02,
          from: "random"
        }
      },
      0.2
    );

  currentIndex = index;
}

function handleWheel(e) {
  if (animating) return;

  e.wheelDeltaY < 0
    ? gotoSection(currentIndex + 1, 1)
    : gotoSection(currentIndex - 1, -1);
}

function handleTouchStart(e) {
  const t = e.changedTouches[0];
  touch.startX = t.pageX;
  touch.startY = t.pageY;
}

function handleTouchMove(e) {
  e.preventDefault();
}

function handleTouchEnd(e) {
  if (animating) return;
  const t = e.changedTouches[0];
  touch.dx = t.pageX - touch.startX;
  touch.dy = t.pageY - touch.startY;
  if (touch.dy > 10) gotoSection(currentIndex - 1, -1);
  if (touch.dy < -10) gotoSection(currentIndex + 1, 1);
}

gotoSection(0, 1);
"