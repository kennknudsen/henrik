app.filter('initials', function() {

    function initialsFilter(name) {
        if( !name ){ return }

        var splitted = name.split(" ");
        return splitted[0][0] + "" + splitted[splitted.length - 1][0];
    }

    return initialsFilter;
});