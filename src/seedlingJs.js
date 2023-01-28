"use strict";
exports.__esModule = true;
//For client using (start point)
function createTree(elementSelector, datas, createOption) {
    var options = createOption == null ? null : createOption;
    setRawNodes(datas, elementSelector, options);
}
function setRawNodes(rawNodes, drawSideElementSelector, options) {
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
        $(drawSideElementSelector).append(drawTree(tree, options));
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
function drawTree(node, options) {
    if (node.children.length > 0) {
        var ul = createULElement(node.value);
        node.children.forEach(function (child) {
            ul.append(drawTree(child, options));
        });
        return ul;
    }
    else {
        var li = createLIElement(node.value, options.FileClickEvent, options.FileHoverEvent);
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
    expandIcon.on("click", function (event) {
        if ($(event.target).attr('opened') == 'true') {
            $(event.target)
                .removeClass('bi-caret-up-fill')
                .addClass('bi-caret-down-fill')
                .parent()
                .children('li,ul')
                .removeClass('d-list-item')
                .addClass('d-none');
            $(event.target).attr('opened', 'false');
        }
        else if ($(event.target).attr('opened') == 'false') {
            $(event.target)
                .removeClass('bi-caret-down-fill')
                .addClass('bi-caret-up-fill')
                .parent()
                .children('li,ul')
                .removeClass('d-none')
                .addClass('d-list-item');
            $(event.target).attr('opened', 'true');
        }
    });
    expandIcon.append(iconFile);
    iconFile.append(span);
    span.text(value);
    ul.append(expandIcon);
    iconFile.on("click", function () {
        console.log(value);
    });
    return ul;
}
//Configuring some design and style
function createLIElement(value, onclickEvent, onHoverEvent) {
    var li = $('<li>');
    li.addClass('file');
    var span = $('<span>');
    span.addClass('file-text');
    var iconFolder = $('<i>');
    iconFolder.addClass('bi bi-filetype-html');
    span.text(value);
    iconFolder.append(span);
    li.hover(function (event) {
        onHoverEvent($(event.target));
        li.removeClass("file-hover-out");
        li.addClass("file-hover-in");
    }, function () {
        li.removeClass("file-hover-in");
        li.addClass("file-hover-out");
    });
    li.click(function (event) {
        onclickEvent($(event.target));
    });
    li.append(iconFolder);
    return li;
}
