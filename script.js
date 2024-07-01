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

let clock_elem, showSeconds = false;

document.addEventListener('DOMContentLoaded', function () {
    clock_elem = document.getElementById("clock");

    const _hours = document.querySelectorAll('.hours');
    const _minutes = document.querySelectorAll('.minutes');
    const _seconds = document.querySelectorAll('.seconds');

    setInterval(function () {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        setNumber(_hours[0], Math.floor(hours / 10));
        setNumber(_hours[1], hours % 10);
        setNumber(_minutes[0], Math.floor(minutes / 10));
        setNumber(_minutes[1], minutes % 10);

        if (showSeconds) {
            setNumber(_seconds[0], Math.floor(seconds / 10));
            setNumber(_seconds[1], seconds % 10);
        }
    }, 1000);
});

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.seconds) {
            showSeconds = properties.seconds.value;
            toggleSeconds();
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