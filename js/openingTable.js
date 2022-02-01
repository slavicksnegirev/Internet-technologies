let block = document.querySelector('.collapsible')
let coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            block.style.backgroundColor = '#cccccc';
            block.style.width = '';
            block.style.borderRadius = '15px';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            block.style.backgroundColor = '#ababab';
            block.style.width = '100%';
            block.style.borderBottomLeftRadius = '0';
            block.style.borderBottomRightRadius = '0';
        }
    })
}

console.log(block);
console.log(coll);
// использовать только query selector
