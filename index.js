const rust = import('./pkg/rust_graphics');

rust
  .then(m => m.say_hello())
  .catch(console.error);