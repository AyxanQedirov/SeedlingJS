"use strict";
exports.__esModule = true;
$(document).ready(function () {
    var datas = [
        { id: '1', value: 'a', parentid: '#' },
        { id: '2', value: 'b', parentid: '5' },
        { id: '3', value: 'c', parentid: '2' },
        { id: '4', value: 'd', parentid: '#' },
        { id: '5', value: 'e', parentid: '4' },
        { id: '6', value: 'test1', parentid: '1' },
        { id: '7', value: 'yes', parentid: '1' },
        { id: '8', value: 'no', parentid: '1' },
        { id: '9', value: 'ikoNam', parentid: '1' },
        { id: '10', value: 'ikoNam2', parentid: '4' }
    ];
    setRawNodes(datas);
});
function setRawNodes(rawNodes) {
    var result = [];
    //define all roots
    rawNodes.forEach(function (rawNode) {
        if (rawNode.parentid == '#') {
            var rootNode = { id: rawNode.id, value: rawNode.value, children: [] };
            result.push(rootNode);
        }
    });
    //find every seed sitting position
    rawNodes
        .filter(function (rawNode) { return rawNode.parentid != '#'; })
        .sort(function (a, b) { return Number(a.parentid) - Number(b.parentid); })
        .forEach(function (rawNode) {
        result.forEach(function (root) {
            addRawNode(root, rawNode);
        });
    });
    //drawing tree    
    result.forEach(function (tree) {
        $('.tree-view-side').append(drawTree(tree));
    });
}
function addRawNode(node, rawNodeToAdd) {
    var _a;
    if (node.id == rawNodeToAdd.parentid) {
        var nodeToAdd = { id: rawNodeToAdd.id, value: rawNodeToAdd.value, children: [] };
        node.children.push(nodeToAdd);
        return;
    }
    (_a = node.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
        addRawNode(child, rawNodeToAdd);
    });
}
function drawTree(node) {
    if (node.children.length > 0) {
        var ul = createULElement(node.value);
        node.children.forEach(function (child) {
            ul.append(drawTree(child));
        });
        return ul;
    }
    else {
        var li = createLIElement(node.value);
        return li;
    }
}
//Configuring some design and style
function createULElement(value) {
    var ul = $('<ul>');
    ul.addClass('folder');
    var span = $('<span>');
    span.addClass('folder-text');
    var iconFile = $('<i>');
    iconFile.addClass('bi bi-folder-fill');
    iconFile.addClass('folder-icon');
    span.text(value);
    iconFile.append(span);
    ul.append(iconFile);
    iconFile.on("click", function () {
        console.log(value);
    });
    return ul;
}
//Configuring some design and style
function createLIElement(value) {
    var li = $('<li>');
    li.addClass('file');
    var span = $('<span>');
    span.addClass('file-text');
    var iconFolder = $('<i>');
    iconFolder.addClass('bi bi-filetype-html');
    span.text(value);
    iconFolder.append(span);
    li.hover(function () {
        li.removeClass("file-hover-out");
        li.addClass("file-hover-in");
    }, function () {
        li.removeClass("file-hover-in");
        li.addClass("file-hover-out");
    });
    li.append(iconFolder);
    return li;
}
