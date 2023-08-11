const containerVideos = document.querySelector(".videos__container");

//versao async/await
async function buscarEMostrarVideos() {
  try {
    const busca = await fetch("http://localhost:3000/videos");
    const videos = await busca.json();

    videos.forEach((video) => {
      containerVideos.innerHTML += `
        <li class="videos__item">
          <iframe src="${video.url}"
            title="${video.titulo}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
          <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="titulo-canal">${video.descricao}</p>
            <p class="categoria" hidden>${video.categoria}</p>
          </div>
        </li>
      `;
    });
  } catch (error) {
    console.error("Erro ao carregar os vídeos:", error);
  }
}

buscarEMostrarVideos();

// pensei em explicar com o .then e depois a versão acima com async/await
// const api = fetch("http://localhost:3000/videos")
//   .then((res) => res.json())
//   .then((videos) =>
//     videos.forEach((video) => {
//       containerVideos.innerHTML += `
//         <li class="videos__item">
//         <iframe width="100%" height="62%" src="${video.url}"
//         title="${video.titulo}" frameborder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowfullscreen></iframe>
//             <div class="descricao-video">
//                 <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
//                 <h3 class="titulo-video">${video.titulo}</h3>
//                 <p class="titulo-canal">${video.descricao}</p>
//             </div>
//         </li>
//         `;
//     })
//   );

// barra de pesquisa
const barraDePesquisa = document.querySelector(".pesquisar__input");
const botaoPesquisa = document.querySelector(".pesquisar__btn");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

// fiz 2 versões da barra, pensei em ensinar essa por fins didáticos
function filtrarPesquisa() {
  const videos = document.querySelectorAll(".videos__item");

  if (barraDePesquisa.value != "") {
    for (let video of videos) {
      //faço com for ou forEach?
      let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      if (!titulo.includes(valorFiltro)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    }
  } else {
    for (let video of videos) {
      video.style.display = "block";
    }
  }
}

// versão 2 que fica mais limpa mas acho que a pessoa estudante pode ficar perdida
// function filtrarPesquisa() {
//   const videos = document.querySelectorAll('.videos__item');
//   const valorFiltro = barraDePesquisa.value.toLowerCase();

//   videos.forEach((video) => {
//     const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

//     video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'list-item' : 'none' : 'list-item';
//   });
// }


//Filtro de categorias
function filtrarPorCategoria(filtro){
  const videos = document.querySelectorAll('.videos__item');
    for (let video of videos) {
      let categoria = video.querySelector(".categoria").textContent.toLowerCase();
      let valorFiltro = filtro.toLowerCase();

      if (!categoria.includes(valorFiltro)) {
        video.style.display = "none";
      } else {
        video.style.display = "list-item";
      }
    }
}
