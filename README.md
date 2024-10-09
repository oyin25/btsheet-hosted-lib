
# btsheet-hosted
**btsheet-hosted** is a simple and customizable bottom sheet dialog library for the web. It allows you to create stylish and highly customizable bottom sheets with optional close buttons, customizable dimensions, glass effects, and more.

## Current Version
1.0.0

## Demo
- [Docs available here](https://oyin25.github.io/btsheet-hosted-lib/)

## CDNs
To include **btsheet-hosted** in your project using a CDN, add the following scripts:

### CSS and JS via jsDelivr
- [btsheet-hosted.css](https://cdn.jsdelivr.net/gh/oyin25/btsheet-hosted-lib@latest/btsheet-hosted.css)
- [btsheet-hosted.js](https://cdn.jsdelivr.net/gh/oyin25/btsheet-hosted-lib@latest/btsheet-hosted.js)

## Installation

### npm
To install via npm, use the following command:
```bash
npm install btsheet-hosted
```

### yarn
To install via yarn, use the following command:
```bash
yarn add btsheet-hosted
```

## Features
- Customizable title, text, and button options.
- Glass effect and custom background color.
- Optional close button (`btClose`).
- Configurable `btInteract` to disable user interaction with the webpage while the bottom sheet is open.
- Supports HTML content for flexible customization.

## Quick Start

### Basic Usage

#### Step 1: Include the CSS and JS files
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/oyin25/btsheet-hosted-lib@latest/btsheet-hosted.css">
<script src="https://cdn.jsdelivr.net/gh/oyin25/btsheet-hosted-lib@latest/btsheet-hosted.js"></script>
```

#### Step 2: Create a Bottom Sheet
To create and display a bottom sheet dialog using **btsheet-hosted**, use the following example:
```javascript
btsheet.hosted({
  title: "Welcome!",
  text: "Thank you for visiting our site.",
  buttonText: "Get Started",
  btButton: function() {
    alert('Button Clicked!');
  }
});
```

## API Reference

### `btsheet.hosted(options)`
- **`options`** (Object): The `options` object allows you to customize the behavior and appearance of the bottom sheet.

#### Options:

| Option          | Type      | Description                                                                                                   |
|-----------------|-----------|---------------------------------------------------------------------------------------------------------------|
| `title`         | `string`  | Title of the bottom sheet.                                                                                    |
| `text`          | `string`  | Description or text inside the bottom sheet (supports HTML content).                                          |
| `buttonText`    | `string`  | Text to display inside the button.                                                                            |
| `btButton`      | `function`| Custom function for the button click behavior.                                                                |
| `btImage`       | `object`  | Image properties including `src`, `width`, and `height`.                                                      |
| `btBody`        | `object`  | Customize the body styles (`backgroundColor`, `textColor`, `titleColor`, `glassEffect`).                      |
| `btDim`         | `string`  | Dims the background with a percentage (e.g., `"50%"`).                                                        |
| `btClose`       | `boolean` | Set to `false` to hide the close button ("X"). By default, it is `true`.                                      |
| `btInteract`    | `boolean` | Disable user interaction with the webpage while the sheet is open (`true` or `false`). Default is `true`.     |
| `outsideTouch`  | `boolean` | Close the sheet when clicked outside if `true`.                                                               |
| `onClose`       | `function`| Custom function when the bottom sheet is closed via the close button ("X").                                   |

## Examples

### Example 1: Basic Bottom Sheet with Button
```javascript
btsheet.hosted({
  title: "Welcome!",
  text: "Start your journey with us!",
  buttonText: "Let's Go!",
  btButton: function() {
    alert('Button Clicked!');
  }
});
```

### Example 2: Glass Effect with Custom Button and Dim Background
```javascript
btsheet.hosted({
  title: "Multitap!",
  text: "Increase the amount of TAP you can earn per one tap.",
  buttonText: "Get it!",
  btButton: function() {
    alert('Button Clicked!');
  },
  btBody: {
    backgroundColor: "rgba(0, 0, 255, 0.6)",
    textColor: "#fff",
    glassEffect: true
  },
  btDim: "50%"
});
```

### Example 3: Use HTML in Content and Custom Close Button
```javascript
btsheet.hosted({
  title: "Form Example",
  text: `
    <h1>Fill the Form</h1>
    <input type="text" id="username" placeholder="Enter username">
    <input type="email" id="email" placeholder="Enter email">
  `,
  buttonText: "Submit",
  btButton: function() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    if (username && email) {
      btsheet.closed();
      alert(`Username: ${username}, Email: ${email}`);
    } else {
      alert('Please enter both username and email.');
    }
  },
  btClose: true,  // Close button enabled
  outsideTouch: true,
  btDim: "50%",
  onClose: function() {
    console.log("Bottom sheet closed via close button");
  }
});
```

## Callbacks and Interaction

### onClose Callback
The `onClose` option allows you to define custom behavior when the user clicks the close button ("X").
```javascript
btsheet.hosted({
  title: "Notice",
  text: "This will close in 5 seconds.",
  btClose: true,
  onClose: function() {
    console.log("Closed via close button.");
  }
});
```

### Custom Close Function
You can close the sheet programmatically using the `btsheet.closed()` method.
```javascript
btsheet.closed();
```

## Development

To contribute or modify this library, ensure you have the following setup:

1. Clone the repository:
```bash
git clone https://github.com/oyin25/btsheet-hosted-lib.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the build process:
```bash
npm run build
```

## License
This library is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
