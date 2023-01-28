import { RawNode } from "./raw-node";
import { Node } from "./node";

declare var $: any;

$(document).ready(() => {
    let datas: RawNode[] = [
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
})

function setRawNodes(rawNodes: RawNode[]): void {
    let result: Node[] = [];

    //define all roots
    rawNodes.forEach(rawNode => {
        if (rawNode.parentid == '#') {
            let rootNode: Node = { id: rawNode.id, value: rawNode.value, children: [] }
            result.push(rootNode);
        }
    });

    //find every seed sitting position
    rawNodes
        .filter(rawNode => rawNode.parentid != '#')
        .sort((a, b) => Number(a.parentid) - Number(b.parentid))
        .forEach(rawNode => {
            result.forEach(root => {
                addRawNode(root, rawNode);
            })
        });

    //drawing tree    
    result.forEach(tree => {
        $('.tree-view-side').append(drawTree(tree))
    })



}
function addRawNode(node: Node, rawNodeToAdd: RawNode): void {
    if (node.id == rawNodeToAdd.parentid) {
        let nodeToAdd: Node = { id: rawNodeToAdd.id, value: rawNodeToAdd.value, children: [] };
        node.children.push(nodeToAdd);
        return;
    }

    node.children?.forEach(child => {
        addRawNode(child, rawNodeToAdd);
    })

}

function drawTree(node: Node): any {

    if (node.children.length > 0) {
        var ul = createULElement(node.value);
        node.children.forEach(child => {
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
    var span = $('<span>');
    var iconFile = $('<i class="bi bi-folder-fill">');
    span.text(value);
    span.css("color", "gray");
    span.css("padding-left", "5px");
    iconFile.append(span);
    iconFile.css("color", "#F7C600");
    ul.css("padding-left", "10px");
    ul.append(iconFile);

    iconFile.on("click", () => {
        console.log(value);
    })
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

    li.hover(() => {
        li.removeClass("file-hover-out");
        li.addClass("file-hover-in")
    }, () => {
        li.removeClass("file-hover-in");
        li.addClass("file-hover-out");
    });
    li.append(iconFolder);
    return li;
}