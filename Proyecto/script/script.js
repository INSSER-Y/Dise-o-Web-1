// Este código se ejecuta cuando todo el HTML está cargado
document.addEventListener('DOMContentLoaded', function() {

    // 1. Efecto simple para el campo de búsqueda

    const searchInput = document.querySelector('.utility-nav input[type="text"]');
    const searchButton = document.querySelector('.utility-nav button');

    searchButton.addEventListener('click', function() {
        // Simula la acción de búsqueda con una alerta
        if (searchInput.value.trim() !== "") {
            alert('Buscando: ' + searchInput.value.trim());
        } else {
            alert('Por favor, ingresa un término de búsqueda.');
        }
    });

    // 2. Interactividad para los botones del carrito y favoritos

    const cartLink = document.querySelector('.cart');
    const favoriteLink = document.querySelector('.favorite');

    // Función para aumentar el contador (badge)
    function aumentarContador(linkElement) {
        const badge = linkElement.querySelector('.badge');
        let count = parseInt(badge.textContent);
        count++;
        badge.textContent = count;
        // Muestra una notificación temporal (opcional)
        console.log(`El contador de ${linkElement.ariaLabel} ha sido actualizado a ${count}`);
    }

    cartLink.addEventListener('click', function(e) {
        e.preventDefault(); // Previene que la página salte
        aumentarContador(cartLink);
        alert('Producto añadido al carrito.');
    });

    favoriteLink.addEventListener('click', function(e) {
        e.preventDefault(); // Previene que la página salte
        aumentarContador(favoriteLink);
        alert('Artículo añadido a favoritos.');
    });
    // --- Código para la funcionalidad de Ordenar y Contar en ofertas.html ---

    // Obtiene el elemento SELECT de ordenamiento
    const sortSelect = document.getElementById('sort');

    // Obtiene el contenedor de todos los productos de oferta
    const productGrid = document.querySelector('.product-grid-ofertas');

    // Obtiene el elemento strong donde se mostrará el conteo
    const countElement = document.getElementById('product-count'); 


    if (sortSelect && productGrid && countElement) {
        // 1. Obtiene una lista (NodeList) de todos los elementos de tarjeta de producto
        // Esta lista se usará para CONTAR y ORDENAR.
        const productCards = Array.from(productGrid.querySelectorAll('.oferta-card'));

        // ** 2. CONTAR Y MOSTRAR EL TOTAL DE PRODUCTOS **
        countElement.textContent = productCards.length; 
        
        // --- Lógica del ordenamiento ---

        sortSelect.addEventListener('change', function() {
            const sortBy = sortSelect.value;
            let sortedCards = [];

            // 1. Definir la lógica de ordenamiento
            switch (sortBy) {
                case 'Mayor Descuento':
                    sortedCards = productCards.sort((a, b) => {
                        const discountA = parseInt(a.querySelector('.discount').textContent.replace('%', '').replace('-', ''));
                        const discountB = parseInt(b.querySelector('.discount').textContent.replace('%', '').replace('-', ''));
                        return discountB - discountA; 
                    });
                    break;

                case 'Precio (Menor a Mayor)':
                    sortedCards = productCards.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.price-oferta').textContent.replace('Bs.', '').trim());
                        const priceB = parseFloat(b.querySelector('.price-oferta').textContent.replace('Bs.', '').trim());
                        return priceA - priceB;
                    });
                    break;
                
                case 'Precio (Mayor a Menor)':
                    sortedCards = productCards.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.price-oferta').textContent.replace('Bs.', '').trim());
                        const priceB = parseFloat(b.querySelector('.price-oferta').textContent.replace('Bs.', '').trim());
                        return priceB - priceA;
                    });
                    break;

                case 'Novedad':
                    // Para este ejemplo, lo revertiremos al orden original.
                    sortedCards = productCards; 
                    break;

                default:
                    sortedCards = productCards;
                    break;
            }

            // 2. Reinsertar las tarjetas ordenadas en el contenedor (el DOM)
            productGrid.innerHTML = ''; // Limpia el contenedor
            sortedCards.forEach(card => {
                productGrid.appendChild(card); // Añade las tarjetas reordenadas
            });
        });
    }
    
});