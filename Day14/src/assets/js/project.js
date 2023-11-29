let dataproject = []

function submitproject(event) {
    event.preventDefault()

    let inputProject = document.getElementById("inputProject").value
    let inputDesc = document.getElementById("inputDesc").value
    let inputImage = document.getElementById("inputImage").files
    let nodejs = document.getElementById("nodejs").checked
    let reactjs = document.getElementById("reactjs").checked
    let nextjs = document.getElementById("nextjs").checked
    let typescript = document.getElementById("typescript").checked
    let startDate = document.getElementById("startDate").value
    let endDate = document.getElementById("endDate").value

    inputImage = URL.createObjectURL(inputImage[0])

    const project = {
        title: inputProject,
        content: inputDesc,
        image: inputImage,
        startDate: startDate,
        endDate: endDate,
        technology: {
            node: nodejs,
            reactjs: reactjs,
            nextjs: nextjs,
            typescript: typescript,
        }
    }
    dataproject.push(project)

    function getDistanceTime(startDate, endDate) {
        const now = new Date(startDate)
        const then = new Date(endDate)
        const distance = then - now // miliseconds
        const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24)
        const distanceMonth = Math.floor(distanceDay / 30)
        const distanceYear = Math.floor(distanceMonth / 12)
        console.log(distanceDay)
        console.log(distanceMonth)
        console.log(distanceYear)
        if (distanceYear > 0) {
            return `${distanceYear} tahun`
        } else if (distanceMonth > 0) {
            return `${distanceMonth} bulan`
        } else if (distanceDay > 0) {
            return `${distanceDay} hari`
        } else return ""
    }

    function renderproject() {
        document.getElementById("contents").innerHTML = ''
        for (let index = 0; index < dataproject.length; index++) {
            const node = dataproject[index].technology.node
            const reactjs = dataproject[index].technology.reactjs
            const nextjs = dataproject[index].technology.nextjs
            const typescript = dataproject[index].technology.typescript

            const startDate = dataproject[index].startDate
            const endDate = dataproject[index].endDate

            document.getElementById("contents").innerHTML += `
                <div class="project-list-item">
                <div>
                <img class="img-item" src="${dataproject[index].image}" alt="" />
                </div>
                <div class="project-content">
                    <h4>
                    <a href="project-details.html" target="_blank">${dataproject[index].title}</a>
                    </h4>
                    <div class="detail-project-content">
                        ${getDistanceTime(startDate, endDate)}
                    </div>
                    <p>
                        ${dataproject[index].content}
                    </p>
                    <div>
                        ${node ? (
                            `<i class="fa-brands fa-node-js"></i>`
                        ) : ""}
                        ${reactjs ? (
                            `<i class="fa-brands fa-react"></i>`
                        ) : ""}
                        ${nextjs ? (
                            `<i class="fa-brands fa-js"></i>`
                        ) : ""}
                        ${typescript ? (
                            `<i class="fa-solid fa-bolt"></i>`
                        ) : ""}
                    </div>
                    <p>
                    
                    </p>
                    <div class="btn-group">
                        <button class="btn-edit">Edit</button>
                        <button class="btn-post">Delete</button>
                    </div>
                    </div>
                </div>`
        }
    }
    renderproject()
}