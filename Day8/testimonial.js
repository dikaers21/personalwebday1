const testimonialData = [{
        author: "Ers",
        content: "Sangat menakjubkan website ini!",
        image: "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1600",
        rating: 5,
    },
    {
        author: "Rama",
        content: "Styling yang menarik dari website ini",
        image: "https://images.pexels.com/photos/1816654/pexels-photo-1816654.jpeg?auto=compress&cs=tinysrgb&w=1600",
        rating: 5
    },

    {
        author: "Rico",
        content: "Saya Kurang Suka dengan ini",
        image: "https://images.pexels.com/photos/3760043/pexels-photo-3760043.jpeg?auto=compress&cs=tinysrgb&w=1600",
        rating: 1
    },
    {
        author: "Gilang",
        content: "Aku senang mengunjungi web ini",
        image: "https://images.pexels.com/photos/7129700/pexels-photo-7129700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 4
    }

]



function allTestimonials() {
    let testimonialHTML = ``
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

function filterTestimonials(rating) {
    let testimonialHTML = ``
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