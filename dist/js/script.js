// Navbar Fixed & Back To Top
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    const toTop = document.querySelector('#to-top');

    if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    } else{
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
};

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu')

hamburger.addEventListener('click', function(){
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// Klik di luar hamburger
window.addEventListener('click', function(e){
    if (e.target != hamburger && e.target != navMenu) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

// Dark Mode
const darkToggle = document.querySelector("#dark-toogle");
const html = document.querySelector("html");

    darkToggle.addEventListener("click", function () {
        if (darkToggle.checked) {
            html.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            html.classList.remove('dark');
            localStorage.theme = 'light'
        }
    });

// pindahkan posisi toogle sesuai mode
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        darkToggle.checked = true;
    } else {
        darkToggle.checked = false;
    }

// contact-form
const contactForm = document.getElementById("contact-form");
const loader = document.querySelector(".loader");

loader.style.display = "none";

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

function validateName() {
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('invalid');
        nameInput.setCustomValidity("Nama harus diisi");
    } else {
        nameInput.classList.remove('invalid');
        nameInput.setCustomValidity("");
    }
}

function validateEmail() {
    if (emailInput.value.trim() === '') {
        emailInput.classList.add('invalid');
        emailInput.setCustomValidity("Email harus diisi");
    } else {
        emailInput.classList.remove('invalid');
        emailInput.setCustomValidity("");
    }
}

function validateMessage() {
    if (messageInput.value.trim() === '') {
        messageInput.classList.add('invalid');
        messageInput.setCustomValidity("Pesan harus diisi");
    } else {
        const wordCount = messageInput.value.trim().split(' ').length;
        if (wordCount < 30) {
            messageInput.classList.add('invalid');
            messageInput.setCustomValidity("Pesan harus terdiri dari minimal 30 kata");
        } else {
            messageInput.classList.remove('invalid');
            messageInput.setCustomValidity("");
        }
    }
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    loader.style.display = "block";

    validateName();
    validateEmail();
    validateMessage();

    if (contactForm.checkValidity()) {
        const url = e.target.action;
        const formData = new FormData(contactForm);

        fetch(url, {
            method: "POST",
            body: formData,
            mode: "no-cors",
        })
        .then(() => {
            loader.style.display = "none";
            window.location.href = "/thankyou.html";
        })
        .catch((e) => alert("Terjadi masalah saat mengirim pesan"));
    } else {
        loader.style.display = "none";
    }
});
