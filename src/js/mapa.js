// Função para inicializar o mapa
function inicializarMapa() {
    // Criar o mapa centralizado em São Paulo
    const mapa = L.map('mapa').setView([-23.55, -46.64], 11);

    // Adicionar camada de mapa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(mapa);

    // Adicionar título ao mapa
    const tituloMapa = L.control({position: 'topright'});
    tituloMapa.onAdd = function(mapa) {
        const div = L.DomUtil.create('div', 'info-titulo');
        div.innerHTML = '<h4>Mapa de Enchentes em São Paulo</h4>';
        return div;
    };
    tituloMapa.addTo(mapa);

    // Adicionar legenda ao mapa
    const legenda = L.control({position: 'bottomright'});
    legenda.onAdd = function(mapa) {
        const div = L.DomUtil.create('div', 'info legenda');
        div.innerHTML = `
            <h4>Níveis de Risco</h4>
            <i style="background: #ff0000"></i> Crítico<br>
            <i style="background: #ff6600"></i> Alto<br>
            <i style="background: #ffcc00"></i> Médio<br>
            <div class="linha-legenda"><hr style="border: 2px solid #0066ff; border-radius: 2px;"></div> Rio Tamanduateí
        `;
        return div;
    };
    legenda.addTo(mapa);

    // Adicionar o traçado do Rio Tamanduateí
    const rioPolyline = L.polyline(rioTamanduatei, {
        color: '#0066ff',
        weight: 4,
        opacity: 0.8
    }).addTo(mapa);
    rioPolyline.bindPopup("<b>Rio Tamanduateí</b><br>Principal rio da região central e leste de São Paulo");

    // Adicionar marcadores para os pontos de enchente gerais
    pontosEnchente.forEach(ponto => {
        // Definir cor do marcador com base no nível de risco
        let cor = '#ffcc00'; // Médio (padrão)
        if (ponto.nivel === 'Alto') {
            cor = '#ff6600';
        }

        const marcador = L.circleMarker(ponto.coordenadas, {
            radius: 8,
            fillColor: cor,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(mapa);

        marcador.bindPopup(`
            <b>${ponto.nome}</b><br>
            ${ponto.descricao}<br>
            <span class="nivel-risco" style="background-color: ${cor}">Nível de risco: ${ponto.nivel}</span>
        `);
    });

    // Adicionar marcadores para os pontos críticos do Rio Tamanduateí
    pontosCriticosRioTamanduatei.forEach(ponto => {
        // Definir cor do marcador com base no nível de risco
        let cor = '#ff0000'; // Crítico (padrão para pontos do Tamanduateí)
        if (ponto.nivel === 'Alto') {
            cor = '#ff6600';
        }

        const marcador = L.circleMarker(ponto.coordenadas, {
            radius: 10,
            fillColor: cor,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(mapa);

        marcador.bindPopup(`
            <b>${ponto.nome}</b><br>
            ${ponto.descricao}<br>
            <span class="nivel-risco" style="background-color: ${cor}">Nível de risco: ${ponto.nivel}</span>
            <br><small>Rio Tamanduateí</small>
        `);
    });

    // Adicionar controle de camadas
    const camadasBase = {
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }),
        "Satélite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 19
        })
    };

    L.control.layers(camadasBase, null, {collapsed: false}).addTo(mapa);

    return mapa;
}

// Inicializar o mapa quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o elemento do mapa existe
    if (document.getElementById('mapa')) {
        inicializarMapa();
    }
});

