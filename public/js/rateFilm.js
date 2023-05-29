const stars = document.querySelectorAll('.comment-stars>img')

function rateFilm(rate) {
    for(let i = 0; i < stars.length; i++) 
    {
        stars[i].style.filter = 'grayscale(100%) '
    }

    for (let i = 0; i < rate; i++) 
    {
        stars[i].style.filter = 'grayscale(0%)'
        stars[i].classList.add('active-star')
    
    }

}



function sendRate(e){
    e.preventDefault()
    const activeStars=document.querySelectorAll('.active-star')
    const commentText=document.querySelector('#comment-text').value
    
    const author=document.querySelector('#comment_author').value
    const film=document.querySelector('#comment_film').value
    console.log(activeStars,'----',commentText,film,author)

    if(activeStars.length>0){
    
    axios.post('/api/rate',{rate:activeStars.length,text:commentText,authorId:author,filmId:film}).then(data=>{
        if(data.data){
            alert('Ваш рейтинг добавлен!')
            setTimeout(() => {
               
            }, 10000);
            console.log('timeout 2 sec')
            location.reload()
            
        }
    })
 }

 

}