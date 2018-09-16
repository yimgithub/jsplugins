// JavaScript source code
var SmithTOC = {};
SmithTOC.Init = function () {
    var arrTOC = [];

    var ulElem = document.querySelector("article>ul");
    if (ulElem == null) { return; }

    var liElems = document.querySelectorAll("article>ul>li");
    findChildTOCs(liElems, '', '');

    function findChildTOCs(liChilds, sIdx, prefix) {
        var realIdx = 0;
        for (var i = 0; i < liChilds.length; i++) {
            //exclude inside li
            if (i > 0 && liChilds[i - 1].contains(liChilds[i])) { continue; }

            //toc name
            var p = liChilds[i].querySelector("p");
            var nameTOC = '';
            var referChild = null;
            if (p != null) {
                nameTOC = p.innerText;
                referChild = p;
            }
            else {
                nameTOC = liChilds[i].innerText;
                referChild = liChilds[i].firstChild;
            }

            //toc idx 
            var numIdx = realIdx + 1;
            realIdx++;
            var sOrder = sIdx + numIdx.toString() + '.';
            arrTOC.push({ node: prefix + sOrder + ' ' + nameTOC, listOrder: sOrder });
            var aElem = document.createElement("a");
            aElem.id = sOrder;
            liChilds[i].insertBefore(aElem, referChild);


            var lisChild = liChilds[i].querySelectorAll("ul>li");
            if (lisChild.length == 0) { continue; }

            findChildTOCs(lisChild, sOrder, prefix + '　　');
        }
    }

    var pTOCs = "";
    var sortTOCs = arrTOC;
    for (var i = 0; i < sortTOCs.length; i++) {
        pTOCs = pTOCs + buildTOC(sortTOCs[i].listOrder, sortTOCs[i].node);
    }

    function buildTOC(id, txt) {
        return ['<p>', '<a href="#', id, '">', txt, '</a>', '</p>'].join();
    }

    var htmlTOC = '<div id="idx" style="z-index: 99;position: fixed;right: 28px;top: 10px;opacity: 0.4;overflow-y: auto;max-height: 90%;width: 200px;">' + pTOCs + '</div>';
    var divTOC = document.createElement("div");
    divTOC.innerHTML = htmlTOC;
    document.querySelector("body div").appendChild(divTOC);
};
