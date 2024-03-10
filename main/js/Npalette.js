const searchInput = document.querySelector('#search-input'),
    searchColor = document.querySelector('.search-color'),
    searchImage = document.querySelector('#search-image'),
    typeSelect = document.querySelector('#palette-type'),
    typeText = document.querySelector('#type-text'),
    countSelect = document.querySelector('#palette-count'),
    randomBtn = document.querySelector('#random-btn'),
    paletteContainer = document.querySelector('#palette'),
    relatedContainer = document.querySelector('#related'),
    imageColorsContainer = document.querySelector("#image-colors"),
    imageColorWrapper = document.querySelector(".image-color-wrapper")

let currentColor = "skyblue",
    currentType = "analogous",
    currentCount = 6,
    imageColors = [];

// All Function to generate different palettes
function generate_analogous_palette(hsl, count) {
    //hsl is color ,count means qunatity of colors
    const palette = [];
    // get hue ,saturation ,lighteness, from hsl , this is the reason to use hsl
    const [hue, saturation, lightness] = hsl;

    //generate colors equals count 
    for (let i = 0; i < count; i++) {
        // add 30 and multiple to index for every color
        let new_hue = hue + 30 * i
        //new hue can be greater than 360 so check if greater than hue - 369
        if (new_hue > 360) {
            new_hue -= 360;
        }
        //add new color im palette array
        palette.push([new_hue, saturation, lightness])
    }
    //after getting all colors retun palette
    return palette
}

function generate_monochromatic_palette(hsl, count) {
    //same in this but instead of hue increaser lightness by 10 
    const palette = [];
    let [hue, saturation, lightness] = hsl;

    for (let i = 0; i < count; i++) {
        let new_lightness = (lightness = 10 * i);
        if (new_lightness > 100) {
            //lightness can't be greater than 100
            new_lightness -= 100;
        }
        //add new color im palette array
        palette.push([hue, saturation, lightness])
    }
    //after getting all colors retun palette
    return palette
}

function generate_triadic_palette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    // in triadic increase hue by 120
    for (let i = 0; i < count; i++) {
        let new_hue = hue + 120 * i;
        if (new_hue > 360) {
            new_hue -= 360;
        }
        palette.push([new_hue, saturation, lightness])
    }
    return palette
}

function generate_compound_palette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    // in compund  increase hue by 150
    for (let i = 0; i < count; i++) {
        let new_hue = hue + 150 * i;
        if (new_hue > 360) {
            new_hue -= 360;
        }
        palette.push([new_hue, saturation, lightness])
    }
    return palette
}
function generate_shades_palette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;

    // to get shades increase saturation by 10 

    for (let i = 0; i < count; i++) {
        let new_saturation = saturation + 10 * i;
        if (new_saturation > 100) {
            //saturation can't be greater than 100
            new_saturation -= 100;
        }
        palette.push([hue, new_saturation, lightness])
    }
    return palette
}

function generate_tetradic_palette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    // in tetradic increase hue by 90
    for (let i = 0; i < count; i++) {
        let new_hue = hue + 90 * i;
        if (new_hue > 360) {
            new_hue -= 360;
        }
        palette.push([new_hue, saturation, lightness])
    }
    return palette
}
function generate_square_palette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    // in triadic increase hue by 60
    for (let i = 0; i < count; i++) {
        let new_hue = hue + 60 * i;
        if (new_hue > 360) {
            new_hue -= 360;
        }
        palette.push([new_hue, saturation, lightness])
    }
    return palette
}
function generate_related_color_palette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    // to get related colors we'll play with hue , saturation and lightness

    //increase saturation by 20 and if greater than 100 reduce
    palette.push([hue, (saturation + 20) % 100, lightness]);
    //decrease by 20 
    palette.push([hue, (saturation - 20) % 100, lightness]);
    //increase lightness by 20 
    palette.push([hue, saturation, (lightness + 20) % 100]);
    //decrease lightness
    palette.push([hue, saturation, (lightness - 20) % 100]);
    //same with hue 
    palette.push([(hue + 20) % 360, saturation, lightness]);
    palette.push([(hue - 20) % 360, saturation, lightness]);

    // shuffle array

    for (let i = palette.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [palette[i], palette[j]] = [palette[j], palette[i]]
    }
    return palette
}

// a function to call a specific function above based on specific type
function generate_palette(hsl, type, count) {
    switch (type) {
        case "analogous":
            return generate_analogous_palette(hsl, count);
        case "monochromatic":
            return generate_monochromatic_palette(hsl, count);
        case "triadic":
            return generate_triadic_palette(hsl, count);
        case "compound":
            return generate_compound_palette(hsl, count);
        case "shades":
            return generate_shades_palette(hsl, count);
        case "tetradic":
            return generate_tetradic_palette(hsl, count);
        case "square":
            return generate_square_palette(hsl, count);
        case "related":
            return generate_related_color_palette(hsl, count);
    }
}

// function to generate HTML of palette

function generate_palette_html(type, container) {
    //container means for which container palette or related
    let color = currentColor;
    let count = currentCount;
    //we can give type of color like name of color , rgb , hex to get hsl
    const hsl = get_hsl_from_color(color);
    // if hsl null do nothing
    if (!hsl) return;
    let palette = [];
    container.innerHTML = "";
    // if type is image colors no need to generate palette we have imageColors
    if (type === "image-colors") {
        palette = imageColors;
    }
    else {
        palette = generate_palette(hsl, type, count);
    }


    palette.forEach((color) => {
        // if type image colors it already have hex colors so no need to comvert
        // convert hsl to hex
        if (type != "image-colors") {
            // convert hsl color to hex
            color = hsl_to_hex(color);
        }

        const colorEl = document.createElement("div");
        colorEl.classList.add("color");
        colorEl.style.backgroundColor = color;

        colorEl.innerHTML = `
        <div class="overlay">
          <div class="icons">
            <div class="copy-color" title ="copy color code">
              <i class="fas fa-copy"></i>
            </div>
            <div class="generate-palette" title = "Generate Palette">
              <i class="fas fa-palette"></i>
            </div>
          </div>
          <div class="code">${color}</div>
        </div>
      `
        container.appendChild(colorEl)
    })
}

function get_hsl_from_color(color) {
    // to get hsl from any type of given color
    let hsl;
    if (isValidColor(color)) {
        //id valid color name or ,hex, rgb,given
        // create a tep div element give it color and that get color  from that div which will be rgb always then we can convert rgb to hsl
        let temp = document.createElement("div");
        temp.style.color = color;
        document.body.appendChild(temp);
        //get all styles of temp div
        let styles = window.getComputedStyle(temp, null);
        //get only color from styles
        let rgb = styles.getPropertyValue("color")
        // no need of temp div remove it
        document.body.removeChild(temp);
        // remove rgb from (255,255,255) to [255 ,255, 255] 
        rgb = removeRGB(rgb);
        // convert rgb array to hsl
        hsl = rgb_to_hsl(rgb);
    }
    return hsl;
}

function isValidColor(color) {
    //check  color validity
    // a function to check if a given value is valid css
    return CSS.supports("color", color)
}

function removeRGB(rgb) {
    return rgb.replace("rgb(", "").replace(")", "").split(",");
}

function rgb_to_hsl(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let delta = cmax - cmin
    let h = 0;
    let s = 0;
    let l = (cmin + cmax) / 2;

    if (delta === 0) {
        h = 0;
        s = 0;
    }
    else if (cmax === r) {
        h = ((g - b) / delta) % 6;
    }
    else if (cmax === g) {
        h = ((b - r) / delta + 2);
    }
    else {
        h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }
    if (delta !== 0) {
        s = Math.round((delta / (1 - Math.abs(2 * l - 1))) * 100);
    }
    l = Math.round(l * 100);
    return [h, s, l]

}
function hsl_to_hex(hsl) {
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), - 1);
        return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`
}
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
console.log(getRandomColor());


generate_palette_html(currentType, paletteContainer);
generate_palette_html("related", relatedContainer);

//generate palette when a color  is written in input

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value;
    if (isValidColor(value)) {
        //if  valid color written
        searchColor.style.backgroundColor = value;
        currentColor = value;
        generate_palette_html(currentType, paletteContainer);
        generate_palette_html("related", relatedContainer);

    }
})

typeSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    currentType = value;
    typeText.textContent = value + "Palette";
    generate_palette_html(currentType, paletteContainer);

})

countSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    currentCount = value;
    generate_palette_html(currentType, paletteContainer);
});

randomBtn.addEventListener("click", () => {
    const randomColor = getRandomColor()
    searchInput.value = randomColor;
    searchColor.style.backgroundColor = randomColor;
    currentColor = randomColor;
    generate_palette_html(currentType, paletteContainer);
    generate_palette_html("related", relatedContainer);
})
//add event lister on each color
const palettes = document.querySelectorAll(".palette");
palettes.forEach((palette) => {
    palette.addEventListener("click", (e) => {
        const target = e.target;
        const color = target.parentElement.parentElement.children[1].textContent;

        if (target.classList.contains("copy-color")) {
            console.log(color);
            copyToClipboard(color);
            toast(`color${color} copied to clipboard`)
        }
        //if generate palette cliked 
        if (target.classList.contains("generate-palette")) {
            searchInput.value = color;
            searchColor.style.backgroundColor = color;
            currentColor = color;
            generate_palette_html(currentType, paletteContainer);
            generate_palette_html("related", relatedContainer);
            toast("palette generated for " + color)
        }
    })
})

function copyToClipboard(text) {
    // Create a new textarea element
    const textarea = document.createElement("textarea");
    // Set the value of the textarea to the specified text
    textarea.value = text;
    // Append the textarea to the document body
    document.body.appendChild(textarea);
    // Select the text in the textarea
    textarea.select();

    try {
        // Attempt to copy the selected text to the clipboard
        document.execCommand("copy");

        console.log("Text successfully copied to clipboard");
    } catch (err) {
        console.error("Unable to copy text to clipboard", err);
    } finally {
        // Remove the textarea from the document
        document.body.removeChild(textarea);
    }
}

// Example usage:
copyToClipboard("Hello, World!");

function toast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.style.top = "50px"
    toast.textContent = message;
    document.body.appendChild(toast)
    // add show clasd after some time to animate
    setTimeout(() => {
        toast.classList.add("show");
    }, 10)
    //remove after 5 sec
    setTimeout(() => {
        toast.classList.remove("toast");
        toast.addEventListener("transitionend", () => {
            toast.style.top = "-50px"
            toast.remove()
        })
    }, 1000)
}
searchImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const image = new Image()
            image.src = reader.result
            image.onload = function () {
                extractColorsFromImage(image)
            }
        }
    }
})

function extractColorsFromImage(image) {
    // we can increase or decrease  color to detect by amount
    colorjs.prominent(image, { amount: 6, format: "hex" }).then((color) => {
        // empty imageColors array 
        imageColors = [];
        imageColors.push(...color);
        if (imageColorWrapper) {
            generate_palette_html("image-colors", imageColorsContainer);
            // show image colors wrapper 
            imageColorWrapper.classList.remove("hidden");
        } else {
            console.error('Error: imageColorsWrapper is null or undefined');
        }

    })
        .catch((error) => {
            console.error('Error extracting colors:', error);
        });
}

const downloadBtn = document.querySelector("#download-btn"),
    downloadFormat = document.querySelector("#download-format"),
    downloadName = document.querySelector("#download-name");

downloadBtn.addEventListener("click", () => {
    const format = downloadFormat.value;
    let name = downloadName.value;
    // if name is empty
    name = name == "" ? "palette" : name;
    downloadpalette(format, name);
});

function downloadpalette(format, name) {
    const palette = document.querySelector("#palette");
    const paletteColors = palette.querySelectorAll(".color");
    const colors = [];
    // store all colors of palette in a array
    paletteColors.forEach((color) => {
        colors.push(color.style.backgroundColor);
    });
    switch (format) {
        case "png":
            download_palette_png(colors, name);
            break;
        case "svg":
            download_palette_svg(colors, name);
            break;
        case "css":
            download_palette_css(colors, name);
            break;
        case "json":
            download_palette_json(colors, name);
            break;
        default :
        break;


    }
    function download_palette_png(colors, name) {
        const canvas = document.createElement("canvas");
        canvas.width = colors.length * 200;
        canvas.height = 1000;
        const ctx = canvas.getContext("2d");
        colors.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(index * 200, 0, 200, 1000)
        });
        //dowmload canvas as png
        const link = document.createElement("a");
        link.download = name + ".png";
        link.href = canvas.toDataURL();
        link.click()
    }

    function download_palette_svg(colors, name) {
        if (!Array.isArray(colors)) {
            console.error("Colors must be an array");
            return;
        }
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewbox", "0 0 100 100");
        svg.setAttribute("preserveAspectRatio", "none");
        //add all colors in svg
        colors.forEach((color, index) => {
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            const width = 100 / colors.length;
            rect.setAttribute("x", index * width)
            rect.setAttribute("y", 0);
            rect.setAttribute("width", width);
            rect.setAttribute("height", 100);
            rect.setAttribute("fill", color);
            svg.appendChild(rect)
        });
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml; charset = utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.download = name + '.svg';
        downloadLink.href = svgUrl;
        downloadLink.click();


    }
    function download_palette_css(colors, name) {
        const css = `:root{
            ${colors.map((color, index) => ` --color-${index + 1} :${color};`).join("\n")}
        } `;
        const blob = new Blob([css], { type: "text/css" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = name + ".css";
        link.href = url;
        link.click()
    }

    function download_palette_json(colors, name) {
        const json= JSON.stringify(colors) ; 
        const blob = new Blob([json],
             { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = name + ".json";
        link.href = url;
        link.click()
    }
}
const toggle = document.querySelector("#toggle") ;
toggle.addEventListener("change" ,(e) =>{
    
    if(e.target.checked){
        console.log('clicked');
        document.body.classList.add("dark") ;
    }else{
        document.body.classList.remove("dark") ;
    }
})