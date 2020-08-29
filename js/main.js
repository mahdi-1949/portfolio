//select item doms
const menubtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menunav = document.querySelector('.menu-nav');
const menubranding = document.querySelector('.menu-branding');
const navitems = document.querySelectorAll('.nav-item');

// set initial state of menu

let showmenu = false;
menubtn.addEventListener('click', togglemenu);

function togglemenu(){
    if(!showmenu){
        menubtn.classList.add('close');
        menu.classList.add('show');
        menunav.classList.add('show');
        menubranding.classList.add('show');
        navitems.forEach(item =>item.classList.add('show'));
        //set menu state
        showmenu = true;
    }else{
        menubtn.classList.remove('close');
        menu.classList.remove('show');
        menunav.classList.remove('show');
        menubranding.classList.remove('show');
        navitems.forEach(item =>item.classList.remove('show'));
        
        showmenu = false;
    }
}