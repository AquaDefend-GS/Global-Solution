// Dados dos principais pontos de enchente em São Paulo
const pontosEnchente = [
    {
        nome: "Marginal Tietê - Ponte das Bandeiras",
        descricao: "Área crítica de alagamento na região central",
        coordenadas: [-23.5181, -46.6354],
        nivel: "Alto"
    },
    {
        nome: "Marginal Pinheiros - Ponte do Jaguaré",
        descricao: "Ponto recorrente de enchentes na zona oeste",
        coordenadas: [-23.5464, -46.7372],
        nivel: "Alto"
    },
    {
        nome: "Avenida do Estado - Ipiranga",
        descricao: "Próximo ao Rio Tamanduateí, área de alagamento frequente",
        coordenadas: [-23.5865, -46.6118],
        nivel: "Alto"
    },
    {
        nome: "Praça da Bandeira",
        descricao: "Região central com histórico de alagamentos",
        coordenadas: [-23.5454, -46.6425],
        nivel: "Médio"
    },
    {
        nome: "Avenida Aricanduva",
        descricao: "Ponto crítico na zona leste",
        coordenadas: [-23.5667, -46.5050],
        nivel: "Alto"
    },
    {
        nome: "Avenida dos Estados - Santo André",
        descricao: "Área de alagamento próxima ao Rio Tamanduateí",
        coordenadas: [-23.6431, -46.5269],
        nivel: "Alto"
    },
    {
        nome: "Avenida Moreira Guimarães - Aeroporto",
        descricao: "Região sul com alagamentos frequentes",
        coordenadas: [-23.6261, -46.6630],
        nivel: "Médio"
    },
    {
        nome: "Avenida Pompeia - Água Branca",
        descricao: "Zona oeste com pontos de alagamento",
        coordenadas: [-23.5280, -46.6870],
        nivel: "Médio"
    },
    {
        nome: "Avenida Santo Amaro",
        descricao: "Zona sul com histórico de enchentes",
        coordenadas: [-23.6150, -46.6730],
        nivel: "Médio"
    },
    {
        nome: "Avenida Engenheiro Caetano Álvares",
        descricao: "Zona norte com pontos de alagamento",
        coordenadas: [-23.4890, -46.6680],
        nivel: "Médio"
    }
];

// Dados do Rio Tamanduateí
const rioTamanduatei = [
    // Coordenadas aproximadas do traçado do Rio Tamanduateí
    [-23.5181, -46.6354], // Início próximo à foz no Rio Tietê
    [-23.5280, -46.6290],
    [-23.5380, -46.6240],
    [-23.5480, -46.6190],
    [-23.5580, -46.6150],
    [-23.5680, -46.6120],
    [-23.5780, -46.6090],
    [-23.5880, -46.6060],
    [-23.5980, -46.6030],
    [-23.6080, -46.6000],
    [-23.6180, -46.5970],
    [-23.6280, -46.5940],
    [-23.6380, -46.5910],
    [-23.6480, -46.5880],
    [-23.6580, -46.5850],
    [-23.6680, -46.5820], // Próximo a Santo André
    [-23.6780, -46.5790],
    [-23.6880, -46.5760],
    [-23.6980, -46.5730], // Em direção a Mauá, onde nasce
];

// Pontos críticos específicos do Rio Tamanduateí
const pontosCriticosRioTamanduatei = [
    {
        nome: "Parque Dom Pedro II",
        descricao: "Área histórica de enchentes do Tamanduateí",
        coordenadas: [-23.5450, -46.6290],
        nivel: "Crítico"
    },
    {
        nome: "Mooca - Avenida do Estado",
        descricao: "Região com alto risco de transbordamento",
        coordenadas: [-23.5650, -46.6150],
        nivel: "Crítico"
    },
    {
        nome: "Ipiranga - Museu",
        descricao: "Área de alagamento próxima ao museu",
        coordenadas: [-23.5850, -46.6090],
        nivel: "Alto"
    },
    {
        nome: "São Caetano do Sul",
        descricao: "Trecho com histórico de transbordamentos",
        coordenadas: [-23.6180, -46.5970],
        nivel: "Crítico"
    },
    {
        nome: "Santo André - Centro",
        descricao: "Área urbana com alto risco de enchentes",
        coordenadas: [-23.6580, -46.5850],
        nivel: "Crítico"
    }
];

