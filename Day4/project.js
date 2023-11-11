let dataproject = []

function submitproject(event) {
    event.preventDefault()

    let inputTitle = document.getElementById("inputTitle").value
    let inputContent = document.getElementById("inputContent").value
    let inputImage = document.getElementById("inputImage").files

    console.log("title", inputTitle)
    console.log("content", inputContent)

    inputImage = URL.createObjectURL(inputImage[0])
    console.log("image", inputImage)

    const project = {
        title: inputTitle,
        content: inputContent,
        image: inputImage,
        postAt: startDate,
        author: "Surya Elidanto"
    }

    dataproject.push(project)
    console.log("dataproject", dataproject)
    renderproject()
}


function renderproject() {
    document.getElementById("contents").innerHTML = ''
    for (let index = 0; index < dataproject.length; index++) {
        document.getElementById("contents").innerHTML += `
        <div class="project-list-item">
            <div class="project-image">
                <img class="img-item" src="${dataproject[index].image}" alt="" />
            </div>
            <div class="project-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Delete Post</button>
                </div>
                <h1>
                    <a href="/Day4/project-details.html" target="_blank">${dataproject[index].title}</a>
                </h1>
                <div class="detail-project-content">
                    ${dataproject[index].postAt} | ${dataproject[index].author}
                </div>
                <p>
                   ${dataproject[index].content}
                </p>
            </div>
        </div>`
    }
}