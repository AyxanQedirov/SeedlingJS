import { RawNode } from "./raw-node";
import { Node } from "./node";
import { CreateOption } from "./create-option";

declare var $: any;

//For client using (start point)
function createTree(elementSelector:string,datas:RawNode[],createOption:CreateOption){
    let options:any=createOption==null?null:createOption;

    setRawNodes(datas,elementSelector,options);
}

function setRawNodes(rawNodes: RawNode[],drawSideElementSelector:string,options:CreateOption): void {
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
        $(drawSideElementSelector).append(drawTree(tree,options))
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

function drawTree(node: Node,options:CreateOption): any {

    if (node.children.length > 0) {
        var ul = createULElement(node.value);
        node.children.forEach(child => {
            ul.append(drawTree(child,options));
        });
        return ul;
    }
    else {
        var li = createLIElement(node.value,options.FileClickEvent,options.FileHoverEvent);
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
    iconFile.addClass('bi bi-folder-fill').addClass('folder-icon');
    var expandIcon = $('<i>');
    expandIcon.addClass('bi bi-caret-up-fill').addClass('expand-icon');
    expandIcon.attr('opened', 'true');

    expandIcon.on("click", (event) => {
        if ($(event.target).attr('opened') == 'true') {

            $(event.target)
                .removeClass('bi-caret-up-fill')
                .addClass('bi-caret-down-fill')
                .parent()
                .children('li,ul')
                .removeClass('d-list-item')
                .addClass('d-none');
            $(event.target).attr('opened', 'false');

        } else if ($(event.target).attr('opened') == 'false') {

            $(event.target)
                .removeClass('bi-caret-down-fill')
                .addClass('bi-caret-up-fill')
                .parent()
                .children('li,ul')
                .removeClass('d-none')
                .addClass('d-list-item');

            $(event.target).attr('opened', 'true');
        }
    })

    expandIcon.append(iconFile);
    iconFile.append(span);
    span.text(value);

    ul.append(expandIcon);

    iconFile.on("click", () => {
        console.log(value);
    })
    return ul;
}

//Configuring some design and style
function createLIElement(value,onclickEvent:()=>{},onHoverEvent:()=>{}) {
    var li = $('<li>');
    li.addClass('file');
    var span = $('<span>');
    span.addClass('file-text');
    var iconFolder = $('<i>');
    iconFolder.addClass('bi bi-filetype-html');

    span.text(value);
    iconFolder.append(span);

    li.hover(() => {
        onHoverEvent();
        li.removeClass("file-hover-out");
        li.addClass("file-hover-in")
    }, () => {
        li.removeClass("file-hover-in");
        li.addClass("file-hover-out");
    });

    li.click(()=>{
        onclickEvent();
    });
    li.append(iconFolder);
    return li;
}