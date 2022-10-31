// GTM Helper functions
function checkString(string1) {
    return function (string2) {
        return string1 == string2;
    }
};

function onProductClick(id, url) {
    var ecomm = window.dataLayer.filter(checkString("ecommerce"))[0];
    if (ecomm !== undefined) {
        var productObj = ecomm.ecommerce.impressions.filter(checkString(id))[0];
        if (productObj !== undefined) {
            dataLayer.push({
                'event': 'productClick',
                'ecommerce': {
                    'click': {
                        'actionField': {
                            'list': productObj.list
                        },
                        'products': [{
                            'name': productObj.name,
                            'id': productObj.id,
                            'price': productObj.price,
                            'category': productObj.category,
                            'variant': productObj.variant,
                            'position': productObj.position,
                            'dimension1': productObj.dimension1
                        }]
                    }
                },
                'eventCallback': function () {
                    document.location = url;
                },
                'eventTimeout': 2000
            });
        } else document.location = url;
    } else document.location = url;
}