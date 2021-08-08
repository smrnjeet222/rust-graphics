const rust = import('./pkg/rust_graphics');
const canvas = document.getElementById('rustCanvas');
const gl = canvas.getContext('webgl', { antialias: true });

rust.then(m => {
  if (!gl) {
    alert('WebGL not supported');
    return;
  }

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  
  const FPS_THROTTLER = 1000 / 30;
  const initalTime = Date.now();
  var lastDrawTime = -1;

  const gameClient = new m.GameClient();

  function render() {
    window.requestAnimationFrame(render);
    const currTime = Date.now();

    if (currTime >= lastDrawTime + FPS_THROTTLER) {
      lastDrawTime = currTime;

      if (window.innerHeight != canvas.heingt || window.innerWidth != canvas) {
        canvas.width = window.innerWidth;
        canvas.clientWidth = window.innerWidth;
        canvas.style.width = window.innerWidth;
        
        canvas.height = window.innerHeight;
        canvas.clientHeight = window.innerHeight;
        canvas.style.height = window.innerHeight;

        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
      }

      let timeElapsed = currTime - initalTime;
      gameClient.update(timeElapsed, window.innerHeight, window.innerWidth);
      gameClient.render();

    }
  }

  render();
})
  .catch(console.error);