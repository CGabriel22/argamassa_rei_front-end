let expandButton = document.querySelectorAll('.menuActivator');


expandButton.forEach(e => {
    e.addEventListener('click', ()=> {
        let menu = e.nextElementSibling
        let inputText = e.previousElementSibling
        e.classList.toggle('statusBtnAnimation');

        if (menu.classList.contains('display-none')) {
            menu.classList.remove('display-none')
            let menuItems = Array.from(e.nextElementSibling.children);
            menuItems.forEach(e => {
                e.addEventListener('click', () => {
                    let valor = e.textContent
                    inputText.innerHTML = valor
                    menu.classList.add('display-none')
                })
            })
        } else {
            menu.classList.add('display-none')
        };
        })
});
