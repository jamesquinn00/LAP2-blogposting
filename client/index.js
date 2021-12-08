submitForm = document.querySelector("#submit")
blogContainer = document.querySelector("#blog-container")

document.addEventListener("DOMContentLoaded", getAllPosts)

submitForm.addEventListener("submit", (e)=>{
    addPost(e)
})

async function getAllPosts(){
    try{
        let data = await fetch('http://localhost:3000/posts')
        data = await data.json()
        for(let x in data.blogs){
            console.log(data.blogs[x])
            let newUl = document.createElement("ul")
            for(let i in data.blogs[x]){
                let blog = data.blogs[x]
                let newLi = document.createElement("li")
                newLi.textContent = blog[i]
                newUl.appendChild(newLi)
                blogContainer.appendChild(newUl)
            }
        }
        
    }catch(err){
        console.log(err)
    }
};

async function addPost(e){
    e.preventDefault()
    const postData = {
        title: e.target.title.value,
        content: e.target.content.value,
        name: e.target.name.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        .then(() => e.target.reset())
        .catch(console.warn)
};
