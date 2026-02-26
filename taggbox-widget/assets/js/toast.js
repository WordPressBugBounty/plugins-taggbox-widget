/*--Start--Manage Toast*/
class TaggboxToast {
    constructor() {
        this.id = "Toast";
        this.position = "__taggbox__is-top-center";
        this.type = "";
        this.icon = "";
        this.className = "__taggbox__toast";
        this.duration = 3000;
        this.isFullScreen = false;
    }
    info(options) {
        this.type = "__taggbox__bg-info";
        this.icon = "fa-info";
        this.show(options);
    }
    warning(options) {
        this.type = "__taggbox__bg-warning";
        this.icon = "fa-exclamatio";
        this.show(options);
    }
    danger(options) {
        this.type = "__taggbox__bg-danger";
        this.icon = "fa-times";
        this.show(options);
    }
    success(options) {
        this.type = "__taggbox__bg-success";
        this.icon = "fa-check";
        this.show(options);
    }
    show(options) {
        if (options.hasOwnProperty("position")) {
            this.position = options.position;
        }
        if (options.hasOwnProperty("type")) {
            this.type = options.type;
        }
        if (options.hasOwnProperty("message")) {
            this.message = options.message;
        }
        if (options.hasOwnProperty("duration")) {
            this.duration = options.duration;
        }
        /*create toast*/
        let toastDiv = document.createElement("div");
        let elemHTML = '<span class="__taggbox__faicon"><i class="fas ' + this.icon + '" aria-hidden="true"></i></span><span class="__taggbox__btnmsg">' + this.message + '</span>';
        toastDiv.innerHTML = elemHTML;
        toastDiv.className = this.type;
        let toastParentDiv = document.createElement("div");
        toastParentDiv.setAttribute('id', this.id);
        toastParentDiv.className = this.className + " " + this.position;
        if (options.hasOwnProperty("isFullScreen") && options.isFullScreen == true) {
            toastParentDiv.className += " __taggbox__is-full-screen";
        }
        toastParentDiv.appendChild(toastDiv);
        let bodyElement = document.body;
        bodyElement.appendChild(toastParentDiv);
        let self = this;
        setTimeout(function () {
            let element = document.getElementById(self.id);
            element.className = "";
            element.parentNode.removeChild(element);
        }, this.duration);
    }
}
/*--End--Manage Toast*/