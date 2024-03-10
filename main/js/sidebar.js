function toggleNav() {
    var sidebar = document.getElementById("sidebar");
    var icon = document.getElementById("icon");
    var closeBtn = document.getElementById("close-btn");

    sidebar.classList.toggle("show");
    icon.classList.toggle("show");

    // Toggle the visibility of the close button inside the sidebar
    if (closeBtn) {
        closeBtn.style.display = (closeBtn.style.display === 'none' || closeBtn.style.display === '') ? 'block' : 'none';
    }

    // Change the icon based on the sidebar visibility
    if (sidebar.classList.contains("show")) {
        // Sidebar is open, change the icon to the close button
        icon.innerHTML = '&times;'; // You can replace this with your close icon or text
    } else {
        // Sidebar is closed, change the icon to the hamburger
        icon.innerHTML = '&#9776;'; // You can replace this with your hamburger icon
    }

    // Close the sidebar when clicking outside it (optional, you can remove this part if not needed)
    document.addEventListener('click', function (event) {
        var isClickInside = sidebar.contains(event.target) || icon.contains(event.target);
        if (!isClickInside) {
            sidebar.classList.remove("show");
            icon.innerHTML = '&#9776;'; // Reset to the hamburger icon when closing
            if (closeBtn) {
                closeBtn.style.display = 'none';
            }
        }
    });
}
