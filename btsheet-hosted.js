const btsheet = {
  // Flag to track if the sheet is open
  isOpen: false,

  hosted: function (options = {}) {
    if (btsheet.isOpen) {
      console.log("btsheet already Open, Let Close and Open again..");
      btsheet.closed();
      setTimeout(() => {
        btsheet.hosted(options);  // Reopen after closing
      }, 350);  // Wait for the sheet to close before reopening
      return;
    } else {
      console.log("btsheet is not Open yet, Opening..");
    }

    // Create overlay dynamically
    const overlay = document.createElement('div');
    overlay.className = 'btsheet-overlay';

    // Store the overlay globally so it can be used in the closed() method
    btsheet.overlay = overlay;

    // Apply custom dimming effect to the overlay (if provided)
    if (options.btDim) {
      let dimValue = options.btDim.replace('%', '') / 100;  // Convert percentage to decimal
      overlay.style.backgroundColor = `rgba(0, 0, 0, ${dimValue})`; // Apply dimming effect
    } else {
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Default dim to 50% if not provided
    }

    // Ensure the overlay covers the entire webpage including the header
    overlay.style.zIndex = '1000';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.display = 'block';

    // Create bottom sheet container dynamically with unique class
    const sheet = document.createElement('div');
    sheet.className = 'btsheet-bottom-sheet';

    // Store the sheet globally so it can be used in the closed() method
    btsheet.sheet = sheet;

    // Apply custom body styles to the outer sheet (if provided)
    if (options.btBody) {
      sheet.style.backgroundColor = options.btBody.backgroundColor || "rgba(255, 255, 255, 0.9)";
      sheet.style.color = options.btBody.textColor || "#000";

      // Apply glass effect if enabled
      if (options.btBody.glassEffect) {
        sheet.style.backgroundColor = options.btBody.backgroundColor || "rgba(255, 255, 255, 0.1)";
        sheet.style.backdropFilter = 'blur(10px)';  // Add glass blur effect
        sheet.style.border = "1px solid rgba(255, 255, 255, 0.18)";
      } else {
        sheet.style.backdropFilter = 'none';
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
      image.src = options.btImage.src || '';
      image.alt = options.btImage.alt || '';
      image.style.width = options.btImage.width || 'auto';
      image.style.height = options.btImage.height || 'auto';
      content.appendChild(image);
    }

    // Title
    if (options.title) {
      const title = document.createElement('h2');
      title.innerText = options.title;
      title.style.color = options.btBody?.titleColor || options.btBody?.textColor || "#000";
      content.appendChild(title);
    }

    // Text (Now supports HTML)
    if (options.text) {
      const text = document.createElement('p');
      text.innerHTML = options.text; // Allow HTML content
      content.appendChild(text);
    }

    // Button
    if (options.button) {
      const button = document.createElement('button');
      button.innerText = options.buttonText || 'OK';
      button.style.backgroundColor = options.button.color || '#ff4757';
      button.style.color = options.button.textColor || '#fff';
      button.style.width = options.button.width || 'auto';
      button.style.height = options.button.height || 'auto';
      button.style.borderRadius = '8px'; // Add a border-radius for consistent style
      button.style.padding = '10px'; // Default padding
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

    // Disable user interaction with the webpage while the sheet is open (btInteract)
    if (options.btInteract === false) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    }

    // Mark the sheet as open
    btsheet.isOpen = true;

    // Close on click outside (if allowed)
    if (options.outsideTouch) {
      overlay.addEventListener('click', function () {
        btsheet.closed();
      });
    }

    // Close button behavior (trigger the onClose callback)
    closeButton.addEventListener('click', function () {
      if (typeof options.onClose === 'function') {
        options.onClose(); // Call the onClose function when "X" is clicked
      }
      btsheet.closed();  // Close the sheet
    });
  },

  // Dedicated method to close the sheet externally
  closed: function () {
    const sheet = btsheet.sheet;
    const overlay = btsheet.overlay;

    if (sheet && overlay) {
      sheet.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(sheet);
        document.body.removeChild(overlay);

        // Re-enable user interaction (if disabled before)
        document.body.style.overflow = 'auto';

        // Mark the sheet as closed
        btsheet.isOpen = false;
      }, 300);
    }
  }
};
