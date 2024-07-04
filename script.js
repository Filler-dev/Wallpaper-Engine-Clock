const digitSegments = [
    [1, 2, 3, 4, 5, 6],
    [2, 3],
    [1, 2, 7, 5, 4],
    [1, 2, 7, 3, 4],
    [6, 7, 2, 3],
    [1, 6, 7, 3, 4],
    [1, 6, 5, 4, 3, 7],
    [1, 2, 3],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 7, 3, 6]
];

let showSeconds = false, hourFormat12 = false;

document.addEventListener('DOMContentLoaded', function () {
    _hours = document.querySelectorAll('.hours');
    _minutes = document.querySelectorAll('.minutes');
    _seconds = document.querySelectorAll('.seconds');

    setInterval(updateClock, 1000);
});

function updateClock() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();

    if (hourFormat12) {
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    setNumber(_hours[0], Math.floor(hours / 10));
    setNumber(_hours[1], hours % 10);
    setNumber(_minutes[0], Math.floor(minutes / 10));
    setNumber(_minutes[1], minutes % 10);

    if (showSeconds) {
        const seconds = date.getSeconds();
        setNumber(_seconds[0], Math.floor(seconds / 10));
        setNumber(_seconds[1], seconds % 10);
    }
}

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.seconds) {
            showSeconds = properties.seconds.value;
            toggleSeconds();
        }
        if (properties.hourformat12) {
            hourFormat12 = properties.hourformat12.value;
            updateClock();
        }
    }
};

function setNumber(digit, number) {
    const segments = digit.querySelectorAll('.segment');
    const current = parseInt(digit.getAttribute('data-value'));

    if (!isNaN(current) && current !== number) {
        digitSegments[current].forEach((digitSegment, index) => {
            setTimeout(() => {
                segments[digitSegment - 1].classList.remove('on');
            }, index * 45);
        });
    }

    if (isNaN(current) || current !== number) {
        setTimeout(() => {
            digitSegments[number].forEach((digitSegment, index) => {
                setTimeout(() => {
                    segments[digitSegment - 1].classList.add('on');
                }, index * 45);
            });
        }, 250);
        digit.setAttribute('data-value', number);
    }
}

function toggleSeconds() {
    const secondsElements = document.querySelectorAll('.seconds');
    secondsElements.forEach(element => {
        element.style.display = showSeconds ? 'inline-block' : 'none';
    });
}