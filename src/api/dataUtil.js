

export function formData(arr) {
    if (!arr) {
        return arr
    }
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        item.serveTime = format(item.serveTime, 'Y-m-d');
        item.endTime = format(item.endTime, 'Y-m-d');
        item.usageMonth = (item.usageMonth / 1024).toFixed(2);
        item.usageYesterday = (item.usageYesterday / 1024).toFixed(2);
    }
    return arr
}



export function format(timestamp, formats) {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    formats = formats || 'Y-m-d';

    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    var myDate = timestamp ? new Date(timestamp) : new Date();

    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());

    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
}

export function formartPoolData(arr, color) {
    if (!arr.length) {
        return {}
    }
    var result = {
        labels: [],
        datasets: [
            {
                label: '用量(M)',
                data: [],
                backgroundColor: color
            }
        ]
    }
    for (var i = 0; i < arr.length; i++) {
        result.labels.push(format(arr[i].insertDate, 'm-d'));
        result.datasets[0].data.push((arr[i].yesterdayUse/1024).toFixed(2))
    }
    return result;
}

export function formatBottomList(arr) {
    return [
        {
            name: '本月用量',
            unit: 'M',
            value: ((arr[arr.length - 1].monthSum)/1024).toFixed(2) || 0
        },
        {
            name: '昨日用量',
            unit: 'M',
            value: ((arr[arr.length - 1].yesterdayUse)/1024).toFixed(2)
        },
        {
            name: '卡数',
            unit: '张',
            value: arr[0].countNum || 0,
        }
    ]
}