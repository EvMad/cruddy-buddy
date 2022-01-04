//user interface js

//form submit

const formSubmit = async (event) => {
    event.preventDefault();

    //create const for first name and email, for later use

    const name = document.querySelector("#firstName").value.trim();
    const email = document.querySelector("#email").value.trim();

    if (name && email) {
        console.log("first name and email submitted");
    }
    else
    {
        alert("Failed to enter name and email");
    };

    document
    .addEventListener('submit', formSubmit);
};