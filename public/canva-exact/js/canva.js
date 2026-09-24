(function(){
  var m=document.getElementById('cv-menu');
  function open(){m.hidden=false;document.documentElement.style.overflow='hidden'}
  function close(){m.hidden=true;document.documentElement.style.overflow=''}
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-menu-open]')){e.preventDefault();open()}
    else if(e.target.closest('[data-menu-close]')){close()}
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  document.querySelectorAll('[data-date]').forEach(function(el){
    el.addEventListener('focus',function(){el.type='date'});
    el.addEventListener('blur',function(){if(!el.value)el.type='text'});
  });
  var f=document.getElementById('cv-contact');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    f.querySelectorAll('input,textarea').forEach(function(el){var bad=!el.checkValidity()||(el.required&&!el.value.trim());el.setAttribute('aria-invalid',bad);if(bad)ok=false});
    if(!ok)return;
    // TODO: POST new FormData(f) to your endpoint
    f.reset();f.querySelectorAll('[data-date]').forEach(function(el){el.type='text'});f.querySelector('.cv-form-ok').hidden=false;
  });
})();