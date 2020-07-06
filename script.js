const renderBoard = (w, h) => {
    let dom = document.getElementById('chessboard');
    const boardWidth = dom.clientWidth;
    const blockWidth = boardWidth/8;
    for(let i=1; i<=w; i++) {
        const parentEle = document.createElement('div');
        const idGenParent = 'block_' + i;
        parentEle.setAttribute('id', idGenParent);
        document.getElementById('chessboard').appendChild(parentEle);
        for(let j=i; j<h+i; j++) {
            var className = j%2 == 0 ? 'bgwhite' : 'bgblack';
            const element = document.createElement('div');
            // const idGenerator = 'block_' + Math.random();
            const idGenerator = 'block_' + i + (j-i+1);
            element.setAttribute('id', idGenerator);
            element.setAttribute('class', className + " block");
            element.setAttribute('i', i);
            element.setAttribute('j', (j-i+1));
            element.style.width = blockWidth + "px";
            element.style.height = blockWidth + "px";
            document.getElementById(idGenParent).appendChild(element);
        }
    }
};

window.onload = renderBoard(8, 8);

document.getElementById('chessboard').onclick = function(e) {
    const x = e.target.getAttribute('i');
    const y = e.target.getAttribute('j');
    let vertices = [[parseInt(x),parseInt(y)]];

    // finding all the possible vertices
    vertices = vertices.concat(createVertices('inc', 'dec', x, y, 8, 8));
    vertices = vertices.concat(createVertices('dec', 'inc', x, y, 8, 8));
    vertices = vertices.concat(createVertices('inc', 'inc', x, y, 8, 8));
    vertices = vertices.concat(createVertices('dec', 'dec', x, y, 8, 8));

    // clear background colour which was applied from the previous click
    let selectedList = Object.values(document.querySelectorAll('#chessboard div div.bgRed'));
    selectedList.length ? selectedList.map((eachVertex)=> {
        eachVertex.classList.remove('bgRed');
    }) : '';

    // applying background colour for all possible diagonal vertices from the selected vertex
    for (var i=0; i<vertices.length; i++) {
        let id = 'block_' + vertices[i][0] + vertices[i][1];
        document.getElementById(id).classList.add('bgRed');
    }
};

function createVertices(operX, operY, x, y, w, h) {
    let generatedVertices = [], vertecX = [], vertecY = [];

    x = operX == 'inc' ? ++x : --x;
    y = operY == 'inc' ? ++y : --y;
    for (var i=x; 1<=x && x<=w; i++) {
        vertecX.push(operX == 'inc' ? x++ : x--);
    }
    for (var j=y; 1<=y && y<=h; j++) {
        vertecY.push(operY == 'inc' ? y++ : y--);
    }
    var length = vertecY.length > vertecX.length ? vertecY.length : vertecX.length;
    for (var k=0; k<length; k++) {
        let vertex = [];
        if (vertecX[k] && vertecY[k]) vertex.push(vertecX[k], vertecY[k])
        vertex.length ? generatedVertices.push(vertex) : '';
    }
    return generatedVertices;
}