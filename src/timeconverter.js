function standardToMilitary(time) {
    var PM = time.match('PM') ? true : false;
    
    time = time.split(':');
    
    
    if (PM) {
        var hour = 12 + parseInt(time[0],10);
        var minute = time[1].replace('PM', '');
    } else {
        var hour = time[0];
        var minute = time[1].replace('AM', '');
    }
    
    return `${hour}:${minute}`;
}

export default standardToMilitary;