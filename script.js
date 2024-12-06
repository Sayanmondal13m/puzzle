const pieces = document.querySelectorAll('.puzzle-piece');
const slots = document.querySelectorAll('.slot');
const shuffleButton = document.getElementById('shuffle');
const checkButton = document.getElementById('check');

// Function to shuffle the pieces randomly
function shufflePieces() {
  const parent = document.getElementById('pieces');
  const shuffled = [...pieces].sort(() => Math.random() - 0.5);
  parent.innerHTML = '';
  shuffled.forEach(piece => parent.appendChild(piece));
}

// Shuffle pieces on page load
document.addEventListener('DOMContentLoaded', shufflePieces);

// Shuffle pieces when the "Compile" button is clicked
shuffleButton.addEventListener('click', shufflePieces);

// Drag-and-drop logic
let draggedPiece = null;

// Enable dragging of pieces
pieces.forEach(piece => {
  piece.addEventListener('dragstart', () => {
    draggedPiece = piece;
  });
});

// Enable dropping into slots
slots.forEach(slot => {
  slot.addEventListener('dragover', e => e.preventDefault());

  slot.addEventListener('drop', () => {
    if (!slot.firstChild) {
      slot.appendChild(draggedPiece);
    }
  });
});

// Allow returning pieces to the original container
document.getElementById('pieces').addEventListener('dragover', e => e.preventDefault());
document.getElementById('pieces').addEventListener('drop', () => {
  if (draggedPiece) {
    document.getElementById('pieces').appendChild(draggedPiece);
  }
});

// Check if the puzzle is solved
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
