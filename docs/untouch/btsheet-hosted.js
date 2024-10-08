const btsheet = {
  hosted: function(options = {}) {
    // Create overlay dynamically
    const overlay = document.createElement('div');
    overlay.className = 'btsheet-overlay';

    // Apply custom dimming effect to the overlay (if provided)
    if (options.btDim) {
      let dimValue = options.btDim.replace('%', '') / 100;  // Convert percentage to decimal
      overlay.style.backgroundColor = `rgba(0, 0, 0, ${dimValue})`; // Apply dimming effect
    } else {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Default dim to 50% if not provided
    }

    // Create bottom sheet container dynamically with unique class
    const sheet = document.createElement('div');
    sheet.className = 'btsheet-bottom-sheet';

    // Apply custom body styles to the outer sheet (if provided)
    if (options.btBody) {
      sheet.style.backgroundColor = options.btBody.backgroundColor || "rgba(255, 255, 255, 0.9)"; // Apply background to entire sheet
      sheet.style.color = options.btBody.textColor || "#000"; // Apply text color to entire sheet

      // Apply glass effect if enabled
      if (options.btBody.glassEffect) {
        sheet.style.backgroundColor = options.btBody.backgroundColor || "rgba(255, 255, 255, 0.1)";
        sheet.style.backdropFilter = 'blur(10px)';  // Add glass blur effect
        sheet.style.border = "1px solid rgba(255, 255, 255, 0.18)";
      } else {
        sheet.style.backdropFilter = 'none';  // No blur if glassEffect is not enabled
      }
    }

    // Create sheet header with close button
    const header = document.createElement('div');
    header.className = 'btsheet-sheet-header';
    const closeButton = document.createElement('span');
    closeButton.className = 'btsheet-close-btn';
    closeButton.innerHTML = '&times;';
    header.appendChild(closeButton);

    // Create content wrapper (for content inside the sheet)
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'btsheet-content-wrapper';

    // Create content area
    const content = document.createElement('div');
    content.className = 'btsheet-sheet-content';

    // Image (if provided)
    if (options.btImage) {
      const image = document.createElement('img');
      image.src = options.btImage.src || '';  // Image source
      image.alt = options.btImage.alt || '';  // Image alt text
      image.style.width = options.btImage.width || 'auto';  // Image width
      image.style.height = options.btImage.height || 'auto';  // Image height
      content.appendChild(image);
    }

    // Title
    if (options.title) {
      const title = document.createElement('h2');
      title.innerText = options.title;
      title.style.color = options.btBody?.titleColor || options.btBody?.textColor || "#000"; // Apply custom title color or text color
      content.appendChild(title);
    }

    // Text
    if (options.text) {
      const text = document.createElement('p');
      text.innerText = options.text;
      content.appendChild(text);
    }

    // Button
    if (options.button) {
      const button = document.createElement('button');
      button.innerText = options.buttonText || 'OK';

      // Apply custom button styles
      button.style.backgroundColor = options.button.color || '#ff4757';
      button.style.color = options.button.textColor || '#fff';
      button.style.width = options.button.width || 'auto';
      button.style.height = options.button.height || 'auto';
      button.style.borderRadius = '8px'; // Add a border-radius for consistent style
      button.style.padding = '10px'; // Default padding

      // Append the button to the content area
      content.appendChild(button);

      // Custom button click behavior
      if (typeof options.btButton === 'function') {
        button.addEventListener('click', options.btButton);
      }
    }

    // Append content to wrapper and then to the sheet
    contentWrapper.appendChild(content);
    sheet.appendChild(header);
    sheet.appendChild(contentWrapper);

    // Append overlay and sheet to body
    document.body.appendChild(overlay);
    document.body.appendChild(sheet);

    // Show the sheet
    setTimeout(() => {
      sheet.classList.add('show');
    }, 100);

    // Close on click outside (if allowed)
    if (options.outsideTouch) {
      overlay.addEventListener('click', function() {
        closeSheet();
      });
    }

    // Close button behavior
    closeButton.addEventListener('click', closeSheet);

    // Close function
    function closeSheet() {
      sheet.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(sheet);
        document.body.removeChild(overlay);
      }, 300);
      if (options.onClose) options.onClose();
    }
  }
};
