const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.npoint.io/cde31b956b755cd1ab55', true)
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("berhasil", xhr.response)
            resolve(JSON.parse(xhr.response))
        } else {
            console.log("gagal", xhr.response)
            reject("Internet server error!!")
        }
    }

    xhr.onerror = () => {
        reject("Network Error!!")
        console.log("Network error! please check you connection!")
    }
    xhr.send()
})


async function allTestimonials() {
    let testimonialHTML = ``
    const testimonialData = await promise

    testimonialData.forEach((item) => {
        testimonialHTML += `
        <div class="testimonial"> 
        <img src="${item.image}" class="profile-testimonial" />
        <p class="quote">"${item.content}"</p>
        <p class="author"> "${item.author}" </p> 
        <p class="author"> "${item.rating}" <i class="fa-solid fa-star"></i> </p> 
        </div>`
    })


    document.getElementById("testimonials").innerHTML = testimonialHTML
}

allTestimonials()

async function filterTestimonials(rating) {
    let testimonialHTML = ``
    const testimonialData = await promise

    const testimonialsFiltered = testimonialData.filter((item) => {
        return item.rating === rating
    })

    if (testimonialsFiltered.length === 0) {
        testimonialHTML = `<h3> Data NOT found!! </h3>`
    } else {
        testimonialsFiltered.forEach((item) => {
            testimonialHTML += `
            <div class="testimonial"> 
            <img src="${item.image}" class="profile-testimonial" />
            <p class="quote">"${item.content}"</p>
            <p class="author"> "${item.author}" </p> 
            <p class="author"> "${item.rating}" <i class="fa-solid fa-star"></i> </p> 
            </div>`
        })
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML
}