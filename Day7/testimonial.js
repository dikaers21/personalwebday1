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


const testimonial1 = new Testimonial("Ers", "Sangat menakjubkan website ini!", "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1600")
const testimonial2 = new Testimonial("Rama", "Styling yang menarik dari website ini", "https://images.pexels.com/photos/1816654/pexels-photo-1816654.jpeg?auto=compress&cs=tinysrgb&w=1600")
const testimonial3 = new Testimonial("Rico", "Aku senang mengunjungi web ini", "https://images.pexels.com/photos/7129700/pexels-photo-7129700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")

const testimonials = [testimonial1, testimonial2, testimonial3]


let testimonialHTML = ``

for (let index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html()
}

document.getElementById("testimonials").innerHTML = testimonialHTML