 function isActive(url, currentUrl) {
    return url === currentUrl ? 'active' : '';
}

module.exports = {
    isActive: isActive
}