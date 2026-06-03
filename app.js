const openMemory = document.getElementById('openMemory')
const canvas = document.querySelector('section > div')
const memoryAdd = document.getElementById('memoryAdd')
const display = document.getElementById('display')
const calculatorButtons = document.getElementById('calculatorButtons')

let isOpenPanel = false
let memory = JSON.parse(localStorage.getItem("memory")) || []
let calculacion = ''

const isOperator = (display) => {
    const res = ['-', '+', '/', '*', '.'].includes(display[display.length - 1])
    return res
}

const istOperator = (display) => {

    if (display >= 0) {
        let res
        if (display.includes('*') || display.includes('/') || display.includes('-') || display.includes('+')) {
            res = false
        } else {
            res = true
        }
        return res
    } else {
        let res
        for (let i = 1; i < display.length; i++) {
            if (display[i] === '*' || display[i] === '/' || display[i] === '-' || display[i] === '+') {
                res = false
                break
            } else {
                res = true
            }
        }

        return res
    }


}


openMemory.addEventListener('click', () => {
    if (!isOpenPanel) {
        const open = document.createElement('div')
        const closeDiv = document.createElement('div')
        const memoryDiv = document.createElement('div')
        closeDiv.innerHTML = `
        <i id='close' class="bi bi-x-lg"></i>
        `
        memoryDiv.className = 'memoryDiv'

        open.className = 'openMemory'
        closeDiv.className = 'closeDiv'

        const close = closeDiv.children[0]

        close.addEventListener('click', () => {
            isOpenPanel = false
            open.className = 'closeMemory'
            open.innerHTML = ''
            setTimeout(() => {
                open.remove()
            }, 250);

        })


        memory.forEach(el => {
            let div = document.createElement('div')
            div.innerHTML = `
            <p> ${el} </p>
            <i class="bi bi-trash"></i>
            `
            div.className = 'memoryDivChild'

            const trashMemory = div.children[1]

            trashMemory.addEventListener('click', () => {
                div.remove()
                let index = memory.indexOf(el)
                memory.splice(index, 1)
                localStorage.setItem("memory", JSON.stringify(memory))
            })

            memoryDiv.append(div)
        });


        open.append(closeDiv, memoryDiv)
        canvas.append(open)
        isOpenPanel = true
    }
})

memoryAdd.addEventListener('click', () => {
    memory.push(display.innerText)
    localStorage.setItem("memory", JSON.stringify(memory))
})


calculatorButtons.addEventListener('click', event => {
    const clickedButtons = event.target.innerText

    if ([...calculatorButtons.children].includes(event.target)) {
        if (clickedButtons === 'C') {
            display.innerText = 0
        } else if (clickedButtons === '⌫') {
            let subIndex = display.innerText.length - 1

            if (display.innerText[subIndex - 1] === '.') {
                display.innerText = display.innerText.substring(0, subIndex - 1)
            }

            if (subIndex > 0) {
                display.innerText = display.innerText.substring(0, subIndex)
            } else {
                display.innerText = 0
            }


        } else if (clickedButtons === '%' && !isOperator(display.innerText) && istOperator(display.innerText)) {
            display.innerText = Number(display.innerText) / 100;
        } else if (clickedButtons === '1/x' && !isOperator(display.innerText) && istOperator(display.innerText)) {
            if (Number(display.innerText) !== 0) {
                display.innerText = 1 / Number(display.innerText)
            }
        } else if (clickedButtons === 'x²' && !isOperator(display.innerText) && istOperator(display.innerText)) {
            display.innerText = Math.pow(display.innerText, 2)
        } else if (clickedButtons === '√x' && !isOperator(display.innerText) && istOperator(display.innerText)) {
            display.innerText = Math.sqrt(display.innerText)
        } else if (clickedButtons === '+/-' && !isOperator(display.innerText) && istOperator(display.innerText)) {
            display.innerText = display.innerText * -1
        } else if (clickedButtons === '=' && !isOperator(display.innerText)) {
            calculacion = display.innerText
            display.innerText = eval(display.innerText)
        } else if (['-', '+', '/', '*', '.'].includes(clickedButtons) && !isOperator(display.innerText)) {
            display.innerText = display.innerText + clickedButtons
        } else {
            if (!['=', 'M+', '+/-', 'x²', '1/x', '√x', '%', '.', '-', '+', '/', '*'].includes(clickedButtons)) {
                if (Number(display.innerText) === 0) {
                    display.innerText = clickedButtons
                } else {
                    display.innerText = display.innerText + clickedButtons
                }
            }
        }
    }
})




