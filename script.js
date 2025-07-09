const container = document.getElementById('container');
const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');
const rainbowBtn = document.getElementById('rainbow');
const eraserBtn = document.getElementById('eraser');

let rainbowMode = false;
let eraserMode = false;
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(size = 16) {
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () => {
      if (!mouseDown) return;
      draw(square);
    });

    square.addEventListener('mousedown', () => draw(square));

    container.appendChild(square);
  }
}

function draw(square) {
  if (eraserMode) {
    square.style.backgroundColor = '';
  } else if (rainbowMode) {
    square.style.backgroundColor = getRandomColor();
  } else {
    square.style.backgroundColor = 'black';
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

clearBtn.addEventListener('click', () => {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => square.style.backgroundColor = '');
});

resizeBtn.addEventListener('click', () => {
  let newSize = prompt('Enter new grid size (1–100):');
  newSize = parseInt(newSize);
  if (newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert('Invalid size. Please enter a number between 1 and 100.');
  }
});

rainbowBtn.addEventListener('click', () => {
  rainbowMode = !rainbowMode;
  rainbowBtn.textContent = rainbowMode ? 'Rainbow Mode: ON' : 'Rainbow Mode';
});

eraserBtn.addEventListener('click', () => {
  eraserMode = !eraserMode;
  eraserBtn.textContent = eraserMode ? 'Eraser: ON' : 'Eraser';
});

createGrid(); // Initialize default grid
