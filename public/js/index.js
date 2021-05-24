const logout = document.getElementById('logout');
let cookiesplit = document.cookie.split('='); 
console.log(cookiesplit[1]);

logout.addEventListener('click', async () => {
    let req = await fetch("http://localhost:3000/api/user/logout", {
        method: 'get',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookiesplit}` 
        }
    });
})