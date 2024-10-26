try {
    document.createEvent('TouchEvent');
    alert("I know the interface looks awful, try using Desktop Site / rotating your screen \u{1f64f}");
} catch {
    console.log('awful');
}

const box = document.getElementById('result')
const keys = Array.from(document.querySelectorAll('.key'));
let c = '';
let w = true;
function b(s) {
    if (w) {
        box.innerHTML += s;
        c += s;
    }
}

const handle = {
    0: () => b('9'),
    1: () => b('8'),
    2: () => b('7'),
    3: () => (box.innerHTML = box.innerHTML.substring(0, box.innerHTML.length - 1), c = c.substring(0, c.length - 1)),
    4: () => (box.innerHTML = c = '', w = true),
    5: () => b('6'),
    6: () => b('5'),
    7: () => b('4'),
    8: () => b('+'),
    9: () => b('-'),
    10: () => b('3'),
    11: () => b('2'),
    12: () => b('1'),
    13: () => b('\u00D7'),
    14: () => b('\u00F7'),
    15: () => b('.'),
    16: () => b('0'),
    17: () => b('\u03C0'),
    18: () => {
        let c1 = c2 = '';
        if (c === '' || (c.length < 3 && !/\u03C0/.test(c)) || /(\u00D7|\u00F7|\+|\-|\.){2,}/.test(c) || /^(\u00D7|\u00F7|\.)|(\u00D7|\u00F7|\+|\-|\.)$/.test(c) || /\u03C0\.|\.\u03C0/.test(c)) {
            box.innerHTML = 'Syntax Error';
            return w = false;
        } else {
            let index = c.split('').indexOf('\u03C0');
            c1 = c;
            if (/\u03C0[0-9]/.test(c)) {
                c1 = c.substring(0, index + 1) + '\u00D7' + c.substring(index + 1);
            }
            if (/[0-9]\u03C0/.test(c)) {
                c1 = c1.substring(0, index) + '\u00D7' + c1.substring(index);
            }
            c2 = c1.split(/(\u00D7|\u00F7|\+|-)/);
            if (c2[0] === '') {
                c2.splice(0, 1);
                c2[0] = c2[0] += c2[1];
                c2.splice(1, 1)
            }
            c2.forEach((v) => {
                /[0-9]/.test(v) ? c2[c2.indexOf(v)] = Number(v) : /\u03C0/.test(v) ? c2[c2.indexOf(v)] = Math.PI : void(0);
            });
            let mdOperators = c2.filter((v) => /\u00D7|\u00F7/.test(v));
            for (let i = 0; i < mdOperators.length; i++) {
                let operator = c2.indexOf(mdOperators[i]);
                if (/\u00D7/.test(mdOperators[i])) {
                    c2[operator + 1] = c2[operator + 1] * c2[operator - 1];
                    c2.splice(operator - 1, 2);
                } else {
                    c2[operator + 1] = c2[operator - 1] / c2[operator + 1];
                    c2.splice(operator - 1, 2);
                }
            }
            let asOperators = c2.filter((v) => /\+|\-/.test(v));
            for (let i = 0; i < asOperators.length; i++) {
                let operator = c2.indexOf(asOperators[i]);
                if (/\+/.test(asOperators[i])) {
                    c2[operator + 1] = c2[operator + 1] + c2[operator - 1];
                    c2.splice(operator - 1, 2);
                } else {
                    c2[operator + 1] = c2[operator - 1] - c2[operator + 1];
                    c2.splice(operator - 1, 2);
                }
            }
            return box.innerHTML = c = c2[0];
        }
    }
}

box.addEventListener('wheel', (e) => {
    e.deltaY < 0 ? box.scrollLeft -= 10 : box.scrollLeft += 10;
});

for (const item of keys) {
    item.addEventListener('click', (e) => {
        handle[keys.indexOf(e.target)]();
    });
}