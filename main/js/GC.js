
document.addEventListener('DOMContentLoaded', function () {
    const hexNumber = ["0", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    let hex1 = "000000";
    let hex2 = "000000";
    const Generate = document.querySelector("#Generate");
    const copy = document.querySelector('#copy');

    Generate.addEventListener("click", () => {
        GenerateRandomHex();
    });
    copy.addEventListener("click", () => {
        copy.innerHTML = "Copied";
        copyHex();
        setTimeout(() => {
            copy.innerHTML = "Copy";
        }, 5000); // Revert back to "Copy" after 5 seconds
    });
    
    function GenerateRandomHex() {
        hex1 = "";
        hex2 = "";
        for (let i = 0; i < 6; i++) {
            hex1 += (hexNumber[Math.floor(Math.random() * hexNumber.length)]);
            hex2 += (hexNumber[Math.floor(Math.random() * hexNumber.length)]);
        }
        document.querySelector("#hex1").innerHTML = hex1;
        document.querySelector('#hex2').innerHTML = hex2;
        document.body.classList = "";
        document.body.classList.add("gradient-background");
        document.body.style.backgroundImage = `linear-gradient(45deg ,#${hex2} ,#${hex1})`;
        generateColors(); // Update colors when the gradient is generated
    }

    function copyHex() {
        const gradient = `background-image: linear-gradient(45deg ,#${hex1} ,#${hex2})`;
        navigator.clipboard.writeText(gradient);
    }

    const ContainerEl = document.querySelector('.color_wrapper ul');
    const btnEl = document.querySelector('#Generate');
    const messageEl = document.querySelector('.message');

    const generateColors = () => {
        ContainerEl.innerHTML = "";

        // Generate a base color for background (33.3%)
        const bgColor = `#${hex1}`;
        const bgColorHtml = `<li>
                             <div class="color_box" style="background:${bgColor}">
                                 <span class="color_value">${bgColor}</span>
                                 <div class="message-container"></div>
                             </div>
                             <button class="btn" data-color="${bgColor}">copy</button>
                         </li>`;
        ContainerEl.insertAdjacentHTML("beforeend", bgColorHtml);

        // Generate a secondary color for text (33.3%)
        const textColor = lightenDarkenColor(bgColor, -30);
        const textColorHtml = `<li>
                            <div class="color_box" style="background:${textColor}">
                                <span class="color_value">${textColor}</span>
                                <div class="message-container"></div>
                            </div>
                            <button class="btn" data-color="${textColor}">copy</button>
                        </li>`;
        ContainerEl.insertAdjacentHTML("beforeend", textColorHtml);

        // Generate accent colors (33.3%)
        const accentColors = generateAccentColors(bgColor, 7); // 9 colors in total (including base and secondary)
        accentColors.forEach((accentColor) => {
            const accentColorHtml = `<li>
                                    <div class="color_box" style="background:${accentColor}">
                                        <span class="color_value">${accentColor}</span>
                                        <div class="message-container"></div>
                                    </div>
                                    <button class="btn" data-color="${accentColor}">copy</button>
                                </li>`;
            ContainerEl.insertAdjacentHTML("beforeend", accentColorHtml);
        });

        // Set up click event for all copy buttons
        const copyButtons = document.querySelectorAll('.btn');
        copyButtons.forEach((copyButton) => {
            copyButton.addEventListener('click', handleCopyClick);
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

    // Set up click event for all copy buttons
    const copyButtons = document.querySelectorAll('.btn');
    copyButtons.forEach((copyButton) => {
        copyButton.addEventListener('click', handleCopyClick);
    });

    function handleCopyClick(event) {
        const clickedColor = event.target.dataset.color;
        const clickedButton = event.target;
        copyColorCode(clickedColor, clickedButton);
    }

    function copyColorCode(val, button) {
        navigator.clipboard.writeText(val)
            .then(() => {
                console.log(`Copied ${val}`);
                button.innerHTML = "Copied";
                setTimeout(() => {
                    button.innerHTML = 'Copy';
                }, 3000); // Change back to "Copy" after 3 seconds (adjust as needed)
            })
            .catch((error) => {
                console.error('Unable to copy to clipboard', error);
            });
    }

    // Call the function to generate colors when the script runs
    generateColors();

    btnEl.addEventListener('click', generateColors);
});



