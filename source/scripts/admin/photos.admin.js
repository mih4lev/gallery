import {
    cloneTemplate, requestMainButton, hideLoader, showLoader, hideTemplate
} from "./utils.admin";
import Cropper from 'cropperjs';

const cropperOptions = {
    dragMode: 'move',
    aspectRatio: 1 / 1,
    autoCropArea: 1,
    viewMode: 1,
    restore: false,
    guides: false,
    center: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false,
};

const savePhoto = (editWrapper, cropper, authorID) => {
    return () => {
        showLoader(editWrapper);
        const croppedCanvas = cropper.getCroppedCanvas();
        croppedCanvas.toBlob(async (blob) => {
            const body = new FormData();
            body.append(`authorPhoto`, blob);
            const fetchOptions = { method: `POST`, body };
            const response = await fetch(`/api/authors/${authorID}/photo`, fetchOptions);
            const result = await response.json();
            console.log(result);
            hideTemplate(editWrapper);
            const { code } = result;
            if (code === 200) {
                location.reload();
            }
        });
    }
};

const selectPhotoHandler = (editWrapper, reader, authorID) => {
    return () => {
        const editablePhoto = editWrapper.querySelector(`.editablePhoto`);
        editablePhoto.src = reader.result;
        const cropper = new Cropper(editablePhoto, cropperOptions);
        const mainButton = requestMainButton(editWrapper);
        mainButton.addEventListener(`click`, savePhoto(editWrapper, cropper, authorID));
        hideLoader(editWrapper);
    }
};

const downloadHandler = async (event) => {
    event.preventDefault();
    const { target: { files, dataset: { authorId } }} = event;
    const authorID = Number(authorId);
    if (!files.length) return false;
    const editWrapper = cloneTemplate(`.photoTemplate`);
    const reader = new FileReader();
    reader.addEventListener(`load`, selectPhotoHandler(editWrapper, reader, authorID));
    reader.readAsDataURL(files[0]);
};

export const downloadPhoto = () => {
    const downloadFields = [...document.querySelectorAll(`.downloadPhoto`)];
    downloadFields.forEach((downloadField) => {
        downloadField.addEventListener(`change`, downloadHandler);
    });
};