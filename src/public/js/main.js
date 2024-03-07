// // window.location= "/home";
// const $ = document.querySelector.bind(document)
// const $$ = document.querySelectorAll.bind(document)
// const navItems = document.querySelectorAll('.navbar-item');
// let activeItem = null; // Store the previously clicked item

// navItems.forEach(navItem => {
//     navItem.addEventListener('click', (e) => {
//         e.preventDefault(); // Prevent default link behavior
//         if (activeItem) {
//             activeItem.classList.remove('active'); // Remove active from previous item
//         }
//         navItem.classList.add('active'); // Add active to the clicked item
//         activeItem = navItem; // Update the active item
//         const url = navItem.querySelector('a').getAttribute('href');
//         console.log(url)

//         $.ajax({
//             url: url,
//             success: function(data) {
//               // Hiển thị dữ liệu body mới
//               $('#body').html(data);
//             }
//           });
//     });

// })