import{a as R,S as B,i as a}from"./assets/vendor-xpOxgMII.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();async function p(s,o){const n="https://pixabay.com/api/",r={key:"54460164-6af4a3dc8428f1e90ebc46cf5",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};return(await R.get(n,{params:r})).data}const m=document.querySelector(".gallery"),f=document.querySelector(".loader"),g=document.querySelector(".load-more"),M=new B(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"});function h(s){const o=s.map(n=>{const{largeImageURL:r,webformatURL:e,tags:t,likes:c,views:v,comments:S,downloads:q}=n;return`<li class="gallery-item">
    <a href="${r}" class="gallery-link">
      <img
        src="${e}"
        alt="${t}"
        class="gallery-image"
      />
    </a>

    <div class="info">
      <p>Likes <span>${c}</span></p>
      <p>Views <span>${v}</span></p>
      <p>Comments <span>${S}</span></p>
      <p>Downloads <span>${q}</span></p>
    </div>
  </li>`}).join("");m.insertAdjacentHTML("beforeend",o),M.refresh()}function O(){m.innerHTML=""}function y(){f.classList.remove("is-hidden")}function L(){f.classList.add("is-hidden")}function w(){g.classList.remove("is-hidden")}function l(){g.classList.add("is-hidden")}const $=document.querySelector(".form"),P=document.querySelector(".load-more");let i=1,d="",u=0;const b=15;$.addEventListener("submit",E);P.addEventListener("click",x);async function E(s){s.preventDefault();const o=s.currentTarget,n=o.elements["search-text"].value.trim();if(n===""){a.warning({message:"Value cannot be an empty string!",position:"topRight"});return}d=n,i=1,l(),O(),y();try{const r=await p(d,i);if(r.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l();return}u=r.totalHits,h(r.hits),i*b>=u?(l(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w()}catch{a.error({message:"Oops...something wrong :(",position:"topRight"})}finally{L(),o.reset()}}async function x(){i+=1,y(),l();try{const s=await p(d,i);h(s.hits);const n=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"}),i*b>=u?(l(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w()}catch{a.error({message:"Oops...something wrong :(",position:"topRight"})}finally{L()}}
//# sourceMappingURL=index.js.map
