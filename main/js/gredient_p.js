document.addEventListener('DOMContentLoaded', function () {
  let span1, span2; // Declare variables outside the functions to make them accessible

  // Function to generate random color
  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Function to generate random linear gradient
  function getRandomGradient() {
    let angle = Math.floor(Math.random() * 361); // Random angle between 0 and 360 degrees
    let colors = [];
    for (let i = 0; i < 2; i++) {
      colors.push(getRandomColor());
    }
    return `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`;
  }

  // Function to create and display the lists
  function createLists() {
    let container = document.getElementById('container');

    // Clear previous content
    container.innerHTML = '';

    // Create 12 unordered lists
    for (let i = 0; i < 8; i++) {
      let ul = document.createElement('ul');

      // Add 12 list items to each unordered list
      for (let j = 0; j < 8; j++) {
        let li = document.createElement('li');
        let gradient = getRandomGradient();
        li.style.background = gradient; // Apply random gradient background

        let afterElement = document.createElement('span');
        afterElement.textContent = '...'; // Example content for the pseudo-element
        afterElement.classList.add('pseudo-element'); // Add a class for styling

        // Append the pseudo-element to the list item
        li.appendChild(afterElement);

        // Add event listener to handle clicks on the pseudo-element
        afterElement.addEventListener('click', function () {
          let box = document.createElement('div');
          box.textContent = 'Box shown!';
          box.classList.add('box'); // Add class for styling

          // Append the copy button to the box
          let copyButton = copyCSSCode(gradient);
          box.appendChild(copyButton);

          let downloadButton = downloadImage(li);
          box.appendChild(downloadButton);

          let FullScreen = viewInFullScreen(li);
          box.appendChild(FullScreen)

          // Position the box relative to the clicked pseudo-element
          let rect = afterElement.getBoundingClientRect();
          box.style.top = (rect.top + window.pageYOffset) + 'px';
          box.style.left = (rect.left + window.pageXOffset) + 'px';

          // Append the box to the body
          document.body.appendChild(box);

          // Remove the box after 2 seconds
          setTimeout(function () {
            box.remove();
          }, 2000);
        });

        let colorMatches = gradient.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|(rgba?)\([^)]*\)/g);

        if (colorMatches && colorMatches.length >= 2) {
          li.dataset.color1 = colorMatches[0];
          li.dataset.color2 = colorMatches[1];
        } else {
          console.error("Failed to extract color codes from gradient:", gradient);
        }

        // Add event listeners for mouseover and mouseout
        li.addEventListener('mouseover', showColorCodes);
        li.addEventListener('mouseout', hideColorCodes);
        ul.appendChild(li);
      }

      container.appendChild(ul); // Append the unordered list to the container
    }
  }

  // Function to show color codes and copy button on mouseover
  function showColorCodes(event) {
    let li = event.target;
    let color1 = li.dataset.color1;
    let color2 = li.dataset.color2;

    if (event.target.tagName === 'SPAN') {
      let span = event.target;
      span.style.color = 'black';
    } else {

      span1 = document.createElement('span');
      span1.textContent = color1;
      span1.style.backgroundColor = color1;

      span2 = document.createElement('span');
      span2.style.backgroundColor = color2;
      span2.textContent = color2;


      if (span1 && span2) {
        // Append color code spans to the li element
        li.appendChild(span1);
        li.appendChild(span2);
      } else {
        console.error('Invalid span elements');
      }


    }
  }

  // Function to hide color codes and copy button on mouseout
  function hideColorCodes(event) {
    // Restore the removed span elements after a delay
    if (span1) span1.remove();
    if (span2) span2.remove();
    // if(!afterElement) li.appendChild(afterElement);


  }

  // Function to copy CSS code
  function copyCSSCode(gradient) {
    let copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.classList.add('button'); // Add class for styling
    copyButton.onclick = function () {
      navigator.clipboard.writeText(`background: ${gradient};`).then(() => {
        copyButton.textContent = 'Copied';
      }).catch(err => {
        console.error('Failed to copy CSS code: ', err);
      });
    };
    return copyButton;
  }


  function isValidColor(color) {
    return color && (color.trim() !== '' || color.toLowerCase().startsWith('rgb'));
  }

  function downloadImage(li) {
    let downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Image';
    downloadButton.classList.add('button');

    // Get color values from dataset properties
    let color1 = li.dataset.color1;
    let color2 = li.dataset.color2;

    console.log('color1:', color1);
    console.log('color2:', color2);

    // Check if color values are not empty
    if (!isValidColor(color1) || !isValidColor(color2)) {
      console.error('Empty or invalid color values in dataset');
      return;
    }

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 900; // Adjust width as needed
    canvas.height = 700; // Adjust height as needed

    // Define the default angle and image string
    let angle = 45; // Default angle if not provided
    let image = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

    // Parse the CSS-like gradient string to extract the angle and colors
    let matches = image.match(/linear-gradient\((\d+)deg, (.+), (.+)\)/);
    if (matches && matches.length === 4) {
      angle = parseInt(matches[1]);
      color1 = matches[2].trim();
      color2 = matches[3].trim();
    }

    // Create a linear gradient using the extracted values
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    // Fill the canvas with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add click event listener to the download button
    downloadButton.addEventListener('click', function () {
      setTimeout(function () {
        let link = document.createElement('a');
        link.download = 'image.png';
        link.href = canvas.toDataURL();
        link.click();
      }, 100);
    });

    return downloadButton;
  }


   function viewInFullScreen(li) {
    let fullScreenButton = document.createElement('button');
    fullScreenButton.textContent = 'View Full Screen';
    fullScreenButton.classList.add('button');
    fullScreenButton.onclick = function () {
        // Code to display the selected li in full screen
        li.requestFullscreen();
    };

    let container = document.createElement('div');
   
    container.appendChild(fullScreenButton);

 // If the selected li is in full-screen mode
            let exitFullScreenButton = document.createElement('button');
            exitFullScreenButton.textContent = 'Exit Full Screen';
            exitFullScreenButton.classList.add('button');

    document.addEventListener('fullscreenchange', function () {
        if (document.fullscreenElement === li) {
            exitFullScreenButton.onclick = function () {
                // Code to exit full screen mode
                document.exitFullscreen();
            };
            li.appendChild(exitFullScreenButton);
            

        } else {
            // If full-screen mode is exited or another element is in full-screen mode
            let fullScreenButton = document.createElement('button');
            fullScreenButton.textContent = 'View Full Screen';
            fullScreenButton.classList.add('button');
            fullScreenButton.onclick = function () {
                // Code to display the selected li in full screen
                li.requestFullscreen();
            };
            if (exitFullScreenButton) {
              exitFullScreenButton.remove(); // Remove the exit full screen button if it exists
          }
            container.appendChild(fullScreenButton);
        }
    });

    return container;
}

createLists();

});
