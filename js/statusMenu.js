let statusMenuButton = document.querySelectorAll('.statusMenuTrigger')

statusMenuButton.forEach(e => {
    e.addEventListener('click', function(event){
        e.classList.toggle('statusBtnAnimation');
        let getButtonId = event.target.id;
        let statusMenu = document.querySelector(`#${getButtonId} + .statusMenu`);
        statusMenu.classList.toggle('display-none')
    })
});


