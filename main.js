////////////////////////////////////////////////////
// Скрипт состоит из:
// 1) описание графа и расчёта кратчайшего пути от старта до финиша
// 2) визуализация графа


///////////////////////////
// 1) создаём граф

let graph = {};

graph['start'] = {};
graph['start']['a'] = 5;
graph['start']['c'] = 2;

graph['a'] = {};
graph['a']['b'] = 4;
graph['a']['d'] = 2;

graph['c'] = {};
graph['c']['a'] = 8;
graph['c']['d'] = 7;

graph['b'] = {};
graph['b']['finish'] = 3;
graph['b']['d'] = 6;

graph['d'] = {};
graph['d']['finish'] = 1;

graph['finish'] = {};

// таблица стоимостей от старта

let costs = {};

costs['a'] = 5;
costs['c'] = 2;
costs['b'] = Infinity;
costs['d'] = Infinity;
costs['finish'] = Infinity;

// таблица родителей

let parents = {};

parents['a'] = 'start';
parents['c'] = 'start';
parents['b'] = null;
parents['d'] = null;
parents['finish'] = null;

// проверенные узлы

let processed = [];


////////////////////////////////
// Алгоритм Дейстры

const deystra = () => {

    let result = {};

    // минимальная стоимость

    const smallestCost = (costs) => {
        let sorted = Object.keys(costs).sort((a, b) => costs[a] - costs[b]);
        for (let i = 0; i < sorted.length; i++) {
            if (processed.indexOf(sorted[i]) === -1) return sorted[i];
        }
    };

    // формирование кратчайшего маршрута

    const getRoute = (parents) => {
        let result = '';
        let target = 'finish';
        result += target;

        while (parents[target]) {
            target = parents[target];
            result = target + ' > ' + result;
        }

        return result;
    };

    // найти узел с наименьшей стоимостью

    let node = smallestCost(costs);

    while (node) {
        // найти стоимость и соседей

        let cost = costs[node];
        let neighbors = graph[node];

        // перебрать соседей, проверить стоимости

        for (let n in neighbors) {
            let newCost = cost + neighbors[n];
            if (costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        }

        // добавить узел в обработанные и продолжить цикл

        processed.push(node);
        node = smallestCost(costs);
    }

    // вывод

    result[1] = `Кратчайшее расстояние от старта до финиша равно: ${costs['finish']}.`;
    result[2] = `Кратчайший путь: ${getRoute(parents)}`;

    return result;
};


////////////////////////////////////////////////////
// 2) Визуализация (используем vis.js)


// масив узлов
let nodes = new vis.DataSet([
    {id: 1, label: 'Start'},
    {id: 2, label: 'A'},
    {id: 3, label: 'B'},
    {id: 4, label: 'C'},
    {id: 5, label: 'D'},
    {id: 6, label: 'Finish'}
]);

// масив граней
let edges = new vis.DataSet([
    {from: 1, to: 2, arrows: 'to', label: '5', font: {align: 'horizontal'}},
    {from: 1, to: 4, arrows: 'to', label: '2', font: {align: 'horizontal'}},
    {from: 2, to: 3, arrows: 'to', label: '4', font: {align: 'horizontal'}},
    {from: 2, to: 5, arrows: 'to', label: '2', font: {align: 'horizontal'}},
    {from: 3, to: 5, arrows: 'to', label: '2', font: {align: 'horizontal'}},
    {from: 3, to: 6, arrows: 'to', label: '3', font: {align: 'horizontal'}},
    {from: 4, to: 2, arrows: 'to', label: '8', font: {align: 'horizontal'}},
    {from: 4, to: 5, arrows: 'to', label: '7', font: {align: 'horizontal'}},
    {from: 5, to: 6, arrows: 'to', label: '1', font: {align: 'horizontal'}}
]);

// render
let container = document.getElementById('mynetwork');
let data = {
    nodes: nodes,
    edges: edges
};
let options = {
    physics: {
        enabled: false
    },
    layout: {
        randomSeed: 502565
    }

};
let network = new vis.Network(container, data, options);


//////////////////////////////////////////////
// кнопка

let button = document.getElementById('find');

button.addEventListener('click', () => {
    let result = deystra();
    p1.innerHTML = result[1];
    p2.innerHTML = result[2];
});
