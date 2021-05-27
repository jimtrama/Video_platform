window.addEventListener('load', () => {
    if (document.location.href.toString().includes('dashboard')) {
        try {
            document.getElementById('logincss').remove();
        } catch {

        }
        try {
            document.getElementById('registercss').remove();
        } catch {

        }
        try {
            document.getElementById('forgotcss').remove();
        } catch {

        }



    }
    if (document.location.href.toString().includes('register')) {

        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = './css/forRegister.css';
        style.id = 'registercss';
        if (!document.getElementById('registecss'))
            document.getElementsByTagName('head')[0].appendChild(style);
        try {
            document.getElementById('logincss').remove();
        } catch {

        }
        try {
            document.getElementById('forgotcss').remove();
        } catch {

        }


    }
    var fullPath = location.pathname + location.search + location.hash;
    if (fullPath == "/#/") {
        window.scrollTo(0, 0);
        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = './css/forLogin.css';
        style.id = 'logincss';
        if (!document.getElementById('logincss'))
            document.getElementsByTagName('head')[0].appendChild(style);
        try {
            document.getElementById('registercss').remove();
        } catch {

        }
        try {
            document.getElementById('forgotcss').remove();
        } catch {

        }


    }
    if (document.location.href.toString().includes('passrecovery')) {
        window.scrollTo(0, 0);
        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = './css/forForgot.css';
        style.id = 'forgotcss';
        if (!document.getElementById('forgotcss'))
            document.getElementsByTagName('head')[0].appendChild(style);
        try {
            document.getElementById('registercss').remove();
        } catch {

        }
        try {
            document.getElementById('logincss').remove();
        } catch {

        }
    }



})
window.addEventListener(('hashchange'), () => {
    if (document.location.href.toString().includes('dashboard')) {
        try {
            document.getElementById('logincss').remove();
        } catch {

        }
        try {
            document.getElementById('registercss').remove();
        } catch {

        }
        try {
            document.getElementById('forgotcss').remove();
        } catch {

        }



    }
    if (document.location.href.toString().includes('register')) {

        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = './css/forRegister.css';
        style.id = 'registercss';
        if (!document.getElementById('registecss'))
            document.getElementsByTagName('head')[0].appendChild(style);
        try {
            document.getElementById('logincss').remove();
        } catch {

        }
        try {
            document.getElementById('forgotcss').remove();
        } catch {

        }


    }
    var fullPath = location.pathname + location.search + location.hash;
    if (fullPath == "/#/") {
        window.scrollTo(0, 0);
        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = './css/forLogin.css';
        style.id = 'logincss';
        if (!document.getElementById('logincss'))
            document.getElementsByTagName('head')[0].appendChild(style);
        try {
            document.getElementById('registercss').remove();
        } catch {

        }
        try {
            document.getElementById('forgotcss').remove();
        } catch {

        }


    }
    if (document.location.href.toString().includes('passrecovery')) {
        window.scrollTo(0, 0);
        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = './css/forForgot.css';
        style.id = 'forgotcss';
        if (!document.getElementById('forgotcss'))
            document.getElementsByTagName('head')[0].appendChild(style);
        try {
            document.getElementById('registercss').remove();
        } catch {

        }
        try {
            document.getElementById('logincss').remove();
        } catch {

        }
    }

})
