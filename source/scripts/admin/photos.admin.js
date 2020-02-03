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
    },
    'collection1': {
        dragMode: 'move',
        initialAspectRatio: 319 / 515,
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
    'collection2': {
        dragMode: 'move',
        initialAspectRatio: 358 / 327,
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
    'collection3': {
        dragMode: 'move',
        initialAspectRatio: 365 / 274,
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
    'collection4': {
        dragMode: 'move',
        initialAspectRatio: 687 / 515,
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
    'collection5': {
        dragMode: 'move',
        initialAspectRatio: 357 / 535,
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
    'collection6': {
        dragMode: 'move',
        initialAspectRatio: 358 / 447,
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
    'collection7': {
        dragMode: 'move',
        initialAspectRatio: 338 / 391,
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
        },
        'collection1': {
            URL: `/api/collection/1/photo`,
            selector: `collectionPhoto`
        },
        'collection2': {
            URL: `/api/collection/2/photo`,
            selector: `collectionPhoto`
        },
        'collection3': {
            URL: `/api/collection/3/photo`,
            selector: `collectionPhoto`
        },
        'collection4': {
            URL: `/api/collection/4/photo`,
            selector: `collectionPhoto`
        },
        'collection5': {
            URL: `/api/collection/5/photo`,
            selector: `collectionPhoto`
        },
        'collection6': {
            URL: `/api/collection/6/photo`,
            selector: `collectionPhoto`
        },
        'collection7': {
            URL: `/api/collection/7/photo`,
            selector: `collectionPhoto`
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