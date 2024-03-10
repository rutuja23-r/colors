function generateGradient() {
    const colors = document.querySelectorAll('.color-picker');
    const gradientColors = Array.from(colors).map(color => color.value);
    const gradientDirection = 'to right'; // Example direction, you can make this customizable

    const gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;

    const gradientPreview = document.getElementById('gradientPreview');
    gradientPreview.style.background = gradient;
  }

  function exportGradient() {
    const gradientPreview = document.getElementById('gradientPreview');
    const gradient = gradientPreview.style.background;

    // You can customize the export format here, for example, copying to clipboard
    navigator.clipboard.writeText(gradient).then(() => {
      alert('Gradient copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy gradient: ', err);
      alert('Failed to copy gradient. Please try again.');
    });
  }