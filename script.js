const rightSection = document.getElementById('right-section');
let draggedElement = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize with sample data
    sampleData.forEach(elementData => {
        addElementToRightSection(elementData);
    });
});

function addElement(type) {
    const newElement = {
        id: generateUUID(),
        type: type,
        label: "Sample Label",
        placeholder: "Sample Placeholder",
        options: type === 'select' ? ["Sample Option 1", "Sample Option 2", "Sample Option 3"] : undefined
    };

    addElementToRightSection(newElement);
}

function addElementToRightSection(elementData) {
    const elementDiv = document.createElement('div');
    elementDiv.classList.add('form-element');
    elementDiv.setAttribute('draggable', true);

    elementDiv.addEventListener('dragstart', () => {
        draggedElement = elementDiv;
    });

    elementDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    elementDiv.addEventListener('drop', () => {
        if (draggedElement) {
            const elements = Array.from(rightSection.children);
            const indexDragged = elements.indexOf(draggedElement);
            const indexDrop = elements.indexOf(elementDiv);

            if (indexDragged !== -1 && indexDrop !== -1) {
                rightSection.insertBefore(draggedElement, indexDragged < indexDrop ? elementDiv.nextSibling : elementDiv);
            }

            draggedElement = null;
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => {
        rightSection.removeChild(elementDiv);
    };

    let element;
    if (elementData.type === 'input') {
        element = document.createElement('input');
        element.type = 'text';
    } else if (elementData.type === 'select') {
        element = document.createElement('select');
        elementData.options.forEach(optionText => {
            const option = document.createElement('option');
            option.text = optionText;
            element.add(option);
        });
    } else if (elementData.type === 'textarea') {
        element = document.createElement('textarea');
    }

    element.placeholder = elementData.placeholder;

    elementDiv.appendChild(element);
    elementDiv.appendChild(deleteButton);
    rightSection.appendChild(elementDiv);
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function saveFormData() {
    const formElements = Array.from(rightSection.children);
    const formData = formElements.map(elementDiv => {
        const element = elementDiv.querySelector('input, select, textarea');
        const type = element.tagName.toLowerCase();
        const options = type === 'select' ? Array.from(element.options).map(option => option.text) : undefined;

        return {
            id: generateUUID(),
            type: type,
            label: "Sample Label",
            placeholder: element.placeholder,
            options: options
        };
    });

    console.log(formData);
}
