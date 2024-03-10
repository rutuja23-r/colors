"use strict";

console.log("hello");
/*
const btnEl = document.querySelector('button');
const ContainerEl = document.querySelector('#color ul');
const messageEl = document.querySelector('.message');

const GenerateColors = () => {
    ContainerEl.innerHTML = "";

    // generate random color
    for (let i = 0; i < 16; i++) {
        let randomColor = Math.floor(Math.random() * 0xffffff).toString(16)
        randomColor = `#${randomColor.padStart(6, "0")}`;
        let html = `<li>
                     <div class="color_box" style="background:${randomColor}"></div>
                     <span class="color_value">${randomColor}</span>
                     </li>`;
        ContainerEl.insertAdjacentHTML("beforeend", html);

        //get ther value
        // get the values
        const colorsliEls = document.querySelectorAll("#color ul li");
        colorsliEls.forEach((colorsliEl) => {
            colorsliEl.addEventListener("click", () => {
                console.log("working");
                copyColorCode(randomColor);
            });
        });

    }
}

// copy color code
const copyColorCode = (val) => {
    navigator.clipboard.writeText(val).then(() => {
        messageEl.textContent = `You've Copied ${val} `
        messageEl.classList.add("active")

        setTimeout(() => {
            messageEl.classList.remove('active');
        }, 15000)
    })
}

// Call the function to generate colors when the script runs
GenerateColors();

btnEl.addEventListener('click' ,GenerateColors)
*/
const btnEl = document.querySelector('button');
const ContainerEl = document.querySelector('#color ul');
const messageEl = document.querySelector('.message');

const generateColors = () => {
    ContainerEl.innerHTML = "";

    // Generate a base color for background (60%)
    const bgColor = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
    const bgColorHtml = `<li>
                             <div class="color_box" style="background:${bgColor}"></div>
                             <span class="color_value">${bgColor}</span>
                         </li>`;
    ContainerEl.insertAdjacentHTML("beforeend", bgColorHtml);

    // Generate a secondary color for text (30%)
    const textColor = lightenDarkenColor(bgColor, -30);
    const textColorHtml = `<li>
                                <div class="color_box" style="background:${textColor}"></div>
                                <span class="color_value">${textColor}</span>
                            </li>`;
    ContainerEl.insertAdjacentHTML("beforeend", textColorHtml);

    // Generate accent colors (10%)
    const accentColors = generateAccentColors(bgColor, 6);
    accentColors.forEach((accentColor) => {
        const accentColorHtml = `<li>
                                    <div class="color_box" style="background:${accentColor}"></div>
                                    <span class="color_value">${accentColor}</span>
                                </li>`;
        ContainerEl.insertAdjacentHTML("beforeend", accentColorHtml);
    });

    // Set up click event for all color boxes
    const colorsLiEls = document.querySelectorAll("#color ul li");
    colorsLiEls.forEach((colorLiEl) => {
        colorLiEl.addEventListener("click", () => {
            const clickedColor = colorLiEl.querySelector('.color_value').textContent;
            copyColorCode(clickedColor);
        });
    });
};

const generateAccentColors = (baseColor, count) => {
    const accentColors = [];

    // Generate additional accent colors based on the base color
    for (let i = 0; i < count; i++) {
        const percentage = (i * 20) + 10; // Adjust the percentage as needed
        const accentColor = lightenDarkenColor(baseColor, percentage);
        accentColors.push(accentColor);
    }

    return accentColors;
};

const lightenDarkenColor = (color, percent) => {
    let num = parseInt(color.slice(1), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;

    R = Math.min(255, Math.max(0, R));
    G = Math.min(255, Math.max(0, G));
    B = Math.min(255, Math.max(0, B));

    const result = `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    return result;
};

const copyColorCode = (val) => {
    navigator.clipboard.writeText(val)
        .then(() => {
            messageEl.textContent = `You've Copied ${val} `;
            messageEl.classList.add("active");

            setTimeout(() => {
                messageEl.classList.remove('active');
            }, 1500);
        })
        .catch((error) => {
            console.error('Unable to copy to clipboard', error);
            // Handle the error, e.g., inform the user.
        });
};

// Call the function to generate colors when the script runs
generateColors();

btnEl.addEventListener('click', generateColors);
