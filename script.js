const pieces = document.querySelectorAll('.puzzle-piece');
const slots = document.querySelectorAll('.slot');
const shuffleButton = document.getElementById('shuffle');
const checkButton = document.getElementById('check');

function shufflePieces() {
  const parent = document.getElementById('pieces');
  const shuffled = [...pieces].sort(() => Math.random() - 0.5);
  parent.innerHTML = '';
  shuffled.forEach(piece => parent.appendChild(piece));
}

document.addEventListener('DOMContentLoaded', shufflePieces);
shuffleButton.addEventListener('click', shufflePieces);

let draggedPiece = null;

pieces.forEach(piece => {
  piece.addEventListener('dragstart', () => {
    draggedPiece = piece;
  });

  piece.addEventListener('touchstart', (e) => {
    draggedPiece = e.target;
    e.preventDefault(); // Prevents scrolling while dragging
  });
});

slots.forEach(slot => {
  slot.addEventListener('dragover', e => e.preventDefault());

  slot.addEventListener('drop', () => {
    if (!slot.firstChild) {
      slot.appendChild(draggedPiece);
    }
  });

  slot.addEventListener('touchend', () => {
    if (!slot.firstChild) {
      slot.appendChild(draggedPiece);
    }
  });
});

document.getElementById('pieces').addEventListener('dragover', e => e.preventDefault());
document.getElementById('pieces').addEventListener('drop', () => {
  if (draggedPiece) {
    document.getElementById('pieces').appendChild(draggedPiece);
  }
});

document.getElementById('pieces').addEventListener('touchend', () => {
  if (draggedPiece) {
    document.getElementById('pieces').appendChild(draggedPiece);
  }
});

checkButton.addEventListener('click', () => {
  let solved = true;

  slots.forEach(slot => {
    const piece = slot.firstChild;
    if (!piece || slot.dataset.correct !== piece.dataset.position) {
      solved = false;
    }
  });

  alert(solved ? 'Puzzle Solved Successfully!' : 'Not Solved Yet!');
});
