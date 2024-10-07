const btsheet = {
  hosted: function(options = {}) {
    // Create overlay dynamically
    const overlay = document.createElement('div');
    overlay.className = 'btsheet-overlay';

    // Create bottom sheet container dynamically with unique class
    const sheet = document.createElement('div');
    sheet.className = 'btsheet-bottom-sheet';

    // Create sheet header with close button
    const header = document.createElement('div');
    header.className = 'btsheet-sheet-header';
    const closeButton = document.createElement('span');
    closeButton.className = 'btsheet-close-btn';
    closeButton.innerHTML = '&times;';
    header.appendChild(closeButton);

    // Create content wrapper (for custom background)
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'btsheet-content-wrapper';

    // Create content area
    const content = document.createElement('div');
    content.className = 'btsheet-sheet-content';

    // Apply custom body styles (if provided)
    if (options.btBody) {
      contentWrapper.style.backgroundColor = options.btBody.backgroundColor || "rgba(255, 255, 255, 0.9)"; // Apply background to content wrapper
      content.style.color = options.btBody.textColor || "#000"; // Default text color
    }

    // Image (if provided)
    if (options.imageUrl) {
      const image = document.createElement('img');
      image.src = options.imageUrl;
      image.alt = options.imageAlt || '';
      image.style.width = options.imageWidth || 'auto';
      image.style.height = options.imageHeight || 'auto';
      content.appendChild(image);
    }

    // Title
    if (options.title) {
      const title = document.createElement('h2');
      title.innerText = options.title;
      title.style.color = options.btBody?.titleColor || "#000"; // Apply custom title color
      content.appendChild(title);
    }

    // Text
    if (options.text) {
      const text = document.createElement('p');
      text.innerText = options.text;
      content.appendChild(text);
    }

    // Button
    const button = document.createElement('button');
    button.innerText = options.buttonText || 'OK';
    button.style.backgroundColor = options.button?.color || '#ff4757';
    button.style.color = options.button?.textColor || '#fff';
    content.appendChild(button);

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

    // Button click behavior
    button.addEventListener('click', closeSheet);

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
