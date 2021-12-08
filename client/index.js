// getAllBtn = document.querySelector("#getAll")
submitForm = document.querySelector("#submit")
// deleteForm = document.querySelector("#delete")

document.addEventListener("DOMContentLoaded", getAllPosts)

submitForm.addEventListener("submit", (e)=>{
    addActor(e)
})

deleteForm.addEventListener("submit", (e)=>{
    deleteActor(e)
})

async function getAllPosts(){
    try{
        let data = await fetch('http://localhost:3000/posts')
        data = await data.json()
        console.log(data)
        const newUl = document.createElement("ul");
        // document.querySelector("#deleteId").setAttribute("max",data.actors.length)
        for(const x in data.posts){
            console.log(data.posts[x].name)
            const newLi = document.createElement("li");
            newLi.textContent = data.posts[x].id + ": " + data.posts[x].title + ", " + data.posts[x].content + " " + data.posts[x].name;
            newUl.appendChild(newLi);
            document.querySelector("p").appendChild(newUl)
    }
    }catch(err){
        console.log(err)
    }
};

async function addPost(e){
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

function deletePost(e){
    let id = e.target.id.value
    const options = { 
        method: 'DELETE',
    };
    fetch(`http://localhost:3000/posts/${id}`, options)
        .catch(console.warn)
}
