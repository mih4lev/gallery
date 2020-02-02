import {
    cloneTemplate, requestMainButton, hideLoader, showLoader, hideTemplate
} from "./utils.admin";
import Cropper from 'cropperjs';

const cropperOptionsMap = {
    'author': {
        dragMode: 'move',
        initialAspectRatio: 216 / 216,
        autoCropArea: 1,
        viewMode: 1,
        restore: false,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
    },
    'event': {
        dragMode: 'move',
        initialAspectRatio: 470 / 269,
        autoCropArea: 1,
        viewMode: 1,
        restore: false,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
    }
};

const requestAPI = (options, value) => {
    const linksMAP = {
        'author': {
            URL: `/api/authors/${value}/photo`,
            selector: `authorPhoto`
        },
        'event': {
            URL: `/api/events/${value}/photo`,
            selector: `eventPhoto`
        }
    };
    return { URL: linksMAP[options].URL, selector: linksMAP[options].selector };
};

const savePhoto = (editWrapper, cropper, saveOptions) => {
    return () => {
        showLoader(editWrapper);
        const croppedCanvas = cropper.getCroppedCanvas();
        croppedCanvas.toBlob(async (blob) => {
            const body = new FormData();
            body.append(saveOptions.selector, blob);
            const fetchOptions = { method: `POST`, body };
            const response = await fetch(saveOptions.URL, fetchOptions);
            const result = await response.json();
            hideTemplate(editWrapper);
            const { code } = result;
            if (code === 200) {
                location.reload();
            }
        });
    }
};

const selectPhotoHandler = (editWrapper, reader, selectNode) => {
    return () => {
        const { dataset: { options, value }} = selectNode;
        const editablePhoto = editWrapper.querySelector(`.editablePhoto`);
        editablePhoto.src = reader.result;
        const cropper = new Cropper(editablePhoto, cropperOptionsMap[options]);
        const mainButton = requestMainButton(editWrapper);
        const saveOptions = requestAPI(options, value);
        mainButton.addEventListener(`click`, savePhoto(editWrapper, cropper, saveOptions));
        hideLoader(editWrapper);
    }
};

const downloadHandler = async (event) => {
    event.preventDefault();
    const { target: selectButton, target: { files }} = event;
    if (!files.length) return false;
    const editWrapper = cloneTemplate(`.photoTemplate`);
    const reader = new FileReader();
    reader.addEventListener(`load`, selectPhotoHandler(editWrapper, reader, selectButton));
    reader.readAsDataURL(files[0]);
};

export const downloadPhoto = () => {
    const downloadFields = [...document.querySelectorAll(`.downloadPhoto`)];
    downloadFields.forEach((downloadField) => {
        downloadField.addEventListener(`change`, downloadHandler);
    });
};