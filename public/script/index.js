const questionsContainer = document.querySelectorAll('.question');


const showContent = function( container ) {
    let p;
    let arrow; 


    if(!container.className){
        p = this.querySelector('.p');
        arrow = this.querySelector('.arrow');
    }else{
        p = container.querySelector('.p');
        arrow = container.querySelector('.arrow');

    }
    
    const height = p.scrollHeight;
    const actualHeight = p.offsetHeight;


    if( actualHeight == 0){
        p.style.height = height+"px"
        p.style.margin = "1rem 0 0 0"
        arrow.innerHTML = "-"
    }else{
        p.style.height = 0;
        p.style.margin = "0"
        arrow.innerHTML = "+"

    }
}


questionsContainer[0].addEventListener('click', showContent )
questionsContainer[3].addEventListener('click', showContent )

questionsContainer[1].querySelector('h3').addEventListener('click', function(){
    showContent(this.parentElement)
})

questionsContainer[2].querySelector('h3').addEventListener('click', function(){
    showContent(this.parentElement)
})