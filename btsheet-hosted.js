const btsheet = {
  hosted: function(options = {}) {
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
    
    // Create content area
    const content = document.createElement('div');
    content.className = 'btsheet-sheet-content';
    
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
      title.style.color = options.body?.titleColor || "#000"; // Apply custom title color
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
    button.style.backgroundColor = options.button?.color || '#6b4aff';
    button.style.color = options.button?.textColor || '#fff';
    content.appendChild(button);
    
    // Append header and content to the sheet
    sheet.appendChild(header);
    sheet.appendChild(content);
    document.body.appendChild(sheet);
    
    // Apply custom styles (optional)
    sheet.style.color = options.color || '#000';
    
    // Show the sheet
    setTimeout(() => {
      sheet.classList.add('show');
    }, 100);
    
    // Apply effect based on options
    if (options.effect && options.effect.type) {
      this.applyEffect(sheet, options.effect.type, options.body?.backgroundColor);
    }

    // Close on click outside (if allowed)
    if (options.outsideTouch) {
      window.addEventListener('click', function(event) {
        if (!sheet.contains(event.target)) {
          closeSheet();
        }
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
      }, 300);
      if (options.onClose) options.onClose();
    }
  },

  applyEffect: function(sheet, effectType, bodyBackgroundColor) {
    switch (effectType) {
      case 'glass':
        sheet.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Transparent background
        sheet.style.backdropFilter = 'blur(10px)';
        if (bodyBackgroundColor) {
          sheet.querySelector('.btsheet-sheet-content').style.backgroundColor = bodyBackgroundColor;
        }
        break;
      case 'blur':
        sheet.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        sheet.style.backdropFilter = 'blur(5px)';
        break;
      case 'fade':
        sheet.style.transition = 'opacity 0.5s ease-in-out';
        sheet.style.opacity = 0;
        setTimeout(() => {
          sheet.style.opacity = 1;
        }, 100);
        break;
      default:
        // Default effect - No glass effect, plain background
        sheet.style.backgroundColor = bodyBackgroundColor || 'rgba(255, 255, 255, 0.9)';
        sheet.style.backdropFilter = 'none';
        break;
    }
  }
};
