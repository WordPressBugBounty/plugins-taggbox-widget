function confirmDialog(option, action) {
    let title = (option.title) ? option.title : 'Action';
    let message = (option.message) ? option.message : 'Are you sure? '
    let cancelButtonText = (option.cancelButtonText) ? option.cancelButtonText : 'Cancel';
    let cancelButtonClass = (option.cancelButtonClass) ? option.cancelButtonClass : '';
    let buttonText = (option.buttonText) ? option.buttonText : 'Delete';
    let buttonClass = (option.buttonClass) ? option.buttonClass : '';
    let typeClass = '';
    let icon = '';
    let type = (option.type) ? option.type : 'info';
    if (type == 'info') {
        typeClass = '__taggbox__bg-info';
        icon = "fa-info";
    } else if (type == 'warning') {
        typeClass = '__taggbox__bg-warning';
        icon = "fa-exclamation";
    } else if (type == 'success') {
        typeClass = '__taggbox__bg-success';
        icon = "fa-check";
    } else if (type == 'danger') {
        typeClass = '__taggbox__bg-danger';
        icon = "fa-times";
    }

    let elemId = 'taggboxConfirmDialog';
    let elemHTML = '<div id="' + elemId + '" class="__taggbox__overlay"><div class="__taggbox__popupwrap">';
    elemHTML = elemHTML + '<div class="__taggbox__iconarea ' + typeClass + '"><i class="fa ' + icon + '" aria-hidden="true"></i></div>';
    elemHTML = elemHTML + '<hr class="__taggbox__horizontaborder" />';
    elemHTML = elemHTML + '<div class="__taggbox__title"><h2>' + title + '</h2></div>';
    elemHTML = elemHTML + '<div class="__taggbox__desc"><p>' + message + '</p></div>';
    elemHTML = elemHTML + '<div class="__taggbox__btnwrap">';
    elemHTML = elemHTML + '<button class="__taggbox__okaybtn ' + buttonClass + ' ' + typeClass + '" id="' + elemId + 'OkayButton">' + buttonText + '</button>';
    elemHTML = elemHTML + '<button class="__taggbox__cancelbtn ' + buttonClass + '" id="' + elemId + 'CancelButton">Cancel</button>';
    elemHTML = elemHTML + '</div>';
    elemHTML = elemHTML + '</div></div>';

    let elem = document.createElement('div');
    elem.innerHTML = elemHTML;
    elem.querySelector('#' + elemId + 'CancelButton').onclick = function () {
        document.querySelector('#' + elemId).remove();
    };
    elem.querySelector('#' + elemId + 'OkayButton').onclick = function () {
        document.querySelector('#' + elemId).remove();
        (action)();
    };
    document.body.appendChild(elem.firstChild);
}