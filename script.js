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

// Add event listeners for drag-and-drop
pieces.forEach(piece => {
    piece.addEventListener('dragstart', () => {
        draggedPiece = piece;
    });

    piece.addEventListener('touchstart', (e) => {
        draggedPiece = piece;
        e.preventDefault(); // Prevent scrolling while dragging
    });

    piece.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        piece.style.position = 'absolute';
        piece.style.left = `${touch.clientX - piece.offsetWidth / 2}px`;
        piece.style.top = `${touch.clientY - piece.offsetHeight / 2}px`;
        e.preventDefault();
    });

    piece.addEventListener('touchend', () => {
        draggedPiece.style.position = 'static'; // Reset position
        draggedPiece = null;
    });
});

// Add event listeners for drop zones
slots.forEach(slot => {
    slot.addEventListener('dragover', e => e.preventDefault());
    slot.addEventListener('drop', () => {
        if (!slot.firstChild && draggedPiece) {
            slot.appendChild(draggedPiece);
        }
    });

    slot.addEventListener('touchend', (e) => {
        if (!slot.firstChild && draggedPiece) {
            slot.appendChild(draggedPiece);
        }
        e.preventDefault();
    });
});

// Handle drop back to the pieces container
document.getElementById('pieces').addEventListener('dragover', e => e.preventDefault());
document.getElementById('pieces').addEventListener('drop', () => {
    if (draggedPiece) {
        document.getElementById('pieces').appendChild(draggedPiece);
    }
});

document.getElementById('pieces').addEventListener('touchend', () => {
    if (draggedPiece) {
        document.getElementById('pieces').appendChild(draggedPiece);
        draggedPiece.style.position = 'static'; // Reset position
        draggedPiece = null;
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
