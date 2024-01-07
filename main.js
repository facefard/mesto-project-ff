(()=>{"use strict";var e=function(e){if(!e.ok)throw new Error("Error: ".concat(e.status));return e.json()},t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-3",headers:{authorization:"1eebc460-8f14-44d3-8f3a-287aa4f24719","Content-Type":"application/json"}},n=function(n,r){return fetch(n,{headers:t.headers}).then(e)};function r(n){var r="".concat(t.baseUrl,"/cards/").concat(n);return fetch(r,{method:"DELETE",headers:t.headers}).then(e)}function o(n,r){var o=n.classList.contains("card__like-button_is-active")?"DELETE":"PUT",c="".concat(t.baseUrl,"/cards/likes/").concat(r);return fetch(c,{method:o,headers:t.headers}).then(e)}function c(e,t,n){var r=t.deleteCard,c=(t.addLike,t.openImagePopup),a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__like-button"),l=a.querySelector(".card__delete-button");u.classList.contains("card__like-button_is-active");i.src=e.link,i.alt=e.name,i.addEventListener("click",(function(){return c(e.link,e.name)})),a.querySelector(".card__title").textContent=e.name,e.owner&&e.owner._id===n?l.style.display="block":l.style.display="none",l.addEventListener("click",(function(){e._id?function(e,t,n){t(e._id).then((function(){n.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}(e,r,a):console.error("Отсутствует свойство _id в объекте cardData")})),e.likes&&e.likes.some((function(e){return e._id===n}))&&u.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(){e._id?function(e,t,n,r){o(e,t).then((function(t){var n=t.likes.some((function(e){return e._id===r})),o=t.likes.length;!function(e,t,n){e.classList.toggle("card__like-button_is-active",t),e.closest(".places__item").querySelector(".card__like-count").textContent=n}(e,n,o)})).catch((function(e){console.error("Ошибка при обновлении лайка:",e)}))}(u,e._id,0,n):console.error("Отсутствует свойство _id в объекте cardData")}));var s=e.likes?e.likes.length:0;return a.querySelector(".card__like-count").textContent=s,a}function a(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}function i(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),e.addEventListener("click",l),document.addEventListener("keydown",a)}function u(e){e.classList.remove("popup_is-opened"),e.classList.add("popup_is-animated"),document.removeEventListener("keydown",a),e.removeEventListener("click",l)}function l(e){var t=e.currentTarget;e.target===t&&u(t)}var s=function(e,t,n){e.some((function(e){return!e.validity.valid}))?(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0)):(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled"))},d=function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n||t.validationMessage,o.classList.add(r.errorClass)},p=function(e,t,n){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},f=function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),Array.from(t.querySelectorAll(e.contentSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);r&&(s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){if(t.validity.valid)p(e,t,n);else{var r=t.dataset.customError;r&&t.validity.patternMismatch?d(e,t,r,n):d(e,t,null,n)}}(e,o,t),s(n,r,t)}))})))}(t,e)}))}))},_=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){p(e,n,t)})),s(n,r,t)};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var y,v,h,S=document.querySelector(".places__list"),b=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_image"),E=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),C=document.forms["edit-profile"],g=C.querySelector(".popup__input_type_name"),A=C.querySelector(".popup__input_type_description"),x=document.forms["new-place"],w=x.querySelector(".popup__input_type_card-name"),T=x.querySelector(".popup__input_type_url"),U=document.querySelector(".profile__title"),D=document.querySelector(".profile__description"),I=k.querySelector(".popup__image"),O=k.querySelector(".popup__caption"),P=document.querySelector(".profile__image"),j=document.querySelector(".popup_type_avatar-edit"),B=document.forms["avatar-edit"],N=B.querySelector(".popup__input_type_avatar-url"),J=j.querySelector(".popup__close"),M=(C.querySelector(".popup__button"),document.querySelector(".profile__image")),H=document.querySelectorAll(".popup__close"),z={formSelector:".popup",contentSelector:".popup__content",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function $(e,t){I.src=e,I.alt=t,O.textContent=t,i(k)}H.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return u(t)}))})),E.addEventListener("click",(function(){i(b),_(C,z);var e=U.textContent,t=D.textContent;g.value=e,A.value=t})),L.addEventListener("click",(function(){return i(q)})),C.addEventListener("submit",(function(n){n.preventDefault();var r,o,c,a=g.value,i=A.value,l=C.querySelector(".popup__button");l.textContent="Сохранение...",(r=a,o=i,c="".concat(t.baseUrl,"/users/me"),fetch(c,{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:o})}).then(e)).then((function(e){F(e),u(b)})).catch((function(e){console.error("Произошла ошибка при обновлении профиля:",e)})).finally((function(){l.textContent="Сохранить"}))})),f(z),Promise.all([(h="".concat(t.baseUrl,"/users/me"),n(h,t.headers)),(v="".concat(t.baseUrl,"/cards"),n(v,t.headers))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];y=o._id,F(o),G(c),console.log(o,c)})).catch((function(e){console.error("Произошла ошибка:",e)}));var F=function(e){var t=document.querySelector(".profile__image");U.textContent=e.name,D.textContent=e.about,t.style.backgroundImage="url('".concat(e.avatar,"')")},G=function(e){e.forEach((function(e){!function(e,t){t.append(e)}(c(e,{deleteCard:r,addLike:o,openImagePopup:$},y),S)}))};J.addEventListener("click",(function(){return u(j)})),P.addEventListener("click",(function(){return i(j)})),B.addEventListener("submit",(function(n){n.preventDefault();var r=N.value,o=B.querySelector(".popup__button");o.textContent="Сохранение...",function(n){var r="".concat(t.baseUrl,"/users/me/avatar");return fetch(r,{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then(e)}(r).then((function(e){M.style.backgroundImage="url('".concat(e.avatar,"')"),u(j)})).catch((function(e){console.error("Произошла ошибка при обновлении аватара:",e)})).finally((function(){o.textContent="Сохранить"}))})),f(B),x.addEventListener("submit",(function(n){n.preventDefault();var a,i,l,s,d=w.value,p=T.value,f=x.querySelector(".popup__button");f.textContent="Сохранение...",(a={name:d,link:p},i=a.name,l=a.link,s="".concat(t.baseUrl,"/cards"),fetch(s,{method:"POST",headers:t.headers,body:JSON.stringify({name:i,link:l})}).then(e)).then((function(e){console.log("Новая карточка добавлена:",e);var t=c(e,{deleteCard:r,addLike:o,openImagePopup:$},y);S.prepend(t),u(q),x.reset(),_(x,z)})).catch((function(e){console.error("Произошла ошибка при добавлении новой карточки:",e)})).finally((function(){f.textContent="Сохранить"}))}))})();