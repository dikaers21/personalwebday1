function submitData() {
    const inputName = document.getElementById("inputName").value
    const inputEmail = document.getElementById("inputEmail").value
    const inputPhone = document.getElementById("inputPhone").value
    const inputSubject = document.getElementById("inputSubject").value
    const inputMessage = document.getElementById("inputMessage").value

    // kondisi (memunculkan sebuah alert "{field} harus diisi")
    if (inputName == "") {
        alert('Nama belum diisi!!')
    } else if (inputEmail == "") {
        alert('Email belum diisi!!')
    } else if (inputPhone == "") {
        alert('Phone belum diisi!!')
    } else if (inputSubject == "") {
        alert('Subject belum diisi!!')
    } else if (inputMessage == "") {
        alert('Message belum diisi!!')
    } else {

        console.log(`Name : ${inputName}\nEmail: ${inputEmail}\nPhone: ${inputPhone}\nSubject: ${inputSubject}\nMessage: ${inputMessage}`)

        let a = document.createElement('a')
        a.href = `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessage}`
        a.click()
    }
}