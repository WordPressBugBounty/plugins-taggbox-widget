window.onload = function () {
    var __taggbox__plugin_deactivate_btn = document.querySelector('[data-slug="taggbox-widget"] .deactivate a');
    if (__taggbox__plugin_deactivate_btn) {
        __taggbox__plugin_deactivate_btn.addEventListener('click', function (event) {
            event.preventDefault();
            let elemHTML = `<div class="__taggbox__popupwrap __taggbox__popup_md">`;
            elemHTML = `${elemHTML} <button onclick="__taggbox__hidePluginDeactivePopup();" type="button" class="__taggbox__closebtn"></button>`;
            elemHTML = `${elemHTML} <div class="__taggbox__popupinn">`;
            elemHTML = `${elemHTML} <div class="__taggbox__header"><h2>Feedback</h2></div>`;
            elemHTML = `${elemHTML} <hr class="__taggbox__horizontaborder">`;
            elemHTML = `${elemHTML} <div class="__taggbox__formwbody">`;
            elemHTML = `${elemHTML} <div class="__taggbox__formwrow">`;
            elemHTML = `${elemHTML} <div class="__taggbox__formwrow  __taggbox__checkboxrow __taggbox__mbzero" >`;
            elemHTML = `${elemHTML} <label for="__taggbox__pluginDeactivateReason1">I found a better plugin</label> `;
            elemHTML = `${elemHTML} <input id="__taggbox__pluginDeactivateReason1" onclick="__taggbox__pluginDeactivateReason(1);"  type="radio" name="__taggbox__pluginDeactivateReason" value="I found a better plugin"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div id="__taggbox__betterPluginDiv" class="__taggbox__formwrow" style="display:none;margin-left: 25px;">`;
            elemHTML = `${elemHTML} <input  type="text" id="__taggbox__better_plugin_input" name="__taggbox__betterPluginInputInput"  placeholder="What's the plugin's name?"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div class="__taggbox__formwrow  __taggbox__checkboxrow __taggbox__mbzero">`;
            elemHTML = `${elemHTML} <label for="__taggbox__pluginDeactivateReason2">I only needed the plugin for a short period</label> `;
            elemHTML = `${elemHTML} <input id="__taggbox__pluginDeactivateReason2" onclick="__taggbox__pluginDeactivateReason(2);"  type="radio" name="__taggbox__pluginDeactivateReason" value="I only needed the plugin for a short period"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div  class="__taggbox__formwrow  __taggbox__checkboxrow __taggbox__mbzero">`;
            elemHTML = `${elemHTML} <label for="__taggbox__pluginDeactivateReason3">The plugin broke my site</label> `;
            elemHTML = `${elemHTML} <input id="__taggbox__pluginDeactivateReason3" onclick="__taggbox__pluginDeactivateReason(3);"  type="radio" name="__taggbox__pluginDeactivateReason" value="The plugin broke my site"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div class="__taggbox__formwrow  __taggbox__checkboxrow __taggbox__mbzero">`;
            elemHTML = `${elemHTML} <label for="__taggbox__pluginDeactivateReason4">I no longer need the plugin</label> `;
            elemHTML = `${elemHTML} <input id="__taggbox__pluginDeactivateReason4" onclick="__taggbox__pluginDeactivateReason(4);"  type="radio" name="__taggbox__pluginDeactivateReason" value="I no longer need the plugin"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div  class="__taggbox__formwrow  __taggbox__checkboxrow __taggbox__mbzero">`;
            elemHTML = `${elemHTML} <label for="__taggbox__pluginDeactivateReason5">The plugin suddenly stopped working</label> `;
            elemHTML = `${elemHTML} <input id="__taggbox__pluginDeactivateReason5" onclick="__taggbox__pluginDeactivateReason(5);"  type="radio" name="__taggbox__pluginDeactivateReason" value="The plugin suddenly stopped working"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div  class="__taggbox__formwrow  __taggbox__checkboxrow __taggbox__mbzero">`;
            elemHTML = `${elemHTML} <label for="__taggbox__pluginDeactivateReason6">It's a temporary deactivation. I'm just debugging an issue</label> `;
            elemHTML = `${elemHTML} <input id="__taggbox__pluginDeactivateReason6" onclick="__taggbox__pluginDeactivateReason(6);"  type="radio" name="__taggbox__pluginDeactivateReason" value="It is a temporary deactivation. I am just debugging an issue"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div class="__taggbox__formwrow  __taggbox__checkboxrow __taggbox__mbzero">`;
            elemHTML = `${elemHTML} <label for="__taggbox__pluginDeactivateReason7">Other</label> `;
            elemHTML = `${elemHTML} <input id="__taggbox__pluginDeactivateReason7" onclick="__taggbox__pluginDeactivateReason(7);" type="radio" name="__taggbox__pluginDeactivateReason" value="Other"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} <div id="__taggbox__otherReasonDiv" class="__taggbox__formwrow" style="display:none;margin-left: 25px;">`;
            elemHTML = `${elemHTML} <input id="__taggbox__other_reason_input"  type="text" name="__taggbox__OtherReasonInput"  placeholder="Kindly Tell Us The Reason So We Can Improve"> `;
            elemHTML = `${elemHTML} </div>`;
            elemHTML = `${elemHTML} </div></div>`;
            elemHTML = `${elemHTML} <div class = "__taggbox__btnwrap text-center">`;
            elemHTML = `${elemHTML} <button id="__taggbox__pluginDeactivateBtn" onclick="__taggbox__deactivatePlugin();" class="__taggbox__okaybtn __taggbox__bg-danger">Skip & Deactivate</button>`;
            elemHTML = `${elemHTML} <button class="__taggbox__okaybtn" onclick="__taggbox__hidePluginDeactivePopup();">Cencel</button>`;
            elemHTML = `${elemHTML} </div></div></div>`;
            let __taggbox__deactivatePopupNode = document.createElement('div');
            __taggbox__deactivatePopupNode.setAttribute("id", "__taggbox__plugin_deactivate_popup");
            __taggbox__deactivatePopupNode.setAttribute("class", "__taggbox__overlay");
            __taggbox__deactivatePopupNode.innerHTML = elemHTML;
            document.body.appendChild(__taggbox__deactivatePopupNode);
        });
    }
}
function __taggbox__hidePluginDeactivePopup() {
    let __taggbox__plugin_deactivate_popup = document.querySelector("#__taggbox__plugin_deactivate_popup");
    __taggbox__plugin_deactivate_popup.remove();
}
function __taggbox__pluginDeactivateReason(__taggbox__pluginDeactivateReason) {
    document.querySelector("#__taggbox__other_reason_input").value = "";
    document.querySelector("#__taggbox__better_plugin_input").value = "";
    let __taggbox__pluginDeactivateBtn = document.querySelector("#__taggbox__pluginDeactivateBtn");
    __taggbox__pluginDeactivateBtn.innerHTML = "Submit & Deactivate";
    let __taggbox__betterPluginDiv = document.querySelector("#__taggbox__betterPluginDiv");
    __taggbox__betterPluginDiv.style.display = "none";
    let __taggbox__otherReasonDiv = document.querySelector("#__taggbox__otherReasonDiv");
    __taggbox__otherReasonDiv.style.display = "none";
    if (__taggbox__pluginDeactivateReason == 7)
        __taggbox__otherReasonDiv.style.display = "block";
    if (__taggbox__pluginDeactivateReason == 1)
        __taggbox__betterPluginDiv.style.display = "block";
}
function __taggbox__deactivatePlugin() {
    __taggbox__open_loader();
    let __taggbox__ajax_call_url = window.location.href;
    __taggbox__ajax_call_url = __taggbox__ajax_call_url.replace("plugins.php", "admin-ajax.php");
    let __taggbox__other_reason_input = document.querySelector("#__taggbox__other_reason_input").value;
    let __taggbox__better_plugin_input = document.querySelector("#__taggbox__better_plugin_input").value;
    let __taggbox__pluginDeactivateReason = document.querySelector('input[name="__taggbox__pluginDeactivateReason"]:checked');
    if (__taggbox__pluginDeactivateReason) {
        __taggbox__pluginDeactivateReason = __taggbox__pluginDeactivateReason.value;
    } else {
        __taggbox__pluginDeactivateReason = "";
    }
    let formData = new FormData();
    formData.append('action', 'taggbox_data');
    formData.append('__taggbox__ajax_action', '__taggbox__plugin_deactivate');
    formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_security_nones_object.__taggbox__ajax_call_security_nones);
    formData.append('betterPlugin', __taggbox__better_plugin_input);
    formData.append('otherReason', __taggbox__other_reason_input);
    formData.append('pluginDeactivateReason', __taggbox__pluginDeactivateReason);
    fetch(__taggbox__ajax_call_url, {
        method: 'POST',
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        if (response.status == true) {
            location.reload();
        } else {
            __taggbox__close_loader();
            console.log(error);
        }
    }).catch((error) => {
        __taggbox__close_loader();
        console.log(error);
    });
}
