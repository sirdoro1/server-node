 function isActive(url, currentUrl) {
    console.log('Url here: ' + url);
    console.log('CurrentUrl here: ' + currentUrl);
    return url === currentUrl ? 'active' : '';
}

module.exports = {
    isActive: isActive
}