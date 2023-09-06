let navtabs = document.querySelectorAll('.sliderTab');
    navtabs.forEach(item => {
        item.addEventListener('click', function (event) {
            if (event.target.classList.contains('nav-item')) {

                let lastActive = item.querySelector('li.active');
                let newActive = event.target;
                let bgActive = item.querySelector('.bg-active');

                lastActive.classList.remove('active');
                newActive.classList.add('active');
                bgActive.style.left = newActive.offsetLeft + 'px';

                let lastContentActive = item.querySelector('.tab.active');
                let newContentActive = document.getElementById(newActive.dataset.target);
                lastContentActive.classList.remove('active');
                newContentActive.classList.add('active');

            }
        })
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Üye Ol ve Üye Giriş Sayfasında Kulladığım Accordion

    var acc = document.getElementsByClassName("checkbox__accordion");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }