/*
Reusable Button Component
*/

function createButton({
    text = "Button",
    variant = "primary",
    onClick = null
}) {

    // Create Button
    const button = document.createElement("button");

    // Add Text
    button.textContent = text;

    // Add Classes
    button.classList.add("btn", variant);

    // Click Event
    if (typeof onClick === "function") {
        button.addEventListener("click", onClick);
    }

    return button;
}

/*
Reusable Card Component
*/

function createCard({
    image = "",
    title = "Card Title",
    description = "Card Description",
    buttonText = "Learn More",
    buttonVariant = "primary",
    onButtonClick = null
}) {

    // Main Card
    const card = document.createElement("div");
    card.className = "card";

    // Image
    const img = document.createElement("img");
    img.src = image;
    img.alt = title;

    // Card Content
    const content = document.createElement("div");
    content.className = "card-content";

    // Title
    const heading = document.createElement("h3");
    heading.textContent = title;

    // Description
    const para = document.createElement("p");
    para.textContent = description;

    // Reusable Button
    const button = createButton({
        text: buttonText,
        variant: buttonVariant,
        onClick: onButtonClick
    });

    // Append Elements
    content.appendChild(heading);
    content.appendChild(para);
    content.appendChild(button);

    card.appendChild(img);
    card.appendChild(content);

    return card;
}

/*
Reusable Modal Component
*/

let currentModal = null;

function openModal({

    title = "Modal Title",

    content = "Modal Content"

}) {

    // Agar pehle se modal open hai to remove karo
    if (currentModal) {
        currentModal.remove();
    }

    // Overlay
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    // Modal Box
    const modal = document.createElement("div");
    modal.className = "modal";

    // Header
    const header = document.createElement("div");
    header.className = "modal-header";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "&times;";

    header.appendChild(heading);
    header.appendChild(closeBtn);

    // Body
    const body = document.createElement("div");
    body.className = "modal-body";
    body.innerHTML = content;

    // Assemble
    modal.appendChild(header);
    modal.appendChild(body);

    overlay.appendChild(modal);

    document.getElementById("modal-root").appendChild(overlay);

    // Animation Trigger
    setTimeout(() => {
        overlay.classList.add("active");
    }, 10);

    currentModal = overlay;

    // Close Function
    function closeModal() {

        overlay.classList.remove("active");

        setTimeout(() => {

            overlay.remove();

            currentModal = null;

        }, 300);

        document.removeEventListener("keydown", escHandler);

    }

    // Close Button
    closeBtn.addEventListener("click", closeModal);

    // Outside Click
    overlay.addEventListener("click", function (e) {

        if (e.target === overlay) {
            closeModal();
        }

    });

    // ESC Key
    function escHandler(e) {

        if (e.key === "Escape") {
            closeModal();
        }

    }

    document.addEventListener("keydown", escHandler);

}

/*
Reusable Toast Component
*/

function showToast({

    message = "Notification",

    type = "info",

    duration = 3000

}) {

    const container = document.getElementById("toast-container");

    // Toast
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    // Message
    const text = document.createElement("span");
    text.textContent = message;

    // Close Button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.color = "white";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontSize = "18px";

    toast.appendChild(text);
    toast.appendChild(closeBtn);

    // Add Toast (Stacking Automatically)
    container.appendChild(toast);

    // Remove Function
    function removeToast() {

        toast.style.opacity = "0";
        toast.style.transform = "translateX(100px)";

        setTimeout(() => {

            toast.remove();

        }, 300);

    }

    // Auto Remove
    const timer = setTimeout(removeToast, duration);

    // Manual Remove
    closeBtn.addEventListener("click", () => {

        clearTimeout(timer);

        removeToast();

    });

}

// Buttons Demo

const buttonDemo = document.getElementById("button-demo");

buttonDemo.appendChild(
    createButton({
        text: "Primary",
        variant: "primary",
        onClick: () => {
            showToast({
                message: "Primary Button Clicked",
                type: "info"
            });
        }
    })
);

buttonDemo.appendChild(
    createButton({
        text: "Success",
        variant: "success",
        onClick: () => {
            showToast({
                message: "Operation Successful",
                type: "success"
            });
        }
    })
);

buttonDemo.appendChild(
    createButton({
        text: "Danger",
        variant: "danger",
        onClick: () => {
            showToast({
                message: "Danger Button Clicked",
                type: "error"
            });
        }
    })
);

buttonDemo.appendChild(
    createButton({
        text: "Secondary",
        variant: "secondary",
        onClick: () => {
            showToast({
                message: "Secondary Button Clicked",
                type: "warning"
            });
        }
    })
);


// Cards Demo


const cardDemo = document.getElementById("card-demo");

const cards = [

    {
        image: "333.jpg",
        title: "Nike Shoes",
        description: "Comfortable running shoes with premium quality.",
        buttonText: "Buy Now",
        buttonVariant: "success"
    },

    {
        image: "3232.jpg",
        title: "Gaming Laptop",
        description: "Powerful laptop for gaming and programming.",
        buttonText: "View Details",
        buttonVariant: "primary"
    },

    {
        image: "2121212.jpg",
        title: "Smart Watch",
        description: "Track fitness, heart rate and notifications.",
        buttonText: "Order",
        buttonVariant: "danger"
    },

    {
        image: "54545.jpg",
        title: "Headphones",
        description: "Enjoy crystal clear sound with deep bass.",
        buttonText: "Explore",
        buttonVariant: "secondary"
    }

];

cards.forEach(item => {

    cardDemo.appendChild(

        createCard({

            image: item.image,

            title: item.title,

            description: item.description,

            buttonText: item.buttonText,

            buttonVariant: item.buttonVariant,

            onButtonClick: () => {

                showToast({

                    message: `${item.title} Selected`,

                    type: "success"

                });

            }

        })

    );

});


// Modal Demo


const modalButtons = document.getElementById("modal-buttons");

modalButtons.appendChild(

    createButton({

        text: "Open Login Modal",

        variant: "primary",

        onClick: () => {

            openModal({

                title: "Login",

                content: `
                    <p>Welcome Back 👋</p>
                    <br>
                    <p>Please login to continue.</p>
                `

            });

        }

    })

);

modalButtons.appendChild(

    createButton({

        text: "Open Delete Modal",

        variant: "danger",

        onClick: () => {

            openModal({

                title: "Delete Item",

                content: `
                    <p>
                        Are you sure you want to delete this item?
                    </p>
                `

            });

        }

    })

);


// Toast Demo


const toastButtons = document.getElementById("toast-buttons");

toastButtons.appendChild(

    createButton({

        text: "Success Toast",

        variant: "success",

        onClick: () => {

            showToast({

                message: "Data Saved Successfully",

                type: "success"

            });

        }

    })

);

toastButtons.appendChild(

    createButton({

        text: "Error Toast",

        variant: "danger",

        onClick: () => {

            showToast({

                message: "Something Went Wrong",

                type: "error"

            });

        }

    })

);

toastButtons.appendChild(

    createButton({

        text: "Warning Toast",

        variant: "secondary",

        onClick: () => {

            showToast({

                message: "Please Fill All Fields",

                type: "warning"

            });

        }

    })

);

toastButtons.appendChild(

    createButton({

        text: "Info Toast",

        variant: "primary",

        onClick: () => {

            showToast({

                message: "Welcome to Week 05 Project",

                type: "info"

            });

        }

    })

);