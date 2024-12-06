const pieces = document.querySelectorAll('.puzzle-piece');
const slots = document.querySelectorAll('.slot');
const shuffleButton = document.getElementById('shuffle');
const checkButton = document.getElementById('check');

// Function to shuffle pieces
function shufflePieces() {
  const parent = document.getElementById('pieces');
  const shuffled = [...pieces].sort(() => Math.random() - 0.5);
  parent.innerHTML = '';
  shuffled.forEach(piece => parent.appendChild(piece));
}

// Initialize shuffle on load and on button click
document.addEventListener('DOMContentLoaded', shufflePieces);
shuffleButton.addEventListener('click', shufflePieces);

let draggedPiece = null;

// Enable dragging (Desktop)
pieces.forEach(piece => {
  piece.addEventListener('dragstart', () => {
    draggedPiece = piece;
  });
});

// Enable dragging (Touch)
pieces.forEach(piece => {
  piece.addEventListener('touchstart', e => {
    draggedPiece = piece;
    e.preventDefault(); // Prevent scrolling
  });

  piece.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    piece.style.position = 'absolute';
    piece.style.left = `${touch.clientX - piece.offsetWidth / 2}px`;
    piece.style.top = `${touch.clientY - piece.offsetHeight / 2}px`;
  });

  piece.addEventListener('touchend', e => {
    const touch = e.changedTouches[0];
    piece.style.position = 'static'; // Reset position

    // Detect the element under the touch
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropTarget && dropTarget.classList.contains('slot') && !dropTarget.firstChild) {
      dropTarget.appendChild(draggedPiece); // Append to slot if empty
      dropTarget.classList.add('filled'); // Mark slot as filled
    } else {
      document.getElementById('pieces').appendChild(draggedPiece); // Return to first container
    }
    draggedPiece = null; // Reset
  });
});

// Enable dropping into slots (Desktop)
slots.forEach(slot => {
  slot.addEventListener('dragover', e => e.preventDefault());
  slot.addEventListener('drop', () => {
    if (!slot.firstChild) {
      slot.appendChild(draggedPiece);
      slot.classList.add('filled'); // Mark slot as filled
    }
  });
});

// Enable dropping back into pieces container (Desktop)
document.getElementById('pieces').addEventListener('dragover', e => e.preventDefault());
document.getElementById('pieces').addEventListener('drop', () => {
  if (draggedPiece) {
    draggedPiece.parentElement.classList.remove('filled'); // Unmark filled slot
    document.getElementById('pieces').appendChild(draggedPiece);
  }
});

// Validate if the puzzle is solved
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
