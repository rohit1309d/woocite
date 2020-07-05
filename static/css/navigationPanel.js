/**
 * name: navigationPanel.js
 * dependencies: _navigationPanel.js, navigationPanel.css .
 * ajax library dependencies: ext-js (2.0.2+), prototype (1.6.1+).
 * description: the navigation panel client side controller.
 */

/**
 * Register the home controller name space.
 */

function toggleNavPanel(list){
    var listElementStyle=document.getElementById(list).style;
    var iconStyle="expand";
    if (listElementStyle.display=="block") {
       listElementStyle.display="none";
    } else {
       listElementStyle.display="block";
       iconStyle="contract";
    }
    var iconElement = document.getElementById(list + "icon");
    iconElement.className = iconStyle;
}

function toggleNavBySection(sectionName) {
    if (sectionName == "marketplace") {
       toggleNavPanel("marketsub");
    }
    else if (sectionName == "solvers") {
       toggleNavPanel("solversub");
    }
    else if (sectionName == "seekers") {
       toggleNavPanel("seekersub");
    }
}
