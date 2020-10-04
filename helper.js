const addLine = (y, data) => {
    points[y] = [];
    for (let i = 0; i <= elements; i++) {
        points[y].push(new THREE.Vector3(i * h - width / 2, y / res, data ? data[i] : 0));
    };
}
const addVerts = (y) => {
    for (let i = 0; i < points[y].length - 1; i++) {
        let v1 = points[y][i];
        let v2 = points[y + 1][i];
        let v3 = points[y][i + 1];
        let v4 = points[y + 1][i + 1];
        geo[y].vertices.push(v1);
        geo[y].vertices.push(v2);
        geo[y].vertices.push(v3);
        geo[y].vertices.push(v4);
    }
}
const addFaces = (y) => {
    for (let i = 0; i < points[0].length - 1; i++) {
        let n = 4 * i;
        geo[y].faces.push(new THREE.Face3(n, n + 3, n + 1));
        geo[y].faces.push(new THREE.Face3(n, n + 2, n + 3));
    }
}
const getData = () => {
    let data;
    try {
        data = Array.from(analyser.getFrequencyData());
    } catch (error) {
        data = [];
    }
    let reduced = Array((elements+1)/2).fill(0);
    for (let i = 0; i < data.length; i++) {
        index = Math.floor(i/(data.length/((elements+1)/2)));
        reduced[index] += data[i];
    }
    reduced = reduced.concat(reduced.slice().reverse());   
    reduced = reduced.map(x => Math.pow(0.01*elements/fft*x,2))
    // reduced = reduced.map(x => 0.01*elements/fft*x);
    return reduced;
}
const newSpeed = (speed) => {
    let data = 0;
    try {
        data = analyser.getAverageFrequency();
    } catch (error) {
    }
    let update = 0.2*Math.pow(data/20,3);
    update = update > 15 ? 15 : update;
    return 1 < data ? update : speed;
}
const newLight = () => {
    let data;
    try {
        data = Array.from(analyser.getFrequencyData());
    } catch (error) {
        data = [];
    }
    let level = 0;
    if (data[0] >= 250) {
        level = 10000000;
    } else {
        level = mean(data.slice(0,20))-120;
    }
    return level;

}
const newBackground = () => {
    let data = 0;
    try {
        data = analyser.getAverageFrequency();
    } catch (error) {
    }
    let update = 0.2*Math.pow(data/20,3);
    update = update > 25 ? 25 : update;
    let s = (25-update)/150;
    let color = new THREE.Color(0,0,s);
    return color;
}
const mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length

module.exports = {
    addLine: addLine,
    addVerts: addVerts,
    addFaces: addFaces,
    getData: getData,
    newSpeed: newSpeed,
    newLight: newLight,
    newBackground: newBackground,
}