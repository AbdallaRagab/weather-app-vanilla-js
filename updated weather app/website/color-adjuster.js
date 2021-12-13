    // CONSTANTS
    const slider = document.getElementById('color-slider')
    const pages = document.getElementsByClassName('page')

    // Initialize
    Array.prototype.forEach.call(pages , function(page) {
        page.style.backgroundColor = `hsl(${localStorage.bgcolor},100%,80%)`
    })
    slider.value  = localStorage.getItem("bgcolor");

    // Event
    slider.addEventListener("input", onChange);

    // Event Function
    function onChange(event) {
        let color = slider.value
        localStorage.bgcolor = color;
        Array.prototype.forEach.call(pages , function(page) {
            page.style.backgroundColor = `hsl(${color},100%,80%)`
        })
    }