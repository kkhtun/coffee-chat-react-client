import Swal from "sweetalert2";

export const fireAlert = (message) =>
    Swal.fire({
        icon: "info",
        text: message,
        position: "top",
    });

export const fireConfirm = (message) =>
    Swal.fire({
        icon: "info",
        text: message,
        position: "top",
        showConfirmButton: true,
        showCancelButton: true,
    });

export const firePrompt = (message) =>
    Swal.fire({
        icon: "info",
        text: message,
        position: "top",
        input: "text",
        inputAttributes: {
            autocapitalize: "off",
        },
        showConfirmButton: true,
        showCancelButton: true,
    });

export const fireError = (message = "Something went wrong!") =>
    Swal.fire({
        icon: "error",
        position: "top",
        text: message,
    });
