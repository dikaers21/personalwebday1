class Testimonial {
    constructor(name, content, image) {
        this.name = name
        this.content = content
        this.image = image
    }
    html() {
        return `
        <div class="testimonial">
            <img src="${this.image}" class = "profile-testimonial" />
            <p class="quote">"${this.content}"</p>
            <p class="author">${this.name}</p>
        </div>
        `
    }
}


const testimonial1 = new Testimonial("Ers", "Sangat menakjubkan pemandangan ini", "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
const testimonial2 = new Testimonial("Rama", "Indah sekali saya tak bisa berkata kata", "https://images.pexels.com/photos/390490/pexels-photo-390490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
const testimonial3 = new Testimonial("Rico", "Aku senang bisa ada disini", "https://images.pexels.com/photos/2555803/pexels-photo-2555803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")

const testimonials = [testimonial1, testimonial2, testimonial3]


let testimonialHTML = ``

for (let index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html()
}

document.getElementById("testimonials").innerHTML = testimonialHTML