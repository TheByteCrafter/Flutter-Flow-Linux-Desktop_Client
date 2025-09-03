const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {


     // Create and inject CSS for the scrollbar
  const scrollbarStyle = document.createElement('style');
  scrollbarStyle.textContent = `
    body::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(scrollbarStyle);
  // Create a <style> tag to inject our CSS rules
  const style = document.createElement('style');
  style.textContent = `
    .back-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99999;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      background-color: #3f51b5;
      color: white;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease;
    }
    
    .back-button:hover {
      background-color: #303f9f;
    }
    
    .back-button:active {
      transform: translateY(1px);
    }
  `;
  // Append the style tag to the head of the document
  document.head.appendChild(style);

  // Create the button element
  const backButton = document.createElement('button');
  // Add our new CSS class to the button
  backButton.classList.add('back-button');
  backButton.innerText = 'Go Back';

  backButton.addEventListener('click', () => {
    ipcRenderer.send('go-back');
  });

  // Append the button to the body
  document.body.appendChild(backButton);
});