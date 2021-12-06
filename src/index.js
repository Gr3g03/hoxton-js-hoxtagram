// write your code here
/* <article class="image-card">
<h2 class="title">Title of image goes here</h2>
<img src="./assets/image-placeholder.jpg" class="image" />
<div class="likes-section">
  <span class="likes">0 likes</span>
  <button class="like-button">♥</button>
</div>
<ul class="comments">
  <li>Get rid of these comments</li>
  <li>And replace them with the real ones</li>
  <li>From the server</li>
</ul>
</article> */

const imageContainer = document.querySelector('.image-container')
const cardImgEl = document.querySelector('.image-card')

const state = {
    images: []
}

function getImagesFromServer(){
   return fetch("http://localhost:3000/images")
   .then(function(resp){
     return resp.json()
    })
    // .then(function(images){
    //     console.log(images)
    // })
}



function renderImgaContainer(){
    // imageContainer.innerHTML = ''
    for (container of state.images){
    const articleEl = document.createElement('article')
    articleEl.setAttribute('class', 'image-card')

    const h2TextEl = document.createElement('h2')
    h2TextEl.textContent = container.title

    const imageEl = document.createElement('img')
    imageEl.setAttribute('class', 'image')
    imageEl.setAttribute('src', container.image)

    const likesDivEl = document.createElement('div')
    likesDivEl.setAttribute ('class', 'likes-section')

    const spanEL = document.createElement('span')
    spanEL.setAttribute('class', 'likes')
    spanEL.textContent = container.likes

    const LikeBtnEl = document.createElement('button')
    LikeBtnEl.setAttribute('class', 'like-button')
    LikeBtnEl.textContent = '♥'

    const comentUlEl = document.createElement('ul')
    comentUlEl.setAttribute('class', 'comments')
    for (const comment of container.comments){
        const comentLiEl = document.createElement('li')
        comentLiEl.textContent = comment.content
        comentUlEl.append(comentLiEl)
    }
    likesDivEl.append(spanEL, LikeBtnEl)
    articleEl.append(h2TextEl, imageEl, likesDivEl, comentUlEl)
    imageContainer.append(articleEl)

    for(const postEl of container){
        renderImgaContainer(postEl)
    }
}
}


function render(){
    renderImgaContainer()
}

getImagesFromServer().then(function(imageDataFromServer){
    state.images = imageDataFromServer
    render()
})

render()

